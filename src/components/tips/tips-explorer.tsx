"use client";

import { InlineText } from "@/components/blog/article-body";
import { CodeBlock } from "@/components/blog/code-block";
import { FilterChip } from "@/components/ui/filter-chip";
import { KindBadge, TopicMark } from "@/components/ui/topic-mark";
import type { Tip, TipKind } from "@/data/tips";
import { topics } from "@/data/topics";
import type { TopicId } from "@/data/topics";
import { useMemo, useState } from "react";

const kinds: TipKind[] = ["Command", "Config", "Code", "Practice"];

export function TipsExplorer({ tips }: { tips: Tip[] }) {
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState<TopicId | "all">("all");
  const [kind, setKind] = useState<TipKind | "all">("all");

  const availableTopics = useMemo(() => topics.filter((item) => tips.some((tip) => tip.topic === item.id)), [tips]);

  const filtered = useMemo(() => {
    const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    return tips.filter((tip) => {
      if (topic !== "all" && tip.topic !== topic) return false;
      if (kind !== "all" && tip.kind !== kind) return false;
      const text = `${tip.title} ${tip.detail} ${tip.code?.code ?? ""}`.toLowerCase();
      return terms.every((term) => text.includes(term));
    });
  }, [kind, query, tips, topic]);

  return (
    <div className="mx-auto max-w-[1440px] px-5 py-14 md:px-8 md:py-20">
      <div className="space-y-6 border-b border-line pb-8">
        <label className="block w-full max-w-xl">
          <span className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-mist">Search tips</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="kubectl, EXPLAIN, ssh, timeouts"
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
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by type">
          <FilterChip tone="yellow" active={kind === "all"} onClick={() => setKind("all")}>
            Any type
          </FilterChip>
          {kinds.map((item) => (
            <FilterChip tone="yellow" key={item} active={kind === item} onClick={() => setKind(item)}>
              {item}
            </FilterChip>
          ))}
        </div>
      </div>

      <p className="mt-6 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-mist" aria-live="polite">
        {filtered.length} {filtered.length === 1 ? "tip" : "tips"}
      </p>

      {filtered.length === 0 ? (
        <p className="py-20 text-center font-mono text-xs uppercase tracking-[0.18em] text-mist">
          No tips match. Try another keyword or clear the filters.
        </p>
      ) : (
        <ul className="mt-6 columns-1 gap-5 lg:columns-2">
          {filtered.map((tip) => (
            <li key={tip.id} id={tip.id} className="mb-5 break-inside-avoid scroll-mt-28 border border-line bg-surface p-5 target:border-cyan">
              <span className="flex flex-wrap items-center gap-3">
                <KindBadge>{tip.kind}</KindBadge>
                <TopicMark id={tip.topic} />
              </span>
              <h2 className="mt-4 font-display text-xl leading-snug tracking-[-0.02em]">{tip.title}</h2>
              <p className="prose-lab mt-3 !text-[0.95rem] leading-7 text-mist">
                <InlineText text={tip.detail} />
              </p>
              {tip.code && (
                <div className="prose-lab">
                  <CodeBlock code={tip.code.code} lang={tip.code.lang} />
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
