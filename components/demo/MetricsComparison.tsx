import { Zap, Clock } from "lucide-react";

export function MetricsComparison() {
  return (
    <div className="my-6 grid gap-4 sm:grid-cols-2">
      <div className="rounded-lg border border-success/20 bg-success/5 p-4">
        <div className="mb-2 flex items-center gap-2 text-success">
          <Zap className="h-5 w-5" />
          <span className="text-sm font-semibold">Solana + Trustless Work</span>
        </div>
        <p className="text-2xl font-bold text-navy">~400ms</p>
        <p className="text-sm text-navy-light">Settlement time</p>
        <p className="mt-2 text-2xl font-bold text-navy">~$0.00025</p>
        <p className="text-sm text-navy-light">Transaction fee</p>
      </div>
      <div className="rounded-lg border border-border bg-border-light p-4">
        <div className="mb-2 flex items-center gap-2 text-navy-light">
          <Clock className="h-5 w-5" />
          <span className="text-sm font-semibold">SWIFT / Traditional</span>
        </div>
        <p className="text-2xl font-bold text-navy">2-5 days</p>
        <p className="text-sm text-navy-light">Settlement time</p>
        <p className="mt-2 text-2xl font-bold text-navy">$25-50+</p>
        <p className="text-sm text-navy-light">Transaction fee</p>
      </div>
    </div>
  );
}
