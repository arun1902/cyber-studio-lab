import type { Article } from "@/data/articles";

export function ArticleBody({ article }: { article: Article }) {
  return (
    <div className="prose-lab">
      {article.content.map((block, index) => {
        if (block.type === "h2") {
          return (
            <h2 key={block.id} id={block.id}>
              {block.text}
            </h2>
          );
        }
        if (block.type === "p") {
          return <p key={index} className="mt-5">{block.text}</p>;
        }
        if (block.type === "ul") {
          return (
            <ul key={index}>
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          );
        }
        if (block.type === "quote") {
          return (
            <blockquote key={index} className="my-8 border-l border-lime pl-5 font-display text-2xl leading-snug tracking-[-0.03em] text-paper">
              {block.text}
            </blockquote>
          );
        }
        return (
          <p key={index} className="mt-6 border border-line bg-surface p-4 font-mono text-xs leading-6 text-mist">
            {block.text}
          </p>
        );
      })}
    </div>
  );
}
