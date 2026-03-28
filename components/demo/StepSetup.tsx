"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { useDemoStore } from "@/store/demo.store";
import { signAndSerialize } from "@/lib/solana-wallet";
import { setTrustline } from "@/services/helper.service";
import { sendTransaction } from "@/services/helper.service";
import { initializeRegistry, getVerification, verifyAddress } from "@/services/compliance.service";
import { DEMO_KYC_DEFAULTS } from "@/constants/demo-defaults";
import { NarrativeBlock } from "./NarrativeBlock";
import { TransactionResult } from "./TransactionResult";
import { parseError } from "@/lib/errors";
import { Loader2, CheckCircle } from "lucide-react";

export function StepSetup() {
  const { publicKey, signTransaction } = useWallet();
  const {
    walletAddress,
    tokenAccountTxSig,
    kycTxSig,
    loading,
    error,
    setTokenAccountTxSig,
    setKycTxSig,
    setLoading,
    setError,
    completeStep,
    setStep,
  } = useDemoStore();

  const handleSetupTrustline = async () => {
    if (!publicKey || !signTransaction || !walletAddress) return;
    setLoading(true);
    setError(null);
    try {
      const res = await setTrustline({ walletAddress });

      // Token account already exists — no TX needed
      if (!res.unsignedTransaction) {
        setTokenAccountTxSig("already-exists");
        return;
      }

      const signed = await signAndSerialize(res.unsignedTransaction, signTransaction);
      const result = await sendTransaction({
        signedXdr: signed,
        queueKey: walletAddress,
      });
      setTokenAccountTxSig(result.data?.txHash || result.txHash || "success");
    } catch (err: unknown) {
      setError(parseError(err));
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyKyc = async () => {
    if (!publicKey || !signTransaction || !walletAddress) return;
    setLoading(true);
    setError(null);
    try {
      // Check if already verified on-chain
      try {
        await getVerification(walletAddress);
        // If no error, verification exists — skip
        setKycTxSig("already-verified");
        completeStep(2);
        setStep(3);
        return;
      } catch {
        // 404 = not verified yet — continue with verification flow
      }

      // Ensure compliance registry is initialized (only first time ever)
      try {
        const regRes = await initializeRegistry({
          signer: walletAddress,
          travelRuleThreshold: "1000000",
        });
        if (regRes.unsignedTransaction) {
          const regSigned = await signAndSerialize(regRes.unsignedTransaction, signTransaction);
          await sendTransaction({
            signedXdr: regSigned,
            queueKey: walletAddress,
          });
        }
      } catch {
        // Registry already initialized — safe to continue
      }

      // Verify address (KYC)
      const res = await verifyAddress({
        signer: walletAddress,
        address: walletAddress,
        kycProvider: DEMO_KYC_DEFAULTS.kycProvider,
        jurisdiction: DEMO_KYC_DEFAULTS.jurisdiction,
        riskScore: DEMO_KYC_DEFAULTS.riskScore,
      });

      const signed = await signAndSerialize(res.unsignedTransaction, signTransaction);
      const result = await sendTransaction({
        signedXdr: signed,
        queueKey: walletAddress,
      });
      setKycTxSig(result.data?.txHash || result.txHash || "success");
      completeStep(2);
      setStep(3);
    } catch (err: unknown) {
      setError(parseError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <NarrativeBlock title="Account Setup">
        <p>
          Before Alpine Payments can use the escrow, they need two things: a USDC token account
          (to hold and transfer stablecoins) and KYC verification (to satisfy compliance requirements).
        </p>
        <p className="mt-2">
          In production, KYC would be done through a regulated provider. For this demo, we register
          the wallet directly on the on-chain compliance registry with jurisdiction &quot;CH&quot; (Switzerland).
        </p>
      </NarrativeBlock>

      <div className="space-y-4">
        {/* Step 2a: Token Account */}
        <div className="rounded-lg border border-border bg-card p-6">
          <h4 className="mb-2 font-semibold text-navy">2a. Create USDC Token Account</h4>
          <p className="mb-4 text-sm text-navy-light">
            Creates an Associated Token Account for USDC on your wallet. Required to hold and transfer USDC.
          </p>
          {tokenAccountTxSig ? (
            tokenAccountTxSig === "already-exists" ? (
              <div className="flex items-center gap-3 rounded-lg border border-success/20 bg-success/5 p-4">
                <CheckCircle className="h-5 w-5 shrink-0 text-success" />
                <p className="text-sm font-medium text-navy">USDC token account already exists</p>
              </div>
            ) : (
              <TransactionResult label="Token account created" signature={tokenAccountTxSig} />
            )
          ) : (
            <button
              onClick={handleSetupTrustline}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-dark disabled:opacity-50"
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              Create Token Account
            </button>
          )}
        </div>

        {/* Step 2b: KYC */}
        <div className="rounded-lg border border-border bg-card p-6">
          <h4 className="mb-2 font-semibold text-navy">2b. KYC Verification</h4>
          <p className="mb-4 text-sm text-navy-light">
            Registers your wallet on the on-chain compliance registry. Jurisdiction: CH (Switzerland), Risk Score: 10/100.
          </p>
          {kycTxSig ? (
            <TransactionResult label="KYC verified on-chain" signature={kycTxSig} />
          ) : (
            <button
              onClick={handleVerifyKyc}
              disabled={loading || !tokenAccountTxSig}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-dark disabled:opacity-50"
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              Verify KYC
            </button>
          )}
          {!tokenAccountTxSig && !kycTxSig && (
            <p className="mt-2 text-xs text-navy-light">Complete step 2a first</p>
          )}
        </div>
      </div>

      {error && (
        <div className="mt-4 rounded-lg border border-error/20 bg-error/5 p-4 text-sm text-error">
          {error}
        </div>
      )}
    </div>
  );
}
