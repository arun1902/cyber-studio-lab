import { PageHero } from "@/components/layout/page-hero";
import { pageMeta } from "@/lib/metadata";
import { site } from "@/lib/site";
import Link from "next/link";

export const metadata = pageMeta(
  "About",
  "CyberStudioLab is a developer and cybersecurity knowledge platform helping developers and IT professionals build better, more secure software and infrastructure.",
  "/about",
);

const principles = [
  {
    title: "Beyond the basics",
    body: "Definitions are everywhere. We focus on how to use a technology correctly: recommended settings, every important parameter, and the reasoning behind each choice.",
  },
  {
    title: "Security is part of engineering",
    body: "Secure systems come from good code, sound infrastructure, and careful operations. That is why we cover development, cloud, and DevOps alongside security.",
  },
  {
    title: "Practical and verifiable",
    body: "Every tutorial ends with a way to check the result. Every recommendation explains its trade-offs, so you can adapt it instead of copying it blindly.",
  },
  {
    title: "Ethical by default",
    body: "We explain how attacks work so defenders can stop them. Offensive techniques are taught for systems you own or are authorized to test.",
  },
];

const roadmap = [
  { stage: "Now", title: "Free content and community", body: "Blogs, tutorials, animated videos, and tips & tricks. Building authority and an audience first." },
  { stage: "Next", title: "Hands-on labs", body: "Interactive, isolated environments for breaking and fixing real configurations." },
  { stage: "Later", title: "Premium learning", body: "In-depth courses, corporate training, and memberships for teams and individuals." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero index="07" kicker="About" title="A developer & cybersecurity knowledge platform.">
        {site.name} helps developers and IT professionals learn technologies, improve their coding skills, understand security, and build better production-ready applications and infrastructure.
      </PageHero>
      <div className="mx-auto grid max-w-[1440px] gap-16 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-[1fr_1fr]">
        <div className="space-y-6 text-lg leading-8 text-paper/85">
          <p className="font-display text-3xl leading-tight tracking-[-0.03em] text-paper">
            {site.tagline} <span className="text-mist">{site.promise}</span>
          </p>
          <p>
            From beginner concepts to advanced production engineering, {site.name} covers what developers need to build better and more secure technology: programming and clean code, backend and databases, application security and ethical hacking, cloud, DevOps, containers, Linux, and AI.
          </p>
          <p>
            The education is free and independent. When teams need hands-on help, professional security, cloud, DevOps, and implementation services are available, delivered with support from {site.servicesPartner}.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/tutorials" className="inline-flex h-12 items-center bg-cyan px-6 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-on-accent transition-opacity hover:opacity-90">
              Start learning
            </Link>
            <Link href="/contact" className="inline-flex h-12 items-center border border-line px-6 font-mono text-[0.72rem] uppercase tracking-[0.16em] transition-colors hover:border-yellow hover:text-yellow">
              Get in touch
            </Link>
          </div>
        </div>
        <ol className="space-y-8">
          {principles.map((principle, index) => (
            <li key={principle.title} className="border-t border-line pt-6">
              <p className="font-mono text-xs text-yellow">{String(index + 1).padStart(2, "0")}</p>
              <h2 className="mt-3 font-display text-3xl tracking-[-0.035em]">{principle.title}</h2>
              <p className="mt-3 text-mist">{principle.body}</p>
            </li>
          ))}
        </ol>
      </div>
      <section className="border-t border-line px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-[1440px]">
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-cyan">Roadmap</p>
          <h2 className="mt-3 font-display text-4xl tracking-[-0.04em]">How the platform grows</h2>
          <ol className="mt-10 grid gap-4 md:grid-cols-3">
            {roadmap.map((item, index) => (
              <li key={item.stage} className={`border p-6 ${index === 0 ? "border-cyan/50 bg-cyan/5" : "border-line"}`}>
                <p className={`font-mono text-[0.68rem] uppercase tracking-[0.18em] ${index === 0 ? "text-cyan" : "text-yellow"}`}>{item.stage}</p>
                <h3 className="mt-3 font-display text-2xl tracking-[-0.03em]">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-mist">{item.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
