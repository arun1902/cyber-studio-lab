"use client";

import { search } from "@/lib/search";
import type { SearchKind } from "@/lib/search";
import { cn } from "@/lib/utils";
import { BookOpen, CornerDownLeft, FileText, Lightbulb, Map as MapIcon, PlayCircle, Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

const kinds: Array<SearchKind | "All"> = ["All", "Blog", "Tutorial", "Video", "Tip", "Topic"];

const kindIcon = {
  Blog: FileText,
  Tutorial: BookOpen,
  Video: PlayCircle,
  Tip: Lightbulb,
  Topic: MapIcon,
} as const;

const suggestions = ["rate limiting", "docker", "postgresql", "kubernetes", "nginx", "aws", "prompt injection"];

export function SearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return <SearchPanel onClose={onClose} />;
}

function SearchPanel({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState<SearchKind | "All">("All");
  const [active, setActive] = useState(0);

  const results = useMemo(() => search(query, kind, query.trim() ? 30 : 8), [query, kind]);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    inputRef.current?.focus();
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  useEffect(() => {
    listRef.current?.querySelector<HTMLElement>(`[data-index="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active]);

  function go(href: string) {
    onClose();
    router.push(href);
  }

  function onKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Escape") {
      onClose();
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((current) => Math.min(current + 1, results.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((current) => Math.max(current - 1, 0));
    } else if (event.key === "Enter" && results[active]) {
      event.preventDefault();
      go(results[active].href);
    }
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center px-4 pt-[10vh]" role="presentation" onKeyDown={onKeyDown}>
      <button className="absolute inset-0 bg-ink/80 backdrop-blur-md" aria-label="Close search" onClick={onClose} tabIndex={-1} />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search CyberStudioLab"
        className="relative z-10 flex max-h-[80vh] w-full max-w-2xl flex-col border border-line bg-surface-strong shadow-[var(--shadow)]"
      >
        <div className="flex items-center gap-3 border-b border-line px-4">
          <Search className="h-4 w-4 shrink-0 text-cyan" aria-hidden="true" />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActive(0);
            }}
            className="field border-0 py-4"
            placeholder="Search blogs, tutorials, videos, tips, topics"
            aria-label="Search"
            aria-controls="search-results"
            aria-activedescendant={results[active] ? `search-${results[active].id}` : undefined}
            role="combobox"
            aria-expanded="true"
            autoComplete="off"
            spellCheck={false}
          />
          <button type="button" onClick={onClose} className="text-mist hover:text-paper" aria-label="Close search">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="flex gap-1.5 overflow-x-auto border-b border-line px-4 py-2.5" role="group" aria-label="Filter results">
          {kinds.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => {
                setKind(item);
                setActive(0);
                inputRef.current?.focus();
              }}
              aria-pressed={kind === item}
              className={cn(
                "shrink-0 border px-2.5 py-1 font-mono text-[0.64rem] uppercase tracking-[0.14em]",
                kind === item ? "border-cyan bg-cyan text-on-accent" : "border-line text-mist hover:border-cyan hover:text-paper",
              )}
            >
              {item === "All" ? "All" : `${item}s`}
            </button>
          ))}
        </div>

        {!query.trim() && (
          <div className="flex flex-wrap items-center gap-2 px-4 pt-3">
            <span className="font-mono text-[0.64rem] uppercase tracking-[0.14em] text-mist">Try</span>
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => {
                  setQuery(suggestion);
                  setActive(0);
                  inputRef.current?.focus();
                }}
                className="font-mono text-[0.7rem] text-yellow hover:text-paper"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}

        <ul ref={listRef} id="search-results" role="listbox" className="flex-1 overflow-auto p-2">
          {results.length === 0 && (
            <li className="px-3 py-10 text-center font-mono text-xs uppercase tracking-[0.16em] text-mist">
              No results for &ldquo;{query.trim()}&rdquo;
            </li>
          )}
          {results.map((result, index) => {
            const Icon = kindIcon[result.kind];
            const selected = index === active;
            return (
              <li key={result.id} id={`search-${result.id}`} role="option" aria-selected={selected} data-index={index}>
                <button
                  type="button"
                  onClick={() => go(result.href)}
                  onMouseMove={() => setActive(index)}
                  className={cn(
                    "flex w-full items-start gap-3 border px-3 py-3 text-left",
                    selected ? "border-cyan/40 bg-cyan/5" : "border-transparent",
                  )}
                >
                  <Icon className={cn("mt-0.5 h-4 w-4 shrink-0", selected ? "text-cyan" : "text-mist")} aria-hidden="true" />
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-mist">
                      <span className="text-yellow">{result.kind}</span>
                      {result.topic && <span>· {result.topic}</span>}
                    </span>
                    <span className="mt-1 block font-display text-lg leading-snug tracking-[-0.02em]">{result.title}</span>
                    <span className="mt-0.5 block truncate text-sm text-mist">{result.summary}</span>
                  </span>
                  {selected && <CornerDownLeft className="mt-1 h-3.5 w-3.5 shrink-0 text-cyan" aria-hidden="true" />}
                </button>
              </li>
            );
          })}
        </ul>
        <div className="flex items-center justify-between border-t border-line px-4 py-2 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-mist">
          <span>↑ ↓ to navigate · Enter to open · Esc to close</span>
          <span>{results.length} results</span>
        </div>
      </div>
    </div>
  );
}
