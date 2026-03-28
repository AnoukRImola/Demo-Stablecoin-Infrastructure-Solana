import { DocContent } from "@/components/docs/DocContent";
import { Callout } from "@/components/docs/Callout";
import { DiagramArchitecture } from "@/components/docs/DiagramArchitecture";

export default function OverviewPage() {
  return (
    <DocContent>
      <h1>What is Trustless Work?</h1>
      <p>
        Trustless Work is an <strong>Escrow-as-a-Service</strong> protocol built on Solana. It provides a programmable, non-custodial escrow infrastructure that enables any platform to embed milestone-based payment flows using USDC stablecoins.
      </p>

      <Callout type="info" title="Hackathon Track">
        <p>This project is built for the StableHacks 2026 hackathon, Programmable Stablecoin Payments track. It demonstrates how stablecoins can replace traditional payment rails for cross-border B2B transactions.</p>
      </Callout>

      <h2>The Problem</h2>
      <p>
        International B2B payments are slow, expensive, and opaque. A typical cross-border wire transfer takes 2-5 business days, costs $25-50+ in fees, involves multiple intermediaries, and provides no programmable guarantees for either party.
      </p>
      <p>
        Freelancers, service providers, and enterprises need a way to establish trust in payment commitments without relying on legacy banking infrastructure.
      </p>

      <h2>The Solution</h2>
      <p>
        Trustless Work deploys on-chain escrow contracts that hold USDC until predefined milestones are completed and approved. Every role, milestone, and fund movement is transparent and verifiable on Solana.
      </p>
      <ul>
        <li><strong>Non-custodial:</strong> Funds are held in program-derived addresses (PDAs), not by any third party</li>
        <li><strong>Milestone-based:</strong> Payments are tied to deliverables, protecting both parties</li>
        <li><strong>Compliant:</strong> Built-in KYC verification and Travel Rule data at the smart contract level</li>
        <li><strong>Instant:</strong> ~400ms settlement with ~$0.00025 transaction fees</li>
      </ul>

      <h2>Who is it for?</h2>
      <ul>
        <li><strong>Freelance platforms</strong> — Embed escrow into marketplace flows</li>
        <li><strong>B2B service providers</strong> — Secure milestone-based project payments</li>
        <li><strong>Cross-border trade</strong> — Replace wire transfers with instant USDC settlement</li>
        <li><strong>Regulated entities</strong> — Banks and fintechs requiring compliance infrastructure</li>
      </ul>

      <h2>Architecture at a Glance</h2>
      <DiagramArchitecture />

      <p>
        The system follows a 3-layer architecture: a client-side application that handles wallet interactions and transaction signing, a NestJS API server that builds unsigned transactions and enforces compliance rules, and a Solana smart contract (built with Anchor) that manages escrow state on-chain.
      </p>
    </DocContent>
  );
}
