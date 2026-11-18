import { ArticleFallback, ArticleView, articleMetadata } from "@/components/blog/article-view";
import { getArticle, getTutorials } from "@/data/articles";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

type TutorialPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getTutorials().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: TutorialPageProps): Promise<Metadata> {
  const { slug } = await params;
  return articleMetadata(getArticle(slug, "tutorial"));
}

export default function TutorialArticlePage({ params }: TutorialPageProps) {
  return (
    <Suspense fallback={<ArticleFallback />}>
      <TutorialDetails params={params} />
    </Suspense>
  );
}

async function TutorialDetails({ params }: TutorialPageProps) {
  const { slug } = await params;
  const article = getArticle(slug, "tutorial");
  if (!article) notFound();
  return <ArticleView article={article} />;
}
