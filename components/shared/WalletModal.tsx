"use client";

import { useWallet, type Wallet } from "@solana/wallet-adapter-react";
import { WalletReadyState } from "@solana/wallet-adapter-base";
import { X, Wallet as WalletIcon, ExternalLink } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";

interface WalletModalProps {
  open: boolean;
  onClose: () => void;
}

export function WalletModal({ open, onClose }: WalletModalProps) {
  const { wallets, select } = useWallet();
  const overlayRef = useRef<HTMLDivElement>(null);

  const installed = wallets.filter(
    (w) =>
      w.readyState === WalletReadyState.Installed ||
      w.readyState === WalletReadyState.Loadable,
  );

  const notInstalled = wallets.filter(
    (w) => w.readyState === WalletReadyState.NotDetected,
  );

  const handleSelect = useCallback(
    (wallet: Wallet) => {
      select(wallet.adapter.name);
      onClose();
    },
    [select, onClose],
  );

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-navy/40 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
    >
      <div className="relative w-full max-w-sm mx-4 rounded-2xl border border-border bg-card shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <div className="flex items-center gap-2.5">
            <WalletIcon className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold text-navy">Connect Wallet</h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-navy-light transition-colors hover:bg-border-light hover:text-navy"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4">
          {installed.length > 0 && (
            <div className="space-y-2">
              <p className="px-2 text-xs font-medium uppercase tracking-wider text-navy-light">
                Detected
              </p>
              {installed.map((wallet) => (
                <WalletOption
                  key={wallet.adapter.name}
                  wallet={wallet}
                  onSelect={handleSelect}
                />
              ))}
            </div>
          )}

          {notInstalled.length > 0 && (
            <div className="mt-4 space-y-2">
              <p className="px-2 text-xs font-medium uppercase tracking-wider text-navy-light">
                Not installed
              </p>
              {notInstalled.map((wallet) => (
                <WalletOptionExternal
                  key={wallet.adapter.name}
                  wallet={wallet}
                />
              ))}
            </div>
          )}

          {installed.length === 0 && notInstalled.length === 0 && (
            <div className="py-8 text-center">
              <WalletIcon className="mx-auto mb-3 h-10 w-10 text-border" />
              <p className="text-sm text-navy-light">No wallets found</p>
              <p className="mt-1 text-xs text-navy-light">
                Install Phantom or Solflare to continue
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-border px-6 py-3">
          <p className="text-center text-xs text-navy-light">
            Connecting on <span className="font-medium text-primary">Solana Devnet</span>
          </p>
        </div>
      </div>
    </div>
  );
}

function WalletOption({
  wallet,
  onSelect,
}: {
  wallet: Wallet;
  onSelect: (w: Wallet) => void;
}) {
  return (
    <button
      onClick={() => onSelect(wallet)}
      className="flex w-full items-center gap-3 rounded-xl border border-transparent px-4 py-3 text-left transition-all hover:border-primary-light hover:bg-primary-light/10"
    >
      <Image
        src={wallet.adapter.icon}
        alt={wallet.adapter.name}
        width={40}
        height={40}
        className="rounded-xl"
      />
      <div className="flex-1">
        <p className="text-sm font-semibold text-navy">{wallet.adapter.name}</p>
        <p className="text-xs text-navy-light">Detected</p>
      </div>
      <div className="rounded-full bg-success/10 px-2.5 py-0.5 text-xs font-medium text-success">
        Ready
      </div>
    </button>
  );
}

function WalletOptionExternal({ wallet }: { wallet: Wallet }) {
  return (
    <a
      href={wallet.adapter.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex w-full items-center gap-3 rounded-xl border border-transparent px-4 py-3 text-left transition-all hover:border-border hover:bg-border-light"
    >
      <Image
        src={wallet.adapter.icon}
        alt={wallet.adapter.name}
        width={40}
        height={40}
        className="rounded-xl opacity-50"
      />
      <div className="flex-1">
        <p className="text-sm font-medium text-navy-light">{wallet.adapter.name}</p>
        <p className="text-xs text-navy-light">Not installed</p>
      </div>
      <ExternalLink className="h-4 w-4 text-navy-light" />
    </a>
  );
}
