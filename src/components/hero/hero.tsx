"use client";

import { HeroVisual } from "@/components/hero/hero-visual";
import { Magnetic } from "@/components/ui/magnetic";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { site } from "@/lib/site";
import { ArrowDown } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { useRef } from "react";

const words = [
  { text: "Learn.", className: "" },
  { text: "Build.", className: "text-cyan" },
  { text: "Secure.", className: "text-yellow" },
];

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
          <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-cyan" aria-hidden="true" />
          Developer & Cybersecurity Knowledge Platform
        </p>

        <h1 className="mt-8 font-display text-[clamp(3rem,10vw,8.5rem)] font-medium leading-[0.88] tracking-[-0.055em]">
          <span className="sr-only">{site.name}: </span>
          {words.map((word, index) => (
            <span key={word.text} className="mr-[0.22em] inline-block overflow-hidden pb-[0.06em] align-bottom last:mr-0">
              {reduced ? (
                <span className={`inline-block ${word.className}`}>{word.text}</span>
              ) : (
                <motion.span
                  className={`inline-block ${word.className}`}
                  initial={{ y: "105%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{ duration: 0.9, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  {word.text}
                </motion.span>
              )}
            </span>
          ))}
        </h1>

        <div className="relative mt-10 grid items-end gap-10 lg:grid-cols-[minmax(0,540px)_1fr] lg:gap-8">
          <div>
            <p className="font-display text-xl leading-snug tracking-[-0.02em] text-paper md:text-2xl">{site.promise}</p>
            <p className="mt-4 max-w-lg text-base leading-7 text-mist">
              Blogs, tutorials, animated videos, and tips that go beyond the basics, from beginner concepts to advanced production engineering.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Magnetic>
                <Link
                  href="/tutorials"
                  className="inline-flex h-12 w-full items-center justify-center bg-cyan px-6 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-on-accent transition-opacity hover:opacity-90 sm:w-auto"
                >
                  Start a tutorial
                </Link>
              </Magnetic>
              <Magnetic>
                <Link
                  href="/blog"
                  className="inline-flex h-12 w-full items-center justify-center border border-line px-6 font-mono text-[0.72rem] uppercase tracking-[0.16em] transition-colors hover:border-yellow hover:text-yellow sm:w-auto"
                >
                  Read the blogs
                </Link>
              </Magnetic>
            </div>
          </div>
          <HeroVisual />
        </div>

        <a
          href="#formats"
          className="mt-auto inline-flex items-center gap-3 self-start pt-10 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-mist transition-colors hover:text-cyan"
        >
          <ArrowDown className="h-4 w-4" aria-hidden="true" />
          Explore the platform
        </a>
      </div>
    </section>
  );
}
