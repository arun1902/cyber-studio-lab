import { PageHero } from "@/components/layout/page-hero";
import { pageMeta } from "@/lib/metadata";
import Link from "next/link";

export const metadata = pageMeta(
  "About",
  "Cyber Studio Lab is an editorial studio for cybersecurity awareness, practical tutorials, and a calmer digital mindset.",
  "/about",
);

const principles = [
  {
    title: "Ordinary threats first",
    body: "Most harm arrives as a reused password, a rushed click, or a postponed update. We write for that reality before we write about anything exotic.",
  },
  {
    title: "Permission is the boundary",
    body: "Understanding how attacks work is useful. Instructions for breaking into systems are not what this studio publishes. Curiosity stays on the near side of consent.",
  },
  {
    title: "Finishable advice",
    body: "A piece should leave you with a habit you can start today. If it needs a product pitch to make sense, it does not belong here.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero index="04" kicker="The studio" title="Built for the curious.">
        Cyber Studio Lab is a cybersecurity editorial studio. We publish tips, tutorials, and field notes for people who want to be harder to fool without turning their life into a security product.
      </PageHero>
      <div className="mx-auto grid max-w-[1440px] gap-16 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-[1fr_1fr]">
        <div className="space-y-6 text-lg leading-8 text-paper/85">
          <p>
            The name is deliberate. A lab is a place to look closely. A studio is a place to make the looking readable. Together they describe a site that would rather teach a habit than perform expertise.
          </p>
          <p>
            The first version of the site is informational. Articles live in the project as structured content so a CMS can replace the local files later without a redesign. Social links are placeholders until the channels are ready.
          </p>
          <p>
            If you have a story that belongs here — a clearer way to explain a control, a tutorial people can finish — the contact page is the door.
          </p>
          <Link href="/contact" className="inline-flex h-12 items-center bg-lime px-6 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-on-accent transition-opacity hover:opacity-90">
            Let&apos;s connect
          </Link>
        </div>
        <ol className="space-y-8">
          {principles.map((principle, index) => (
            <li key={principle.title} className="border-t border-line pt-6">
              <p className="font-mono text-xs text-lime">0{index + 1}</p>
              <h2 className="mt-3 font-display text-3xl uppercase tracking-[-0.04em]">{principle.title}</h2>
              <p className="mt-3 text-mist">{principle.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}
