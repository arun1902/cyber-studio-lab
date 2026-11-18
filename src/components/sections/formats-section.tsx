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
    body: "Technical knowledge, engineering best practices, security explanations, and industry insights.",
    count: () => `${getBlogs().length} articles`,
  },
  {
    href: "/tutorials",
    icon: BookOpen,
    title: "Tutorials",
    body: "Step-by-step practical guides with code, commands, configurations, and real implementations.",
    count: () => `${getTutorials().length} guides`,
  },
  {
    href: "/videos",
    icon: PlayCircle,
    title: "Animated Videos",
    body: "Visual explanations of complex technologies, cyberattacks, vulnerabilities, and their solutions.",
    count: () => `${videos.length} in the pipeline`,
  },
  {
    href: "/tips",
    icon: Lightbulb,
    title: "Tips & Tricks",
    body: "Coding improvements, productivity, configuration recommendations, parameter explanations, and tools.",
    count: () => `${tips.length} tips`,
  },
];

export function FormatsSection() {
  return (
    <section id="formats" className="scroll-mt-24 px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-[1440px]">
        <Reveal>
          <SectionLabel index="01">Four ways to learn</SectionLabel>
          <h2 className="max-w-4xl font-display text-[clamp(2.6rem,6vw,5.2rem)] leading-[0.95] tracking-[-0.045em]">
            Read it, follow it, watch it, use it.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {formats.map(({ href, icon: Icon, title, body, count }, index) => (
            <Reveal key={href} delay={index * 0.06}>
              <Link
                href={href}
                className="group flex h-full min-h-72 flex-col justify-between border border-line bg-surface p-6 transition-colors duration-300 hover:border-cyan/50 md:p-7"
              >
                <div className="flex items-start justify-between">
                  <Icon className="h-7 w-7 text-cyan" aria-hidden="true" />
                  <ArrowUpRight className="h-5 w-5 text-mist transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-yellow" />
                </div>
                <div>
                  <h3 className="font-display text-3xl tracking-[-0.035em] group-hover:text-cyan">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-mist">{body}</p>
                  <p className="mt-5 font-mono text-[0.66rem] uppercase tracking-[0.16em] text-yellow">{count()}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
