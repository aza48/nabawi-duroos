import { eq, sql } from "drizzle-orm";
import type { Db } from "@/server/db/client";
import { faqs, guides } from "@/server/db/schema";
import { cleanText } from "@/lib/text";
import { hasVisibleHtml } from "@/lib/guide-html";
import { FAQS_2026, GUIDES_2026, type SeedFaq, type SeedGuide } from "./guides-2026";
import { FAQS_STUDENT_LIFE, GUIDES_STUDENT_LIFE } from "./guides-student-life";
import { GUIDE_REWRITES_2026_11, GUIDES_RESEARCH_2026_11 } from "./guides-research-2026-11";
import { FAQS_GAPS_2026_11, GUIDES_GAPS_2026_11 } from "./guides-gaps-2026-11";
import { GUIDES_LANE_E_2026_11 } from "./guides-lane-e-2026-11";
import { GUIDES_ADMIN_2026_11 } from "./guides-admin-2026-11";
import { GUIDES_ADMIN_LIFE_2026_11 } from "./guides-admin-life-2026-11";
import { GUIDES_ADMIN_ONLINE_2026_11 } from "./guides-admin-online-2026-11";
import { GUIDES_ADMIN_PAPERS_2026_11 } from "./guides-admin-papers-2026-11";
import { ARABIC_FAQS, ARABIC_GUIDES } from "./arabic";

/**
 * Every seeded guide, one per slug. A later list replaces an earlier guide with the same slug,
 * which is how rewrites kept outside guides-2026.ts take effect.
 */
const ENGLISH_GUIDES: SeedGuide[] = [
  ...new Map([...GUIDES_2026, ...GUIDES_STUDENT_LIFE, ...GUIDES_RESEARCH_2026_11, ...GUIDES_GAPS_2026_11, ...GUIDES_LANE_E_2026_11, ...GUIDES_ADMIN_2026_11, ...GUIDES_ADMIN_LIFE_2026_11, ...GUIDES_ADMIN_ONLINE_2026_11, ...GUIDES_ADMIN_PAPERS_2026_11, ...GUIDE_REWRITES_2026_11].map((g) => [g.slug, g] as const)).values(),
];
const ENGLISH_FAQS: SeedFaq[] = [...new Map([...FAQS_2026, ...FAQS_STUDENT_LIFE, ...FAQS_GAPS_2026_11].map((f) => [f.slug, f] as const)).values()];

/**
 * Every seeded guide and answer with its Arabic (src/server/seed/content/arabic.ts, built from
 * docs/research/translations by scripts/build-arabic-seed.ts). Arabic written inline on a seed entry wins.
 */
export const SEED_GUIDES: SeedGuide[] = ENGLISH_GUIDES.map((g) => ({ ...ARABIC_GUIDES[g.slug], ...g }));
export const SEED_FAQS: SeedFaq[] = ENGLISH_FAQS.map((f) => ({ ...ARABIC_FAQS[f.slug], ...f }));

/** Seeded Arabic, cleaned to house style; missing or blank becomes null (no translation yet). */
const arabic = (s: string | undefined): string | null => (s && s.trim() ? cleanText(s.trim(), "ar") : null);
/** Seeded Arabic HTML; a body with nothing to show ("<p></p>", "<p>&nbsp;</p>") is null, as in Admin. */
const arabicHtml = (html: string | undefined): string | null => {
  const s = arabic(html);
  return hasVisibleHtml(s) ? s : null;
};

const minutes = (html: string) => Math.max(1, Math.ceil(html.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length / 200));

/**
 * Upserts the November 2026 guides and FAQs as published and verified. Safe to run repeatedly.
 * `guides` and `faqs` replace the seeded lists (tests use them); `only` limits the run to some slugs.
 */
export async function syncContent2026(
  db: Db,
  now: Date = new Date(),
  opts: { only?: string[]; guides?: SeedGuide[]; faqs?: SeedFaq[] } = {},
): Promise<{ guides: number; faqs: number }> {
  const pick = <T extends { slug: string }>(xs: T[]) => (opts.only ? xs.filter((x) => opts.only!.includes(x.slug)) : xs);
  const guideList = pick(opts.guides ?? SEED_GUIDES);
  const faqList = pick(opts.faqs ?? SEED_FAQS);
  for (const g of guideList) {
    const row = {
      slug: g.slug,
      title: cleanText(g.title, "en"),
      summary: cleanText(g.summary, "en"),
      stage: g.stage,
      bodyHtml: g.bodyHtml.trim(),
      titleAr: arabic(g.titleAr),
      summaryAr: arabic(g.summaryAr),
      bodyHtmlAr: arabicHtml(g.bodyHtmlAr),
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
          // A seed without Arabic keeps any Arabic an editor added in Admin.
          titleAr: sql`coalesce(excluded.title_ar, ${guides.titleAr})`,
          summaryAr: sql`coalesce(excluded.summary_ar, ${guides.summaryAr})`,
          bodyHtmlAr: sql`coalesce(excluded.body_html_ar, ${guides.bodyHtmlAr})`,
          // Only a real change (English or Arabic) counts as a new check. Re-running the sync keeps the old date.
          lastVerifiedAt: sql`case when ${guides.bodyHtml} is distinct from excluded.body_html or ${guides.title} is distinct from excluded.title
            or (excluded.body_html_ar is not null and ${guides.bodyHtmlAr} is distinct from excluded.body_html_ar)
            or (excluded.title_ar is not null and ${guides.titleAr} is distinct from excluded.title_ar)
            or ${guides.lastVerifiedAt} is null then excluded.last_verified_at else ${guides.lastVerifiedAt} end`,
          updatedAt: sql`now()`,
        },
      });
  }
  // Guides that live only in the database (imported from the old site, such as the University calendar) get their Arabic
  // too: only the Arabic columns are written, everything else stays as it is.
  if (!opts.guides) {
    const seeded = new Set(SEED_GUIDES.map((g) => g.slug));
    for (const [slug, a] of Object.entries(ARABIC_GUIDES)) {
      if (seeded.has(slug) || (opts.only && !opts.only.includes(slug))) continue;
      await db
        .update(guides)
        .set({ titleAr: arabic(a.titleAr), summaryAr: arabic(a.summaryAr), bodyHtmlAr: arabicHtml(a.bodyHtmlAr), updatedAt: sql`now()` })
        .where(eq(guides.slug, slug));
    }
  }
  for (const f of faqList) {
    const row = {
      slug: f.slug, question: cleanText(f.question, "en"), category: f.category, answerHtml: f.answerHtml,
      questionAr: arabic(f.questionAr), answerHtmlAr: arabicHtml(f.answerHtmlAr),
      tags: f.tags ?? [], status: "published" as const, lastVerifiedAt: now,
    };
    await db
      .insert(faqs)
      .values(row)
      .onConflictDoUpdate({
        target: faqs.slug,
        set: {
          question: row.question, category: row.category, answerHtml: row.answerHtml, tags: row.tags, status: row.status,
          questionAr: sql`coalesce(excluded.question_ar, ${faqs.questionAr})`,
          answerHtmlAr: sql`coalesce(excluded.answer_html_ar, ${faqs.answerHtmlAr})`,
          lastVerifiedAt: sql`case when ${faqs.answerHtml} is distinct from excluded.answer_html or ${faqs.question} is distinct from excluded.question
            or (excluded.answer_html_ar is not null and ${faqs.answerHtmlAr} is distinct from excluded.answer_html_ar)
            or (excluded.question_ar is not null and ${faqs.questionAr} is distinct from excluded.question_ar)
            or ${faqs.lastVerifiedAt} is null then excluded.last_verified_at else ${faqs.lastVerifiedAt} end`,
          updatedAt: sql`now()`,
        },
      });
  }
  return { guides: guideList.length, faqs: faqList.length };
}
