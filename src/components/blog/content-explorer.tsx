"use client";

import { CoverArt } from "@/components/ui/cover-art";
import { FilterChip } from "@/components/ui/filter-chip";
import { KindBadge, TopicMark } from "@/components/ui/topic-mark";
import { articleHref } from "@/data/articles";
import type { Article, Level } from "@/data/articles";
import { topics } from "@/data/topics";
import type { TopicId } from "@/data/topics";
import { formatDate } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

const levels: Level[] = ["Beginner", "Intermediate", "Advanced"];

function parseLevel(value: string | null): Level | "all" {
  if (value === "Beginner" || value === "Intermediate" || value === "Advanced") return value;
  return "all";
}

export function ContentExplorer({ articles, placeholder }: { articles: Article[]; placeholder: string }) {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState<TopicId | "all">("all");
  const [level, setLevel] = useState<Level | "all">(() => parseLevel(searchParams.get("level")));

  const availableTopics = useMemo(
    () => topics.filter((item) => articles.some((article) => article.topics.includes(item.id))),
    [articles],
  );

  const filtered = useMemo(() => {
    const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    return articles.filter((article) => {
      if (topic !== "all" && !article.topics.includes(topic)) return false;
      if (level !== "all" && article.level !== level) return false;
      const text = `${article.title} ${article.excerpt} ${article.tags.join(" ")}`.toLowerCase();
      return terms.every((term) => text.includes(term));
    });
  }, [articles, level, query, topic]);

  const pristine = query.trim().length === 0 && topic === "all" && level === "all";
  const featured = pristine ? filtered.find((article) => article.featured) ?? filtered[0] : undefined;
  const list = featured ? filtered.filter((article) => article.slug !== featured.slug) : filtered;

  return (
    <div className="mx-auto max-w-[1200px] px-5 py-14 md:px-8 md:py-20">
      <div className="space-y-6 border-b border-line pb-8">
        <label className="block w-full max-w-xl">
          <span className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-mist">Search</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={placeholder}
            className="field"
            type="search"
          />
        </label>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by topic">
          <FilterChip active={topic === "all"} onClick={() => setTopic("all")}>
            All topics
          </FilterChip>
          {availableTopics.map((item) => (
            <FilterChip key={item.id} active={topic === item.id} onClick={() => setTopic(item.id)}>
              {item.short}
            </FilterChip>
          ))}
        </div>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by level">
          <FilterChip tone="yellow" active={level === "all"} onClick={() => setLevel("all")}>
            Any level
          </FilterChip>
          {levels.map((item) => (
            <FilterChip tone="yellow" key={item} active={level === item} onClick={() => setLevel(item)}>
              {item}
            </FilterChip>
          ))}
        </div>
      </div>

      {featured && (
        <Link href={articleHref(featured)} className="group mt-10 grid items-stretch gap-6 lg:grid-cols-[1.3fr_1fr]">
          <div className="overflow-hidden border border-line">
            <CoverArt variant={featured.cover} className="aspect-[16/9] w-full transition-transform duration-700 group-hover:scale-[1.03]" />
          </div>
          <div className="flex flex-col justify-end">
            <span className="flex flex-wrap items-center gap-3">
              <KindBadge>Featured</KindBadge>
              <TopicMark id={featured.topics[0]} />
            </span>
            <h2 className="mt-4 font-display text-4xl leading-[1] tracking-[-0.04em] group-hover:text-cyan md:text-5xl">
              {featured.title}
            </h2>
            <p className="mt-4 max-w-xl text-mist">{featured.excerpt}</p>
            <p className="mt-6 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-mist">
              {formatDate(featured.publishedAt)} · {featured.readingMinutes} min · {featured.level}
              {featured.duration ? ` · ${featured.duration}` : ""}
            </p>
          </div>
        </Link>
      )}

      {filtered.length === 0 ? (
        <p className="py-20 text-center font-mono text-xs uppercase tracking-[0.18em] text-mist">
          Nothing matches yet. Try a broader search or clear the filters.
        </p>
      ) : (
        <ul className="mt-12 border-t border-line">
          {list.map((article) => (
            <li key={article.slug}>
              <Link
                href={articleHref(article)}
                className="group grid gap-3 border-b border-line py-7 md:grid-cols-[170px_1fr_auto] md:items-center"
              >
                <span className="flex flex-col gap-2">
                  <TopicMark id={article.topics[0]} />
                  <span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-yellow">{article.level}</span>
                </span>
                <span>
                  <span className="block font-display text-2xl tracking-[-0.035em] group-hover:text-cyan md:text-3xl">{article.title}</span>
                  <span className="mt-2 block max-w-2xl text-sm text-mist">{article.excerpt}</span>
                </span>
                <span className="flex items-center gap-3 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-mist">
                  {formatDate(article.publishedAt)} · {article.duration ?? `${article.readingMinutes} min`}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
