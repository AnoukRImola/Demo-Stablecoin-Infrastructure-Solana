interface NarrativeBlockProps {
  title: string;
  children: React.ReactNode;
}

export function NarrativeBlock({ title, children }: NarrativeBlockProps) {
  return (
    <div className="mb-6 rounded-lg border border-primary-light/30 bg-primary-light/10 p-6">
      <h3 className="mb-2 text-lg font-semibold text-navy">{title}</h3>
      <div className="text-sm leading-relaxed text-navy-light">{children}</div>
    </div>
  );
}
