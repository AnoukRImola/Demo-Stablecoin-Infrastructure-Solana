import { DocContent } from "@/components/docs/DocContent";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { Callout } from "@/components/docs/Callout";

export default function SdkCorePage() {
  return (
    <DocContent>
      <h1>SDK Core</h1>
      <p>
        The <code>@trustless-work/sdk-solana</code> package provides a typed
        TypeScript client for the Trustless Work API. It wraps every endpoint
        into ergonomic modules so you can build escrow flows without crafting raw
        HTTP requests.
      </p>

      <Callout type="info" title="Published on npm">
        <p>
          Install from the public registry:{" "}
          <a
            href="https://www.npmjs.com/package/@trustless-work/sdk-solana"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            @trustless-work/sdk-solana
          </a>
        </p>
      </Callout>

      <h2>Installation</h2>
      <CodeBlock
        language="bash"
        title="Install the SDK"
        code={`npm install @trustless-work/sdk-solana
# or
bun add @trustless-work/sdk-solana`}
      />

      <h2>Quick Start</h2>
      <p>
        Create a client instance and optionally set an API key for
        authenticated endpoints.
      </p>
      <CodeBlock
        language="typescript"
        title="Initialize the client"
        code={`import { TrustlessWork } from "@trustless-work/sdk-solana";

const client = new TrustlessWork({
  baseURL: "http://localhost:3000", // your API server
});

// Authenticate (optional — needed for protected endpoints)
const { apiKey } = await client.auth.requestApiKey({
  address: walletAddress,
  signature: walletSignature,
});
client.setApiKey(apiKey);`}
      />

      <h2>Complete Escrow Flow</h2>
      <p>
        The standard pattern is: <strong>build an unsigned transaction</strong>{" "}
        via the SDK, <strong>sign it</strong> on the client with the
        user&apos;s wallet, then <strong>send it</strong> back through the
        helper module.
      </p>
      <CodeBlock
        language="typescript"
        title="Deploy → Sign → Send"
        code={`import { TrustlessWork } from "@trustless-work/sdk-solana";
import { signAndSerialize } from "./solana-wallet";

const client = new TrustlessWork({ baseURL: "http://localhost:3000" });

// 1. Deploy a single-release escrow
const deployRes = await client.deployer.deploySingleRelease({
  signer: walletAddress,
  engagementId: crypto.randomUUID(),
  title: "Logo Design",
  description: "Design a logo for my project",
  approver: walletAddress,
  serviceProvider: providerAddress,
  platformAddress: walletAddress,
  amount: "500",
  platformFee: "1",
  milestones: [{ description: "Deliver final logo", status: "pending" }],
  releaseSigner: walletAddress,
  disputeResolver: walletAddress,
  trustline: USDC_MINT,
  trustlineDecimals: 6,
  receiver: providerAddress,
  receiverMemo: 1,
});

// 2. Sign the unsigned transaction with the user's wallet
const signedTx = await signAndSerialize(
  deployRes.unsignedTransaction,
  wallet.signTransaction,
);

// 3. Send the signed transaction
const result = await client.helper.sendTransaction({
  signedXdr: signedTx,
  queueKey: deployRes.contract_id,
  returnEscrowDataIsRequired: true,
});

// 4. Fund the escrow (same build → sign → send pattern)
const fundRes = await client.escrow.fundEscrow({
  contractId: deployRes.contract_id,
  signer: walletAddress,
  amount: "500",
});
const signedFund = await signAndSerialize(
  fundRes.unsignedTransaction,
  wallet.signTransaction,
);
await client.helper.sendTransaction({
  signedXdr: signedFund,
  queueKey: deployRes.contract_id,
});`}
      />

      <h2>Module Reference</h2>
      <p>
        Every method returns a <code>Promise</code>. Methods that build
        transactions return an <code>ApiResponse</code> containing{" "}
        <code>unsignedTransaction</code> and <code>contract_id</code>.
      </p>

      <h3>auth</h3>
      <div className="my-4 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="pb-2 pr-4 font-semibold text-navy">Method</th>
              <th className="pb-2 font-semibold text-navy">Description</th>
            </tr>
          </thead>
          <tbody className="text-navy-light">
            <tr className="border-b border-border">
              <td className="py-2 pr-4"><code>requestApiKey(params)</code></td>
              <td className="py-2">Authenticate with wallet signature and receive an API key</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>deployer</h3>
      <div className="my-4 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="pb-2 pr-4 font-semibold text-navy">Method</th>
              <th className="pb-2 font-semibold text-navy">Description</th>
            </tr>
          </thead>
          <tbody className="text-navy-light">
            <tr className="border-b border-border">
              <td className="py-2 pr-4"><code>deploySingleRelease(params)</code></td>
              <td className="py-2">Deploy a single-release escrow contract</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 pr-4"><code>deployMultiRelease(params)</code></td>
              <td className="py-2">Deploy a multi-release escrow with per-milestone payouts</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>escrow</h3>
      <div className="my-4 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="pb-2 pr-4 font-semibold text-navy">Method</th>
              <th className="pb-2 font-semibold text-navy">Description</th>
            </tr>
          </thead>
          <tbody className="text-navy-light">
            <tr className="border-b border-border">
              <td className="py-2 pr-4"><code>fundEscrow(params)</code></td>
              <td className="py-2">Fund an escrow with the specified amount</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 pr-4"><code>releaseFunds(params)</code></td>
              <td className="py-2">Release escrowed funds to the service provider</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 pr-4"><code>resolveDispute(params)</code></td>
              <td className="py-2">Resolve a dispute with a split decision</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 pr-4"><code>changeMilestoneApprovedFlag(params)</code></td>
              <td className="py-2">Toggle milestone approval status</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 pr-4"><code>changeMilestoneStatus(params)</code></td>
              <td className="py-2">Update milestone completion status</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 pr-4"><code>changeDisputeFlag(params)</code></td>
              <td className="py-2">Flag or unflag an escrow as disputed</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 pr-4"><code>updateEscrow(params)</code></td>
              <td className="py-2">Update escrow metadata</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 pr-4"><code>getEscrow(params)</code></td>
              <td className="py-2">Fetch escrow data by contract ID</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>multiRelease</h3>
      <div className="my-4 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="pb-2 pr-4 font-semibold text-navy">Method</th>
              <th className="pb-2 font-semibold text-navy">Description</th>
            </tr>
          </thead>
          <tbody className="text-navy-light">
            <tr className="border-b border-border">
              <td className="py-2 pr-4"><code>fundEscrow(params)</code></td>
              <td className="py-2">Fund a multi-release escrow</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 pr-4"><code>changeMilestoneStatus(params)</code></td>
              <td className="py-2">Update a milestone&apos;s status</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 pr-4"><code>approveMilestone(params)</code></td>
              <td className="py-2">Approve a completed milestone</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 pr-4"><code>releaseMilestoneFunds(params)</code></td>
              <td className="py-2">Release funds for a specific milestone</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 pr-4"><code>disputeMilestone(params)</code></td>
              <td className="py-2">Dispute a specific milestone</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 pr-4"><code>resolveMilestoneDispute(params)</code></td>
              <td className="py-2">Resolve a milestone dispute with a split</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 pr-4"><code>withdrawRemainingFunds(params)</code></td>
              <td className="py-2">Withdraw remaining funds after all milestones resolve</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>helper</h3>
      <div className="my-4 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="pb-2 pr-4 font-semibold text-navy">Method</th>
              <th className="pb-2 font-semibold text-navy">Description</th>
            </tr>
          </thead>
          <tbody className="text-navy-light">
            <tr className="border-b border-border">
              <td className="py-2 pr-4"><code>sendTransaction(params)</code></td>
              <td className="py-2">Submit a signed transaction to the network</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 pr-4"><code>setTrustline(params)</code></td>
              <td className="py-2">Create a token account (trustline) for a wallet</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 pr-4"><code>getMultipleEscrowBalance(params)</code></td>
              <td className="py-2">Fetch balances for multiple escrows at once</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>compliance</h3>
      <div className="my-4 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="pb-2 pr-4 font-semibold text-navy">Method</th>
              <th className="pb-2 font-semibold text-navy">Description</th>
            </tr>
          </thead>
          <tbody className="text-navy-light">
            <tr className="border-b border-border">
              <td className="py-2 pr-4"><code>initializeRegistry(params)</code></td>
              <td className="py-2">Initialize the compliance registry (admin only)</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 pr-4"><code>verifyAddress(params)</code></td>
              <td className="py-2">Mark an address as KYC-verified</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 pr-4"><code>revokeVerification(params)</code></td>
              <td className="py-2">Revoke KYC verification for an address</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 pr-4"><code>setEscrowCompliance(params)</code></td>
              <td className="py-2">Attach compliance data to an escrow</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 pr-4"><code>setTravelRuleData(params)</code></td>
              <td className="py-2">Set travel-rule metadata on an escrow</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 pr-4"><code>getRegistry()</code></td>
              <td className="py-2">Fetch the compliance registry</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 pr-4"><code>getVerification(params)</code></td>
              <td className="py-2">Check verification status for an address</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 pr-4"><code>getEscrowCompliance(params)</code></td>
              <td className="py-2">Fetch compliance data for an escrow</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 pr-4"><code>getAuditLogs(params)</code></td>
              <td className="py-2">Retrieve audit log entries</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 pr-4"><code>getSuspiciousActivity(params)</code></td>
              <td className="py-2">Check for flagged suspicious activity</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 pr-4"><code>getEscrowsBySigner(params)</code></td>
              <td className="py-2">List escrows created by a signer</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 pr-4"><code>getEscrowsByRole(params)</code></td>
              <td className="py-2">List escrows where address has a specific role</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 pr-4"><code>getEscrowsByEngagement(params)</code></td>
              <td className="py-2">Look up escrows by engagement ID</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Error Handling</h2>
      <p>
        All SDK methods throw a <code>TrustlessWorkError</code> on failure,
        giving you access to the HTTP status code and response data.
      </p>
      <CodeBlock
        language="typescript"
        title="Error handling"
        code={`import { TrustlessWork, TrustlessWorkError } from "@trustless-work/sdk-solana";

const client = new TrustlessWork({ baseURL: "http://localhost:3000" });

try {
  await client.escrow.fundEscrow({
    contractId: "missing-id",
    signer: walletAddress,
    amount: "100",
  });
} catch (error) {
  if (error instanceof TrustlessWorkError) {
    console.error(error.message);  // "Account not found"
    console.error(error.status);   // 404
    console.error(error.data);     // full response body
  }
}`}
      />
    </DocContent>
  );
}
