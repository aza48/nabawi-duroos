import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { FAQ_CATEGORIES } from "@/server/content/queries";
import { FAQS_2026 } from "@/server/seed/content/guides-2026";
import { FAQS_GAPS_2026_11 } from "@/server/seed/content/guides-gaps-2026-11";
import { FAQS_STUDENT_LIFE } from "@/server/seed/content/guides-student-life";
import { AIAKHEE_REPLACED_SLUGS, FAQS_AIAKHEE_2026_11 } from "@/server/seed/content/faqs-aiakhee-2026-11";
import { FAQ_LEADS } from "@/server/seed/content/faq-leads";
import { SEED_FAQS, SEED_GUIDES } from "@/server/seed/content/sync";
import { enhanceGuideHtml } from "@/lib/guide-html";

/** The FAQs in akhiai's guide files, which the overlay may replace but never edits. */
const BASE = [...FAQS_2026, ...FAQS_STUDENT_LIFE, ...FAQS_GAPS_2026_11];
const BASE_SLUGS = new Set(BASE.map((f) => f.slug));
const OVERLAY = FAQS_AIAKHEE_2026_11;


/** Section ids that each page can be linked to with a #anchor. */
const ANCHORS = new Map<string, Set<string>>([
  ...SEED_GUIDES.map((g) => [`/guides/${g.slug}`, new Set(enhanceGuideHtml(g.bodyHtml).toc.map((t) => t.id))] as const),
  ["/library", new Set([...readFileSync(join(process.cwd(), "src/features/library/LibraryPage.tsx"), "utf8").matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]))],
]);


const links = (html: string) => [...html.matchAll(/href="(\/[^"]*)"/g)].map((m) => m[1]);
const text = (html: string) => html.replace(/<[^>]+>/g, " ").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim();

/** Words that show doubt or point to a source. Public copy speaks with authority. */
const DOUBT = /\b(may|might|maybe|perhaps|probably|possibly|reportedly|apparently|according to|check with|it seems|unclear|not stated|students report|we think|we believe)\b/i;

/** Whether every internal link leads to a real page is checked for all FAQs in tests/content-links.test.ts. */
describe("FAQ content", () => {
  it("has one entry per slug in every list, and in the published set", () => {
    for (const list of [FAQS_2026, FAQS_STUDENT_LIFE, FAQS_GAPS_2026_11, OVERLAY, SEED_FAQS]) {
      const slugs = list.map((f) => f.slug);
      expect(slugs.filter((s, i) => slugs.indexOf(s) !== i)).toEqual([]);
    }
    const added = OVERLAY.filter((f) => !BASE_SLUGS.has(f.slug)).length;
    expect(SEED_FAQS).toHaveLength(BASE_SLUGS.size + added);
  });

  it("keeps the slug, category and place of every FAQ the overlay replaces", () => {
    const replaced = OVERLAY.filter((f) => BASE_SLUGS.has(f.slug)).map((f) => f.slug);
    expect(replaced).toEqual(AIAKHEE_REPLACED_SLUGS);
    for (const slug of replaced) {
      const before = BASE.find((f) => f.slug === slug)!;
      const after = OVERLAY.find((f) => f.slug === slug)!;
      expect(after.category, slug).toBe(before.category);
      const published = SEED_FAQS.find((f) => f.slug === slug)!;
      expect(published.answerHtml.endsWith(after.answerHtml), `${slug}: the overlay wins`).toBe(true);
      expect(published.question, slug).toBe(after.question);
    }
    // A replacement keeps the FAQ where it was in the list.
    const order = SEED_FAQS.map((f) => f.slug);
    expect(order.slice(0, BASE_SLUGS.size)).toEqual([...BASE_SLUGS]);
  });

  it("files every FAQ under a real category", () => {
    const ids = new Set<string>(FAQ_CATEGORIES.map((c) => c.id));
    expect(SEED_FAQS.filter((f) => !ids.has(f.category)).map((f) => f.slug)).toEqual([]);
  });


  it("links to #sections that exist on their page", () => {
    const broken = SEED_FAQS.flatMap((f) =>
      links(f.answerHtml)
        .filter((h) => h.includes("#"))
        .filter((h) => {
          const [path, id] = h.split("#");
          return !ANCHORS.get(path.replace(/\?.*$/, ""))?.has(id);
        })
        .map((h) => `${f.slug} -> ${h}`),
    );
    expect(broken).toEqual([]);
  });

  it("finds anchors the way guide pages make them", () => {
    expect(ANCHORS.get("/library")?.has("course-books")).toBe(true);
    const tajeel = SEED_GUIDES.find((g) => g.slug === "tajeel-and-itithaar")!;
    expect(ANCHORS.get("/guides/tajeel-and-itithaar")?.size).toBe((tajeel.bodyHtml.match(/<h2[\s>]/g) ?? []).length);
  });

  it("speaks with authority and uses no dashes in aiakhee's FAQs", () => {
    const em = String.fromCharCode(0x2014), en = String.fromCharCode(0x2013);
    for (const f of OVERLAY) {
      const words = `${f.question} ${text(f.answerHtml)} ${FAQ_LEADS[f.slug] ?? ""}`;
      expect(words, f.slug).not.toMatch(DOUBT);
      expect(words, f.slug).not.toContain(em);
      expect(words, f.slug).not.toContain(en);
      expect(words, f.slug).not.toMatch(/\s-\s/);
    }
  });

  it("sends help questions to Admin on WhatsApp, never to the group", () => {
    for (const f of OVERLAY) {
      const t = text(f.answerHtml);
      expect(t, f.slug).not.toMatch(/ask (in )?the group|post in the group|send it to us/i);
      if (/message Admin/i.test(t)) expect(t, f.slug).toContain("message Admin on WhatsApp at +1 234 567 9076");
    }
  });

  it("dates every time-limited fact in aiakhee's FAQs", () => {
    const dated = ["monthly-budget", "madinah-bus-fares", "haramain-train-to-makkah", "umrah-from-madinah", "hajj-while-studying", "nationality-representative", "skills-record"];
    for (const slug of dated) expect(text(OVERLAY.find((f) => f.slug === slug)!.answerHtml), slug).toMatch(/November 2026|October 2026|1448/);
  });
});
