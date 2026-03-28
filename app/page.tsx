import Link from "next/link";
import { ArrowRight, Shield, Zap, Globe, Code } from "lucide-react";

export default function HomePage() {
  return (
    <div className="bg-bg">
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center rounded-full border border-primary-light bg-primary-light/20 px-4 py-1.5 text-sm font-medium text-primary">
            StableHacks 2026 — Programmable Stablecoin Payments
          </div>
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-navy sm:text-5xl lg:text-6xl">
            Escrow-as-a-Service{" "}
            <span className="text-primary">on Solana</span>
          </h1>
          <p className="mb-10 text-lg text-navy-light sm:text-xl">
            Trustless Work enables programmable stablecoin escrow payments with
            built-in KYC/AML compliance, milestone tracking, and instant USDC
            settlement. No intermediaries, no delays.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/demo"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-base font-medium text-white transition-colors hover:bg-primary-dark"
            >
              Try the Live Demo
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/docs/overview"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-6 py-3 text-base font-medium text-navy transition-colors hover:bg-border-light"
            >
              Read the Docs
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-border bg-card py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="mb-12 text-center text-2xl font-bold text-navy">
            Why Trustless Work?
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <FeatureCard
              icon={<Zap className="h-6 w-6" />}
              title="Instant Settlement"
              description="~400ms finality on Solana. No more waiting 2-5 business days for international wire transfers."
            />
            <FeatureCard
              icon={<Shield className="h-6 w-6" />}
              title="Built-in Compliance"
              description="On-chain KYC verification, Travel Rule data, and compliance guards enforced at the smart contract level."
            />
            <FeatureCard
              icon={<Globe className="h-6 w-6" />}
              title="Cross-Border Ready"
              description="USDC stablecoin eliminates FX risk. Pay anyone, anywhere, 24/7/365 with near-zero fees."
            />
            <FeatureCard
              icon={<Code className="h-6 w-6" />}
              title="Developer-First"
              description="REST API for building escrow flows. Build unsigned TX on server, sign on client, send back."
            />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="mb-12 text-center text-2xl font-bold text-navy">
            How It Works
          </h2>
          <div className="mx-auto max-w-2xl space-y-6">
            <Step number="1" title="Create Escrow" description="Define roles, milestones, payment amount, and compliance requirements. Escrow is deployed as an on-chain PDA." />
            <Step number="2" title="Fund & Execute" description="Client funds the escrow with USDC. Service provider completes work and marks milestones." />
            <Step number="3" title="Approve & Release" description="Approver reviews milestones. Release signer triggers automated fund distribution to all parties." />
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="border-t border-border bg-card py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-8 sm:grid-cols-3 text-center">
            <div>
              <p className="text-4xl font-bold text-primary">~$0.00025</p>
              <p className="mt-2 text-sm text-navy-light">Per transaction fee</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary">~400ms</p>
              <p className="mt-2 text-sm text-navy-light">Settlement finality</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary">6</p>
              <p className="mt-2 text-sm text-navy-light">Configurable roles</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="rounded-lg border border-border bg-bg p-6">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
        {icon}
      </div>
      <h3 className="mb-2 text-lg font-semibold text-navy">{title}</h3>
      <p className="text-sm text-navy-light leading-relaxed">{description}</p>
    </div>
  );
}

function Step({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className="flex gap-4">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
        {number}
      </div>
      <div>
        <h3 className="font-semibold text-navy">{title}</h3>
        <p className="mt-1 text-sm text-navy-light">{description}</p>
      </div>
    </div>
  );
}
