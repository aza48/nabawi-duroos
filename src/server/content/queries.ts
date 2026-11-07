import { and, asc, desc, eq } from "drizzle-orm";
import type { Db } from "@/server/db/client";
import { faqs, guides, type GuideStage } from "@/server/db/schema";

export type FaqRow = typeof faqs.$inferSelect;
export type GuideRow = typeof guides.$inferSelect;

export const FAQ_CATEGORIES = [
  { id: "getting-started", label: "Getting started" },
  { id: "getting-settled", label: "Getting settled" },
  { id: "family", label: "Family life" },
  { id: "university", label: "University" },
  { id: "duroos", label: "Duroos" },
  { id: "leaving", label: "Leaving Madinah" },
] as const;

export const GUIDE_STAGES: { id: GuideStage; label: string; blurb: string }[] = [
  { id: "getting-started", label: "Getting started", blurb: "Admission, visa & iqama, Nafath, Absher, registration" },
  { id: "getting-settled", label: "Getting settled", blurb: "Housing, transport, SIM cards, banking, groceries" },
  { id: "family", label: "Family life", blurb: "Spouse visas, schools, clinics, sisters' classes" },
  { id: "leaving", label: "Leaving Madinah", blurb: "Exit procedures, final paperwork, closing accounts" },
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

export async function listGuides(db: Db, opts: { stage?: GuideStage } = {}): Promise<GuideRow[]> {
  const where = opts.stage
    ? and(eq(guides.status, "published"), eq(guides.stage, opts.stage))
    : eq(guides.status, "published");
  return db.select().from(guides).where(where).orderBy(desc(guides.updatedAt));
}

export async function getGuide(db: Db, slug: string): Promise<GuideRow | null> {
  const [g] = await db.select().from(guides).where(and(eq(guides.slug, slug), eq(guides.status, "published")));
  return g ?? null;
}
