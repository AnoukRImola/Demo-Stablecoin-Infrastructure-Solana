import { cn } from "@/lib/utils";
import { CodeBlock } from "./CodeBlock";

interface EndpointCardProps {
  method: "GET" | "POST" | "PUT" | "DELETE";
  path: string;
  description: string;
  body?: string;
  response?: string;
}

const methodColors = {
  GET: "bg-success/10 text-success",
  POST: "bg-primary/10 text-primary",
  PUT: "bg-warning/10 text-warning",
  DELETE: "bg-error/10 text-error",
};

export function EndpointCard({ method, path, description, body, response }: EndpointCardProps) {
  return (
    <div className="my-4 overflow-hidden rounded-lg border border-border">
      <div className="flex items-center gap-3 border-b border-border bg-border-light px-4 py-3">
        <span className={cn("rounded px-2 py-0.5 text-xs font-bold", methodColors[method])}>
          {method}
        </span>
        <code className="text-sm font-mono text-navy">{path}</code>
      </div>
      <div className="p-4">
        <p className="mb-3 text-sm text-navy-light">{description}</p>
        {body && <CodeBlock code={body} language="json" title="Request Body" />}
        {response && <CodeBlock code={response} language="json" title="Response" />}
      </div>
    </div>
  );
}
