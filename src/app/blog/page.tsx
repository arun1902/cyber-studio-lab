import { ContentExplorer } from "@/components/blog/content-explorer";
import { PageHero } from "@/components/layout/page-hero";
import { getBlogs } from "@/data/articles";
import { pageMeta } from "@/lib/metadata";

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
      <ContentExplorer articles={getBlogs()} placeholder="Rate limiting, PostgreSQL, Kubernetes, prompt injection" />
    </>
  );
}
