import { Reveal } from "@/components/animations/reveal";
import { CoverArt } from "@/components/ui/cover-art";
import { SectionLabel } from "@/components/ui/section-label";
import { KindBadge, TopicMark } from "@/components/ui/topic-mark";
import { videos } from "@/data/videos";
import { ArrowUpRight, Play } from "lucide-react";
import Link from "next/link";

export function VideosSection() {
  const featured = [...videos]
    .sort((a, b) => {
      const order = { "In production": 0, Scripted: 1, Planned: 2 } as const;
      return order[a.status] - order[b.status];
    })
    .slice(0, 3);

  return (
    <section id="videos" className="scroll-mt-24 border-t border-line px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-[1200px]">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <SectionLabel index="03">Video tutorials</SectionLabel>
              <h2 className="max-w-3xl font-display text-[clamp(2.2rem,5vw,3.75rem)] leading-[1] tracking-[-0.04em]">
                See how it works — not just what it is.
              </h2>
              <p className="mt-4 max-w-xl text-mist">
                Short animated lessons that make protocols, attacks, and infrastructure easy to follow.
              </p>
            </div>
            <Link
              href="/videos"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface-strong px-4 py-2 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-cyan transition-colors hover:border-cyan/40"
            >
              All videos <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {featured.map((video, index) => (
            <Reveal key={video.slug} delay={index * 0.06}>
              <Link
                href={`/videos#${video.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface-strong shadow-[var(--shadow)] transition-transform duration-300 hover:-translate-y-0.5"
              >
                <div className="relative overflow-hidden border-b border-line">
                  <CoverArt variant={video.cover} showLabel={false} className="aspect-video w-full transition-transform duration-500 group-hover:scale-[1.03]" />
                  <span className="absolute inset-0 grid place-items-center" aria-hidden="true">
                    <span className="grid h-12 w-12 place-items-center rounded-full bg-cyan text-on-accent shadow-lg">
                      <Play className="ml-0.5 h-5 w-5 fill-current" />
                    </span>
                  </span>
                  <span className="absolute bottom-3 right-3 rounded-md bg-paper/90 px-2 py-1 font-mono text-[0.65rem] text-ink">
                    {video.duration}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <span className="flex flex-wrap items-center gap-3">
                    <KindBadge>{video.status}</KindBadge>
                    <TopicMark id={video.topic} />
                  </span>
                  <h3 className="mt-3 font-display text-xl leading-tight tracking-[-0.03em] group-hover:text-cyan">
                    {video.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-mist">{video.synopsis}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
