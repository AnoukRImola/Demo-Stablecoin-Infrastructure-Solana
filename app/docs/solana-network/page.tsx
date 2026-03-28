import { DocContent } from "@/components/docs/DocContent";
import { ComparisonTable } from "@/components/docs/ComparisonTable";
import { Callout } from "@/components/docs/Callout";

export default function SolanaNetworkPage() {
  return (
    <DocContent>
      <h1>Solana Network</h1>
      <p>
        Trustless Work is built on Solana — a high-performance Layer 1 blockchain optimized for speed and low costs. This page explains why Solana is the ideal infrastructure for programmable stablecoin payments.
      </p>

      <h2>Why Solana?</h2>
      <ul>
        <li><strong>Sub-second finality:</strong> ~400ms block times mean transactions settle almost instantly</li>
        <li><strong>Near-zero fees:</strong> ~$0.00025 per transaction makes micro-payments viable</li>
        <li><strong>High throughput:</strong> 65,000+ TPS capacity handles enterprise-scale payment volumes</li>
        <li><strong>Rich ecosystem:</strong> Mature tooling (Anchor, wallet-adapter), active developer community</li>
        <li><strong>USDC native support:</strong> Circle&apos;s USDC runs natively on Solana as an SPL token</li>
      </ul>

      <h2>Solana vs Traditional Finance</h2>
      <ComparisonTable />

      <Callout type="info" title="USDC on Solana">
        <p>USDC on Solana is a native SPL token issued by Circle. It&apos;s fully backed 1:1 by US dollars held in regulated financial institutions. Over $5B in USDC circulates on Solana, making it the second-largest USDC chain.</p>
      </Callout>

      <h2>USDC Ecosystem</h2>
      <p>
        Using USDC on Solana provides several advantages for cross-border payments:
      </p>
      <ul>
        <li><strong>No FX risk:</strong> USDC is pegged 1:1 to USD — no exchange rate fluctuations</li>
        <li><strong>Global reach:</strong> Anyone with a Solana wallet can receive USDC, no bank account needed</li>
        <li><strong>On/off ramps:</strong> Circle, Coinbase, and regional providers enable fiat conversion</li>
        <li><strong>Regulatory clarity:</strong> USDC is regulated and audited, meeting institutional requirements</li>
      </ul>

      <h2>Devnet vs Mainnet</h2>
      <p>
        This demo runs on <strong>Solana Devnet</strong>, a test network that mirrors mainnet behavior with test tokens. All transactions are real Solana transactions but use test SOL and test USDC.
      </p>
      <ul>
        <li><strong>Devnet:</strong> Free test tokens, identical behavior to mainnet, used for development and demos</li>
        <li><strong>Mainnet:</strong> Real value transactions, production deployment target</li>
      </ul>

      <Callout type="tip" title="Getting Test SOL">
        <p>To use the demo, you need devnet SOL for transaction fees. Visit the <strong>Solana Faucet</strong> at sol-faucet.com or use the CLI: <code>solana airdrop 2</code>. You&apos;ll also need test USDC, which the demo&apos;s setup step handles automatically.</p>
      </Callout>

      <h2>Network Details</h2>
      <ul>
        <li><strong>RPC Endpoint:</strong> <code>https://api.devnet.solana.com</code></li>
        <li><strong>Program ID:</strong> <code>8LvnKBjEobkQGsu3SkzCGTwrZaXzMZh1X4Wj5ZGcmqwW</code></li>
        <li><strong>Test USDC Mint:</strong> <code>319qerHwtNVK5httbu4H8uGLfTP3iz8852CHHxzSiLtJ</code></li>
        <li><strong>Explorer:</strong> <code>explorer.solana.com/?cluster=devnet</code></li>
      </ul>
    </DocContent>
  );
}
