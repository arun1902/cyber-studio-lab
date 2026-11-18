import { Reveal } from "@/components/animations/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { pillars, topics } from "@/data/topics";
import Link from "next/link";

const pillarOrder = ["build", "secure", "operate"] as const;

export function TopicsSection() {
  return (
    <section className="border-t border-line px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-[1440px]">
        <Reveal>
          <SectionLabel index="04">Topics</SectionLabel>
          <h2 className="max-w-4xl font-display text-[clamp(2.6rem,6vw,5.2rem)] leading-[0.95] tracking-[-0.045em]">
            Not only cybersecurity. Everything you build on.
          </h2>
          <p className="mt-6 max-w-xl text-mist">
            Thirteen topics across writing software, securing it, and running it, because secure systems come from good engineering end to end.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-px border border-line bg-line lg:grid-cols-3">
          {pillarOrder.map((pillar) => (
            <div key={pillar} className="bg-ink p-6 md:p-8">
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-yellow">{pillars[pillar].label}</p>
              <p className="mt-2 font-display text-2xl tracking-[-0.03em]">{pillars[pillar].note}</p>
              <ul className="mt-6 space-y-1">
                {topics
                  .filter((topic) => topic.pillar === pillar)
                  .map((topic) => (
                    <li key={topic.id}>
                      <Link href={`/topics#${topic.id}`} className="group flex items-baseline gap-3 border-t border-line py-3">
                        <span className="font-mono text-[0.68rem] text-cyan">{topic.index}</span>
                        <span className="text-paper/85 group-hover:text-cyan">{topic.title}</span>
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
