import type { MetadataRoute } from "next";
import { SLUG as COMPANY_SLUG } from "@/features/guides/company/content";
import { getDb } from "@/server/db/client";
import { lessons } from "@/server/db/schema";
import { listShaykhs } from "@/server/duroos/queries";
import { listFaqs, listGuides } from "@/server/content/queries";
import { abs } from "@/lib/site";
import { PROGRAMS } from "@/content/programs";
import { LIVE_COLLECTIONS } from "@/content/library-books";

export const revalidate = 3600;

type Entry = MetadataRoute.Sitemap[number];
type Freq = NonNullable<Entry["changeFrequency"]>;

const round = (p: number) => Math.round(p * 10) / 10;

/**
 * The sitemap lists the pages worth crawling. The 1,600 library reader pages are left out:
 * they are reachable from the collection pages and would otherwise be most of the file.
 * Every page with an Arabic twin lists both, each pointing at the other.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const db = await getDb();
  const [shaykhRows, lessonRows, faqRows, guideRows] = await Promise.all([
    listShaykhs(db),
    db.select({ slug: lessons.slug }).from(lessons),
    listFaqs(db),
    listGuides(db),
  ]);
  /** An English page and its Arabic twin, each naming the other. */
  const pair = (path: string, priority: number, changeFrequency: Freq, lastModified?: Date): Entry[] => {
    const en = abs(path || "/");
    const ar = abs(`/ar${path}`);
    return [
      { url: en, priority: round(priority), changeFrequency, lastModified, alternates: { languages: { en, ar, "x-default": en } } },
      { url: ar, priority: round(priority - 0.1), changeFrequency, lastModified, alternates: { languages: { en, ar, "x-default": en } } },
    ];
  };
  const both = (rest: string, priority: number, changeFrequency: Freq) => pair(`/duroos${rest}`, priority, changeFrequency);
  return [
    { url: abs("/"), priority: 1, changeFrequency: "hourly" },
    ...both("", 0.9, "hourly"),
    ...both("/schedule", 0.8, "daily"),
    ...both("/updates", 0.7, "hourly"),
    ...both("/live", 0.5, "weekly"),
    ...both("/sisters", 0.7, "weekly"),
    ...pair("/guides", 0.9, "weekly"),
    { url: abs(`/guides/${COMPANY_SLUG}`), lastModified: new Date("2026-11-08"), priority: 0.7 },
    ...pair("/programs", 0.9, "weekly"),
    ...PROGRAMS.flatMap((p) => pair(`/programs/${p.slug}`, 0.7, "monthly", new Date(p.checked))),
    ...pair("/library", 0.8, "weekly"),
    ...pair("/discounts", 0.7, "monthly"),
    ...pair("/ask", 0.8, "daily"),
    ...pair("/more", 0.3, "weekly"),
    { url: abs("/mahad"), priority: 0.7, changeFrequency: "monthly" },
    ...LIVE_COLLECTIONS.map((c): Entry => ({ url: abs(`/library/${c.slug}`), priority: 0.7, changeFrequency: "monthly" })),
    ...shaykhRows.flatMap((s) => both(`/shaykh/${s.slug}`, 0.6, "weekly")),
    ...lessonRows.flatMap((l) => both(`/lesson/${l.slug}`, 0.6, "daily")),
    ...faqRows.map((f): Entry => ({ url: abs(`/ask/${f.slug}`), lastModified: f.updatedAt, priority: 0.7 })),
    ...guideRows.filter((g) => g.slug !== COMPANY_SLUG).map((g): Entry => ({ url: abs(`/guides/${g.slug}`), lastModified: g.lastVerifiedAt ?? g.updatedAt, priority: 0.7 })),
  ];
}
