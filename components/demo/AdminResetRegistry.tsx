"use client";

import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useDemoStore } from "@/store/demo.store";
import { signAndSerialize } from "@/lib/solana-wallet";
import { closeRegistry } from "@/services/compliance.service";
import { sendTransaction } from "@/services/helper.service";
import { parseError } from "@/lib/errors";
import { Loader2, AlertTriangle, CheckCircle } from "lucide-react";

export function AdminResetRegistry() {
  const { publicKey, signTransaction } = useWallet();
  const { walletAddress } = useDemoStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleClose = async () => {
    if (!publicKey || !signTransaction || !walletAddress) return;
    setLoading(true);
    setError(null);
    try {
      const res = await closeRegistry(walletAddress);
      const signed = await signAndSerialize(res.unsignedTransaction, signTransaction);
      await sendTransaction({ signedXdr: signed, queueKey: walletAddress });
      setSuccess(true);
    } catch (err: unknown) {
      setError(parseError(err));
    } finally {
      setLoading(false);
    }
  };

  if (!walletAddress) return null;

  return (
    <div className="mb-6 rounded-lg border border-yellow-500/30 bg-yellow-500/5 p-4">
      <div className="flex items-start gap-3">
        <AlertTriangle className="h-5 w-5 shrink-0 text-yellow-500 mt-0.5" />
        <div className="flex-1">
          <h4 className="font-semibold text-navy text-sm">Admin: Reset Compliance Registry</h4>
          <p className="text-xs text-navy-light mt-1">
            One-time action. Closes the existing registry PDA so the server can reinitialize it with its own keypair.
            Only works if your connected wallet is the current registry authority.
          </p>
          {success ? (
            <div className="flex items-center gap-2 mt-3 text-sm text-green-600">
              <CheckCircle className="h-4 w-4" />
              Registry closed. Reload the page and redo KYC.
            </div>
          ) : (
            <button
              onClick={handleClose}
              disabled={loading}
              className="mt-3 inline-flex items-center gap-2 rounded-lg bg-yellow-500 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-yellow-600 disabled:opacity-50"
            >
              {loading && <Loader2 className="h-3 w-3 animate-spin" />}
              Close Registry
            </button>
          )}
          {error && <p className="mt-2 text-xs text-error">{error}</p>}
        </div>
      </div>
    </div>
  );
}
