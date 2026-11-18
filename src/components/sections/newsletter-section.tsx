"use client";

import { Magnetic } from "@/components/ui/magnetic";
import { SectionLabel } from "@/components/ui/section-label";
import { isValidEmail } from "@/lib/utils";
import { FormEvent, useState } from "react";

export function NewsletterSection({
  index = "08",
  kicker = "Newsletter",
  title = "One practical email a week.",
  description = "New tutorials, configuration recommendations, and security explainers. No fluff, no vendor pitches.",
}: {
  index?: string;
  kicker?: string;
  title?: string;
  description?: string;
}) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!email.trim()) {
      setError("Enter an email address.");
      setDone(false);
      return;
    }
    if (!isValidEmail(email)) {
      setError("That address does not look complete.");
      setDone(false);
      return;
    }
    setError("");
    setDone(true);
  }

  return (
    <section className="relative overflow-hidden border-t border-line px-5 py-24 md:px-8 md:py-32">
      <div className="grid-field pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1440px]">
        <SectionLabel index={index}>{kicker}</SectionLabel>
        <h2 className="max-w-4xl font-display text-[clamp(2.6rem,6vw,5.2rem)] leading-[0.95] tracking-[-0.045em]">{title}</h2>
        <p className="mt-6 max-w-xl text-mist">{description}</p>
        <form onSubmit={onSubmit} className="mt-10 max-w-2xl" noValidate>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
            <div className="flex-1">
              <label htmlFor="dispatch-email" className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-mist">
                Email
              </label>
              <input
                id="dispatch-email"
                type="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setDone(false);
                }}
                placeholder="you@company.com"
                autoComplete="email"
                className="field"
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? "dispatch-error" : done ? "dispatch-success" : undefined}
              />
            </div>
            <Magnetic>
              <button type="submit" className="h-12 bg-cyan px-6 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-on-accent transition-opacity hover:opacity-90">
                Subscribe
              </button>
            </Magnetic>
          </div>
          {error && (
            <p id="dispatch-error" className="mt-4 font-mono text-xs text-[#ff8b98]">
              {error}
            </p>
          )}
          {done && (
            <p id="dispatch-success" className="mt-4 max-w-lg text-sm leading-6 text-cyan" role="status">
              Thanks. The mailing list is not connected yet, so {email.trim()} was not stored. Sign-ups will open soon.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
