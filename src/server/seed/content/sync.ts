import { sql } from "drizzle-orm";
import type { Db } from "@/server/db/client";
import { faqs, guides } from "@/server/db/schema";
import { cleanText } from "@/lib/text";
import { FAQS_2026, GUIDES_2026 } from "./guides-2026";

const minutes = (html: string) => Math.max(1, Math.ceil(html.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length / 200));

/** Upserts the November 2026 guides and FAQs as published and verified. Safe to run repeatedly. */
export async function syncContent2026(db: Db, now: Date = new Date()): Promise<{ guides: number; faqs: number }> {
  for (const g of GUIDES_2026) {
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
        set: { title: row.title, summary: row.summary, stage: row.stage, bodyHtml: row.bodyHtml, readingMinutes: row.readingMinutes, status: row.status, lastVerifiedAt: now, updatedAt: sql`now()` },
      });
  }
  for (const f of FAQS_2026) {
    const row = { slug: f.slug, question: cleanText(f.question, "en"), category: f.category, answerHtml: f.answerHtml, tags: f.tags ?? [], status: "published" as const, lastVerifiedAt: now };
    await db
      .insert(faqs)
      .values(row)
      .onConflictDoUpdate({
        target: faqs.slug,
        set: { question: row.question, category: row.category, answerHtml: row.answerHtml, tags: row.tags, status: row.status, lastVerifiedAt: now, updatedAt: sql`now()` },
      });
  }
  return { guides: GUIDES_2026.length, faqs: FAQS_2026.length };
}
