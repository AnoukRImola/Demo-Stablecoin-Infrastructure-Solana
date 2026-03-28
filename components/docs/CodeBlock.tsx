"use client";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Copy, Check } from "lucide-react";
import { useState } from "react";

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
}

export function CodeBlock({ code, language = "typescript", title }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-4 overflow-hidden rounded-lg border border-border">
      {title && (
        <div className="flex items-center justify-between border-b border-border bg-border-light px-4 py-2">
          <span className="text-xs font-medium text-navy-light">{title}</span>
          <button
            onClick={handleCopy}
            className="text-navy-light transition-colors hover:text-navy"
          >
            {copied ? <Check className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
          </button>
        </div>
      )}
      <SyntaxHighlighter
        language={language}
        style={oneLight}
        customStyle={{
          margin: 0,
          padding: "1rem",
          fontSize: "0.8125rem",
          background: "#FAFBFC",
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
