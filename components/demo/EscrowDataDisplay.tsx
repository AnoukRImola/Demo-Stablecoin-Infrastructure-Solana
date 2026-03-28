"use client";

import type { EscrowData } from "@/types/escrow.types";
import { ExplorerLink } from "@/components/shared/ExplorerLink";

interface EscrowDataDisplayProps {
  data: EscrowData;
  contractId: string;
}

export function EscrowDataDisplay({ data, contractId }: EscrowDataDisplayProps) {
  return (
    <div className="my-4 rounded-lg border border-border bg-card">
      <div className="border-b border-border bg-border-light px-4 py-3">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-navy">On-Chain Escrow Data</h4>
          <ExplorerLink address={contractId} label="View on Explorer" />
        </div>
      </div>
      <div className="divide-y divide-border">
        <Row label="Title" value={data.title} />
        <Row label="Amount" value={`${Number(data.amount) / 1_000_000} USDC`} />
        <Row label="Balance" value={`${Number(data.balance) / 1_000_000} USDC`} />
        <Row label="Platform Fee" value={`${Number(data.platformFee) / 1_000_000} USDC`} />
        <Row label="Milestones" value={`${data.milestones.length} milestone(s)`} />
        {data.milestones.map((m, i) => (
          <Row
            key={i}
            label={`  Milestone ${i + 1}`}
            value={`${m.description} — ${m.status} ${m.approved ? "(approved)" : ""}`}
          />
        ))}
        <Row label="Released" value={data.flags.released ? "Yes" : "No"} />
        <Row label="Dispute" value={data.flags.disputeFlag ? "Active" : "None"} />
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between px-4 py-2.5">
      <span className="text-sm text-navy-light">{label}</span>
      <span className="text-sm font-medium text-navy">{value}</span>
    </div>
  );
}
