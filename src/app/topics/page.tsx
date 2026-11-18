import { PageHero } from "@/components/layout/page-hero";
import { KindBadge } from "@/components/ui/topic-mark";
import { articleHref, getArticlesByTopic } from "@/data/articles";
import { tips } from "@/data/tips";
import { pillars, topics } from "@/data/topics";
import { videos } from "@/data/videos";
import { pageMeta } from "@/lib/metadata";
import Link from "next/link";

export const metadata = pageMeta(
  "Topics",
  "Thirteen topics across software development, security, cloud, DevOps, and AI, from beginner concepts to production engineering.",
  "/topics",
);

export default function TopicsPage() {
  return (
    <>
      <PageHero index="00" kicker="Topics" title="Everything developers need to build better and more secure technology.">
        Thirteen topics grouped into three pillars. Each one collects the blogs, tutorials, videos, and tips that belong to it.
      </PageHero>
      <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-8 md:py-20">
        {topics.map((topic) => {
          const pieces = getArticlesByTopic(topic.id);
          const tipCount = tips.filter((tip) => tip.topic === topic.id).length;
          const videoCount = videos.filter((video) => video.topic === topic.id).length;
          return (
            <section key={topic.id} id={topic.id} className="scroll-mt-28 border-t border-line py-12 md:py-14">
              <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
                <div>
                  <p className="flex items-center gap-4">
                    <span className="font-display text-5xl leading-none tracking-[-0.06em] text-cyan/80">{topic.index}</span>
                    <span className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-yellow">{pillars[topic.pillar].label}</span>
                  </p>
                  <h2 className="mt-4 font-display text-3xl leading-tight tracking-[-0.03em] md:text-4xl">{topic.title}</h2>
                  <p className="mt-4 max-w-md text-mist">{topic.description}</p>
                  <p className="mt-4 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-paper/60">
                    {pieces.length} guides · {videoCount} videos · {tipCount} tips
                  </p>
                </div>
                {pieces.length > 0 ? (
                  <ul>
                    {pieces.map((article) => (
                      <li key={article.slug} className="border-b border-line">
                        <Link href={articleHref(article)} className="group grid gap-2 py-4 md:grid-cols-[100px_1fr] md:items-center">
                          <KindBadge>{article.format === "tutorial" ? "Tutorial" : "Blog"}</KindBadge>
                          <span>
                            <span className="block font-display text-xl tracking-[-0.03em] group-hover:text-cyan">{article.title}</span>
                            <span className="mt-1 block text-sm text-mist">{article.excerpt}</span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="self-center border border-dashed border-line p-6 font-mono text-xs uppercase tracking-[0.14em] text-mist">
                    First guides for this topic are being written.
                  </p>
                )}
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}
