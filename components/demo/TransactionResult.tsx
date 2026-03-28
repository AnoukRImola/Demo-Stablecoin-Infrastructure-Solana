import { ExplorerLink } from "@/components/shared/ExplorerLink";
import { CheckCircle } from "lucide-react";

interface TransactionResultProps {
  label: string;
  signature: string;
}

export function TransactionResult({ label, signature }: TransactionResultProps) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-success/20 bg-success/5 p-4">
      <CheckCircle className="h-5 w-5 shrink-0 text-success" />
      <div>
        <p className="text-sm font-medium text-navy">{label}</p>
        <ExplorerLink signature={signature} />
      </div>
    </div>
  );
}
