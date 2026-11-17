import { BlogExplorer } from "@/components/blog/blog-explorer";
import { PageHero } from "@/components/layout/page-hero";
import { articles } from "@/data/articles";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta(
  "Blog",
  "Cybersecurity essays and field notes from Cyber Studio Lab on passwords, privacy, phishing, and everyday defense.",
  "/blog",
);

export default function BlogPage() {
  return (
    <>
      <PageHero index="03" kicker="Archive" title="Essays from the lab">
        Awareness writing with a point of view. Filter by field, search the archive, and read at the length of a coffee.
      </PageHero>
      <BlogExplorer articles={articles} />
    </>
  );
}
