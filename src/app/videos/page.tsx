import { PageHero } from "@/components/layout/page-hero";
import { CoverArt } from "@/components/ui/cover-art";
import { KindBadge, TopicMark } from "@/components/ui/topic-mark";
import { SocialIcon } from "@/components/ui/social-icon";
import { articleHref, getArticle } from "@/data/articles";
import { socialLinks } from "@/data/social-links";
import { videos } from "@/data/videos";
import type { VideoStatus } from "@/data/videos";
import { pageMeta } from "@/lib/metadata";
import { ArrowUpRight, Play } from "lucide-react";
import Link from "next/link";

export const metadata = pageMeta(
  "Animated Videos",
  "Animated visual explanations of complex technologies, cyberattacks, vulnerabilities, and the fixes that stop them.",
  "/videos",
);

const statusOrder: VideoStatus[] = ["In production", "Scripted", "Planned"];

export default function VideosPage() {
  const youtube = socialLinks.find((link) => link.platform === "youtube");
  const sorted = [...videos].sort((a, b) => statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status));

  return (
    <>
      <PageHero index="03" kicker="Animated videos" title="See how it works, not just what it is.">
        Animated explanations of protocols, attacks, and infrastructure. Each video follows one idea from start to finish and links to a written guide with the configs and code.
      </PageHero>
      <div className="mx-auto max-w-[1200px] px-5 py-16 md:px-8">
        <div className="flex flex-col gap-4 rounded-2xl border border-line bg-surface-strong p-5 shadow-[var(--shadow)] md:flex-row md:items-center md:justify-between">
          <p className="max-w-2xl text-sm leading-6 text-mist">
            The first episodes are in production. Subscribe on YouTube to get them as they are released; this page lists what is coming and in what order.
          </p>
          {youtube && (
            <a
              href={youtube.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 shrink-0 items-center gap-2 rounded-xl bg-cyan px-5 font-semibold text-on-accent transition-opacity hover:opacity-90"
            >
              <SocialIcon platform="youtube" className="h-4 w-4" />
              Subscribe
            </a>
          )}
        </div>
        <ul className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {sorted.map((video) => {
            const related = video.relatedSlug ? getArticle(video.relatedSlug) : undefined;
            return (
              <li key={video.slug} id={video.slug} className="flex scroll-mt-28 flex-col overflow-hidden rounded-2xl border border-line bg-surface-strong shadow-[var(--shadow)]">
                <div className="relative overflow-hidden border-b border-line">
                  <CoverArt variant={video.cover} showLabel={false} className="aspect-video w-full" />
                  <span className="absolute inset-0 grid place-items-center" aria-hidden="true">
                    <span className="grid h-14 w-14 place-items-center rounded-full bg-cyan text-on-accent shadow-lg">
                      <Play className="ml-0.5 h-5 w-5 fill-current" />
                    </span>
                  </span>
                  <span className="absolute bottom-3 right-3 rounded-md bg-paper/90 px-2 py-1 font-mono text-[0.65rem] text-ink">{video.duration}</span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <span className="flex flex-wrap items-center gap-3">
                    <KindBadge>{video.status}</KindBadge>
                    <TopicMark id={video.topic} />
                  </span>
                  <h2 className="mt-4 font-display text-2xl leading-tight tracking-[-0.03em]">{video.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-mist">{video.synopsis}</p>
                  <ol className="mt-5 space-y-1.5 border-t border-line pt-4">
                    {video.chapters.map((chapter, index) => (
                      <li key={chapter} className="flex gap-3 text-sm text-paper/80">
                        <span className="font-mono text-[0.68rem] text-cyan">{String(index + 1).padStart(2, "0")}</span>
                        {chapter}
                      </li>
                    ))}
                  </ol>
                  {related && (
                    <Link
                      href={articleHref(related)}
                      className="mt-auto inline-flex items-center gap-2 pt-6 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-yellow hover:text-paper"
                    >
                      Read the companion {related.format === "tutorial" ? "tutorial" : "blog"}
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
