"use client";

import { Reveal } from "@/components/animations/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { terminalCommands, terminalSuggestions } from "@/data/terminal";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { FormEvent, useEffect, useRef, useState } from "react";

type Line = { kind: "in" | "out"; text: string };

function respond(raw: string): string[] {
  const command = raw.trim().toLowerCase();
  const match = terminalCommands.find((item) => item.input === command);
  if (match) return match.output;
  return [
    "Unknown command.",
    "This is a simulated terminal. It does not run on your machine.",
    "Try: cyberlab --help",
  ];
}

export function TerminalSection() {
  const reduced = usePrefersReducedMotion();
  const [lines, setLines] = useState<Line[]>([]);
  const [value, setValue] = useState("");
  const scroller = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    const intro = terminalCommands[0];
    if (reduced) {
      const timer = window.setTimeout(() => {
        setLines([
          { kind: "in", text: intro.input },
          ...intro.output.map((text) => ({ kind: "out" as const, text })),
        ]);
      }, 0);
      return () => window.clearTimeout(timer);
    }

    let cancelled = false;
    const input = intro.input;
    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      if (cancelled) return;
      if (index <= input.length) {
        setLines([{ kind: "in", text: input.slice(0, index) }]);
        return;
      }
      window.clearInterval(timer);
      setLines([
        { kind: "in", text: input },
        ...intro.output.map((text) => ({ kind: "out" as const, text })),
      ]);
    }, 45);

    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, [reduced]);

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight });
  }, [lines]);

  function run(command: string) {
    const cleaned = command.replace(/[\r\n]/g, " ").slice(0, 80);
    if (!cleaned.trim()) return;
    const output = respond(cleaned);
    setLines((current) => [
      ...current,
      { kind: "in", text: cleaned },
      ...output.map((text) => ({ kind: "out" as const, text })),
    ]);
    setValue("");
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    run(value);
  }

  return (
    <section className="border-t border-line px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto grid max-w-[1440px] items-end gap-10 lg:grid-cols-[0.75fr_1.25fr]">
        <Reveal>
          <SectionLabel index="05">Simulation</SectionLabel>
          <h2 className="font-display text-[clamp(3rem,6vw,5.6rem)] uppercase leading-[0.88] tracking-[-0.05em]">
            Ready to explore?
          </h2>
          <p className="mt-5 max-w-sm text-mist">
            A teaching terminal with a fixed script. It answers a few commands and never touches a real system.
          </p>
        </Reveal>
        <div className="border border-line bg-surface-strong">
          <div className="flex items-center justify-between border-b border-line px-4 py-3 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-mist">
            <span>csl://session</span>
            <span className="text-lime">simulated</span>
          </div>
          <div ref={scroller} className="h-[340px] overflow-auto px-4 py-4 font-mono text-sm leading-6" aria-live="polite">
            {lines.map((line, index) => (
              <p key={`${line.kind}-${index}`} className={line.kind === "in" ? "text-lime" : "text-paper/85"}>
                {line.kind === "in" ? `$ ${line.text}` : line.text || " "}
              </p>
            ))}
          </div>
          <form onSubmit={onSubmit} className="flex items-center gap-2 border-t border-line px-4">
            <label htmlFor="lab-terminal" className="font-mono text-lime">
              $
            </label>
            <input
              id="lab-terminal"
              value={value}
              onChange={(event) => setValue(event.target.value.slice(0, 80))}
              className="field border-0 py-4 font-mono text-sm"
              aria-label="Simulated terminal command"
              autoComplete="off"
              spellCheck={false}
              placeholder="type a command"
            />
          </form>
          <div className="flex flex-wrap gap-2 border-t border-line px-4 py-3">
            {terminalSuggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => run(suggestion)}
                className="border border-line px-2 py-1 font-mono text-[0.68rem] text-mist hover:border-lime hover:text-lime"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
