import { createHash } from "node:crypto";

/**
 * A short fingerprint of the English a translation was made from. docs/research/translations/en-sha.json keeps
 * the fingerprint of the English each Arabic page was last checked against; tests/arabic-complete.test.ts fails
 * when the English has changed since, so a changed fee, date or sentence cannot leave the Arabic behind.
 * After updating an Arabic page to today's English: npm run arabic:stamp -- <slug> (or --all).
 */
export const EN_SHA_FILE = "docs/research/translations/en-sha.json";

const sha = (s: string) => createHash("sha256").update(s.replace(/\r\n/g, "\n").trim()).digest("hex").slice(0, 12);

const part = (s: string) => s.replace(/\r\n/g, "\n").trim();
export const guideEnSha = (g: { title: string; summary: string; bodyHtml: string }) => sha([g.title, g.summary, g.bodyHtml].map(part).join("\n"));
export const faqEnSha = (f: { question: string; answerHtml: string }) => sha([f.question, f.answerHtml].map(part).join("\n"));

/** Keys in en-sha.json: "guides/<slug>" and "faqs/<slug>". */
export const enShaKey = (kind: "guides" | "faqs", slug: string) => `${kind}/${slug}`;
