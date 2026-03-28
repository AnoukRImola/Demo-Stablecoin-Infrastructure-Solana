import { DocContent } from "@/components/docs/DocContent";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { Callout } from "@/components/docs/Callout";

export default function DeveloperGuidePage() {
  return (
    <DocContent>
      <h1>Developer Guide</h1>
      <p>
        This guide walks you through integrating Trustless Work escrow payments into your application. The API follows a consistent pattern: build unsigned transaction on the server, sign on the client, send back.
      </p>

      <h2>Integration Checklist</h2>
      <ol>
        <li>Set up Solana wallet-adapter in your frontend</li>
        <li>Configure API client pointing to the Trustless Work server</li>
        <li>Implement the <code>signAndSerialize</code> helper for TX signing</li>
        <li>Create token accounts for users (<code>set-trustline</code>)</li>
        <li>Verify users via the compliance endpoint</li>
        <li>Build your escrow workflow (create → fund → milestone → release)</li>
      </ol>

      <h2>1. Wallet Setup</h2>
      <CodeBlock
        language="typescript"
        title="SolanaProvider.tsx"
        code={`import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';

export function SolanaProvider({ children }) {
  const endpoint = process.env.NEXT_PUBLIC_SOLANA_RPC_ENDPOINT || clusterApiUrl('devnet');
  const wallets = [new PhantomWalletAdapter(), new SolflareWalletAdapter()];

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}`}
      />

      <h2>2. Transaction Signing Helper</h2>
      <CodeBlock
        language="typescript"
        title="solana-wallet.ts"
        code={`import { Transaction } from '@solana/web3.js';

export async function signAndSerialize(
  unsignedTxBase64: string,
  signTransaction: (tx: Transaction) => Promise<Transaction>,
): Promise<string> {
  const txBuffer = Buffer.from(unsignedTxBase64, 'base64');
  const transaction = Transaction.from(txBuffer);
  const signedTransaction = await signTransaction(transaction);
  return Buffer.from(
    signedTransaction.serialize({ requireAllSignatures: true }),
  ).toString('base64');
}`}
      />

      <h2>3. Complete Escrow Flow</h2>
      <CodeBlock
        language="typescript"
        title="Full integration example"
        code={`import { signAndSerialize } from './solana-wallet';
import api from './api';

// Step 1: Create escrow
const createRes = await api.post('/deployer/single-release', {
  signer: walletAddress,
  engagementId: crypto.randomUUID(),
  title: 'My Escrow',
  description: 'Payment for services',
  approver: walletAddress,
  serviceProvider: providerAddress,
  platformAddress: walletAddress,
  amount: '100',
  platformFee: '1',
  milestones: [{ description: 'Deliver project', status: 'pending' }],
  releaseSigner: walletAddress,
  disputeResolver: walletAddress,
  trustline: USDC_MINT,
  trustlineDecimals: 6,
  receiver: providerAddress,
  receiverMemo: 1,
});

const signedCreate = await signAndSerialize(
  createRes.data.unsignedTransaction, wallet.signTransaction
);
await api.post('/helper/send-transaction', {
  signedXdr: signedCreate,
  queueKey: createRes.data.contract_id,
  returnEscrowDataIsRequired: true,
});

// Step 2: Fund escrow
const fundRes = await api.post('/escrow/fund-escrow', {
  contractId: createRes.data.contract_id,
  signer: walletAddress,
  amount: '100',
});
const signedFund = await signAndSerialize(
  fundRes.data.unsignedTransaction, wallet.signTransaction
);
await api.post('/helper/send-transaction', {
  signedXdr: signedFund, queueKey: createRes.data.contract_id,
});

// Step 3: Complete milestone (service provider)
// Step 4: Approve milestone (approver)
// Step 5: Release funds (release signer)
// ... same pattern: POST endpoint → sign → send`}
      />

      <Callout type="tip" title="Error Handling">
        <p>Always wrap API calls in try/catch. The server returns descriptive error messages in <code>error.response.data.message</code>. Common errors include: &quot;Account already initialized&quot; (duplicate engagementId), &quot;Insufficient balance&quot;, and &quot;KYC verification required&quot;.</p>
      </Callout>

      <h2>4. Environment Variables</h2>
      <CodeBlock
        language="bash"
        title=".env.local"
        code={`NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_SOLANA_NETWORK=devnet
NEXT_PUBLIC_SOLANA_RPC_ENDPOINT=https://api.devnet.solana.com
NEXT_PUBLIC_PROGRAM_ID=8LvnKBjEobkQGsu3SkzCGTwrZaXzMZh1X4Wj5ZGcmqwW
NEXT_PUBLIC_USDC_MINT=319qerHwtNVK5httbu4H8uGLfTP3iz8852CHHxzSiLtJ`}
      />

      <h2>Running Locally</h2>
      <CodeBlock
        language="bash"
        title="Development setup"
        code={`# Start the API server (from apps/server/)
node -r dotenv/config dist/main.js

# Start the demo app (from Demo/)
bun run dev`}
      />
    </DocContent>
  );
}
