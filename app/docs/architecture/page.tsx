import { DocContent } from "@/components/docs/DocContent";
import { DiagramArchitecture } from "@/components/docs/DiagramArchitecture";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { Callout } from "@/components/docs/Callout";

export default function ArchitecturePage() {
  return (
    <DocContent>
      <h1>Architecture</h1>
      <p>
        Trustless Work follows a 3-layer architecture designed to keep private keys on the client while the server handles transaction construction and compliance enforcement.
      </p>

      <DiagramArchitecture />

      <h2>Transaction Pattern</h2>
      <p>
        The core pattern is: <strong>API builds unsigned TX → client signs → sends via helper endpoint</strong>. This ensures the server never has access to user private keys.
      </p>
      <CodeBlock
        language="typescript"
        title="Transaction Flow"
        code={`// 1. Client sends payload to API
const response = await api.post("/deployer/single-release", payload);
const { unsignedTransaction, contract_id } = response.data;

// 2. Client signs the transaction with wallet
const signedTx = await signAndSerialize(
  unsignedTransaction,
  wallet.signTransaction
);

// 3. Client sends signed TX back to API for broadcasting
const result = await api.post("/helper/send-transaction", {
  signedXdr: signedTx,
  queueKey: contract_id,
  returnEscrowDataIsRequired: true,
});`}
      />

      <Callout type="tip" title="Why This Pattern?">
        <p>By splitting TX construction and signing, we achieve the security of client-side custody with the convenience of server-side business logic. The server can enforce compliance rules before building the TX, but never touches the private key.</p>
      </Callout>

      <h2>Client Layer</h2>
      <p>
        The client is a Next.js application that handles:
      </p>
      <ul>
        <li><strong>Wallet connection</strong> via Solana wallet-adapter (Phantom, Solflare)</li>
        <li><strong>Transaction signing</strong> using the connected wallet</li>
        <li><strong>UI/UX</strong> for escrow management workflows</li>
        <li><strong>State management</strong> with Zustand for demo flow tracking</li>
      </ul>

      <h2>API Layer</h2>
      <p>
        The NestJS server handles:
      </p>
      <ul>
        <li><strong>Transaction construction</strong> — builds Anchor instructions and serializes unsigned transactions</li>
        <li><strong>Compliance guards</strong> — KYC and Travel Rule checks via NestJS guards</li>
        <li><strong>Data persistence</strong> — Firebase queue for pending writes</li>
        <li><strong>Token operations</strong> — creating USDC token accounts (trustlines)</li>
      </ul>

      <h2>Blockchain Layer</h2>
      <p>
        The Solana program (built with Anchor 0.31.1) manages:
      </p>
      <ul>
        <li><strong>Escrow accounts</strong> — PDAs storing escrow state</li>
        <li><strong>Token accounts</strong> — PDA-controlled USDC vaults</li>
        <li><strong>Compliance registry</strong> — on-chain KYC verification records</li>
        <li><strong>Access control</strong> — role-based authorization for every instruction</li>
      </ul>
      <CodeBlock
        language="text"
        title="Program Details"
        code={`Program ID: 8LvnKBjEobkQGsu3SkzCGTwrZaXzMZh1X4Wj5ZGcmqwW
Framework: Anchor 0.31.1
Network: Solana Devnet
Token: USDC (SPL Token, 6 decimals)
Instructions: 22 (single-release + multi-release + compliance)`}
      />

      <h2>PDA Structure</h2>
      <p>
        Program Derived Addresses (PDAs) are deterministic accounts derived from seeds. They enable the program to control accounts without holding private keys:
      </p>
      <CodeBlock
        language="text"
        title="PDA Seeds"
        code={`Escrow PDA:       ["escrow", engagement_id]
Multi-Escrow PDA: ["multi_escrow", engagement_id]
Compliance PDA:   ["compliance_registry"]`}
      />
    </DocContent>
  );
}
