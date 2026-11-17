import { Reveal } from "@/components/animations/reveal";
import { CategoryMark } from "@/components/ui/category-mark";
import { CoverArt } from "@/components/ui/cover-art";
import { SectionLabel } from "@/components/ui/section-label";
import { articles } from "@/data/articles";
import { formatDate } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export function FeaturedSection() {
  const [featured, ...rest] = articles;
  const supporting = rest.slice(0, 2);

  return (
    <section className="border-t border-line px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-[1440px]">
        <Reveal>
          <SectionLabel index="03">Editorial</SectionLabel>
          <h2 className="max-w-5xl font-display text-[clamp(2.8rem,6.4vw,6rem)] uppercase leading-[0.88] tracking-[-0.05em]">
            Knowledge is your best firewall.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-4 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <Link href={`/blog/${featured.slug}`} className="group block">
              <div className="overflow-hidden border border-line">
                <CoverArt
                  variant={featured.cover}
                  showLabel={false}
                  className="aspect-[16/10] w-full transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
              <div className="relative z-10 -mt-10 ml-4 max-w-xl border border-line bg-surface-strong p-5 shadow-[var(--shadow)] md:-mt-12 md:ml-8 md:p-6">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  <CategoryMark id={featured.category} />
                  <span className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-mist">
                    {formatDate(featured.publishedAt)} · {featured.readingMinutes} min
                  </span>
                </div>
                <h3 className="mt-4 font-display text-3xl uppercase leading-[0.94] tracking-[-0.04em] group-hover:text-lime md:text-5xl">
                  {featured.title}
                </h3>
                <p className="mt-4 text-sm leading-6 text-mist">{featured.excerpt}</p>
                <span className="mt-5 inline-flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.16em]">
                  Read article <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          </Reveal>
          <div className="flex flex-col gap-4 lg:col-span-5">
            {supporting.map((article, index) => (
              <Reveal key={article.slug} delay={0.08 * (index + 1)}>
                <Link href={`/blog/${article.slug}`} className="group grid gap-4 border border-line p-4 sm:grid-cols-[140px_1fr] md:p-5">
                  <div className="overflow-hidden border border-line">
                    <CoverArt variant={article.cover} className="aspect-[4/3] w-full transition-transform duration-700 group-hover:scale-105 sm:aspect-auto sm:h-full" />
                  </div>
                  <div>
                    <CategoryMark id={article.category} />
                    <h3 className="mt-3 font-display text-2xl uppercase leading-[0.95] tracking-[-0.04em] group-hover:text-lime">
                      {article.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-mist">{article.excerpt}</p>
                    <p className="mt-4 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-mist">
                      {formatDate(article.publishedAt)} · {article.readingMinutes} min read
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
