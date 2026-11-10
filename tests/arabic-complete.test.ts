import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { SEED_FAQS, SEED_GUIDES } from "@/server/seed/content/sync";
import { EN_SHA_FILE, enShaKey, faqEnSha, guideEnSha } from "@/server/seed/content/en-sha";

/**
 * The owner's rule: with Arabic on, every guide and answer is fully in Arabic. These checks fail when a guide or
 * answer has no Arabic, or when its Arabic has drifted from the English it translates (a section, step, table row or
 * link added to the English and not to the Arabic). Translations live in docs/research/translations; after editing
 * one, run scripts/build-arabic-seed.ts.
 */

const TAGS = ["h2", "h3", "ol", "ul", "li", "blockquote", "table", "tr"] as const;
const count = (html: string) => Object.fromEntries(TAGS.map((t) => [t, (html.match(new RegExp(`<${t}[\\s>]`, "g")) ?? []).length]));
/** Internal links, with the Arabic tree's /ar prefix taken off so they compare with the English. */
const internal = (html: string, ar: boolean) =>
  [...html.matchAll(/href="(\/[^"#?]*)/g)].map((m) => (ar ? m[1].replace(/^\/ar(?=\/|$)/, "") || "/" : m[1])).sort();

function drift(en: string, ar: string): string[] {
  const out: string[] = [];
  const ce = count(en), ca = count(ar);
  for (const t of TAGS) if (ce[t] !== ca[t]) out.push(`<${t}> ${ce[t]} in English, ${ca[t]} in Arabic`);
  if (internal(en, false).join() !== internal(ar, true).join()) out.push("internal links differ");
  const outside = [...ar.matchAll(/href="(\/[^"]*)/g)].map((m) => m[1]).filter((h) => !/^\/ar(\/|$)/.test(h));
  if (outside.length) out.push(`links leave the Arabic site: ${outside.join(", ")}`);
  if (/[—–]/.test(ar)) out.push("long dash");
  if (en.includes("9076") && !ar.includes("mesh@albaseerah.org")) out.push("Admin line without the email");
  return out;
}

describe("every guide is in Arabic", () => {
  it.each(SEED_GUIDES.map((g) => [g.slug, g] as const))("%s", (_slug, g) => {
    expect(g.titleAr?.trim(), "titleAr").toBeTruthy();
    expect(g.summaryAr?.trim(), "summaryAr").toBeTruthy();
    expect(g.bodyHtmlAr?.trim(), "bodyHtmlAr").toBeTruthy();
    expect(drift(g.bodyHtml, g.bodyHtmlAr ?? "")).toEqual([]);
  });
});

describe("every answer is in Arabic", () => {
  it.each(SEED_FAQS.map((f) => [f.slug, f] as const))("%s", (_slug, f) => {
    expect(f.questionAr?.trim(), "questionAr").toBeTruthy();
    expect(f.answerHtmlAr?.trim(), "answerHtmlAr").toBeTruthy();
    expect(drift(f.answerHtml, f.answerHtmlAr ?? "")).toEqual([]);
    // Same paragraphs: the short answer that opens the English opens the Arabic too.
    const paragraphs = (h: string) => (h.match(/<p[\s>]/g) ?? []).length;
    expect(paragraphs(f.answerHtmlAr ?? ""), "paragraphs").toBe(paragraphs(f.answerHtml));
  });
});

/**
 * AR5.2: the Arabic was checked against this exact English. A changed fee, date or sentence in the English
 * (which the structure checks above cannot see) fails here until the Arabic is updated and re-stamped:
 * npm run arabic:stamp -- <slug>.
 */
describe("the Arabic was checked against today's English", () => {
  const stamped: Record<string, string> = JSON.parse(readFileSync(EN_SHA_FILE, "utf8"));
  const hint = (slug: string) => `English changed since its Arabic was checked: update the Arabic, then npm run arabic:stamp -- ${slug}`;
  it.each(SEED_GUIDES.map((g) => [g.slug, g] as const))("guide %s", (slug, g) => {
    expect(stamped[enShaKey("guides", slug)], hint(slug)).toBe(guideEnSha(g));
  });
  it.each(SEED_FAQS.map((f) => [f.slug, f] as const))("answer %s", (slug, f) => {
    expect(stamped[enShaKey("faqs", slug)], hint(slug)).toBe(faqEnSha(f));
  });
});
