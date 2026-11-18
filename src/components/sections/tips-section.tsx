"use client";

import { Reveal } from "@/components/animations/reveal";
import { InlineText } from "@/components/blog/article-body";
import { CodeBlock } from "@/components/blog/code-block";
import { SectionLabel } from "@/components/ui/section-label";
import { TopicMark } from "@/components/ui/topic-mark";
import { tips } from "@/data/tips";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const featuredTips = tips.filter((tip) => tip.code).slice(0, 6);

export function TipsSection() {
  const [active, setActive] = useState(featuredTips[0].id);
  const current = featuredTips.find((tip) => tip.id === active) ?? featuredTips[0];

  return (
    <section className="border-t border-line px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-[1440px]">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <SectionLabel index="05">Tips & tricks</SectionLabel>
              <h2 className="font-display text-[clamp(2.6rem,6vw,5.2rem)] leading-[0.95] tracking-[-0.045em]">Copy. Paste. Improve.</h2>
            </div>
            <Link href="/tips" className="inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-cyan hover:text-paper">
              All {tips.length} tips <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
        <div className="mt-12 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <ol className="border-t border-line">
            {featuredTips.map((tip, index) => {
              const selected = tip.id === active;
              return (
                <li key={tip.id} className="border-b border-line">
                  <button
                    type="button"
                    onClick={() => setActive(tip.id)}
                    aria-pressed={selected}
                    className="flex w-full items-center gap-4 py-4 text-left"
                  >
                    <span className={`font-mono text-xs ${selected ? "text-yellow" : "text-mist"}`}>{String(index + 1).padStart(2, "0")}</span>
                    <span className={`flex-1 font-display text-lg tracking-[-0.02em] md:text-xl ${selected ? "text-paper" : "text-paper/55"}`}>
                      {tip.title}
                    </span>
                    <span className={`h-px transition-all ${selected ? "w-12 bg-cyan" : "w-5 bg-paper/20"}`} aria-hidden="true" />
                  </button>
                </li>
              );
            })}
          </ol>
          <div className="prose-lab min-w-0" aria-live="polite">
            <TopicMark id={current.topic} />
            <p className="!mt-4 font-display !text-2xl leading-tight tracking-[-0.03em] !text-paper">{current.title}</p>
            <p className="mt-4">
              <InlineText text={current.detail} />
            </p>
            {current.code && <CodeBlock code={current.code.code} lang={current.code.lang} />}
          </div>
        </div>
      </div>
    </section>
  );
}
