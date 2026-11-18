import type { MetadataRoute } from "next";
import { articleHref, articles } from "@/data/articles";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/blog",
    "/tutorials",
    "/videos",
    "/tips",
    "/labs",
    "/services",
    "/about",
    "/topics",
    "/contact",
    "/privacy-policy",
    "/terms",
  ];
  const pages = staticRoutes.map((path) => ({
    url: `${site.url}${path || "/"}`,
    lastModified: "2026-11-18",
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));
  const posts = articles.map((article) => ({
    url: `${site.url}${articleHref(article)}`,
    lastModified: article.publishedAt,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));
  return [...pages, ...posts];
}
