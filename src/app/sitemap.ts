import type { MetadataRoute } from "next";
import { abs } from "@/lib/site";
import { dbConfigured, query } from "@/lib/db";
import { ensureMesh } from "@/lib/mesh-db";
import { meshCategories } from "@/data/mesh-seed";

export const revalidate = 3600;

const MAX_URLS = 40000;

/**
 * Sitemap: the static routes, every category page, and — when the
 * database is configured — every visible question and published
 * article. Any database problem falls back silently to the static +
 * seed-category entries so the sitemap itself never fails.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [
    { url: abs("/"), priority: 1.0, changeFrequency: "daily" },
    { url: abs("/duroos"), priority: 0.9, changeFrequency: "daily" },
    { url: abs("/resources"), priority: 0.8, changeFrequency: "daily" },
    { url: abs("/browse"), priority: 0.7, changeFrequency: "daily" },
    { url: abs("/about"), priority: 0.4, changeFrequency: "monthly" },
    { url: abs("/guidelines"), priority: 0.4, changeFrequency: "monthly" },
    { url: abs("/privacy"), priority: 0.4, changeFrequency: "monthly" },
  ];

  let categorySlugs = meshCategories.map((c) => c.slug);

  if (dbConfigured()) {
    try {
      await ensureMesh();
      const cats = await query<{ slug: string }>(
        `SELECT slug FROM mesh_categories ORDER BY display_order, slug`
      );
      if (cats.length) categorySlugs = cats.map((c) => c.slug);
    } catch {
      /* keep the seed categories */
    }
    try {
      const questions = await query<{ id: number; updated_at: string; created_at: string }>(
        `SELECT id, updated_at, created_at FROM mesh_questions
         WHERE deleted_at IS NULL ORDER BY id DESC LIMIT ${MAX_URLS}`
      );
      for (const q of questions) {
        entries.push({
          url: abs(`/question/${q.id}`),
          lastModified: new Date(q.updated_at || q.created_at),
          priority: 0.5,
          changeFrequency: "weekly",
        });
      }
      const articles = await query<{ id: number; updated_at: string }>(
        `SELECT id, updated_at FROM mesh_articles
         WHERE status = 'published' ORDER BY id DESC LIMIT ${MAX_URLS}`
      );
      for (const a of articles) {
        entries.push({
          url: abs(`/resources/${a.id}`),
          lastModified: new Date(a.updated_at),
          priority: 0.7,
          changeFrequency: "weekly",
        });
      }
    } catch {
      /* static + categories only */
    }
  }

  for (const slug of categorySlugs) {
    entries.push({ url: abs(`/category/${slug}`), priority: 0.6, changeFrequency: "weekly" });
  }

  return entries.slice(0, MAX_URLS);
}
