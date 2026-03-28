"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { useDemoStore } from "@/store/demo.store";
import { signAndSerialize } from "@/lib/solana-wallet";
import { changeMilestoneStatus } from "@/services/escrow.service";
import { sendTransaction } from "@/services/helper.service";
import { NarrativeBlock } from "./NarrativeBlock";
import { TransactionResult } from "./TransactionResult";
import { parseError } from "@/lib/errors";
import { Loader2 } from "lucide-react";

export function StepCompleteMilestone() {
  const { signTransaction } = useWallet();
  const {
    walletAddress,
    contractId,
    milestoneTxSig,
    loading,
    error,
    setMilestoneTxSig,
    setLoading,
    setError,
    completeStep,
    setStep,
  } = useDemoStore();

  const handleComplete = async () => {
    if (!signTransaction || !walletAddress || !contractId) return;
    setLoading(true);
    setError(null);
    try {
      const res = await changeMilestoneStatus({
        contractId,
        milestoneIndex: "0",
        newStatus: "completed",
        serviceProvider: walletAddress,
      });

      const signed = await signAndSerialize(res.unsignedTransaction, signTransaction);
      const result = await sendTransaction({
        signedXdr: signed,
        queueKey: contractId,
      });

      setMilestoneTxSig(result.data?.txHash || result.txHash || "success");
      completeStep(5);
      setStep(6);
    } catch (err: unknown) {
      setError(parseError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <NarrativeBlock title="Work Complete">
        <p>
          The development firm (service provider) has delivered the project. They mark
          <strong> Milestone 1: &quot;Full project delivery & acceptance&quot;</strong> as completed.
          In a real scenario, they might attach evidence — a link to the repository, a deployment URL,
          or a signed deliverable.
        </p>
      </NarrativeBlock>

      <div className="rounded-lg border border-border bg-card p-6">
        <h4 className="mb-2 font-semibold text-navy">Complete Milestone</h4>
        <p className="mb-4 text-sm text-navy-light">
          Mark milestone 0 as &quot;completed&quot;. Only the service provider role can perform this action.
        </p>

        {milestoneTxSig ? (
          <TransactionResult label="Milestone marked as completed" signature={milestoneTxSig} />
        ) : (
          <button
            onClick={handleComplete}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-dark disabled:opacity-50"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            Complete Milestone
          </button>
        )}
      </div>

      {error && (
        <div className="mt-4 rounded-lg border border-error/20 bg-error/5 p-4 text-sm text-error">
          {error}
        </div>
      )}
    </div>
  );
}
