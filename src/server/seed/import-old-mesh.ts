import { readFileSync } from "node:fs";
import path from "node:path";
import { marked } from "marked";
import type { Db } from "@/server/db/client";
import { guides, type GuideStage } from "@/server/db/schema";
import { sanitizeArticleHtml } from "@/lib/sanitize";
import { cleanText } from "@/lib/text";

/**
 * Imports the guides from the previous MESH site (a full-text export, owner
 * supplied). Index pages, interactive tools and Ask/About are skipped; site
 * chrome (share buttons, step counters, "More in" lists, old links) is removed.
 */

const OLD_HOST = /https?:\/\/mesh\.obi2b-contact-alt\.workers\.dev/;

const STAGE_BY_PATH: Record<string, GuideStage> = {
  "admissions/new-student-steps": "getting-started",
  "admissions/tajeel-and-itithaar": "study",
  calendar: "study",
  "visas/drivers-license": "getting-settled",
  "daily-life/finding-an-apartment": "getting-settled",
  "family/childbirth-options": "family",
  "family/kids-activities": "family",
  "family/sisters-studying-in-madinah": "family",
  "graduates/graduate-procedures": "leaving",
  "graduates/graduating-from-mahad": "study",
  "graduates/postgraduate-admission-1448": "study",
  "study/course-descriptions-aqeedah-dawah": "study",
};

const SLUG_OVERRIDE: Record<string, string> = { calendar: "university-calendar-1448" };

export type OldGuide = { slug: string; title: string; summary: string; bodyHtml: string; stage: GuideStage };

function cleanBody(md: string, description: string): string {
  const lines = md.split("\n");
  const start = lines.findIndex((l) => /^# /.test(l));
  const out: string[] = [];
  for (const raw of lines.slice(start + 1)) {
    const l = raw.trimEnd();
    if (/^## More in |^Still have a question/.test(l)) break;
    if (l.trim() === description.trim()) continue;
    if (/^Updated \d/.test(l)) continue;
    if (/^\[Share on WhatsApp\]/.test(l)) continue;
    if (/^\[button: [^\]]*\]\s*$/.test(l.trim())) continue;
    if (/^\*\*\d+ (steps|parts|sections)\*\*/.test(l)) continue;
    if (/^Tick each step/.test(l)) continue;
    if (/^Something out of date\?/.test(l)) continue;
    if (/^\s*(\d+\.|-)\s*\[[^\]]+\]\([^)]*#[^)]*\)\s*$/.test(l)) continue; // table of contents
    if (/^\s*\[Ask MESH\]/.test(l)) continue;
    out.push(l);
  }
  return out
    .join("\n")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "") // images from the old host
    .replace(/\[button: ([^\]]+)\]/g, "$1")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_m, text: string, href: string) => (OLD_HOST.test(href) || href.startsWith("#") ? text : `[${text}](${href})`))
    .replace(/\*\*\s+([,.;:)!?])/g, "**$1")
    .replace(/\*\*\s{2,}/g, "** ")
    .replace(/(\S) +([.,;:!?])(?=\s|$)/g, "$1$2")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function parseOldMesh(text: string): OldGuide[] {
  const blocks = text.split(/\n=+\nPAGE: /).slice(1);
  const result: OldGuide[] = [];
  for (const block of blocks) {
    const title = block.split("\n")[0].replace(/\s*\|\s*MESH\s*$/, "").trim();
    const url = /\nURL: (\S+)/.exec(block)?.[1] ?? "";
    const pathKey = url.replace(OLD_HOST, "").replace(/^\/|\/$/g, "");
    const stage = STAGE_BY_PATH[pathKey];
    if (!stage) continue;
    const description = /\nDESCRIPTION: (.*)/.exec(block)?.[1]?.trim() ?? "";
    const body = block.split(/\n=+\n/).slice(1).join("\n");
    const md = cleanText(cleanBody(body, description), "en");
    const html = sanitizeArticleHtml(marked.parse(md, { async: false }) as string);
    result.push({
      slug: SLUG_OVERRIDE[pathKey] ?? pathKey.split("/").pop()!,
      title: cleanText(title, "en"),
      summary: cleanText(description || title, "en"),
      bodyHtml: html,
      stage,
    });
  }
  return result;
}

/** Adds the old guides as published content, without overwriting anything admins have edited. */
export async function importOldMesh(db: Db): Promise<number> {
  const file = path.join(process.cwd(), "src/server/seed/legacy/old-mesh.md");
  const parsed = parseOldMesh(readFileSync(file, "utf8"));
  for (const g of parsed) {
    const words = g.bodyHtml.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
    await db
      .insert(guides)
      .values({ ...g, readingMinutes: Math.max(1, Math.ceil(words / 200)), status: "published" })
      .onConflictDoNothing({ target: guides.slug });
  }
  return parsed.length;
}
