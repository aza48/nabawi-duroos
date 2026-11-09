import type { Locale } from "@/lib/locale";

/**
 * Arabic text for guides and answers (work plan AR2). The Arabic columns come with AR1 (`titleAr`, `summaryAr`,
 * `bodyHtmlAr` on guides; `questionAr`, `answerHtmlAr` on FAQs). Until then they are simply absent, and every
 * Arabic page keeps the English text with its "this page is in English" note.
 */
type GuideLike = { title: string; summary: string | null; bodyHtml: string; titleAr?: string | null; summaryAr?: string | null; bodyHtmlAr?: string | null };
type FaqLike = { question: string; answerHtml: string; questionAr?: string | null; answerHtmlAr?: string | null };

const has = (s: string | null | undefined): s is string => typeof s === "string" && s.trim().length > 0;

export type LocalText = {
  title: string;
  summary: string | null;
  bodyHtml: string;
  /** The body is in Arabic: no English note, right to left. */
  bodyInArabic: boolean;
  /** Each field on its own, so a translated title can sit above a body still in English. */
  titleInArabic: boolean;
  summaryInArabic: boolean;
};

export function guideText(g: GuideLike, locale: Locale): LocalText {
  const ar = locale === "ar";
  const t = ar && has(g.titleAr);
  const s = ar && has(g.summaryAr);
  const b = ar && has(g.bodyHtmlAr);
  return {
    title: t ? g.titleAr! : g.title,
    summary: s ? g.summaryAr! : g.summary,
    bodyHtml: b ? g.bodyHtmlAr! : g.bodyHtml,
    bodyInArabic: b,
    titleInArabic: t,
    summaryInArabic: s,
  };
}

export function faqText(f: FaqLike, locale: Locale): { question: string; answerHtml: string; answerInArabic: boolean; questionInArabic: boolean } {
  const ar = locale === "ar";
  const q = ar && has(f.questionAr);
  const a = ar && has(f.answerHtmlAr);
  return { question: q ? f.questionAr! : f.question, answerHtml: a ? f.answerHtmlAr! : f.answerHtml, answerInArabic: a, questionInArabic: q };
}

/** Text direction and language for a block: Arabic text is right to left, English text inside an Arabic page is marked English. */
export function textAttrs(inArabic: boolean, locale: Locale): { dir: "rtl" | "ltr"; lang: "ar" | "en" } | Record<string, never> {
  if (locale !== "ar") return {};
  return inArabic ? { dir: "rtl", lang: "ar" } : { dir: "ltr", lang: "en" };
}
