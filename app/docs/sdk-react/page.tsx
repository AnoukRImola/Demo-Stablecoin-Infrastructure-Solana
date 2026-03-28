import { DocContent } from "@/components/docs/DocContent";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { Callout } from "@/components/docs/Callout";

export default function SdkReactPage() {
  return (
    <DocContent>
      <h1>React Hooks</h1>
      <p>
        The <code>@trustless-work/sdk-solana/react</code> subpath exports a
        provider component and hooks that wrap every SDK method, giving you a
        clean React-idiomatic API for escrow operations.
      </p>

      <h2>Installation</h2>
      <CodeBlock
        language="bash"
        title="Install the SDK (hooks are included)"
        code={`npm install @trustless-work/sdk-solana
# or
bun add @trustless-work/sdk-solana`}
      />
      <p>
        React hooks are exported from the <code>/react</code> subpath. No
        separate package is needed.
      </p>

      <h2>Provider Setup</h2>

      <Callout type="warning" title="Client Component Required">
        <p>
          <code>TrustlessWorkConfig</code> uses React context internally, so it
          must be rendered inside a client component. In Next.js App Router, add{" "}
          <code>&quot;use client&quot;</code> to the file that wraps your layout.
        </p>
      </Callout>

      <CodeBlock
        language="typescript"
        title="providers.tsx (Next.js App Router)"
        code={`"use client";

import { TrustlessWorkConfig } from "@trustless-work/sdk-solana/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TrustlessWorkConfig
      baseURL={process.env.NEXT_PUBLIC_API_URL!}
      apiKey={process.env.NEXT_PUBLIC_API_KEY}
    >
      {children}
    </TrustlessWorkConfig>
  );
}`}
      />

      <CodeBlock
        language="typescript"
        title="layout.tsx"
        code={`import { Providers } from "./providers";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}`}
      />

      <h2>Using Hooks</h2>
      <p>
        Each hook returns a single async function that mirrors the
        corresponding SDK method. Combine them with the{" "}
        <code>useSendTransaction</code> hook for the full build &rarr; sign
        &rarr; send flow.
      </p>
      <CodeBlock
        language="typescript"
        title="CreateEscrow.tsx"
        code={`"use client";

import { useDeploySingleRelease } from "@trustless-work/sdk-solana/react";
import { useSendTransaction } from "@trustless-work/sdk-solana/react";
import { signAndSerialize } from "@/lib/solana-wallet";
import { useWallet } from "@solana/wallet-adapter-react";

export function CreateEscrow() {
  const { deploySingleRelease } = useDeploySingleRelease();
  const { sendTransaction } = useSendTransaction();
  const { publicKey, signTransaction } = useWallet();

  const handleCreate = async () => {
    // 1. Build the unsigned transaction
    const res = await deploySingleRelease({
      signer: publicKey!.toBase58(),
      engagementId: crypto.randomUUID(),
      title: "Logo Design",
      description: "Design a logo",
      approver: publicKey!.toBase58(),
      serviceProvider: providerAddress,
      platformAddress: publicKey!.toBase58(),
      amount: "500",
      platformFee: "1",
      milestones: [{ description: "Deliver logo", status: "pending" }],
      releaseSigner: publicKey!.toBase58(),
      disputeResolver: publicKey!.toBase58(),
      trustline: USDC_MINT,
      trustlineDecimals: 6,
      receiver: providerAddress,
      receiverMemo: 1,
    });

    // 2. Sign with the user's wallet
    const signed = await signAndSerialize(
      res.unsignedTransaction,
      signTransaction!,
    );

    // 3. Send the signed transaction
    await sendTransaction({
      signedXdr: signed,
      queueKey: res.contract_id,
      returnEscrowDataIsRequired: true,
    });
  };

  return <button onClick={handleCreate}>Create Escrow</button>;
}`}
      />

      <h2>Direct Client Access</h2>
      <p>
        If you need the underlying <code>TrustlessWork</code> client instance
        (for example, to call <code>setApiKey</code>), use the{" "}
        <code>useTrustlessWork</code> hook.
      </p>
      <CodeBlock
        language="typescript"
        title="Direct client access"
        code={`import { useTrustlessWork } from "@trustless-work/sdk-solana/react";

function MyComponent() {
  const client = useTrustlessWork();

  const authenticate = async (address: string, signature: string) => {
    const { apiKey } = await client.auth.requestApiKey({ address, signature });
    client.setApiKey(apiKey);
  };
}`}
      />

      <h2>Hooks Reference</h2>
      <p>
        All hooks must be called inside{" "}
        <code>&lt;TrustlessWorkConfig&gt;</code>. Each returns a memoized async
        function with the same signature as the corresponding SDK method.
      </p>

      <h3>Authentication</h3>
      <div className="my-4 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="pb-2 pr-4 font-semibold text-navy">Hook</th>
              <th className="pb-2 font-semibold text-navy">Returns</th>
            </tr>
          </thead>
          <tbody className="text-navy-light">
            <tr className="border-b border-border">
              <td className="py-2 pr-4"><code>useRequestApiKey()</code></td>
              <td className="py-2"><code>{"{ requestApiKey }"}</code></td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>Deployer</h3>
      <div className="my-4 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="pb-2 pr-4 font-semibold text-navy">Hook</th>
              <th className="pb-2 font-semibold text-navy">Returns</th>
            </tr>
          </thead>
          <tbody className="text-navy-light">
            <tr className="border-b border-border">
              <td className="py-2 pr-4"><code>useDeploySingleRelease()</code></td>
              <td className="py-2"><code>{"{ deploySingleRelease }"}</code></td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 pr-4"><code>useDeployMultiRelease()</code></td>
              <td className="py-2"><code>{"{ deployMultiRelease }"}</code></td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>Escrow</h3>
      <div className="my-4 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="pb-2 pr-4 font-semibold text-navy">Hook</th>
              <th className="pb-2 font-semibold text-navy">Returns</th>
            </tr>
          </thead>
          <tbody className="text-navy-light">
            <tr className="border-b border-border">
              <td className="py-2 pr-4"><code>useFundEscrow()</code></td>
              <td className="py-2"><code>{"{ fundEscrow }"}</code></td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 pr-4"><code>useReleaseFunds()</code></td>
              <td className="py-2"><code>{"{ releaseFunds }"}</code></td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 pr-4"><code>useResolveDispute()</code></td>
              <td className="py-2"><code>{"{ resolveDispute }"}</code></td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 pr-4"><code>useChangeMilestoneApprovedFlag()</code></td>
              <td className="py-2"><code>{"{ changeMilestoneApprovedFlag }"}</code></td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 pr-4"><code>useChangeMilestoneStatus()</code></td>
              <td className="py-2"><code>{"{ changeMilestoneStatus }"}</code></td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 pr-4"><code>useChangeDisputeFlag()</code></td>
              <td className="py-2"><code>{"{ changeDisputeFlag }"}</code></td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 pr-4"><code>useUpdateEscrow()</code></td>
              <td className="py-2"><code>{"{ updateEscrow }"}</code></td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 pr-4"><code>useGetEscrow()</code></td>
              <td className="py-2"><code>{"{ getEscrow }"}</code></td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>Multi-Release</h3>
      <div className="my-4 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="pb-2 pr-4 font-semibold text-navy">Hook</th>
              <th className="pb-2 font-semibold text-navy">Returns</th>
            </tr>
          </thead>
          <tbody className="text-navy-light">
            <tr className="border-b border-border">
              <td className="py-2 pr-4"><code>useMultiReleaseFundEscrow()</code></td>
              <td className="py-2"><code>{"{ fundEscrow }"}</code></td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 pr-4"><code>useMultiReleaseChangeMilestoneStatus()</code></td>
              <td className="py-2"><code>{"{ changeMilestoneStatus }"}</code></td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 pr-4"><code>useMultiReleaseApproveMilestone()</code></td>
              <td className="py-2"><code>{"{ approveMilestone }"}</code></td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 pr-4"><code>useMultiReleaseReleaseMilestoneFunds()</code></td>
              <td className="py-2"><code>{"{ releaseMilestoneFunds }"}</code></td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 pr-4"><code>useMultiReleaseDisputeMilestone()</code></td>
              <td className="py-2"><code>{"{ disputeMilestone }"}</code></td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 pr-4"><code>useMultiReleaseResolveMilestoneDispute()</code></td>
              <td className="py-2"><code>{"{ resolveMilestoneDispute }"}</code></td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 pr-4"><code>useMultiReleaseWithdrawRemainingFunds()</code></td>
              <td className="py-2"><code>{"{ withdrawRemainingFunds }"}</code></td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>Helper</h3>
      <div className="my-4 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="pb-2 pr-4 font-semibold text-navy">Hook</th>
              <th className="pb-2 font-semibold text-navy">Returns</th>
            </tr>
          </thead>
          <tbody className="text-navy-light">
            <tr className="border-b border-border">
              <td className="py-2 pr-4"><code>useSendTransaction()</code></td>
              <td className="py-2"><code>{"{ sendTransaction }"}</code></td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 pr-4"><code>useSetTrustline()</code></td>
              <td className="py-2"><code>{"{ setTrustline }"}</code></td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 pr-4"><code>useGetMultipleEscrowBalance()</code></td>
              <td className="py-2"><code>{"{ getMultipleEscrowBalance }"}</code></td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>Compliance</h3>
      <div className="my-4 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="pb-2 pr-4 font-semibold text-navy">Hook</th>
              <th className="pb-2 font-semibold text-navy">Returns</th>
            </tr>
          </thead>
          <tbody className="text-navy-light">
            <tr className="border-b border-border">
              <td className="py-2 pr-4"><code>useInitializeRegistry()</code></td>
              <td className="py-2"><code>{"{ initializeRegistry }"}</code></td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 pr-4"><code>useVerifyAddress()</code></td>
              <td className="py-2"><code>{"{ verifyAddress }"}</code></td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 pr-4"><code>useRevokeVerification()</code></td>
              <td className="py-2"><code>{"{ revokeVerification }"}</code></td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 pr-4"><code>useSetEscrowCompliance()</code></td>
              <td className="py-2"><code>{"{ setEscrowCompliance }"}</code></td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 pr-4"><code>useSetTravelRuleData()</code></td>
              <td className="py-2"><code>{"{ setTravelRuleData }"}</code></td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 pr-4"><code>useGetRegistry()</code></td>
              <td className="py-2"><code>{"{ getRegistry }"}</code></td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 pr-4"><code>useGetVerification()</code></td>
              <td className="py-2"><code>{"{ getVerification }"}</code></td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 pr-4"><code>useGetEscrowCompliance()</code></td>
              <td className="py-2"><code>{"{ getEscrowCompliance }"}</code></td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 pr-4"><code>useGetAuditLogs()</code></td>
              <td className="py-2"><code>{"{ getAuditLogs }"}</code></td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 pr-4"><code>useGetSuspiciousActivity()</code></td>
              <td className="py-2"><code>{"{ getSuspiciousActivity }"}</code></td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 pr-4"><code>useGetEscrowsBySigner()</code></td>
              <td className="py-2"><code>{"{ getEscrowsBySigner }"}</code></td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 pr-4"><code>useGetEscrowsByRole()</code></td>
              <td className="py-2"><code>{"{ getEscrowsByRole }"}</code></td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 pr-4"><code>useGetEscrowsByEngagement()</code></td>
              <td className="py-2"><code>{"{ getEscrowsByEngagement }"}</code></td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>Context</h3>
      <div className="my-4 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="pb-2 pr-4 font-semibold text-navy">Hook</th>
              <th className="pb-2 font-semibold text-navy">Returns</th>
            </tr>
          </thead>
          <tbody className="text-navy-light">
            <tr className="border-b border-border">
              <td className="py-2 pr-4"><code>useTrustlessWork()</code></td>
              <td className="py-2"><code>TrustlessWork</code> client instance</td>
            </tr>
          </tbody>
        </table>
      </div>

      <Callout type="tip" title="TypeScript Support">
        <p>
          All hooks are fully typed. Parameter and return types are re-exported
          from the main <code>@trustless-work/sdk-solana</code> package, so you
          can import them directly for type annotations.
        </p>
      </Callout>
    </DocContent>
  );
}
