"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

export function CodeBlock({ code, lang, filename }: { code: string; lang: string; filename?: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <figure className="my-6 overflow-hidden border border-line bg-code-bg">
      <figcaption className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-2 font-mono text-[0.68rem] tracking-[0.06em] text-[#8b98a5]">
        <span className="truncate">
          <span className="uppercase tracking-[0.16em] text-[#22d3ee]">{lang}</span>
          {filename && <span className="ml-3">{filename}</span>}
        </span>
        <button
          type="button"
          onClick={copy}
          className="inline-flex shrink-0 items-center gap-1.5 uppercase tracking-[0.14em] transition-colors hover:text-[#fcd34d]"
          aria-label={copied ? "Copied" : "Copy code"}
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </figcaption>
      <pre className="overflow-x-auto p-4 leading-6">
        <code>{code}</code>
      </pre>
    </figure>
  );
}
