import { Reveal } from "@/components/animations/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { pillars, topics } from "@/data/topics";
import {
  Boxes,
  Brain,
  Cloud,
  Code2,
  Container,
  Database,
  GitBranch,
  Lock,
  Network,
  Server,
  Shield,
  Sparkles,
  Wrench,
} from "lucide-react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import type { TopicId } from "@/data/topics";

const topicIcons: Record<TopicId, LucideIcon> = {
  "software-development": Code2,
  "clean-code": Sparkles,
  "backend-api": Server,
  "database-system-design": Database,
  "app-api-security": Shield,
  "ethical-hacking": Lock,
  cloud: Cloud,
  "devops-devsecops": GitBranch,
  "docker-kubernetes": Container,
  "linux-networking": Network,
  "ai-llm": Brain,
  "ai-security": Boxes,
  "developer-tools": Wrench,
};

const pillarColor = {
  build: "bg-cyan/10 text-cyan",
  secure: "bg-yellow/10 text-yellow",
  operate: "bg-blue/10 text-blue",
} as const;

export function TopicsSection() {
  return (
    <section className="border-t border-line px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-[1200px]">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <SectionLabel index="05">Learning categories</SectionLabel>
              <h2 className="max-w-3xl font-display text-[clamp(2.2rem,5vw,3.75rem)] leading-[1] tracking-[-0.04em]">
                Explore topics the easy way.
              </h2>
              <p className="mt-4 max-w-xl text-mist">
                Clear categories across build, secure, and operate — click any card to dive in.
              </p>
            </div>
            <Link
              href="/topics"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface-strong px-4 py-2 text-sm font-semibold text-cyan transition-colors hover:border-cyan/40"
            >
              View all topics
            </Link>
          </div>
        </Reveal>

        <div className="mt-10 flex flex-wrap gap-2">
          {(Object.keys(pillars) as Array<keyof typeof pillars>).map((pillar) => (
            <span
              key={pillar}
              className={`rounded-full px-3 py-1 text-sm font-medium ${pillarColor[pillar]}`}
            >
              {pillars[pillar].label}: {pillars[pillar].note}
            </span>
          ))}
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {topics.map((topic, index) => {
            const Icon = topicIcons[topic.id];
            return (
              <Reveal key={topic.id} delay={Math.min(index * 0.03, 0.24)}>
                <Link
                  href={`/topics#${topic.id}`}
                  className="group flex h-full flex-col rounded-2xl border border-line bg-surface-strong p-5 shadow-[var(--shadow)] transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan/30"
                >
                  <span className={`grid h-10 w-10 place-items-center rounded-xl ${pillarColor[topic.pillar]}`}>
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-display text-lg leading-snug tracking-[-0.02em] group-hover:text-cyan">
                    {topic.short}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-mist">{topic.description}</p>
                  <p className="mt-4 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-mist">
                    {pillars[topic.pillar].label}
                  </p>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
