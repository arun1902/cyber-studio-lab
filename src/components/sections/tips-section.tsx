"use client";

import { Reveal } from "@/components/animations/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { tips } from "@/data/tips";
import { useState } from "react";

export function TipsSection() {
  const [active, setActive] = useState(tips[0].id);
  const current = tips.find((tip) => tip.id === active) ?? tips[0];

  return (
    <section className="border-t border-line px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <Reveal>
          <SectionLabel index="04">Field notes</SectionLabel>
          <h2 className="font-display text-[clamp(2.8rem,6vw,5.4rem)] uppercase leading-[0.88] tracking-[-0.05em]">
            Small tips. Stronger security.
          </h2>
          <p className="mt-6 max-w-md text-mist">Six habits. None of them require a new identity. Pick one and the rest get easier.</p>
          <div className="mt-10 border-l border-lime pl-5" aria-live="polite">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-lime">{current.index} / {current.signal}</p>
            <p className="mt-4 font-display text-3xl leading-tight tracking-[-0.04em]">{current.title}</p>
            <p className="mt-4 max-w-md text-sm leading-7 text-mist">{current.detail}</p>
          </div>
        </Reveal>
        <ol className="border-t border-line">
          {tips.map((tip) => {
            const selected = tip.id === active;
            return (
              <li key={tip.id} className="border-b border-line">
                <button
                  type="button"
                  onClick={() => setActive(tip.id)}
                  aria-pressed={selected}
                  className="flex w-full items-center gap-4 py-5 text-left"
                >
                  <span className={`font-mono text-xs ${selected ? "text-lime" : "text-mist"}`}>{tip.index}</span>
                  <span className={`flex-1 font-display text-2xl tracking-[-0.04em] md:text-3xl ${selected ? "text-paper" : "text-paper/55"}`}>
                    {tip.title}
                  </span>
                  <span className={`h-px transition-all ${selected ? "w-16 bg-lime" : "w-6 bg-paper/20"}`} aria-hidden="true" />
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
