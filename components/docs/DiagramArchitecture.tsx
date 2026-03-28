const layers = [
  {
    title: "Client Layer",
    subtitle: "Next.js Dashboard / Demo App",
    items: ["Wallet Adapter (Phantom, Solflare)", "Build payloads & sign transactions", "Display escrow state"],
    color: "border-primary bg-primary/5",
  },
  {
    title: "API Layer",
    subtitle: "NestJS Server",
    items: ["Build unsigned transactions", "KYC / Travel Rule guards", "Firebase persistence queue"],
    color: "border-info bg-info/5",
  },
  {
    title: "Blockchain Layer",
    subtitle: "Solana Program (Anchor)",
    items: ["Escrow PDA accounts", "Compliance registry", "Token transfers via SPL"],
    color: "border-success bg-success/5",
  },
];

export function DiagramArchitecture() {
  return (
    <div className="my-8 space-y-4">
      {layers.map((layer, index) => (
        <div key={layer.title}>
          <div className={`rounded-lg border-2 p-4 ${layer.color}`}>
            <div className="mb-2 flex items-center gap-2">
              <h4 className="font-semibold text-navy">{layer.title}</h4>
              <span className="text-sm text-navy-light">— {layer.subtitle}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {layer.items.map((item) => (
                <span key={item} className="rounded-md bg-card px-3 py-1 text-sm text-navy-light border border-border">
                  {item}
                </span>
              ))}
            </div>
          </div>
          {index < layers.length - 1 && (
            <div className="flex justify-center py-1">
              <div className="h-4 w-0.5 bg-border" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
