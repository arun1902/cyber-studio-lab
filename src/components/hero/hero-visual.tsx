"use client";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

export function HeroVisual() {
  const reduced = usePrefersReducedMotion();

  return (
    <div className="relative h-[340px] w-full md:h-[420px]" aria-hidden="true">
      <div className="absolute inset-3 border border-line md:inset-0">
        <span className="absolute -left-px -top-px h-3 w-3 border-l border-t border-lime/70" />
        <span className="absolute -right-px -top-px h-3 w-3 border-r border-t border-lime/70" />
        <span className="absolute -bottom-px -left-px h-3 w-3 border-b border-l border-lime/70" />
        <span className="absolute -bottom-px -right-px h-3 w-3 border-b border-r border-lime/70" />
      </div>
      <div className="absolute inset-0 grid-field opacity-40" />

      <svg className="absolute left-5 top-12 h-48 w-48 text-lime md:left-10 md:top-16 md:h-56 md:w-56" viewBox="0 0 200 200">
        <circle cx="100" cy="100" r="70" fill="none" stroke="currentColor" strokeOpacity="0.28" />
        <circle cx="100" cy="100" r="42" fill="none" stroke="var(--blue)" strokeOpacity="0.45" />
        {!reduced && <path className="scan-sweep" d="M100 100 L100 22 A78 78 0 0 1 158 58 Z" fill="currentColor" fillOpacity="0.08" />}
        <circle cx="100" cy="100" r="3" fill="currentColor" />
      </svg>

      <div className={`absolute right-3 top-8 w-[200px] border border-line bg-surface-strong/90 p-3 font-mono text-[11px] leading-5 text-paper/80 backdrop-blur-md md:right-4 md:w-[230px] ${reduced ? "" : "float-soft-a"}`}>
        <p className="mb-2 text-lime">node // awareness</p>
        <p>status: watching</p>
        <p>threats: ordinary</p>
        <p>mode: learn</p>
      </div>

      <div className={`absolute bottom-12 left-4 w-[180px] border border-line bg-surface-strong/90 p-3 font-mono text-[11px] leading-5 backdrop-blur-md md:bottom-14 md:left-8 ${reduced ? "" : "float-soft-b"}`}>
        <p className="text-blue">link map</p>
        <p className="text-mist">mail —— accounts</p>
        <p className="text-mist">habits —— updates</p>
        <p className="text-paper">signal stable</p>
      </div>
    </div>
  );
}
