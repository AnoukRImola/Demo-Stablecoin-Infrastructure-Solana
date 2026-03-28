"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useRef } from "react";
import { useDemoStore } from "@/store/demo.store";
import { requestApiKey } from "@/lib/api";
import { NarrativeBlock } from "./NarrativeBlock";
import { WalletButton } from "@/components/shared/WalletButton";

export function StepConnectWallet() {
  const { publicKey } = useWallet();
  const { setWalletAddress, completeStep, setStep, setLoading, setError } = useDemoStore();
  const hasAuthenticated = useRef(false);

  useEffect(() => {
    if (!publicKey || hasAuthenticated.current) return;
    hasAuthenticated.current = true;

    const address = publicKey.toBase58();
    setWalletAddress(address);
    setLoading(true);

    requestApiKey(address)
      .then(() => {
        completeStep(1);
        setStep(2);
      })
      .catch((err) => {
        hasAuthenticated.current = false;
        setError(err instanceof Error ? err.message : "Failed to authenticate with API");
      })
      .finally(() => setLoading(false));
  }, [publicKey, setWalletAddress, completeStep, setStep, setLoading, setError]);

  const { error, loading } = useDemoStore();

  return (
    <div>
      <NarrativeBlock title="The Story Begins">
        <p>
          A Swiss fintech company, <strong>Alpine Payments AG</strong>, needs to pay an
          international software development firm for a completed project. Instead of
          initiating a SWIFT wire transfer that would take 3-5 business days and cost $50+
          in fees, they choose to use Trustless Work&apos;s escrow protocol on Solana.
        </p>
        <p className="mt-2">
          Let&apos;s walk through the entire flow. First, connect your Solana wallet (devnet).
        </p>
      </NarrativeBlock>

      <div className="rounded-lg border border-border bg-card p-8 text-center">
        <h3 className="mb-2 text-lg font-semibold text-navy">Connect Your Wallet</h3>
        <p className="mb-6 text-sm text-navy-light">
          Use Phantom or Solflare on Solana Devnet. You&apos;ll need some devnet SOL for transaction fees.
        </p>
        <div className="flex justify-center">
          <WalletButton />
        </div>
        {loading && (
          <p className="mt-4 text-sm text-primary">Authenticating with API...</p>
        )}
      </div>

      {error && (
        <div className="mt-4 rounded-lg border border-error/20 bg-error/5 p-4 text-sm text-error">
          {error}
        </div>
      )}

      <p className="mt-4 text-center text-xs text-navy-light">
        For this demo, your wallet acts as all 6 escrow roles (approver, service provider, etc.)
      </p>
    </div>
  );
}
