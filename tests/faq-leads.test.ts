import { describe, expect, it } from "vitest";
import { FAQ_LEADS, withFaqLead } from "@/server/seed/content/faq-leads";
import { FAQS_2026 } from "@/server/seed/content/guides-2026";
import { FAQS_GAPS_2026_11 } from "@/server/seed/content/guides-gaps-2026-11";
import { FAQS_STUDENT_LIFE } from "@/server/seed/content/guides-student-life";
import { FAQS_AIAKHEE_2026_11 } from "@/server/seed/content/faqs-aiakhee-2026-11";
import { SEED_FAQS } from "@/server/seed/content/sync";

const decode = (s: string) => s.replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
const text = (html: string) => decode(html.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
const words = (s: string) => s.split(/\s+/).filter(Boolean).length;

/** The top-level elements of an answer, as [tag, inner html]. */
function blocks(html: string): [string, string][] {
  return [...html.trim().matchAll(/<(p|ul|ol|table|h\d|blockquote)>([\s\S]*?)<\/\1>/g)].map((m) => [m[1], m[2]]);
}

/** Each FAQ as written in the guide files or aiakhee's overlay (the overlay wins), before its lead is added. */
const ORIGINAL = new Map([...FAQS_2026, ...FAQS_STUDENT_LIFE, ...FAQS_GAPS_2026_11, ...FAQS_AIAKHEE_2026_11].map((f) => [f.slug, f.answerHtml] as const));
const DASH = new RegExp(`[${String.fromCharCode(0x2014)}${String.fromCharCode(0x2013)}\\-]\\s|\\s[${String.fromCharCode(0x2014)}${String.fromCharCode(0x2013)}\\-]|[${String.fromCharCode(0x2014)}${String.fromCharCode(0x2013)}]`);
/** The lead with its allowed opening "Yes. " or "No. " removed, for the one-sentence check. */
const body = (lead: string) => lead.replace(/^(Yes|No)\. /, "");
const firstSentence = (s: string) => s.split(/(?<=[.!?])\s+/)[0];
/** Lowercased words with punctuation removed, for comparing a lead with the sentence after it. */
const norm = (s: string) => s.toLowerCase().replace(/[^\p{L}\p{N}'\s]/gu, " ").replace(/\s+/g, " ").trim();
/** A leading "With an iqama," or "Collecting:" that comes before a yes or no. */
const PREFIX = /^(with an iqama,|collecting:)\s*/i;
/** Normalised text without an opening yes or no, which the yes-or-no test below covers. */
const bare = (s: string) => norm(s.replace(PREFIX, "")).replace(/^(yes|no)\b\s*/, "");
const wordSet = (s: string) => new Set(norm(s).split(" ").filter(Boolean));
function jaccard(a: string, b: string): number {
  const A = wordSet(a), B = wordSet(b);
  const shared = [...A].filter((w) => B.has(w)).length;
  return shared / (A.size + B.size - shared);
}
/** Whether a paragraph opens with a plain yes or no, ignoring a leading "With an iqama," or "Collecting:". */
const opensYesNo = (s: string) => /^(yes|no)\b/i.test(s.replace(PREFIX, ""));

/**
 * Known debt: on these FAQs the full answer itself opens with "Yes." or "No.", so the page says it twice.
 * All of them are now fixed: nine in faqs-aiakhee-2026-11.ts, and summer-semester and degree-collection-and-verification
 * in the owner's agent "admin"'s rewrite. The list stays empty. Do not add to it.
 */
const YES_NO_TWICE = new Set<string>([]);

const DOUBT = /\b(may|might|maybe|perhaps|probably|possibly|reportedly|apparently|it seems|seems|unclear|not stated|we think|we believe|sources?|stated|reported)\b/i;

describe("FAQ short answers", () => {
  it("opens every seeded FAQ with a paragraph of at most 25 words", () => {
    const long = SEED_FAQS.flatMap((f) => {
      const [first] = blocks(f.answerHtml);
      return first?.[0] === "p" && words(text(first[1])) <= 25 && f.answerHtml.trim().startsWith("<p>") ? [] : [f.slug];
    });
    expect(long).toEqual([]);
  });

  it("only has leads for real FAQs", () => {
    const slugs = new Set(SEED_FAQS.map((f) => f.slug));
    expect(Object.keys(FAQ_LEADS).filter((k) => !slugs.has(k))).toEqual([]);
  });

  it("keeps every lead to one short sentence in house style", () => {
    for (const [slug, lead] of Object.entries(FAQ_LEADS)) {
      expect(words(lead), slug).toBeLessThanOrEqual(25);
      expect(lead, slug).toMatch(/\.$/);
      expect(lead, slug).not.toMatch(DASH);
      expect(lead, slug).not.toMatch(DOUBT);
      expect(lead, slug).toBe(lead.trim());
      expect(body(lead), `${slug}: one sentence`).not.toMatch(/[.!?]\s/);
    }
  });

  it("uses no number that the full answer does not already give", () => {
    for (const [slug, lead] of Object.entries(FAQ_LEADS)) {
      const answer = text(ORIGINAL.get(slug) ?? "");
      for (const n of lead.match(/\d[\d,.:]*\d|\d/g) ?? []) expect(answer, `${slug}: ${n}`).toContain(n);
    }
  });

  it("puts the lead first and never just repeats what follows", () => {
    for (const [slug, lead] of Object.entries(FAQ_LEADS)) {
      const faq = SEED_FAQS.find((f) => f.slug === slug)!;
      const [first, next] = blocks(faq.answerHtml);
      expect(text(first[1]), slug).toBe(lead);
      expect(faq.answerHtml.endsWith(ORIGINAL.get(slug)!), slug).toBe(true);
      const after = text(next[1]);
      expect(after, slug).not.toBe(lead);
      expect(after.split(/(?<=[.!?:])\s+/)[0], slug).not.toBe(lead);
      const sentence = firstSentence(after);
      const opening = bare(sentence);
      expect(opening !== "" && bare(lead).startsWith(opening), `${slug}: starts with the next sentence`).toBe(false);
      expect(jaccard(lead, sentence), `${slug}: rewords the next sentence`).toBeLessThanOrEqual(0.5);
    }
  });

  it("does not say yes or no twice, apart from the listed debt", () => {
    const twice = Object.entries(FAQ_LEADS).flatMap(([slug, lead]) => {
      const faq = SEED_FAQS.find((f) => f.slug === slug)!;
      const next = blocks(faq.answerHtml)[1];
      return opensYesNo(lead) && opensYesNo(text(next[1])) ? [slug] : [];
    });
    expect(twice.filter((s) => !YES_NO_TWICE.has(s)), "new yes or no said twice").toEqual([]);
    expect([...YES_NO_TWICE].filter((s) => !twice.includes(s)), "fixed: remove from YES_NO_TWICE").toEqual([]);
  });

  it("leaves FAQs without a lead exactly as written", () => {
    for (const f of SEED_FAQS) if (!FAQ_LEADS[f.slug]) expect(f.answerHtml).toBe(ORIGINAL.get(f.slug));
  });

  it("escapes the lead as plain text and leaves other FAQs alone", () => {
    FAQ_LEADS["zz-escape"] = 'Fish & chips <b>"hot"</b>.';
    try {
      expect(withFaqLead({ slug: "zz-escape", answerHtml: "<p>x</p>" }).answerHtml).toBe("<p>Fish &amp; chips &lt;b&gt;&quot;hot&quot;&lt;/b&gt;.</p><p>x</p>");
    } finally {
      delete FAQ_LEADS["zz-escape"];
    }
    const plain = { slug: "zz-none", answerHtml: "<p>x</p>" };
    expect(withFaqLead(plain)).toBe(plain);
  });
});
