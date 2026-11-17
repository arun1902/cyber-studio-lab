import { PageHero } from "@/components/layout/page-hero";
import { CategoryMark } from "@/components/ui/category-mark";
import { categories } from "@/data/categories";
import { getArticlesByCategory } from "@/data/articles";
import { pageMeta } from "@/lib/metadata";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

export const metadata = pageMeta(
  "Explore",
  "Four fields inside Cyber Studio Lab: basics, privacy, ethical hacking, and digital tools.",
  "/explore",
);

export default function ExplorePage() {
  return (
    <>
      <PageHero index="01" kicker="The map" title="Explore the lab">
        Four territories, one habit: understand the ordinary threats well enough to make a calmer decision the next time something asks for a click.
      </PageHero>
      <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-8 md:py-24">
        {categories.map((category) => {
          const pieces = getArticlesByCategory(category.id);
          return (
            <section key={category.id} id={category.id} className="scroll-mt-28 border-t border-line py-14 md:py-20">
              <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
                <div>
                  <p className="font-display text-7xl leading-none tracking-[-0.06em] text-lime/80">{category.index}</p>
                  <h2 className="mt-4 font-display text-5xl uppercase leading-[0.9] tracking-[-0.045em]">{category.title}</h2>
                  <p className="mt-5 max-w-md text-mist">{category.description}</p>
                  <p className="mt-4 font-mono text-xs uppercase tracking-[0.16em] text-paper/70">{category.note}</p>
                </div>
                <ul>
                  {pieces.map((article) => (
                    <li key={article.slug} className="border-b border-line">
                      <Link href={`/blog/${article.slug}`} className="group grid gap-2 py-5 md:grid-cols-[140px_1fr_auto] md:items-center">
                        <CategoryMark id={article.category} />
                        <span>
                          <span className="block font-display text-2xl tracking-[-0.04em] group-hover:text-lime">{article.title}</span>
                          <span className="mt-1 block text-sm text-mist">{article.excerpt}</span>
                        </span>
                        <span className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-mist">
                          {article.format === "tutorial" ? "Tutorial" : "Essay"} · {formatDate(article.publishedAt)}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}
