import { TipsExplorer } from "@/components/tips/tips-explorer";
import { PageHero } from "@/components/layout/page-hero";
import { tips } from "@/data/tips";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta(
  "Tips & Tricks",
  "Short, copy-ready developer tips: commands, configuration recommendations, parameter explanations, and useful tools.",
  "/tips",
);

export default function TipsPage() {
  return (
    <>
      <PageHero index="04" kicker="Tips & tricks" title="Small changes, real improvements.">
        One idea per card: a command worth memorizing, a setting worth changing, or a habit that prevents an outage. Copy it, try it, move on.
      </PageHero>
      <TipsExplorer tips={tips} />
    </>
  );
}
