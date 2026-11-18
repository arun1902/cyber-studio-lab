import { PageHero } from "@/components/layout/page-hero";
import { pageMeta } from "@/lib/metadata";
import { site } from "@/lib/site";
import { Cloud, Code2, GitBranch, Server, ShieldCheck, Workflow } from "lucide-react";
import Link from "next/link";

export const metadata = pageMeta(
  "Services",
  "Professional security, cloud, DevOps, and implementation services, delivered with DevCoreBit.",
  "/services",
);

const services = [
  {
    icon: ShieldCheck,
    title: "Application & API security review",
    body: "Code and architecture review against OWASP risks, authentication and authorization testing, and a prioritized fix list your team can act on.",
  },
  {
    icon: Cloud,
    title: "Cloud security baseline",
    body: "AWS, Azure, or GCP account hardening: identity, logging, network boundaries, encryption defaults, and guardrails that stay on.",
  },
  {
    icon: Workflow,
    title: "DevSecOps pipelines",
    body: "CI/CD with dependency scanning, secret detection, image signing, and infrastructure as code checks built into every merge.",
  },
  {
    icon: Server,
    title: "Kubernetes & container hardening",
    body: "Resource sizing, pod security, network policies, and runtime configuration reviewed against production workloads.",
  },
  {
    icon: GitBranch,
    title: "Infrastructure implementation",
    body: "Production-ready Nginx, databases, observability, and deployment setups, implemented and documented for your team.",
  },
  {
    icon: Code2,
    title: "Engineering standards & training",
    body: "Coding standards, review practices, and workshops tailored to your stack, built from the same material we publish.",
  },
];

const process = [
  { title: "Scope", body: "A short call to understand your system, risks, and goals. You get a written scope and estimate." },
  { title: "Assess", body: "Hands-on review of code, configuration, and infrastructure with findings ranked by impact." },
  { title: "Implement", body: "Fixes delivered alongside your team, or a clear plan your engineers can execute themselves." },
  { title: "Hand over", body: "Documentation, runbooks, and a walkthrough so the improvements outlast the engagement." },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero index="06" kicker="Services" title="From reading about it to running it in production.">
        When your team needs hands-on help, CyberStudioLab offers professional security, cloud, DevOps, and implementation services, delivered with support from {site.servicesPartner}.
      </PageHero>
      <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-8 md:py-24">
        <ul className="grid gap-px border border-line bg-line md:grid-cols-2 xl:grid-cols-3">
          {services.map(({ icon: Icon, title, body }) => (
            <li key={title} className="bg-ink p-6 md:p-8">
              <Icon className="h-6 w-6 text-cyan" aria-hidden="true" />
              <h2 className="mt-5 font-display text-2xl tracking-[-0.03em]">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-mist">{body}</p>
            </li>
          ))}
        </ul>

        <section className="mt-20 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-yellow">How engagements work</p>
            <h2 className="mt-3 font-display text-4xl tracking-[-0.04em]">Clear scope. Practical outcomes.</h2>
            <p className="mt-4 max-w-md text-mist">
              CyberStudioLab stays an independent educational platform. Delivery is handled with {site.servicesPartner}, so the teaching stays vendor-neutral and the implementation has a dedicated engineering team behind it.
            </p>
          </div>
          <ol className="grid gap-4 sm:grid-cols-2">
            {process.map((step, index) => (
              <li key={step.title} className="border-t border-line pt-5">
                <p className="font-mono text-xs text-cyan">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="mt-2 font-display text-2xl tracking-[-0.03em]">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-mist">{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <div className="mt-20 flex flex-col items-start gap-6 border border-cyan/40 bg-cyan/5 p-8 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-display text-3xl tracking-[-0.03em]">Have a project in mind?</h2>
            <p className="mt-2 text-mist">Tell us about your stack and what you need. We will reply with next steps.</p>
          </div>
          <Link
            href="/contact"
            className="inline-flex h-12 shrink-0 items-center bg-cyan px-6 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-on-accent transition-opacity hover:opacity-90"
          >
            Discuss a project
          </Link>
        </div>
      </div>
    </>
  );
}
