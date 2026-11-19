import { Reveal } from "@/components/animations/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { ArrowRight, Compass, Rocket, Target } from "lucide-react";
import Link from "next/link";

const paths = [
  {
    href: "/tutorials?level=Beginner",
    icon: Compass,
    level: "Start here",
    title: "New to tech & security",
    body: "Plain-language tutorials and tips that explain the basics before you touch production systems.",
    accent: "bg-cyan/10 text-cyan",
    cta: "Beginner tutorials",
  },
  {
    href: "/videos",
    icon: Target,
    level: "Learn visually",
    title: "Prefer watching over reading",
    body: "Short animated videos that show how attacks, protocols, and infrastructure actually work.",
    accent: "bg-yellow/10 text-yellow",
    cta: "Watch lessons",
  },
  {
    href: "/topics",
    icon: Rocket,
    level: "Go deeper",
    title: "Ready for real-world topics",
    body: "Explore build, secure, and operate categories — from clean code to cloud and AppSec.",
    accent: "bg-blue/10 text-blue",
    cta: "Browse categories",
  },
];

export function PathsSection() {
  return (
    <section id="paths" className="scroll-mt-24 px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-[1200px]">
        <Reveal>
          <SectionLabel index="01">Learning paths</SectionLabel>
          <h2 className="max-w-3xl font-display text-[clamp(2.2rem,5vw,3.75rem)] leading-[1] tracking-[-0.04em]">
            Start where you are. Grow at your pace.
          </h2>
          <p className="mt-4 max-w-xl text-mist">
            Three simple entry points — no confusing jargon, no overwhelm. Pick the path that fits you today.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {paths.map(({ href, icon: Icon, level, title, body, accent, cta }, index) => (
            <Reveal key={href} delay={index * 0.05}>
              <Link
                href={href}
                className="group flex h-full flex-col rounded-2xl border border-line bg-surface-strong p-6 shadow-[var(--shadow)] transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan/30 md:p-7"
              >
                <span className={`grid h-12 w-12 place-items-center rounded-2xl ${accent}`}>
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <p className="mt-5 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-yellow">{level}</p>
                <h3 className="mt-2 font-display text-2xl tracking-[-0.03em] group-hover:text-cyan">{title}</h3>
                <p className="mt-3 flex-1 text-sm leading-6 text-mist">{body}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan">
                  {cta}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
