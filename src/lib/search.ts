import { articleHref, articles } from "@/data/articles";
import { tips } from "@/data/tips";
import { getTopic, topics } from "@/data/topics";
import { videos } from "@/data/videos";

export type SearchKind = "Blog" | "Tutorial" | "Video" | "Tip" | "Topic";

export type SearchItem = {
  id: string;
  kind: SearchKind;
  title: string;
  summary: string;
  href: string;
  topic?: string;
  titleLower: string;
  bodyLower: string;
};

function item(entry: Omit<SearchItem, "titleLower" | "bodyLower">, extra: string[] = []): SearchItem {
  return {
    ...entry,
    titleLower: entry.title.toLowerCase(),
    bodyLower: [entry.summary, entry.topic ?? "", ...extra].join(" ").toLowerCase(),
  };
}

export const searchIndex: SearchItem[] = [
  ...articles.map((article) =>
    item(
      {
        id: `article:${article.slug}`,
        kind: article.format === "tutorial" ? "Tutorial" : "Blog",
        title: article.title,
        summary: article.excerpt,
        href: articleHref(article),
        topic: getTopic(article.topics[0]).short,
      },
      [...article.tags, ...article.content.flatMap((block) => (block.type === "h2" ? [block.text] : []))],
    ),
  ),
  ...videos.map((video) =>
    item(
      {
        id: `video:${video.slug}`,
        kind: "Video",
        title: video.title,
        summary: video.synopsis,
        href: `/videos#${video.slug}`,
        topic: getTopic(video.topic).short,
      },
      video.chapters,
    ),
  ),
  ...tips.map((tip) =>
    item(
      {
        id: `tip:${tip.id}`,
        kind: "Tip",
        title: tip.title,
        summary: tip.detail,
        href: `/tips#${tip.id}`,
        topic: getTopic(tip.topic).short,
      },
      tip.code ? [tip.code.code] : [],
    ),
  ),
  ...topics.map((topic) =>
    item({
      id: `topic:${topic.id}`,
      kind: "Topic",
      title: topic.title,
      summary: topic.description,
      href: `/topics#${topic.id}`,
    }),
  ),
];

export function search(query: string, kind: SearchKind | "All" = "All", limit = 30) {
  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const pool = kind === "All" ? searchIndex : searchIndex.filter((entry) => entry.kind === kind);
  if (terms.length === 0) return pool.slice(0, limit);

  const scored: Array<{ entry: SearchItem; score: number }> = [];
  for (const entry of pool) {
    let score = 0;
    let matchedAll = true;
    for (const term of terms) {
      const inTitle = entry.titleLower.includes(term);
      const inBody = entry.bodyLower.includes(term);
      if (!inTitle && !inBody) {
        matchedAll = false;
        break;
      }
      score += inTitle ? (entry.titleLower.split(/\W+/).includes(term) ? 6 : 4) : 1;
    }
    if (matchedAll) scored.push({ entry, score });
  }
  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ entry }) => entry);
}
