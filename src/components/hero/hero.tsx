"use client";

import { HeroVisual } from "@/components/hero/hero-visual";
import { ArrowRight, PlayCircle } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

export function Hero() {
  const reduced = usePrefersReducedMotion();

  return (
    <section className="relative overflow-hidden px-5 pb-14 pt-28 md:px-8 md:pb-20 md:pt-32">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_420px_at_12%_0%,rgba(79,70,229,0.12),transparent_55%),radial-gradient(700px_360px_at_90%_10%,rgba(249,115,22,0.1),transparent_50%)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-[1200px] items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface-strong px-3 py-1.5 text-[0.75rem] font-medium text-mist shadow-sm">
            <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-cyan" aria-hidden="true" />
            Beginner-friendly cybersecurity &amp; engineering
          </p>

          <p className="mt-6 font-display text-[clamp(2.6rem,6.5vw,4.4rem)] font-semibold lowercase leading-[0.95] tracking-[-0.045em] text-paper">
            {reduced ? (
              <>
                cyberstudio<span className="text-cyan">lab</span>
              </>
            ) : (
              <motion.span
                className="inline-block"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              >
                cyberstudio<span className="text-cyan">lab</span>
              </motion.span>
            )}
          </p>

          <h1 className="mt-4 max-w-xl font-display text-[clamp(1.85rem,4vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-paper">
            {reduced ? (
              <>
                Anyone can learn to build and{" "}
                <span className="text-yellow">secure</span> modern software.
              </>
            ) : (
              <motion.span
                className="inline-block"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                Anyone can learn to build and{" "}
                <span className="text-yellow">secure</span> modern software.
              </motion.span>
            )}
          </h1>

          <p className="mt-5 max-w-lg text-base leading-7 text-mist md:text-lg md:leading-8">
            Simple lessons, clear categories, and visual tutorials — so beginners can start confidently and grow into real-world engineering.
          </p>

          <p className="mt-3 text-sm font-medium tracking-[-0.01em] text-paper/70">
            Learn. Build. <span className="text-yellow">Secure.</span>
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="#paths"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-cyan px-6 font-semibold text-on-accent transition-opacity hover:opacity-90"
            >
              Start learning
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/videos"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-line bg-surface-strong px-6 font-semibold text-paper transition-colors hover:border-cyan/40 hover:text-cyan"
            >
              <PlayCircle className="h-4 w-4 text-yellow" aria-hidden="true" />
              Watch video lessons
            </Link>
          </div>
        </div>

        <HeroVisual />
      </div>
    </section>
  );
}
