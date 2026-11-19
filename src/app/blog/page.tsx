import { ContentExplorer } from "@/components/blog/content-explorer";
import { PageHero } from "@/components/layout/page-hero";
import { getBlogs } from "@/data/articles";
import { pageMeta } from "@/lib/metadata";
import { Suspense } from "react";

export const metadata = pageMeta(
  "Blogs",
  "Engineering best practices, security explanations, and production-ready recommendations for developers and IT professionals.",
  "/blog",
);

export default function BlogPage() {
  return (
    <>
      <PageHero index="01" kicker="Blogs" title="Engineering knowledge, beyond the basics.">
        Not just what a technology is, but how to configure and use it correctly in real projects: recommended settings, the reasoning behind them, and the mistakes to avoid.
      </PageHero>
      <Suspense fallback={<div className="mx-auto max-w-[1200px] px-5 py-14 text-mist md:px-8">Loading blogs…</div>}>
        <ContentExplorer articles={getBlogs()} placeholder="Rate limiting, PostgreSQL, Kubernetes, prompt injection" />
      </Suspense>
    </>
  );
}
