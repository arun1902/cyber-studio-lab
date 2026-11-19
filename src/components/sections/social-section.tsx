import { Reveal } from "@/components/animations/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { SocialIcon } from "@/components/ui/social-icon";
import { socialLinks } from "@/data/social-links";
import { ArrowUpRight } from "lucide-react";

export function SocialSection() {
  return (
    <section className="border-t border-line px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-[1200px]">
        <Reveal>
          <SectionLabel index="07">Community</SectionLabel>
          <h2 className="max-w-3xl font-display text-[clamp(2.4rem,5vw,4.5rem)] leading-[0.95] tracking-[-0.045em]">
            Learn with the community.
          </h2>
          <p className="mt-5 max-w-lg text-base leading-7 text-mist md:text-lg">
            Short explainers, animated breakdowns, and daily tips across every channel. Follow along and ask questions.
          </p>
        </Reveal>

        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {socialLinks.map((link, index) => (
            <li key={link.platform}>
              <Reveal delay={index * 0.04}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex h-full flex-col justify-between gap-8 border border-line bg-surface p-5 transition-colors duration-300 hover:border-cyan/50 hover:bg-surface-strong"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="grid h-10 w-10 place-items-center border border-line text-cyan transition-colors group-hover:border-cyan/40">
                      <SocialIcon platform={link.platform} className="h-4 w-4" />
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-mist transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan" />
                  </div>
                  <div>
                    <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-mist">0{index + 1}</p>
                    <p className="mt-2 font-display text-xl tracking-[-0.03em] md:text-2xl">{link.label}</p>
                    <p className="mt-1 font-mono text-[0.68rem] tracking-[0.04em] text-mist">{link.handle}</p>
                  </div>
                </a>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
