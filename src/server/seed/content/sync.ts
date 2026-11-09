import { sql } from "drizzle-orm";
import type { Db } from "@/server/db/client";
import { faqs, guides } from "@/server/db/schema";
import { cleanText } from "@/lib/text";
import { FAQS_2026, GUIDES_2026, type SeedFaq, type SeedGuide } from "./guides-2026";
import { FAQS_STUDENT_LIFE, GUIDES_STUDENT_LIFE } from "./guides-student-life";
import { GUIDE_REWRITES_2026_11, GUIDES_RESEARCH_2026_11 } from "./guides-research-2026-11";
import { FAQS_GAPS_2026_11, GUIDES_GAPS_2026_11 } from "./guides-gaps-2026-11";
import { withFaqLead } from "./faq-leads";

/**
 * Every seeded guide, one per slug. A later list replaces an earlier guide with the same slug,
 * which is how rewrites kept outside guides-2026.ts take effect.
 */
export const SEED_GUIDES: SeedGuide[] = [
  ...new Map([...GUIDES_2026, ...GUIDES_STUDENT_LIFE, ...GUIDES_RESEARCH_2026_11, ...GUIDES_GAPS_2026_11, ...GUIDE_REWRITES_2026_11].map((g) => [g.slug, g] as const)).values(),
];
export const SEED_FAQS: SeedFaq[] = [...new Map([...FAQS_2026, ...FAQS_STUDENT_LIFE, ...FAQS_GAPS_2026_11].map((f) => [f.slug, f] as const)).values()].map(withFaqLead);

const minutes = (html: string) => Math.max(1, Math.ceil(html.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length / 200));

/** Upserts the November 2026 guides and FAQs as published and verified. Safe to run repeatedly. */
export async function syncContent2026(db: Db, now: Date = new Date(), opts: { only?: string[] } = {}): Promise<{ guides: number; faqs: number }> {
  const pick = <T extends { slug: string }>(xs: T[]) => (opts.only ? xs.filter((x) => opts.only!.includes(x.slug)) : xs);
  const guideList = pick(SEED_GUIDES);
  const faqList = pick(SEED_FAQS);
  for (const g of guideList) {
    const row = {
      slug: g.slug,
      title: cleanText(g.title, "en"),
      summary: cleanText(g.summary, "en"),
      stage: g.stage,
      bodyHtml: g.bodyHtml.trim(),
      readingMinutes: minutes(g.bodyHtml),
      status: "published" as const,
      lastVerifiedAt: now,
    };
    await db
      .insert(guides)
      .values(row)
      .onConflictDoUpdate({
        target: guides.slug,
        set: {
          title: row.title, summary: row.summary, stage: row.stage, bodyHtml: row.bodyHtml, readingMinutes: row.readingMinutes, status: row.status,
          // Only a real change counts as a new check. Re-running the sync keeps the old date.
          lastVerifiedAt: sql`case when ${guides.bodyHtml} is distinct from excluded.body_html or ${guides.title} is distinct from excluded.title or ${guides.lastVerifiedAt} is null then excluded.last_verified_at else ${guides.lastVerifiedAt} end`,
          updatedAt: sql`now()`,
        },
      });
  }
  for (const f of faqList) {
    const row = { slug: f.slug, question: cleanText(f.question, "en"), category: f.category, answerHtml: f.answerHtml, tags: f.tags ?? [], status: "published" as const, lastVerifiedAt: now };
    await db
      .insert(faqs)
      .values(row)
      .onConflictDoUpdate({
        target: faqs.slug,
        set: {
          question: row.question, category: row.category, answerHtml: row.answerHtml, tags: row.tags, status: row.status,
          lastVerifiedAt: sql`case when ${faqs.answerHtml} is distinct from excluded.answer_html or ${faqs.question} is distinct from excluded.question or ${faqs.lastVerifiedAt} is null then excluded.last_verified_at else ${faqs.lastVerifiedAt} end`,
          updatedAt: sql`now()`,
        },
      });
  }
  return { guides: guideList.length, faqs: faqList.length };
}
