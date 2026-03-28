import { cn } from "@/lib/utils";

interface DocContentProps {
  children: React.ReactNode;
  className?: string;
}

export function DocContent({ children, className }: DocContentProps) {
  return (
    <article
      className={cn(
        "mx-auto max-w-3xl px-4 py-10 sm:px-6",
        "[&_h1]:mb-4 [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:text-navy",
        "[&_h2]:mb-3 [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-navy",
        "[&_h3]:mb-2 [&_h3]:mt-8 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-navy",
        "[&_p]:mb-4 [&_p]:leading-7 [&_p]:text-navy-light",
        "[&_ul]:mb-4 [&_ul]:ml-6 [&_ul]:list-disc [&_ul]:space-y-1",
        "[&_ol]:mb-4 [&_ol]:ml-6 [&_ol]:list-decimal [&_ol]:space-y-1",
        "[&_li]:text-navy-light [&_li]:leading-7",
        "[&_strong]:font-semibold [&_strong]:text-navy",
        "[&_code]:rounded [&_code]:bg-border-light [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-sm [&_code]:font-mono",
        className,
      )}
    >
      {children}
    </article>
  );
}
