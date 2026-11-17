"use client";

import { site } from "@/lib/site";
import { Check, Link2 } from "lucide-react";
import { useState } from "react";

export function ShareBar({ title, slug }: { title: string; slug: string }) {
  const [copied, setCopied] = useState(false);
  const url = `${site.url}/blog/${slug}`;
  const encoded = encodeURIComponent(url);
  const text = encodeURIComponent(title);

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-mist">Share</p>
      <button type="button" onClick={copy} className="inline-flex items-center gap-2 border border-line px-3 py-2 font-mono text-[0.68rem] uppercase tracking-[0.12em] hover:border-lime">
        {copied ? <Check className="h-3.5 w-3.5 text-lime" /> : <Link2 className="h-3.5 w-3.5" />}
        {copied ? "Copied" : "Copy link"}
      </button>
      <a
        className="border border-line px-3 py-2 font-mono text-[0.68rem] uppercase tracking-[0.12em] hover:border-lime"
        href={`https://twitter.com/intent/tweet?text=${text}&url=${encoded}`}
        target="_blank"
        rel="noreferrer"
      >
        X
      </a>
      <a
        className="border border-line px-3 py-2 font-mono text-[0.68rem] uppercase tracking-[0.12em] hover:border-lime"
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`}
        target="_blank"
        rel="noreferrer"
      >
        LinkedIn
      </a>
    </div>
  );
}
