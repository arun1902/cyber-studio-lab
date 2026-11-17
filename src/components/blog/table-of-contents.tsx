"use client";

import { useEffect, useState } from "react";

export function TableOfContents({ items }: { items: { id: string; text: string }[] }) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((node): node is HTMLElement => Boolean(node));
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: [0.2, 0.6] },
    );
    headings.forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav aria-label="On this page" className="lg:sticky lg:top-28">
      <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-lime">On this page</p>
      <ol className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`block text-sm leading-5 ${active === item.id ? "text-paper" : "text-mist hover:text-paper"}`}
              aria-current={active === item.id ? "location" : undefined}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
