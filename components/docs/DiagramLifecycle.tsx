const phases = [
  { number: "1", title: "Initialize", description: "Escrow created on-chain with roles and milestones", color: "bg-primary" },
  { number: "2", title: "Fund", description: "Approver deposits USDC into escrow PDA", color: "bg-primary" },
  { number: "3", title: "Complete", description: "Service provider marks milestones done", color: "bg-info" },
  { number: "4", title: "Approve", description: "Approver reviews and approves milestones", color: "bg-info" },
  { number: "5", title: "Release", description: "Release signer triggers fund distribution", color: "bg-success" },
  { number: "6", title: "Settled", description: "Funds distributed to receiver and platform", color: "bg-success" },
];

export function DiagramLifecycle() {
  return (
    <div className="my-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-0">
        {phases.map((phase, index) => (
          <div key={phase.title} className="flex items-center sm:flex-1">
            <div className="flex flex-col items-center text-center">
              <div className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white ${phase.color}`}>
                {phase.number}
              </div>
              <p className="mt-2 text-sm font-semibold text-navy">{phase.title}</p>
              <p className="mt-1 text-xs text-navy-light max-w-[120px]">{phase.description}</p>
            </div>
            {index < phases.length - 1 && (
              <div className="mx-2 hidden h-0.5 flex-1 bg-border sm:block" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
