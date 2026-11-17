import { Reveal } from "@/components/animations/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { categories } from "@/data/categories";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const layouts = [
  "md:col-span-7 md:row-span-2 md:min-h-[560px]",
  "md:col-span-5",
  "md:col-span-5",
  "md:col-span-12",
];

export function LabSection() {
  return (
    <section id="lab" className="scroll-mt-24 px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-[1440px]">
        <Reveal>
          <SectionLabel index="02">Field map</SectionLabel>
          <h2 className="max-w-4xl font-display text-[clamp(3rem,7vw,6.5rem)] uppercase leading-[0.86] tracking-[-0.05em]">
            Inside the lab
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-3 md:grid-cols-12">
          {categories.map((category, index) => (
            <Reveal key={category.id} delay={index * 0.06} className={layouts[index]}>
              <Link
                href={`/explore#${category.id}`}
                className="group relative flex h-full min-h-64 flex-col justify-between overflow-hidden border border-line bg-surface p-6 transition-colors duration-300 hover:border-lime/50 md:p-8"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="font-display text-[clamp(3.2rem,6vw,5.5rem)] leading-none tracking-[-0.08em] text-paper/12 transition-colors duration-300 group-hover:text-lime/60">
                    {category.index}
                  </span>
                  <ArrowUpRight className="h-5 w-5 text-mist transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-lime" />
                </div>
                <div className={index === 0 ? "max-w-xl" : "max-w-md"}>
                  <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-lime">{category.short}</p>
                  <h3 className={`mt-3 font-display uppercase leading-[0.92] tracking-[-0.04em] ${index === 0 ? "text-4xl md:text-5xl" : "text-3xl md:text-4xl"}`}>
                    {category.title}
                  </h3>
                  <p className="mt-4 text-sm leading-6 text-mist md:text-base">{category.description}</p>
                  <span className="mt-6 inline-flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-paper">
                    Explore
                    <span className="h-px w-0 bg-lime transition-all duration-300 group-hover:w-10" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
