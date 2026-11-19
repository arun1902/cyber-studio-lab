import { Reveal } from "@/components/animations/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { getBlogs, getTutorials } from "@/data/articles";
import { tips } from "@/data/tips";
import { videos } from "@/data/videos";
import { ArrowUpRight, BookOpen, FileText, Lightbulb, PlayCircle } from "lucide-react";
import Link from "next/link";

const formats = [
  {
    href: "/blog",
    icon: FileText,
    title: "Blogs",
    body: "Clear explanations of engineering and security ideas — written for beginners first.",
    count: () => `${getBlogs().length} articles`,
    accent: "text-cyan bg-cyan/10",
  },
  {
    href: "/tutorials",
    icon: BookOpen,
    title: "Tutorials",
    body: "Step-by-step guides with code, commands, and configs you can follow along.",
    count: () => `${getTutorials().length} guides`,
    accent: "text-yellow bg-yellow/10",
  },
  {
    href: "/videos",
    icon: PlayCircle,
    title: "Video lessons",
    body: "Animated walkthroughs of attacks, protocols, and infrastructure concepts.",
    count: () => `${videos.length} in the pipeline`,
    accent: "text-cyan bg-cyan/10",
  },
  {
    href: "/tips",
    icon: Lightbulb,
    title: "Tips & tricks",
    body: "Small, practical improvements for coding, tools, and everyday security habits.",
    count: () => `${tips.length} tips`,
    accent: "text-yellow bg-yellow/10",
  },
];

export function FormatsSection() {
  return (
    <section id="formats" className="scroll-mt-24 px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-[1200px]">
        <Reveal>
          <SectionLabel index="02">Explore by format</SectionLabel>
          <h2 className="max-w-3xl font-display text-[clamp(2.2rem,5vw,3.75rem)] leading-[1] tracking-[-0.04em]">
            Four clear ways to learn.
          </h2>
          <p className="mt-4 max-w-xl text-mist">
            Pick what fits you today — reading, hands-on steps, watching, or quick tips.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {formats.map(({ href, icon: Icon, title, body, count, accent }, index) => (
            <Reveal key={href} delay={index * 0.05}>
              <Link
                href={href}
                className="group flex h-full min-h-64 flex-col justify-between rounded-2xl border border-line bg-surface-strong p-6 shadow-[var(--shadow)] transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan/30 md:p-7"
              >
                <div className="flex items-start justify-between">
                  <span className={`grid h-11 w-11 place-items-center rounded-xl ${accent}`}>
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <ArrowUpRight className="h-5 w-5 text-mist transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan" />
                </div>
                <div>
                  <h3 className="font-display text-2xl tracking-[-0.03em] group-hover:text-cyan">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-mist">{body}</p>
                  <p className="mt-5 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-yellow">{count()}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
