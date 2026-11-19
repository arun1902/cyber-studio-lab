import { Reveal } from "@/components/animations/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const examples = [
  { label: "Best API rate-limiting configurations", href: "/blog/api-rate-limiting-production" },
  { label: "Understanding every Docker parameter", href: "/tutorials/docker-run-flags-explained" },
  { label: "Recommended PostgreSQL connection pool settings", href: "/blog/postgresql-connection-pool-sizing" },
  { label: "Production-ready Nginx configurations", href: "/tutorials/production-nginx-reverse-proxy" },
  { label: "Kubernetes CPU and memory recommendations", href: "/blog/kubernetes-cpu-memory-requests" },
  { label: "Secure AWS configurations", href: "/tutorials/aws-account-security-baseline" },
  { label: "Coding standards and performance improvements", href: "/blog/practical-coding-standard" },
];

export function BeyondBasicsSection() {
  return (
    <section className="border-t border-line px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <Reveal>
          <SectionLabel index="05">Beyond the basics</SectionLabel>
          <h2 className="font-display text-[clamp(2.2rem,5vw,3.5rem)] leading-[1] tracking-[-0.04em]">
            Not just what it is. <span className="text-cyan">How to use it correctly.</span>
          </h2>
          <p className="mt-5 max-w-md text-mist">
            Most content stops at the definition. We go on to the recommended values, the parameters that matter, and the mistakes that show up in production.
          </p>
          <p className="mt-6 rounded-xl border-l-4 border-yellow bg-yellow/5 py-3 pl-4 font-display text-xl tracking-[-0.02em] text-paper">
            Practical knowledge developers can actually apply.
          </p>
        </Reveal>
        <ol className="overflow-hidden rounded-2xl border border-line bg-surface-strong shadow-[var(--shadow)]">
          {examples.map((example, index) => (
            <li key={example.href} className="border-b border-line last:border-b-0">
              <Link href={example.href} className="group flex items-center gap-5 px-5 py-4 md:px-6">
                <span className="font-mono text-xs text-yellow">{String(index + 1).padStart(2, "0")}</span>
                <span className="flex-1 font-display text-lg tracking-[-0.025em] text-paper/85 group-hover:text-cyan md:text-xl">
                  {example.label}
                </span>
                <ArrowUpRight className="h-5 w-5 text-mist transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan" />
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
