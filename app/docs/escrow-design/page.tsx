import { DocContent } from "@/components/docs/DocContent";
import { RolesTable } from "@/components/docs/RolesTable";
import { Callout } from "@/components/docs/Callout";
import { CodeBlock } from "@/components/docs/CodeBlock";

export default function EscrowDesignPage() {
  return (
    <DocContent>
      <h1>Escrow Design</h1>
      <p>
        Every Trustless Work escrow is an on-chain account (PDA) that stores the full contract configuration: roles, milestones, payment terms, and state flags. The design supports both single-release and multi-release escrow types.
      </p>

      <h2>The 6 Roles</h2>
      <p>
        Each escrow defines six distinct roles, enabling separation of concerns and multi-party workflows:
      </p>
      <RolesTable />

      <Callout type="info" title="Role Flexibility">
        <p>In simple scenarios, one wallet can fill multiple roles. For example, a freelancer can be both the service provider and receiver. In the demo, a single wallet fills all roles for simplicity.</p>
      </Callout>

      <h2>Escrow Properties</h2>
      <CodeBlock
        language="typescript"
        title="Escrow Account Fields"
        code={`{
  engagementId: string    // Unique ID (UUID), used as PDA seed
  title: string           // Human-readable name
  description: string     // Details about the engagement
  approver: PublicKey      // Approves milestones
  serviceProvider: PublicKey // Completes work
  platformAddress: PublicKey // Receives platform fee
  amount: string          // Total escrow amount (in USDC)
  platformFee: string     // Fee percentage for platform
  milestones: Milestone[] // Array of deliverables
  releaseSigner: PublicKey // Authorizes fund release
  disputeResolver: PublicKey // Handles disputes
  trustline: PublicKey    // USDC mint address
  trustlineDecimals: number // Token decimals (6 for USDC)
  receiver: PublicKey     // Payment recipient
  receiverMemo: number    // Memo for receiver identification
}`}
      />

      <h2>Milestone Structure</h2>
      <p>
        Each milestone represents a deliverable or checkpoint in the engagement:
      </p>
      <CodeBlock
        language="typescript"
        title="Milestone"
        code={`{
  description: string  // What needs to be delivered
  status: string       // "pending" | "completed"
  approved: boolean    // Whether approver has signed off
}`}
      />
      <p>
        A milestone must be marked as <code>completed</code> by the service provider, then <code>approved</code> by the approver, before funds can be released.
      </p>

      <h2>Single-Release vs Multi-Release</h2>

      <h3>Single-Release Escrow</h3>
      <p>
        All funds are released at once when milestones are approved. The full escrow amount goes to the receiver (minus platform fee). Best for simple engagements with a single deliverable.
      </p>

      <h3>Multi-Release Escrow</h3>
      <p>
        Each milestone has its own amount and receiver. Funds are released per-milestone as each is approved. Ideal for complex projects with multiple deliverables, phases, or payment recipients.
      </p>
      <CodeBlock
        language="typescript"
        title="Multi-Release Milestone"
        code={`{
  description: string  // Deliverable description
  amount: string       // Amount for this milestone
  receiver: PublicKey   // Who gets paid for this milestone
  status: string       // "pending" | "completed"
  approved: boolean    // Approver sign-off
}`}
      />

      <h2>PDA Derivation</h2>
      <p>
        Escrow accounts are stored as Program Derived Addresses using deterministic seeds:
      </p>
      <CodeBlock
        language="rust"
        title="PDA Seeds"
        code={`// Single-release escrow
seeds = [b"escrow", engagement_id.as_bytes()]

// Multi-release escrow
seeds = [b"multi_escrow", engagement_id.as_bytes()]

// Compliance registry (singleton)
seeds = [b"compliance_registry"]`}
      />
      <p>
        Using the <code>engagementId</code> as a seed ensures each escrow has a unique, deterministic address. The demo generates a fresh UUID for each run to avoid &quot;already initialized&quot; errors.
      </p>
    </DocContent>
  );
}
