import { Reveal } from "@/components/animations/reveal";
import { CoverArt } from "@/components/ui/cover-art";
import { SectionLabel } from "@/components/ui/section-label";
import { KindBadge, TopicMark } from "@/components/ui/topic-mark";
import { articleHref, articles } from "@/data/articles";
import { formatDate } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export function FeaturedSection() {
  const latest = [...articles].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  const [featured, ...rest] = latest;
  const supporting = rest.slice(0, 3);

  return (
    <section className="border-t border-line px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-[1440px]">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <SectionLabel index="03">Latest</SectionLabel>
              <h2 className="max-w-4xl font-display text-[clamp(2.6rem,6vw,5.2rem)] leading-[0.95] tracking-[-0.045em]">
                Fresh from the lab.
              </h2>
            </div>
            <Link href="/blog" className="inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-cyan hover:text-paper">
              All blogs <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
        <div className="mt-12 grid gap-4 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <Link href={articleHref(featured)} className="group block">
              <div className="overflow-hidden border border-line">
                <CoverArt
                  variant={featured.cover}
                  showLabel={false}
                  className="aspect-[16/10] w-full transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
              <div className="relative z-10 -mt-10 ml-4 max-w-xl border border-line bg-surface-strong p-5 shadow-[var(--shadow)] md:-mt-12 md:ml-8 md:p-6">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  <KindBadge>{featured.format === "tutorial" ? "Tutorial" : "Blog"}</KindBadge>
                  <TopicMark id={featured.topics[0]} />
                </div>
                <h3 className="mt-4 font-display text-3xl leading-[1] tracking-[-0.035em] group-hover:text-cyan md:text-4xl">
                  {featured.title}
                </h3>
                <p className="mt-4 text-sm leading-6 text-mist">{featured.excerpt}</p>
                <p className="mt-5 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-mist">
                  {formatDate(featured.publishedAt)} · {featured.readingMinutes} min · {featured.level}
                </p>
              </div>
            </Link>
          </Reveal>
          <div className="flex flex-col gap-4 lg:col-span-5">
            {supporting.map((article, index) => (
              <Reveal key={article.slug} delay={0.08 * (index + 1)}>
                <Link href={articleHref(article)} className="group grid gap-4 border border-line p-4 transition-colors hover:border-cyan/50 sm:grid-cols-[120px_1fr] md:p-5">
                  <div className="overflow-hidden border border-line">
                    <CoverArt variant={article.cover} showLabel={false} className="aspect-[4/3] w-full transition-transform duration-700 group-hover:scale-105 sm:aspect-auto sm:h-full" />
                  </div>
                  <div>
                    <span className="flex flex-wrap items-center gap-3">
                      <KindBadge>{article.format === "tutorial" ? "Tutorial" : "Blog"}</KindBadge>
                      <TopicMark id={article.topics[0]} />
                    </span>
                    <h3 className="mt-3 font-display text-xl leading-tight tracking-[-0.03em] group-hover:text-cyan">{article.title}</h3>
                    <p className="mt-3 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-mist">
                      {formatDate(article.publishedAt)} · {article.readingMinutes} min
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
