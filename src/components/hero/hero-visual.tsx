"use client";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { useEffect, useRef } from "react";
import { LogoMark } from "@/components/ui/logo";

export function HeroVisual() {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (reduced) return;
    const video = ref.current;
    if (!video) return;
    video.muted = true;
    video.defaultMuted = true;
    const tryPlay = () => {
      const playPromise = video.play();
      if (playPromise) playPromise.catch(() => {});
    };
    tryPlay();
    video.addEventListener("canplay", tryPlay);
    return () => video.removeEventListener("canplay", tryPlay);
  }, [reduced]);

  return (
    <div className="relative mx-auto w-full max-w-[520px]">
      <div
        className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-[radial-gradient(circle_at_50%_40%,rgba(79,70,229,0.12),transparent_65%)]"
        aria-hidden="true"
      />
      <div className="relative overflow-hidden rounded-3xl border border-line bg-surface-strong shadow-[var(--shadow)]">
        <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
          <span className="h-2.5 w-2.5 rounded-full bg-cyan/40" />
          <span className="ml-2 text-[0.7rem] font-medium tracking-[-0.01em] text-mist">Brand animation</span>
        </div>
        <div className="relative aspect-video bg-[#1E1B4B]">
          {reduced ? (
            <div className="flex h-full items-center justify-center gap-3 bg-white px-6">
              <LogoMark className="h-14 w-14" />
              <span className="font-display text-3xl font-semibold lowercase tracking-[-0.03em] text-paper">
                cyberstudio<span className="text-cyan">lab</span>
              </span>
            </div>
          ) : (
            <video
              ref={ref}
              className="h-full w-full object-contain"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster="/brand/logo-poster.jpg"
              aria-label="cyberstudiolab animated logo"
            >
              <source src="/brand/cyberstudiolab-logo-merge.mp4" type="video/mp4" />
            </video>
          )}
        </div>
      </div>
      <p className="mt-4 text-center text-sm text-mist">
        Icon + wordmark — your code, made <span className="font-medium text-yellow">secure</span>
      </p>
    </div>
  );
}
