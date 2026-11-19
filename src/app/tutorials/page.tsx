import { ContentExplorer } from "@/components/blog/content-explorer";
import { PageHero } from "@/components/layout/page-hero";
import { getTutorials } from "@/data/articles";
import { pageMeta } from "@/lib/metadata";
import { Suspense } from "react";

export const metadata = pageMeta(
  "Tutorials",
  "Step-by-step practical guides with real code, commands, and configurations: Nginx, Docker, AWS, Node.js security, and more.",
  "/tutorials",
);

export default function TutorialsPage() {
  return (
    <>
      <PageHero index="02" kicker="Tutorials" title="Step by step, with real configs.">
        Practical guides you can follow in one sitting. Every tutorial lists the steps up front, explains each command and parameter, and ends with a way to verify the result.
      </PageHero>
      <Suspense fallback={<div className="mx-auto max-w-[1200px] px-5 py-14 text-mist md:px-8">Loading tutorials…</div>}>
        <ContentExplorer articles={getTutorials()} placeholder="Nginx, Docker flags, AWS baseline, Express security" />
      </Suspense>
    </>
  );
}
