"use client";

import { HeroVisual } from "@/components/hero/hero-visual";
import { Magnetic } from "@/components/ui/magnetic";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { ArrowDown } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { useRef } from "react";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const gridY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  return (
    <section ref={ref} className="relative min-h-[100svh] overflow-hidden px-5 pb-16 pt-28 md:px-8 md:pt-32">
      {!reduced ? (
        <motion.div style={{ y: gridY }} className="grid-field pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
      ) : (
        <div className="grid-field pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
      )}

      <div className="relative mx-auto flex min-h-[calc(100svh-8rem)] max-w-[1440px] flex-col">
        <p className="flex items-center gap-3 font-mono text-[0.72rem] uppercase tracking-[0.22em] text-mist">
          <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-lime" aria-hidden="true" />
          Cyber Awareness // Online
        </p>

        <h1 className="mt-8 font-display text-[clamp(2.05rem,8.2vw,7rem)] font-medium uppercase leading-[0.86] tracking-[-0.05em]">
          {reduced ? (
            <>
              <span className="block">The digital world</span>
              <span className="block">
                needs a <span className="text-stroke">safer</span>
              </span>
              <span className="block">mindset.</span>
            </>
          ) : (
            <>
              <span className="block overflow-hidden">
                <motion.span
                  className="block"
                  initial={{ y: "105%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                >
                  THE DIGITAL WORLD
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span
                  className="block"
                  initial={{ y: "105%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{ duration: 0.9, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                >
                  NEEDS A <span className="text-stroke">SAFER</span>
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span
                  className="block"
                  initial={{ y: "105%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{ duration: 0.9, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
                >
                  MINDSET.
                </motion.span>
              </span>
            </>
          )}
        </h1>

        <div className="relative mt-8 grid items-end gap-10 lg:grid-cols-[minmax(0,460px)_1fr] lg:gap-8">
          <div>
            <p className="max-w-md text-base leading-7 text-mist md:text-lg">
              Explore cybersecurity, discover digital vulnerabilities, learn smarter security practices, and stay one step ahead of online threats.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Magnetic>
                <Link
                  href="/explore"
                  className="inline-flex h-12 w-full items-center justify-center bg-lime px-6 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-on-accent transition-opacity hover:opacity-90 sm:w-auto"
                >
                  Explore The Lab
                </Link>
              </Magnetic>
              <Magnetic>
                <Link
                  href="/tutorials"
                  className="inline-flex h-12 w-full items-center justify-center border border-line px-6 font-mono text-[0.72rem] uppercase tracking-[0.16em] transition-colors hover:border-lime hover:text-lime sm:w-auto"
                >
                  Discover Tutorials
                </Link>
              </Magnetic>
            </div>
          </div>
          <HeroVisual />
        </div>

        <a
          href="#lab"
          className="mt-auto inline-flex items-center gap-3 self-start pt-10 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-mist transition-colors hover:text-lime"
        >
          <ArrowDown className="h-4 w-4" aria-hidden="true" />
          Scroll the lab
        </a>
      </div>
    </section>
  );
}
