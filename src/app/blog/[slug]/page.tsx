import { ArticleBody } from "@/components/blog/article-body";
import { ReadingProgress } from "@/components/blog/reading-progress";
import { ShareBar } from "@/components/blog/share-bar";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { CategoryMark } from "@/components/ui/category-mark";
import { CoverArt } from "@/components/ui/cover-art";
import { articles, getArticle, getHeadings, getRelatedArticles } from "@/data/articles";
import { site } from "@/lib/site";
import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: "Article" };
  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/blog/${article.slug}` },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt,
      url: `/blog/${article.slug}`,
      publishedTime: article.publishedAt,
      authors: [article.author],
      tags: article.tags,
    },
  };
}

function ArticleFallback() {
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

export default function ArticlePage({ params }: ArticlePageProps) {
  return (
    <Suspense fallback={<ArticleFallback />}>
      <ArticleDetails params={params} />
    </Suspense>
  );
}

async function ArticleDetails({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const headings = getHeadings(article);
  const related = getRelatedArticles(article.slug);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    author: { "@type": "Organization", name: article.author },
    publisher: { "@type": "Organization", name: site.name, url: site.url },
    mainEntityOfPage: `${site.url}/blog/${article.slug}`,
  };

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ReadingProgress />
      <header className="px-5 pb-10 pt-32 md:px-8 md:pt-40">
        <div className="mx-auto max-w-[1440px]">
          <div className="flex flex-wrap items-center gap-4">
            <CategoryMark id={article.category} />
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-mist">
              {formatDate(article.publishedAt)} · {article.readingMinutes} min read
              {article.level ? ` · ${article.level}` : ""}
            </p>
          </div>
          <h1 className="mt-6 max-w-5xl font-display text-[clamp(2.8rem,6vw,6rem)] uppercase leading-[0.9] tracking-[-0.05em]">
            {article.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-mist">{article.excerpt}</p>
        </div>
      </header>
      <div className="px-5 md:px-8">
        <div className="mx-auto max-w-[1440px] overflow-hidden border border-line">
          <CoverArt variant={article.cover} className="aspect-[16/7] w-full" />
        </div>
      </div>
      <div className="mx-auto grid max-w-[1100px] gap-12 px-5 py-14 md:px-8 lg:grid-cols-[200px_minmax(0,1fr)]">
        <TableOfContents items={headings} />
        <div>
          {article.steps && (
            <ol className="mb-10 grid gap-4 sm:grid-cols-2">
              {article.steps.map((step, index) => (
                <li key={step.title} className="border border-line p-4">
                  <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-lime">Step 0{index + 1}</p>
                  <p className="mt-2 font-display text-xl tracking-[-0.03em]">{step.title}</p>
                  <p className="mt-2 text-sm leading-6 text-mist">{step.body}</p>
                </li>
              ))}
            </ol>
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
            <ShareBar title={article.title} slug={article.slug} />
          </div>
        </div>
      </div>
      <aside className="border-t border-line px-5 py-16 md:px-8">
        <div className="mx-auto max-w-[1440px]">
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-lime">Continue</p>
          <h2 className="mt-3 font-display text-4xl uppercase tracking-[-0.04em]">Related reading</h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {related.map((item) => (
              <li key={item.slug}>
                <Link href={`/blog/${item.slug}`} className="group block border border-line p-5 hover:border-lime">
                  <CategoryMark id={item.category} />
                  <p className="mt-4 font-display text-2xl leading-tight tracking-[-0.04em] group-hover:text-lime">{item.title}</p>
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
