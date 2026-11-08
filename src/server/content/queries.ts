import { and, asc, desc, eq, notInArray } from "drizzle-orm";
import type { Db } from "@/server/db/client";
import { faqs, guides, type GuideStage } from "@/server/db/schema";

export type FaqRow = typeof faqs.$inferSelect;
export type GuideRow = typeof guides.$inferSelect;

export const FAQ_CATEGORIES = [
  { id: "getting-started", label: "Getting started", labelAr: "البداية" },
  { id: "getting-settled", label: "Getting settled", labelAr: "الاستقرار" },
  { id: "family", label: "Family life", labelAr: "حياة الأسرة" },
  { id: "university", label: "University", labelAr: "الجامعة" },
  { id: "duroos", label: "Duroos", labelAr: "الدروس" },
  { id: "leaving", label: "Leaving Madinah", labelAr: "مغادرة المدينة" },
] as const;

export const GUIDE_STAGES: { id: GuideStage; label: string; blurb: string; labelAr: string; blurbAr: string }[] = [
  { id: "getting-started", label: "Getting started", blurb: "Admission, visa & iqama, Nafath, Absher, registration", labelAr: "البداية", blurbAr: "القبول والتأشيرة والإقامة ونفاذ وأبشر والتسجيل" },
  { id: "getting-settled", label: "Getting settled", blurb: "Housing, emergency numbers, sport, food, licences, business", labelAr: "الاستقرار", blurbAr: "السكن وأرقام الطوارئ والرياضة والطعام والرخص والعمل" },
  { id: "study", label: "Study & university", blurb: "Semester breaks, the calendar, moving up, postgraduate, resources", labelAr: "الدراسة والجامعة", blurbAr: "الإجازات والتقويم والانتقال بين المستويات والدراسات العليا والمصادر" },
  { id: "family", label: "Family life", blurb: "Spouse visas, schools, clinics, sisters' classes", labelAr: "حياة الأسرة", blurbAr: "تأشيرة الزوجة والمدارس والعيادات ودروس الأخوات" },
  { id: "leaving", label: "Leaving Madinah", blurb: "Exit procedures, final paperwork, closing accounts", labelAr: "مغادرة المدينة", blurbAr: "إجراءات الخروج والأوراق الأخيرة وإغلاق الحسابات" },
];

export async function listFaqs(db: Db, opts: { category?: string } = {}): Promise<FaqRow[]> {
  const where = opts.category
    ? and(eq(faqs.status, "published"), eq(faqs.category, opts.category))
    : eq(faqs.status, "published");
  return db.select().from(faqs).where(where).orderBy(asc(faqs.question));
}

export async function getFaq(db: Db, slug: string): Promise<FaqRow | null> {
  const [f] = await db.select().from(faqs).where(and(eq(faqs.slug, slug), eq(faqs.status, "published")));
  return f ?? null;
}

/** Guides that were replaced and must never show, even if a row is still in the database. */
export const RETIRED_GUIDES = [
  "starting-a-business", // replaced by the MESH company guide
  "restaurants", // empty placeholder
  "emergency-numbers", // covered by doctors-hospitals-and-pharmacies and the FAQ
  "arabic-learning-resources", // three links only
  "sports-and-martial-arts", // replaced by sports-and-activities
];

export async function listGuides(db: Db, opts: { stage?: GuideStage } = {}): Promise<GuideRow[]> {
  const live = and(eq(guides.status, "published"), notInArray(guides.slug, RETIRED_GUIDES));
  const where = opts.stage ? and(live, eq(guides.stage, opts.stage)) : live;
  return db.select().from(guides).where(where).orderBy(desc(guides.updatedAt));
}

export async function getGuide(db: Db, slug: string): Promise<GuideRow | null> {
  if (RETIRED_GUIDES.includes(slug)) return null;
  const [g] = await db.select().from(guides).where(and(eq(guides.slug, slug), eq(guides.status, "published")));
  return g ?? null;
}

/** Everything saved but not yet published, newest first (admin inbox). */
export async function listDrafts(db: Db) {
  const { announcements } = await import("@/server/db/schema");
  const [a, f, g] = await Promise.all([
    db.select({ slug: announcements.slug, title: announcements.titleEn, at: announcements.postedAt }).from(announcements).where(eq(announcements.status, "draft")),
    db.select({ slug: faqs.slug, title: faqs.question, at: faqs.updatedAt }).from(faqs).where(eq(faqs.status, "draft")),
    db.select({ slug: guides.slug, title: guides.title, at: guides.updatedAt }).from(guides).where(eq(guides.status, "draft")),
  ]);
  return [
    ...a.map((x) => ({ ...x, kind: "Update", href: `/admin/duroos/announcements/${x.slug}` })),
    ...f.map((x) => ({ ...x, kind: "Answer", href: `/admin/content/faq/${x.slug}` })),
    ...g.map((x) => ({ ...x, kind: "Guide", href: `/admin/content/guide/${x.slug}` })),
  ].sort((x, y) => y.at.getTime() - x.at.getTime());
}
