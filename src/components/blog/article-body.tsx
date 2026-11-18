import { CodeBlock } from "@/components/blog/code-block";
import type { Article } from "@/data/articles";
import { AlertTriangle, Lightbulb } from "lucide-react";

export function InlineText({ text }: { text: string }) {
  const parts = text.split(/(`[^`]+`)/g);
  return (
    <>
      {parts.map((part, index) =>
        part.startsWith("`") && part.endsWith("`") ? <code key={index}>{part.slice(1, -1)}</code> : part,
      )}
    </>
  );
}

export function ArticleBody({ article }: { article: Article }) {
  return (
    <div className="prose-lab">
      {article.content.map((block, index) => {
        switch (block.type) {
          case "h2":
            return (
              <h2 key={block.id} id={block.id} className="scroll-mt-28">
                {block.text}
              </h2>
            );
          case "h3":
            return <h3 key={index}>{block.text}</h3>;
          case "p":
            return (
              <p key={index} className="mt-5">
                <InlineText text={block.text} />
              </p>
            );
          case "ul":
            return (
              <ul key={index}>
                {block.items.map((item) => (
                  <li key={item}>
                    <InlineText text={item} />
                  </li>
                ))}
              </ul>
            );
          case "quote":
            return (
              <blockquote key={index} className="my-8 border-l-2 border-yellow pl-5 font-display text-2xl leading-snug tracking-[-0.03em] text-paper">
                {block.text}
              </blockquote>
            );
          case "callout": {
            const Icon = block.tone === "warning" ? AlertTriangle : Lightbulb;
            return (
              <div
                key={index}
                className={`my-6 flex gap-3 border p-4 ${block.tone === "warning" ? "border-yellow/40 bg-yellow/5" : "border-cyan/40 bg-cyan/5"}`}
              >
                <Icon className={`mt-1 h-4 w-4 shrink-0 ${block.tone === "warning" ? "text-yellow" : "text-cyan"}`} aria-hidden="true" />
                <p className="!mt-0 !text-[0.98rem]">
                  <InlineText text={block.text} />
                </p>
              </div>
            );
          }
          case "code":
            return <CodeBlock key={index} code={block.code} lang={block.lang} filename={block.filename} />;
          case "table":
            return (
              <div key={index} className="my-6 overflow-x-auto">
                <table>
                  <thead>
                    <tr>
                      {block.head.map((cell) => (
                        <th key={cell}>{cell}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row) => (
                      <tr key={row[0]}>
                        {row.map((cell, cellIndex) => (
                          <td key={cellIndex}>
                            <InlineText text={cell} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case "note":
            return (
              <p key={index} className="mt-6 border border-line bg-surface p-4 font-mono text-xs leading-6 text-mist">
                {block.text}
              </p>
            );
        }
      })}
    </div>
  );
}
