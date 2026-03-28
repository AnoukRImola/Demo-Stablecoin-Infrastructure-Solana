"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { v4 as uuidv4 } from "uuid";
import { useDemoStore } from "@/store/demo.store";
import { signAndSerialize } from "@/lib/solana-wallet";
import { createSingleReleaseEscrow } from "@/services/deployer.service";
import { sendTransaction } from "@/services/helper.service";
import { DEMO_ESCROW_DEFAULTS, USDC_MINT } from "@/constants/demo-defaults";
import { NarrativeBlock } from "./NarrativeBlock";
import { TransactionResult } from "./TransactionResult";
import { parseError } from "@/lib/errors";
import { Loader2 } from "lucide-react";

export function StepCreateEscrow() {
  const { signTransaction } = useWallet();
  const {
    walletAddress,
    createEscrowTxSig,
    contractId,
    loading,
    error,
    setContractId,
    setEngagementId,
    setCreateEscrowTxSig,
    setLoading,
    setError,
    completeStep,
    setStep,
  } = useDemoStore();

  const handleCreate = async () => {
    if (!signTransaction || !walletAddress) return;
    setLoading(true);
    setError(null);
    try {
      const engagementId = uuidv4().replace(/-/g, "");
      setEngagementId(engagementId);

      const res = await createSingleReleaseEscrow({
        signer: walletAddress,
        engagementId,
        title: DEMO_ESCROW_DEFAULTS.title,
        description: DEMO_ESCROW_DEFAULTS.description,
        approver: walletAddress,
        serviceProvider: walletAddress,
        platformAddress: walletAddress,
        amount: DEMO_ESCROW_DEFAULTS.amount,
        platformFee: DEMO_ESCROW_DEFAULTS.platformFee,
        milestones: DEMO_ESCROW_DEFAULTS.milestones,
        releaseSigner: walletAddress,
        disputeResolver: walletAddress,
        trustline: USDC_MINT,
        trustlineDecimals: DEMO_ESCROW_DEFAULTS.trustlineDecimals,
        receiver: walletAddress,
        receiverMemo: DEMO_ESCROW_DEFAULTS.receiverMemo,
      });

      const signed = await signAndSerialize(res.unsignedTransaction, signTransaction);
      setContractId(res.contract_id);

      const result = await sendTransaction({
        signedXdr: signed,
        queueKey: res.contract_id,
        returnEscrowDataIsRequired: true,
      });

      setCreateEscrowTxSig(result.data?.txHash || result.txHash || "success");
      completeStep(3);
      setStep(4);
    } catch (err: unknown) {
      setError(parseError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <NarrativeBlock title="Creating the Escrow">
        <p>
          Alpine Payments creates an escrow contract for <strong>{DEMO_ESCROW_DEFAULTS.displayAmount} USDC</strong> with the title
          &quot;{DEMO_ESCROW_DEFAULTS.title}&quot;. The escrow has one milestone: full project delivery.
          A fresh engagement ID (UUID) ensures a unique on-chain PDA for each demo run.
        </p>
      </NarrativeBlock>

      <div className="rounded-lg border border-border bg-card p-6">
        <h4 className="mb-4 font-semibold text-navy">Escrow Details</h4>
        <div className="mb-4 divide-y divide-border rounded-lg border border-border">
          <Detail label="Title" value={DEMO_ESCROW_DEFAULTS.title} />
          <Detail label="Amount" value={`${DEMO_ESCROW_DEFAULTS.displayAmount} USDC`} />
          <Detail label="Platform Fee" value={`${DEMO_ESCROW_DEFAULTS.displayFee} USDC`} />
          <Detail label="Milestones" value={DEMO_ESCROW_DEFAULTS.milestones[0].description} />
          <Detail label="Token" value="USDC (6 decimals)" />
          <Detail label="All Roles" value={walletAddress ? `${walletAddress.slice(0, 12)}...` : "—"} />
        </div>

        {createEscrowTxSig ? (
          <div className="space-y-3">
            <TransactionResult label="Escrow created on-chain" signature={createEscrowTxSig} />
            {contractId && (
              <p className="text-sm text-navy-light">
                Contract ID: <code className="rounded bg-border-light px-1.5 py-0.5 text-xs font-mono">{contractId}</code>
              </p>
            )}
          </div>
        ) : (
          <button
            onClick={handleCreate}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-dark disabled:opacity-50"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            Create Escrow
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

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between px-4 py-2.5">
      <span className="text-sm text-navy-light">{label}</span>
      <span className="text-sm font-medium text-navy">{value}</span>
    </div>
  );
}
