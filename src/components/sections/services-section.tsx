import { Reveal } from "@/components/animations/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { site } from "@/lib/site";
import Link from "next/link";

const offerings = ["Application & API security", "Cloud security baselines", "DevSecOps pipelines", "Kubernetes hardening", "Infrastructure implementation"];

export function ServicesSection() {
  return (
    <section className="border-t border-line px-5 py-24 md:px-8 md:py-28">
      <div className="mx-auto grid max-w-[1440px] items-end gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <Reveal>
          <SectionLabel index="07">Services</SectionLabel>
          <h2 className="font-display text-[clamp(2.4rem,5vw,4.4rem)] leading-[0.95] tracking-[-0.045em]">
            Need it done, not just explained?
          </h2>
          <p className="mt-6 max-w-lg text-mist">
            Professional security, cloud, DevOps, and implementation services, delivered with support from {site.servicesPartner}. Same standards we teach, applied to your systems.
          </p>
          <Link
            href="/services"
            className="mt-8 inline-flex h-12 items-center border border-yellow px-6 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-yellow transition-colors hover:bg-yellow hover:text-on-accent"
          >
            Explore services
          </Link>
        </Reveal>
        <ul className="flex flex-wrap gap-2">
          {offerings.map((offering) => (
            <li key={offering} className="border border-line px-3 py-2 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-paper/80">
              {offering}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
