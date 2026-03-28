import { DocContent } from "@/components/docs/DocContent";
import { Callout } from "@/components/docs/Callout";
import { CodeBlock } from "@/components/docs/CodeBlock";

export default function CompliancePage() {
  return (
    <DocContent>
      <h1>Compliance</h1>
      <p>
        Trustless Work integrates regulatory compliance directly into the smart contract and API layers. This is a <strong>key differentiator</strong> — most DeFi escrow protocols ignore KYC/AML requirements, making them unsuitable for regulated entities like banks, fintechs, and enterprises.
      </p>

      <Callout type="compliance" title="Hackathon Differentiator">
        <p>On-chain compliance is critical for the Programmable Stablecoin Payments track. Trustless Work demonstrates that stablecoin payments can meet the same regulatory standards as traditional finance — while being faster, cheaper, and more transparent.</p>
      </Callout>

      <h2>Compliance Architecture</h2>
      <p>
        Compliance is enforced at three levels:
      </p>
      <ol>
        <li><strong>On-chain registry:</strong> A Solana PDA stores KYC verification status for wallet addresses</li>
        <li><strong>API guards:</strong> NestJS middleware checks KYC/Travel Rule status before building transactions</li>
        <li><strong>Smart contract checks:</strong> The program validates compliance status during fund/release operations</li>
      </ol>

      <h2>KYC Verification</h2>
      <p>
        Before interacting with escrows, wallet addresses must be verified via the compliance registry. Verification records include:
      </p>
      <CodeBlock
        language="typescript"
        title="Verification Record"
        code={`{
  address: PublicKey      // The verified wallet
  isVerified: boolean     // Current verification status
  kycProvider: string     // Who performed the KYC ("TrustlessWork-Demo")
  jurisdiction: string    // ISO country code ("CH", "US", etc.)
  riskScore: number       // 0-100 risk assessment (lower = less risky)
  verifiedAt: number      // Timestamp of verification
}`}
      />

      <h3>Verification Flow</h3>
      <CodeBlock
        language="typescript"
        title="POST /compliance/verify-address"
        code={`// Request
{
  "signer": "2sRVN...",     // Admin/authority wallet
  "address": "2sRVN...",    // Address to verify
  "kycProvider": "TrustlessWork-Demo",
  "jurisdiction": "CH",     // ISO country code
  "riskScore": 10           // 0-100 (10 = low risk)
}

// Response
{
  "unsignedTransaction": "base64...",
  "message": "Verify address transaction built successfully"
}`}
      />

      <h2>Travel Rule</h2>
      <p>
        The FATF Travel Rule requires Virtual Asset Service Providers (VASPs) to exchange originator and beneficiary information for transactions above a threshold. Trustless Work implements this on-chain:
      </p>
      <CodeBlock
        language="typescript"
        title="Travel Rule Data"
        code={`{
  originatorName: string          // Sender's legal name
  originatorAccount: string       // Sender's wallet address
  originatorJurisdiction: string  // Sender's country (ISO)
  beneficiaryName: string         // Receiver's legal name
  beneficiaryAccount: string      // Receiver's wallet address
  beneficiaryJurisdiction: string // Receiver's country (ISO)
  transferPurpose: string         // Reason for transfer
}`}
      />

      <Callout type="info" title="FATF Compliance">
        <p>The Travel Rule applies to transfers above $1,000 USD (varies by jurisdiction). By storing this data on-chain alongside the escrow, Trustless Work provides an immutable audit trail that regulators can verify.</p>
      </Callout>

      <h2>API Guards</h2>
      <p>
        The NestJS server applies guards to escrow endpoints:
      </p>
      <ul>
        <li><strong>KycGuard:</strong> Checks the on-chain compliance registry to verify the signer has a valid KYC record</li>
        <li><strong>TravelRuleGuard:</strong> For transactions above the threshold, verifies that Travel Rule data has been submitted for the escrow</li>
      </ul>
      <p>
        These guards are applied to <code>fund-escrow</code>, <code>release-funds</code>, and <code>resolve-dispute</code> endpoints — the operations that move funds.
      </p>

      <h2>Compliance Registry PDA</h2>
      <p>
        The compliance registry is a singleton PDA derived from <code>[&quot;compliance_registry&quot;]</code>. It maintains a map of verified addresses and their verification metadata. The registry is managed by an authority (typically the platform operator).
      </p>

      <h2>Regulatory Framework</h2>
      <p>
        Trustless Work&apos;s compliance layer addresses:
      </p>
      <ul>
        <li><strong>FATF Recommendation 16</strong> — Travel Rule for virtual asset transfers</li>
        <li><strong>EU MiCA</strong> — Markets in Crypto-Assets regulation compliance</li>
        <li><strong>Swiss FINMA</strong> — VQF guidelines for blockchain-based financial intermediaries</li>
        <li><strong>US FinCEN</strong> — BSA/AML requirements for money services businesses</li>
      </ul>

      <Callout type="compliance" title="For Regulated Entities">
        <p>Financial institutions like AMINA Bank or UBS can use Trustless Work knowing that every fund movement is associated with verified identities and audit-ready compliance data — all transparent on the Solana blockchain.</p>
      </Callout>
    </DocContent>
  );
}
