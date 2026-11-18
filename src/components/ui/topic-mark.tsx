import { getTopic } from "@/data/topics";
import type { TopicId } from "@/data/topics";

export function TopicMark({ id }: { id: TopicId }) {
  const topic = getTopic(id);
  return (
    <span className="inline-flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-cyan">
      <span className="h-1.5 w-1.5 rounded-full bg-cyan" aria-hidden="true" />
      {topic.short}
    </span>
  );
}

export function KindBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex border border-yellow/40 px-1.5 py-0.5 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-yellow">
      {children}
    </span>
  );
}
