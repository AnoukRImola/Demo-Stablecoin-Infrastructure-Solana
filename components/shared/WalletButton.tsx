"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import { Wallet, ChevronDown, LogOut, Copy, Check } from "lucide-react";
import Image from "next/image";
import { WalletModal } from "./WalletModal";

export function WalletButton() {
  const { publicKey, wallet, disconnect, connected } = useWallet();
  const [modalOpen, setModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleCopy = () => {
    if (publicKey) {
      navigator.clipboard.writeText(publicKey.toBase58());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (connected && publicKey) {
    const address = publicKey.toBase58();
    const short = `${address.slice(0, 4)}...${address.slice(-4)}`;

    return (
      <div className="relative">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex items-center gap-2.5 rounded-xl border border-border bg-card px-4 py-2.5 transition-all hover:border-primary-light hover:shadow-sm"
        >
          {wallet?.adapter.icon && (
            <Image
              src={wallet.adapter.icon}
              alt={wallet.adapter.name}
              width={20}
              height={20}
              className="rounded-md"
            />
          )}
          <span className="text-sm font-medium text-navy">{short}</span>
          <ChevronDown className="h-4 w-4 text-navy-light" />
        </button>

        {menuOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
            <div className="absolute right-0 z-50 mt-2 w-56 rounded-xl border border-border bg-card shadow-lg">
              <div className="border-b border-border px-4 py-3">
                <p className="text-xs text-navy-light">Connected with {wallet?.adapter.name}</p>
                <p className="mt-0.5 font-mono text-xs text-navy">
                  {address.slice(0, 16)}...{address.slice(-8)}
                </p>
              </div>
              <div className="p-1.5">
                <button
                  onClick={() => { handleCopy(); setMenuOpen(false); }}
                  className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-navy-light transition-colors hover:bg-border-light hover:text-navy"
                >
                  {copied ? <Check className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
                  {copied ? "Copied!" : "Copy address"}
                </button>
                <button
                  onClick={() => { disconnect(); setMenuOpen(false); }}
                  className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-error/80 transition-colors hover:bg-error/5 hover:text-error"
                >
                  <LogOut className="h-4 w-4" />
                  Disconnect
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
      >
        <Wallet className="h-4 w-4" />
        Select Wallet
      </button>
      <WalletModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
