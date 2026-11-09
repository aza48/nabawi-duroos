import { describe, expect, it } from "vitest";
import { arabicReadingMinutes, faqText, guideText, textAttrs } from "@/lib/arabic-content";

const guide = { title: "Opening a bank account", summary: "Which bank, which papers.", bodyHtml: "<p>English</p>" };
const faq = { question: "Can I open an account?", answerHtml: "<p>Yes.</p>" };

describe("Arabic guide and answer text (AR2)", () => {
  it("keeps English, with the English note, until a translation exists", () => {
    expect(guideText(guide, "ar")).toMatchObject({ title: guide.title, bodyHtml: guide.bodyHtml, bodyInArabic: false });
    expect(guideText({ ...guide, titleAr: "", bodyHtmlAr: "  " }, "ar").bodyInArabic).toBe(false);
    expect(faqText(faq, "ar")).toMatchObject({ question: faq.question, answerInArabic: false });
  });

  it("shows each Arabic field that exists", () => {
    const g = guideText({ ...guide, titleAr: "فتح حساب بنكي", summaryAr: "أي بنك وأي أوراق.", bodyHtmlAr: "<p>عربي</p>" }, "ar");
    expect(g).toEqual({ title: "فتح حساب بنكي", summary: "أي بنك وأي أوراق.", bodyHtml: "<p>عربي</p>", bodyInArabic: true, titleInArabic: true, summaryInArabic: true, readingMinutes: 1 });
    const titleOnly = guideText({ ...guide, titleAr: "فتح حساب بنكي" }, "ar");
    expect(titleOnly).toMatchObject({ title: "فتح حساب بنكي", bodyHtml: guide.bodyHtml, bodyInArabic: false, titleInArabic: true });
    expect(faqText({ ...faq, questionAr: "هل أفتح حسابًا؟", answerHtmlAr: "<p>نعم.</p>" }, "ar")).toMatchObject({ question: "هل أفتح حسابًا؟", answerHtml: "<p>نعم.</p>", answerInArabic: true });
  });

  it("never changes the English pages", () => {
    expect(guideText({ ...guide, titleAr: "x", bodyHtmlAr: "<p>x</p>" }, "en")).toMatchObject({ title: guide.title, bodyHtml: guide.bodyHtml, bodyInArabic: false });
  });

  it("marks the direction and language of each block on Arabic pages only", () => {
    expect(textAttrs(true, "ar")).toEqual({ dir: "rtl", lang: "ar" });
    expect(textAttrs(false, "ar")).toEqual({ dir: "ltr", lang: "en" });
    expect(textAttrs(true, "en")).toEqual({});
  });

  it("takes the reading time from the body that is shown", () => {
    const long = `<p>${"كلمة ".repeat(451)}</p>`;
    expect(arabicReadingMinutes(long)).toBe(4);
    expect(arabicReadingMinutes("")).toBe(1);
    expect(guideText({ ...guide, readingMinutes: 7, bodyHtmlAr: long }, "ar").readingMinutes).toBe(4);
    expect(guideText({ ...guide, readingMinutes: 7, bodyHtmlAr: long }, "en").readingMinutes).toBe(7);
    expect(guideText({ ...guide, readingMinutes: 7 }, "ar").readingMinutes).toBe(7);
  });
});
