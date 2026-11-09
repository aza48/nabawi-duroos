import { describe, expect, it } from "vitest";
import { SEED_FAQS, SEED_GUIDES } from "@/server/seed/content/sync";

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
  });
});
