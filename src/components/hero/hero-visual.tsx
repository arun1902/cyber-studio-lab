"use client";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

export function HeroVisual() {
  const reduced = usePrefersReducedMotion();

  return (
    <div className="relative h-[360px] w-full md:h-[420px]" aria-hidden="true">
      <div className="absolute inset-3 border border-line md:inset-0">
        <span className="absolute -left-px -top-px h-3 w-3 border-l border-t border-cyan/70" />
        <span className="absolute -right-px -top-px h-3 w-3 border-r border-t border-yellow/70" />
        <span className="absolute -bottom-px -left-px h-3 w-3 border-b border-l border-yellow/70" />
        <span className="absolute -bottom-px -right-px h-3 w-3 border-b border-r border-cyan/70" />
      </div>
      <div className="absolute inset-0 grid-field opacity-40" />

      <div className="absolute left-5 top-10 w-[min(360px,80%)] border border-line bg-code-bg font-mono text-[11px] leading-5 shadow-[var(--shadow)] md:left-10 md:top-12 md:text-xs md:leading-6">
        <div className="flex items-center justify-between border-b border-white/10 px-3 py-1.5 text-[#8b98a5]">
          <span>
            <span className="text-[#22d3ee]">yaml</span> deployment.yaml
          </span>
          <span className="flex gap-1">
            <span className="h-2 w-2 rounded-full bg-white/15" />
            <span className="h-2 w-2 rounded-full bg-white/15" />
            <span className="h-2 w-2 rounded-full bg-[#22d3ee]/70" />
          </span>
        </div>
        <pre className="px-3 py-2 text-[#d6e2ee]">
          <span className="text-[#8b98a5]">resources:</span>
          {"\n  "}
          <span className="text-[#8b98a5]">requests:</span>
          {"\n    cpu: "}
          <span className="text-[#fcd34d]">&quot;250m&quot;</span>
          {"\n    memory: "}
          <span className="text-[#fcd34d]">&quot;384Mi&quot;</span>
          {"\n  "}
          <span className="text-[#8b98a5]">limits:</span>
          {"\n    memory: "}
          <span className="text-[#fcd34d]">&quot;384Mi&quot;</span>
          {"\n"}
          <span className="text-[#5b6776]"># no CPU limit: avoid throttling</span>
        </pre>
      </div>

      <div className={`absolute right-3 top-6 w-[190px] border border-line bg-surface-strong/90 p-3 font-mono text-[11px] leading-5 text-paper/80 backdrop-blur-md md:right-6 md:w-[220px] ${reduced ? "" : "float-soft-a"}`}>
        <p className="mb-1 text-yellow">recommended</p>
        <p>pool.max = cores × 2 + 1</p>
        <p>statement_timeout = 15s</p>
        <p className="text-cyan">✓ production-ready</p>
      </div>

      <div className={`absolute bottom-8 right-6 w-[236px] border border-line bg-surface-strong/90 p-3 font-mono text-[11px] leading-5 backdrop-blur-md md:bottom-10 md:right-14 ${reduced ? "" : "float-soft-b"}`}>
        <p className="text-cyan">security check</p>
        <p className="text-mist">--cap-drop ALL ........ ok</p>
        <p className="text-mist">--read-only ........... ok</p>
        <p className="text-yellow">-p 0.0.0.0:8080 ....... warn</p>
      </div>
    </div>
  );
}
