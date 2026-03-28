import { cn } from "@/lib/utils";
import { Info, AlertTriangle, Lightbulb, Shield } from "lucide-react";

interface CalloutProps {
  type?: "info" | "warning" | "tip" | "compliance";
  title?: string;
  children: React.ReactNode;
}

const config = {
  info: {
    icon: Info,
    bg: "bg-info/5 border-info/20",
    iconColor: "text-info",
  },
  warning: {
    icon: AlertTriangle,
    bg: "bg-warning/5 border-warning/20",
    iconColor: "text-warning",
  },
  tip: {
    icon: Lightbulb,
    bg: "bg-success/5 border-success/20",
    iconColor: "text-success",
  },
  compliance: {
    icon: Shield,
    bg: "bg-primary/5 border-primary/20",
    iconColor: "text-primary",
  },
};

export function Callout({ type = "info", title, children }: CalloutProps) {
  const { icon: Icon, bg, iconColor } = config[type];

  return (
    <div className={cn("my-4 rounded-lg border p-4", bg)}>
      <div className="flex gap-3">
        <Icon className={cn("mt-0.5 h-5 w-5 shrink-0", iconColor)} />
        <div>
          {title && <p className="mb-1 font-semibold text-navy">{title}</p>}
          <div className="text-sm text-navy-light [&_p]:mb-1 [&_p:last-child]:mb-0">{children}</div>
        </div>
      </div>
    </div>
  );
}
