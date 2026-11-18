import { topics } from "@/data/topics";

export function Marquee() {
  const row = [...topics, ...topics];
  return (
    <div className="overflow-hidden border-y border-line py-4" aria-hidden="true">
      <div className="marquee-track font-mono text-xs uppercase tracking-[0.28em] text-mist">
        {row.map((topic, index) => (
          <span key={`${topic.id}-${index}`} className="flex items-center gap-10 whitespace-nowrap">
            {topic.short}
            <span className={index % 2 === 0 ? "text-cyan" : "text-yellow"}>/</span>
          </span>
        ))}
      </div>
    </div>
  );
}
