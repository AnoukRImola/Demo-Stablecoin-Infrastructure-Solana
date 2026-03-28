import { DocsSidebar } from "@/components/layout/DocsSidebar";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <DocsSidebar />
      <div className="flex-1 overflow-x-hidden">{children}</div>
    </div>
  );
}
