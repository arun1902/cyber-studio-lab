"use client";

import { articles } from "@/data/articles";
import { CategoryMark } from "@/components/ui/category-mark";
import { Search, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useRef } from "react";

export function SearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const queryRef = useRef("");
  const listRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => articles, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    inputRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  function filter(value: string) {
    queryRef.current = value;
    const needle = value.trim().toLowerCase();
    const nodes = listRef.current?.querySelectorAll<HTMLAnchorElement>("[data-search-item]");
    nodes?.forEach((node) => {
      const haystack = node.dataset.haystack ?? "";
      node.hidden = needle.length > 0 && !haystack.includes(needle);
    });
    const empty = listRef.current?.querySelector<HTMLElement>("[data-empty]");
    if (empty && nodes) {
      const visible = Array.from(nodes).some((node) => !node.hidden);
      empty.hidden = visible;
    }
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center px-4 pt-[12vh]" role="presentation">
      <button className="absolute inset-0 bg-ink/80 backdrop-blur-md" aria-label="Close search" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search the lab"
        className="relative z-10 w-full max-w-2xl border border-line bg-surface-strong shadow-[var(--shadow)]"
      >
        <div className="flex items-center gap-3 border-b border-line px-4">
          <Search className="h-4 w-4 text-lime" aria-hidden="true" />
          <input
            ref={inputRef}
            className="field border-0 py-4"
            placeholder="Search essays, tutorials, habits"
            aria-label="Search articles"
            onChange={(event) => filter(event.target.value)}
          />
          <button type="button" onClick={onClose} className="text-mist hover:text-paper" aria-label="Close search">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div ref={listRef} className="max-h-[50vh] overflow-auto p-2">
          <p data-empty hidden className="px-3 py-8 text-center font-mono text-xs uppercase tracking-[0.16em] text-mist">
            No signals match that query.
          </p>
          {results.map((article) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              data-search-item
              data-haystack={`${article.title} ${article.excerpt} ${article.tags.join(" ")}`.toLowerCase()}
              onClick={onClose}
              className="flex flex-col gap-2 border border-transparent px-3 py-3 hover:border-line hover:bg-surface"
            >
              <CategoryMark id={article.category} />
              <span className="font-display text-xl tracking-[-0.04em]">{article.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
