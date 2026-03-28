import { DocContent } from "@/components/docs/DocContent";
import { DiagramLifecycle } from "@/components/docs/DiagramLifecycle";
import { Callout } from "@/components/docs/Callout";

export default function EscrowLifecyclePage() {
  return (
    <DocContent>
      <h1>Escrow Lifecycle</h1>
      <p>
        Every escrow follows a defined lifecycle from creation to settlement. Understanding these phases is key to integrating Trustless Work into your application.
      </p>

      <DiagramLifecycle />

      <h2>Phase 1: Initialize</h2>
      <p>
        The escrow is created on-chain by calling <code>POST /deployer/single-release</code> (or <code>/deployer/multi-release</code>). This deploys a new PDA account with all roles, milestones, and payment terms configured.
      </p>
      <ul>
        <li>A unique <code>engagementId</code> is required (UUID recommended)</li>
        <li>All six roles must be specified with valid Solana addresses</li>
        <li>At least one milestone must be defined</li>
        <li>The USDC mint address (<code>trustline</code>) and decimals must be provided</li>
      </ul>

      <h2>Phase 2: Fund</h2>
      <p>
        The approver (or any authorized signer) deposits USDC into the escrow PDA by calling <code>POST /escrow/fund-escrow</code>. The escrow account tracks its balance on-chain.
      </p>
      <Callout type="info" title="Token Account Required">
        <p>Before funding, the signer must have a USDC token account. Use <code>POST /helper/set-trustline</code> to create one if it doesn&apos;t exist.</p>
      </Callout>

      <h2>Phase 3: Complete</h2>
      <p>
        The service provider marks milestones as completed by calling <code>POST /escrow/change-milestone-status</code>. This signals that the deliverable has been fulfilled.
      </p>
      <ul>
        <li>Only the <code>serviceProvider</code> address can change milestone status</li>
        <li>Status changes from <code>&quot;pending&quot;</code> to <code>&quot;completed&quot;</code></li>
        <li>Optional evidence can be attached to the milestone</li>
      </ul>

      <h2>Phase 4: Approve</h2>
      <p>
        The approver reviews the completed milestone and sets the <code>approved</code> flag to <code>true</code> by calling <code>POST /escrow/change-milestone-approved-flag</code>.
      </p>
      <ul>
        <li>Only the <code>approver</code> address can approve milestones</li>
        <li>Approval is a boolean flag — once set, it enables fund release</li>
      </ul>

      <h2>Phase 5: Release</h2>
      <p>
        The release signer triggers fund distribution by calling <code>POST /escrow/release-funds</code>. The smart contract verifies all milestones are approved before releasing.
      </p>
      <ul>
        <li>Only the <code>releaseSigner</code> address can trigger release</li>
        <li>Funds go to the <code>receiver</code> wallet (minus platform fee)</li>
        <li>Platform fee is sent to the <code>platformAddress</code></li>
      </ul>

      <h2>Phase 6: Settled</h2>
      <p>
        After release, the escrow is settled. The on-chain account records the final state: released flag is set to <code>true</code> and balance is zero.
      </p>

      <h2>Dispute Path</h2>
      <p>
        At any point before release, either party can raise a dispute by calling <code>POST /escrow/change-dispute-flag</code>. The dispute resolver then mediates and can split funds between parties using <code>POST /escrow/resolve-dispute</code>.
      </p>
      <Callout type="warning" title="Dispute Resolution">
        <p>Once a dispute is raised, normal milestone and release flows are blocked. Only the designated <code>disputeResolver</code> can distribute funds, specifying the split between approver and receiver.</p>
      </Callout>
    </DocContent>
  );
}
