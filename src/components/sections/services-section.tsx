import { Reveal } from "@/components/animations/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { site } from "@/lib/site";
import Link from "next/link";

const offerings = ["Application & API security", "Cloud security baselines", "DevSecOps pipelines", "Kubernetes hardening", "Infrastructure implementation"];

export function ServicesSection() {
  return (
    <section className="border-t border-line px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto grid max-w-[1200px] items-end gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <Reveal>
          <SectionLabel index="06">Services</SectionLabel>
          <h2 className="font-display text-[clamp(2.2rem,5vw,3.5rem)] leading-[1] tracking-[-0.04em]">
            Need it done, not just explained?
          </h2>
          <p className="mt-5 max-w-lg text-mist">
            Professional security, cloud, DevOps, and implementation services, delivered with support from {site.servicesPartner}. Same standards we teach, applied to your systems.
          </p>
          <Link
            href="/services"
            className="mt-8 inline-flex h-12 items-center rounded-xl bg-yellow px-6 font-semibold text-on-accent transition-opacity hover:opacity-90"
          >
            Explore services
          </Link>
        </Reveal>
        <ul className="flex flex-wrap gap-2">
          {offerings.map((offering) => (
            <li
              key={offering}
              className="rounded-full border border-line bg-surface-strong px-3.5 py-2 text-sm text-paper/80 shadow-sm"
            >
              {offering}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
