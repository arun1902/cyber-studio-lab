import { PageHero } from "@/components/layout/page-hero";
import { CoverArt } from "@/components/ui/cover-art";
import { getTutorials } from "@/data/articles";
import { pageMeta } from "@/lib/metadata";
import { formatDate } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export const metadata = pageMeta(
  "Tutorials",
  "Guided cybersecurity tutorials you can finish in an evening: passwords, browsers, headers, and phone permissions.",
  "/tutorials",
);

export default function TutorialsPage() {
  const tutorials = getTutorials();

  return (
    <>
      <PageHero index="02" kicker="Guided practice" title="Tutorials with a finish line">
        Short sessions with a clear stop. Each one stays on systems you own and habits you can keep after the tab closes.
      </PageHero>
      <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-8">
        <ol className="space-y-6">
          {tutorials.map((tutorial, index) => (
            <li key={tutorial.slug}>
              <Link href={`/blog/${tutorial.slug}`} className="group grid gap-6 border border-line p-4 md:grid-cols-[220px_1fr] md:p-6">
                <div className="overflow-hidden border border-line">
                  <CoverArt variant={tutorial.cover} className="aspect-[16/10] w-full transition-transform duration-700 group-hover:scale-[1.04]" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-4 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-lime">
                    <span>0{index + 1}</span>
                    <span>{tutorial.level}</span>
                    <span className="text-mist">{tutorial.duration}</span>
                    <span className="text-mist">{tutorial.steps?.length ?? 0} steps</span>
                  </div>
                  <h2 className="mt-4 font-display text-4xl uppercase leading-[0.92] tracking-[-0.045em] group-hover:text-lime md:text-5xl">
                    {tutorial.title}
                  </h2>
                  <p className="mt-4 max-w-2xl text-mist">{tutorial.excerpt}</p>
                  {tutorial.steps && (
                    <ol className="mt-6 grid gap-3 sm:grid-cols-2">
                      {tutorial.steps.map((step, stepIndex) => (
                        <li key={step.title} className="border-t border-line pt-3 text-sm text-paper/80">
                          <span className="font-mono text-[0.68rem] text-lime">0{stepIndex + 1}</span>
                          <span className="mt-1 block">{step.title}</span>
                        </li>
                      ))}
                    </ol>
                  )}
                  <p className="mt-6 inline-flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.16em]">
                    Open tutorial <ArrowUpRight className="h-4 w-4" />
                    <span className="text-mist">{formatDate(tutorial.publishedAt)}</span>
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}
