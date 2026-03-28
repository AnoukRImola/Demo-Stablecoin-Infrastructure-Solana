interface ComparisonRow {
  metric: string;
  solana: string;
  swift: string;
}

const rows: ComparisonRow[] = [
  { metric: "Settlement Time", solana: "~400ms", swift: "2-5 business days" },
  { metric: "Transaction Fee", solana: "~$0.00025", swift: "$25-50+" },
  { metric: "Availability", solana: "24/7/365", swift: "Business hours only" },
  { metric: "Currency", solana: "USDC (stablecoin)", swift: "Fiat (FX fees)" },
  { metric: "Transparency", solana: "On-chain, auditable", swift: "Opaque intermediaries" },
  { metric: "Programmability", solana: "Smart contract escrow", swift: "Manual processes" },
];

export function ComparisonTable() {
  return (
    <div className="my-6 overflow-hidden rounded-lg border border-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-border-light">
            <th className="px-4 py-3 text-left font-semibold text-navy">Metric</th>
            <th className="px-4 py-3 text-left font-semibold text-primary">Solana + Trustless Work</th>
            <th className="px-4 py-3 text-left font-semibold text-navy-light">SWIFT / Traditional</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.metric} className="border-b border-border last:border-0">
              <td className="px-4 py-3 font-medium text-navy">{row.metric}</td>
              <td className="px-4 py-3 text-navy-light">{row.solana}</td>
              <td className="px-4 py-3 text-navy-light">{row.swift}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
