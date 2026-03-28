import { DocContent } from "@/components/docs/DocContent";
import { Callout } from "@/components/docs/Callout";

export default function WhyEscrowsPage() {
  return (
    <DocContent>
      <h1>Why Escrows?</h1>
      <p>
        Escrow is one of the oldest and most trusted mechanisms in commerce — a neutral holding arrangement where funds are released only when agreed conditions are met. Trustless Work brings this concept on-chain, making it programmable, transparent, and instant.
      </p>

      <h2>The Trust Problem in Digital Commerce</h2>
      <p>
        In any transaction between two parties who don&apos;t fully trust each other, there&apos;s a fundamental dilemma:
      </p>
      <ul>
        <li>The <strong>buyer</strong> doesn&apos;t want to pay before receiving the service</li>
        <li>The <strong>seller</strong> doesn&apos;t want to work before being guaranteed payment</li>
      </ul>
      <p>
        Traditional solutions involve trusted intermediaries — banks, payment processors, or escrow companies — that charge fees, introduce delays, and add counterparty risk. These intermediaries become single points of failure and create friction in global commerce.
      </p>

      <h2>On-Chain Escrow Advantages</h2>
      <h3>Transparency</h3>
      <p>
        Every escrow contract, its balance, milestone status, and fund movements are visible on the Solana blockchain. Both parties can independently verify the state at any time without relying on a third party&apos;s word.
      </p>

      <h3>Programmability</h3>
      <p>
        Unlike traditional escrow services that rely on manual review, on-chain escrows execute automatically based on smart contract logic. When milestones are approved, funds are released — no human bottleneck.
      </p>

      <h3>Non-Custodial</h3>
      <p>
        Funds sit in a Program Derived Address (PDA) controlled by the Solana program. Neither Trustless Work nor any single party can access the funds outside of the defined contract rules.
      </p>

      <h3>Composability</h3>
      <p>
        As a protocol, Trustless Work can be embedded into any application via its REST API. Freelance marketplaces, invoicing tools, procurement systems, and trade finance platforms can all leverage the same escrow infrastructure.
      </p>

      <h2>Use Cases</h2>

      <Callout type="tip" title="Cross-Border Services">
        <p>A Swiss company hires a development team in Latin America. Instead of navigating SWIFT transfers with 3-day delays and $50 fees, they fund a USDC escrow. The team delivers milestones, the client approves, and funds are released in milliseconds.</p>
      </Callout>

      <h3>Freelance Marketplaces</h3>
      <p>
        Platforms like Upwork or Fiverr charge 10-20% fees and hold funds for days. With Trustless Work, platforms can embed escrow with custom fee structures (the <code>platformFee</code> field) and instant settlement.
      </p>

      <h3>Real Estate Transactions</h3>
      <p>
        Property deposits can be held in escrow with milestone conditions (inspection passed, title clear, closing date reached) — all transparent and automated.
      </p>

      <h3>Supply Chain Payments</h3>
      <p>
        Multi-release escrows enable payments tied to shipment milestones: manufacturing complete, goods shipped, goods received, quality verified.
      </p>

      <h3>Grant Disbursement</h3>
      <p>
        DAOs and foundations can use milestone-based escrows to ensure grant recipients deliver before receiving the next tranche of funding.
      </p>
    </DocContent>
  );
}
