import { ArticleFallback, ArticleView, articleMetadata } from "@/components/blog/article-view";
import { getArticle, getBlogs } from "@/data/articles";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

type BlogPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getBlogs().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  return articleMetadata(getArticle(slug, "blog"));
}

export default function BlogArticlePage({ params }: BlogPageProps) {
  return (
    <Suspense fallback={<ArticleFallback />}>
      <BlogDetails params={params} />
    </Suspense>
  );
}

async function BlogDetails({ params }: BlogPageProps) {
  const { slug } = await params;
  const article = getArticle(slug, "blog");
  if (!article) notFound();
  return <ArticleView article={article} />;
}
