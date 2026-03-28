import { ExternalLink } from "lucide-react";
import { getExplorerTxUrl, getExplorerAddressUrl } from "@/constants/demo-defaults";

interface ExplorerLinkProps {
  signature?: string;
  address?: string;
  label?: string;
}

export function ExplorerLink({ signature, address, label }: ExplorerLinkProps) {
  const url = signature ? getExplorerTxUrl(signature) : address ? getExplorerAddressUrl(address) : "#";
  const displayText = label || (signature ? `${signature.slice(0, 8)}...${signature.slice(-8)}` : address ? `${address.slice(0, 8)}...${address.slice(-8)}` : "");

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
    >
      {displayText}
      <ExternalLink className="h-3.5 w-3.5" />
    </a>
  );
}
