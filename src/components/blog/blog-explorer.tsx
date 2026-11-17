"use client";

import { CategoryMark } from "@/components/ui/category-mark";
import { CoverArt } from "@/components/ui/cover-art";
import type { Article } from "@/data/articles";
import { categories } from "@/data/categories";
import type { CategoryId } from "@/data/categories";
import { formatDate } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

export function BlogExplorer({ articles }: { articles: Article[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryId | "all">("all");

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return articles.filter((article) => {
      const categoryOk = category === "all" || article.category === category;
      const text = `${article.title} ${article.excerpt} ${article.tags.join(" ")}`.toLowerCase();
      return categoryOk && (needle.length === 0 || text.includes(needle));
    });
  }, [articles, category, query]);

  const showFeatured = query.trim().length === 0 && category === "all";
  const featured = showFeatured ? filtered.find((article) => article.featured) ?? filtered[0] : undefined;
  const list = featured ? filtered.filter((article) => article.slug !== featured.slug) : filtered;

  return (
    <div className="mx-auto max-w-[1440px] px-5 py-14 md:px-8 md:py-20">
      <div className="flex flex-col gap-6 border-b border-line pb-8 lg:flex-row lg:items-end lg:justify-between">
        <label className="block w-full max-w-md">
          <span className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-mist">Search the archive</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Passwords, privacy, headers"
            className="field"
            aria-label="Search articles"
          />
        </label>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
          <FilterChip active={category === "all"} onClick={() => setCategory("all")}>
            All
          </FilterChip>
          {categories.map((item) => (
            <FilterChip key={item.id} active={category === item.id} onClick={() => setCategory(item.id)}>
              {item.short}
            </FilterChip>
          ))}
        </div>
      </div>

      {featured && (
        <Link href={`/blog/${featured.slug}`} className="group mt-10 grid items-stretch gap-6 lg:grid-cols-[1.3fr_1fr]">
          <div className="overflow-hidden border border-line">
            <CoverArt variant={featured.cover} className="aspect-[16/9] w-full transition-transform duration-700 group-hover:scale-[1.03]" />
          </div>
          <div className="flex flex-col justify-end">
            <CategoryMark id={featured.category} />
            <h2 className="mt-4 font-display text-4xl uppercase leading-[0.92] tracking-[-0.045em] group-hover:text-lime md:text-6xl">
              {featured.title}
            </h2>
            <p className="mt-4 max-w-xl text-mist">{featured.excerpt}</p>
            <p className="mt-6 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-mist">
              {formatDate(featured.publishedAt)} · {featured.readingMinutes} min · Featured
            </p>
          </div>
        </Link>
      )}

      {list.length === 0 && !featured ? (
        <p className="py-20 text-center font-mono text-xs uppercase tracking-[0.18em] text-mist">No signals match that query.</p>
      ) : (
        <ul className="mt-12 border-t border-line">
          {list.map((article, index) => (
            <li key={article.slug}>
              <Link href={`/blog/${article.slug}`} className="group grid gap-3 border-b border-line py-7 md:grid-cols-[80px_160px_1fr_auto] md:items-center">
                <span className="font-mono text-xs text-mist">{String(index + 1).padStart(2, "0")}</span>
                <CategoryMark id={article.category} />
                <span>
                  <span className="block font-display text-2xl tracking-[-0.04em] group-hover:text-lime md:text-3xl">{article.title}</span>
                  <span className="mt-2 block max-w-2xl text-sm text-mist">{article.excerpt}</span>
                </span>
                <span className="flex items-center gap-3 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-mist">
                  {formatDate(article.publishedAt)} · {article.readingMinutes} min
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-lime" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`border px-3 py-2 font-mono text-[0.68rem] uppercase tracking-[0.14em] ${active ? "border-lime bg-lime text-on-accent" : "border-line text-paper hover:border-lime"}`}
    >
      {children}
    </button>
  );
}
