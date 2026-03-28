"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { useDemoStore } from "@/store/demo.store";
import { signAndSerialize } from "@/lib/solana-wallet";
import { fundEscrow } from "@/services/escrow.service";
import { sendTransaction } from "@/services/helper.service";
import { DEMO_ESCROW_DEFAULTS } from "@/constants/demo-defaults";
import { NarrativeBlock } from "./NarrativeBlock";
import { TransactionResult } from "./TransactionResult";
import { MetricsComparison } from "./MetricsComparison";
import { parseError } from "@/lib/errors";
import { Loader2 } from "lucide-react";

export function StepFundEscrow() {
  const { signTransaction } = useWallet();
  const {
    walletAddress,
    contractId,
    fundTxSig,
    loading,
    error,
    setFundTxSig,
    setLoading,
    setError,
    completeStep,
    setStep,
  } = useDemoStore();

  const handleFund = async () => {
    if (!signTransaction || !walletAddress || !contractId) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fundEscrow({
        contractId,
        signer: walletAddress,
        amount: DEMO_ESCROW_DEFAULTS.amount,
      });

      const signed = await signAndSerialize(res.unsignedTransaction, signTransaction);
      const result = await sendTransaction({
        signedXdr: signed,
        queueKey: contractId,
      });

      setFundTxSig(result.data?.txHash || result.txHash || "success");
      completeStep(4);
      setStep(5);
    } catch (err: unknown) {
      setError(parseError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <NarrativeBlock title="Funding the Escrow">
        <p>
          Alpine Payments deposits <strong>{DEMO_ESCROW_DEFAULTS.displayAmount} USDC</strong> into the escrow.
          The funds are transferred from their wallet to the escrow PDA — a program-controlled account
          that neither party can access outside of the contract rules.
        </p>
        <p className="mt-2">
          Compare this to a traditional wire transfer: the funds are immediately locked and verifiable
          on-chain, not sitting in some intermediary&apos;s account for days.
        </p>
      </NarrativeBlock>

      <div className="rounded-lg border border-border bg-card p-6">
        <h4 className="mb-4 font-semibold text-navy">Fund Escrow</h4>
        <p className="mb-4 text-sm text-navy-light">
          Deposit {DEMO_ESCROW_DEFAULTS.displayAmount} USDC into the escrow contract at{" "}
          <code className="rounded bg-border-light px-1.5 py-0.5 text-xs font-mono">
            {contractId?.slice(0, 16)}...
          </code>
        </p>

        {fundTxSig ? (
          <TransactionResult label="Escrow funded successfully" signature={fundTxSig} />
        ) : (
          <button
            onClick={handleFund}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-dark disabled:opacity-50"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            Fund {DEMO_ESCROW_DEFAULTS.displayAmount} USDC
          </button>
        )}
      </div>

      {fundTxSig && <MetricsComparison />}

      {error && (
        <div className="mt-4 rounded-lg border border-error/20 bg-error/5 p-4 text-sm text-error">
          {error}
        </div>
      )}
    </div>
  );
}
