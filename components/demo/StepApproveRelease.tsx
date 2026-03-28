"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { useDemoStore } from "@/store/demo.store";
import { signAndSerialize } from "@/lib/solana-wallet";
import { changeMilestoneApprovedFlag, releaseFunds, getEscrow } from "@/services/escrow.service";
import { sendTransaction } from "@/services/helper.service";
import { NarrativeBlock } from "./NarrativeBlock";
import { TransactionResult } from "./TransactionResult";
import { EscrowDataDisplay } from "./EscrowDataDisplay";
import { parseError } from "@/lib/errors";
import { Loader2, PartyPopper } from "lucide-react";

export function StepApproveRelease() {
  const { signTransaction } = useWallet();
  const {
    walletAddress,
    contractId,
    approveTxSig,
    releaseTxSig,
    escrowData,
    loading,
    error,
    setApproveTxSig,
    setReleaseTxSig,
    setEscrowData,
    setLoading,
    setError,
    completeStep,
    resetDemo,
  } = useDemoStore();

  const handleApprove = async () => {
    if (!signTransaction || !walletAddress || !contractId) return;
    setLoading(true);
    setError(null);
    try {
      const res = await changeMilestoneApprovedFlag({
        contractId,
        milestoneIndex: "0",
        newFlag: true,
        approver: walletAddress,
      });

      const signed = await signAndSerialize(res.unsignedTransaction, signTransaction);
      const result = await sendTransaction({
        signedXdr: signed,
        queueKey: contractId,
      });

      setApproveTxSig(result.data?.txHash || result.txHash || "success");
    } catch (err: unknown) {
      setError(parseError(err));
    } finally {
      setLoading(false);
    }
  };

  const handleRelease = async () => {
    if (!signTransaction || !walletAddress || !contractId) return;
    setLoading(true);
    setError(null);
    try {
      const res = await releaseFunds({
        contractId,
        releaseSigner: walletAddress,
      });

      const signed = await signAndSerialize(res.unsignedTransaction, signTransaction);
      const result = await sendTransaction({
        signedXdr: signed,
        queueKey: contractId,
      });

      setReleaseTxSig(result.data?.txHash || result.txHash || "success");

      // Fetch final escrow state
      try {
        const escrow = await getEscrow({
          signer: walletAddress,
          contractId,
        });
        setEscrowData(escrow.data || escrow);
      } catch {
        // Non-critical: escrow data fetch may fail if format differs
      }

      completeStep(6);
    } catch (err: unknown) {
      setError(parseError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <NarrativeBlock title="Final Step: Payment Release">
        <p>
          Alpine Payments reviews the delivered work and approves the milestone. Then, the release
          signer triggers the fund distribution. The USDC is instantly transferred from the escrow
          PDA to the receiver — settlement in ~400ms, not 3-5 business days.
        </p>
      </NarrativeBlock>

      <div className="space-y-4">
        {/* Step 6a: Approve */}
        <div className="rounded-lg border border-border bg-card p-6">
          <h4 className="mb-2 font-semibold text-navy">6a. Approve Milestone</h4>
          <p className="mb-4 text-sm text-navy-light">
            The approver signs off on milestone 0, confirming the work is satisfactory.
          </p>
          {approveTxSig ? (
            <TransactionResult label="Milestone approved" signature={approveTxSig} />
          ) : (
            <button
              onClick={handleApprove}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-dark disabled:opacity-50"
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              Approve Milestone
            </button>
          )}
        </div>

        {/* Step 6b: Release */}
        <div className="rounded-lg border border-border bg-card p-6">
          <h4 className="mb-2 font-semibold text-navy">6b. Release Funds</h4>
          <p className="mb-4 text-sm text-navy-light">
            The release signer triggers the fund distribution. USDC flows from the escrow PDA to
            the receiver and platform.
          </p>
          {releaseTxSig ? (
            <TransactionResult label="Funds released successfully" signature={releaseTxSig} />
          ) : (
            <button
              onClick={handleRelease}
              disabled={loading || !approveTxSig}
              className="inline-flex items-center gap-2 rounded-lg bg-success px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-success/90 disabled:opacity-50"
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              Release Funds
            </button>
          )}
          {!approveTxSig && !releaseTxSig && (
            <p className="mt-2 text-xs text-navy-light">Complete step 6a first</p>
          )}
        </div>
      </div>

      {/* Success Banner */}
      {releaseTxSig && (
        <div className="mt-6 rounded-lg border-2 border-success bg-success/5 p-6 text-center">
          <PartyPopper className="mx-auto mb-3 h-10 w-10 text-success" />
          <h3 className="mb-2 text-xl font-bold text-navy">Escrow Complete!</h3>
          <p className="mb-4 text-sm text-navy-light">
            The full escrow lifecycle is complete. Funds have been released on Solana devnet in milliseconds.
            In a traditional system, this would have taken days and cost 200,000x more in fees.
          </p>
          <button
            onClick={resetDemo}
            className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-navy transition-colors hover:bg-border-light"
          >
            Run Demo Again
          </button>
        </div>
      )}

      {/* Final escrow state */}
      {escrowData && contractId && (
        <EscrowDataDisplay data={escrowData} contractId={contractId} />
      )}

      {error && (
        <div className="mt-4 rounded-lg border border-error/20 bg-error/5 p-4 text-sm text-error">
          {error}
        </div>
      )}
    </div>
  );
}
