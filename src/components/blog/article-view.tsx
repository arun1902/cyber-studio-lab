import { ArticleBody } from "@/components/blog/article-body";
import { ReadingProgress } from "@/components/blog/reading-progress";
import { ShareBar } from "@/components/blog/share-bar";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { CoverArt } from "@/components/ui/cover-art";
import { KindBadge, TopicMark } from "@/components/ui/topic-mark";
import { articleHref, getHeadings, getRelatedArticles } from "@/data/articles";
import type { Article } from "@/data/articles";
import { site } from "@/lib/site";
import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";
import Link from "next/link";

export function articleMetadata(article: Article | undefined): Metadata {
  if (!article) return { title: "Not found" };
  const path = articleHref(article);
  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt,
      url: path,
      publishedTime: article.publishedAt,
      authors: [article.author],
      tags: article.tags,
    },
  };
}

export function ArticleFallback() {
  return (
    <div className="px-5 pb-20 pt-32 md:px-8 md:pt-40">
      <div className="mx-auto max-w-[1440px] space-y-6">
        <div className="h-3 w-40 bg-line" />
        <div className="h-16 max-w-3xl bg-line" />
        <div className="h-4 max-w-xl bg-line" />
        <div className="mt-10 aspect-[16/7] w-full border border-line bg-surface" />
      </div>
    </div>
  );
}

export function ArticleView({ article }: { article: Article }) {
  const path = articleHref(article);
  const headings = getHeadings(article);
  const related = getRelatedArticles(article.slug);
  const isTutorial = article.format === "tutorial";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": isTutorial ? "TechArticle" : "BlogPosting",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    proficiencyLevel: article.level,
    keywords: article.tags.join(", "),
    author: { "@type": "Organization", name: article.author },
    publisher: { "@type": "Organization", name: site.name, url: site.url },
    mainEntityOfPage: `${site.url}${path}`,
  };

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ReadingProgress />
      <header className="px-5 pb-10 pt-32 md:px-8 md:pt-40">
        <div className="mx-auto max-w-[1440px]">
          <nav aria-label="Breadcrumb" className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-mist">
            <Link href={isTutorial ? "/tutorials" : "/blog"} className="hover:text-cyan">
              {isTutorial ? "Tutorials" : "Blogs"}
            </Link>
            <span className="mx-2 text-line">/</span>
            <span className="text-paper/70">{article.level}</span>
          </nav>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            {article.topics.map((topic) => (
              <TopicMark key={topic} id={topic} />
            ))}
          </div>
          <h1 className="mt-6 max-w-5xl font-display text-[clamp(2.4rem,5vw,4.8rem)] font-medium leading-[0.98] tracking-[-0.045em]">
            {article.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-mist">{article.excerpt}</p>
          <p className="mt-6 flex flex-wrap items-center gap-3 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-mist">
            <KindBadge>{isTutorial ? "Tutorial" : "Blog"}</KindBadge>
            {formatDate(article.publishedAt)} · {article.readingMinutes} min read
            {article.duration ? ` · Hands-on ${article.duration}` : ""}
          </p>
        </div>
      </header>
      <div className="px-5 md:px-8">
        <div className="mx-auto max-w-[1440px] overflow-hidden border border-line">
          <CoverArt variant={article.cover} className="aspect-[16/6] w-full" />
        </div>
      </div>
      <div className="mx-auto grid max-w-[1180px] gap-12 px-5 py-14 md:px-8 lg:grid-cols-[210px_minmax(0,1fr)]">
        <TableOfContents items={headings} />
        <div className="min-w-0">
          {article.steps && (
            <section aria-label="What you will do" className="mb-10 border border-line bg-surface p-5">
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-yellow">What you will do</p>
              <ol className="mt-4 grid gap-4 sm:grid-cols-2">
                {article.steps.map((step, index) => (
                  <li key={step.title} className="border-t border-line pt-3">
                    <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-cyan">Step {String(index + 1).padStart(2, "0")}</p>
                    <p className="mt-1 font-display text-lg tracking-[-0.02em]">{step.title}</p>
                    <p className="mt-1 text-sm leading-6 text-mist">{step.body}</p>
                  </li>
                ))}
              </ol>
            </section>
          )}
          <ArticleBody article={article} />
          <div className="mt-12 flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <span key={tag} className="border border-line px-2 py-1 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-mist">
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-8">
            <ShareBar title={article.title} path={path} />
          </div>
        </div>
      </div>
      <aside className="border-t border-line px-5 py-16 md:px-8">
        <div className="mx-auto max-w-[1440px]">
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-cyan">Keep going</p>
          <h2 className="mt-3 font-display text-4xl tracking-[-0.04em]">Related reading</h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {related.map((item) => (
              <li key={item.slug}>
                <Link href={articleHref(item)} className="group flex h-full flex-col border border-line p-5 transition-colors hover:border-cyan/60">
                  <span className="flex items-center gap-3">
                    <KindBadge>{item.format === "tutorial" ? "Tutorial" : "Blog"}</KindBadge>
                    <TopicMark id={item.topics[0]} />
                  </span>
                  <p className="mt-4 font-display text-xl leading-tight tracking-[-0.03em] group-hover:text-cyan">{item.title}</p>
                  <p className="mt-3 text-sm leading-6 text-mist">{item.excerpt}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </article>
  );
}
