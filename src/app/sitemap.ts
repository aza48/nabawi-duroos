import type { MetadataRoute } from "next";
import { getDb } from "@/server/db/client";
import { lessons } from "@/server/db/schema";
import { listShaykhs } from "@/server/duroos/queries";
import { listFaqs, listGuides } from "@/server/content/queries";
import { abs } from "@/lib/site";
import { PROGRAMS } from "@/content/programs";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const db = await getDb();
  const [shaykhRows, lessonRows, faqRows, guideRows] = await Promise.all([
    listShaykhs(db),
    db.select({ slug: lessons.slug }).from(lessons),
    listFaqs(db),
    listGuides(db),
  ]);
  const both = (rest: string, priority: number, changeFrequency: "hourly" | "daily" | "weekly") => [
    { url: abs(`/duroos${rest}`), priority, changeFrequency, alternates: { languages: { ar: abs(`/ar/duroos${rest}`) } } },
    { url: abs(`/ar/duroos${rest}`), priority: priority - 0.1, changeFrequency },
  ];
  return [
    { url: abs("/"), priority: 1, changeFrequency: "hourly" },
    ...both("", 0.9, "hourly"),
    ...both("/schedule", 0.8, "daily"),
    ...both("/updates", 0.7, "hourly"),
    ...both("/live", 0.5, "weekly"),
    { url: abs("/guides"), priority: 0.9, changeFrequency: "weekly" },
    { url: abs("/programs"), priority: 0.9, changeFrequency: "weekly" },
    ...PROGRAMS.map((p) => ({ url: abs(`/programs/${p.slug}`), lastModified: new Date(p.checked), priority: 0.7 })),
    { url: abs("/library"), priority: 0.8, changeFrequency: "weekly" },
    { url: abs("/discounts"), priority: 0.7, changeFrequency: "monthly" },
    { url: abs("/search"), priority: 0.4, changeFrequency: "monthly" },
    { url: abs("/ask"), priority: 0.8, changeFrequency: "daily" },
    { url: abs("/more"), priority: 0.3, changeFrequency: "weekly" },
    ...shaykhRows.flatMap((s) => both(`/shaykh/${s.slug}`, 0.6, "weekly")),
    ...lessonRows.flatMap((l) => both(`/lesson/${l.slug}`, 0.6, "daily")),
    ...faqRows.map((f) => ({ url: abs(`/ask/${f.slug}`), lastModified: f.updatedAt, priority: 0.7 })),
    ...guideRows.map((g) => ({ url: abs(`/guides/${g.slug}`), lastModified: g.updatedAt, priority: 0.7 })),
  ];
}
