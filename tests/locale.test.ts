import { describe, expect, it } from "vitest";
import { dir } from "@/lib/locale";
import { STRINGS, t } from "@/features/duroos/strings";

describe("locale", () => {
  it("is right-to-left for Arabic only", () => {
    expect(dir("ar")).toBe("rtl");
    expect(dir("en")).toBe("ltr");
  });
  it("translates duroos UI strings", () => {
    expect(t("ar", "today")).toBe("اليوم");
    expect(t("en", "today")).toBe("Today");
  });
  it("has an Arabic string for every English key", () => {
    const missing = Object.keys(STRINGS.en).filter((k) => !(k in STRINGS.ar));
    expect(missing).toEqual([]);
  });
  it("uses the owner's iqamah note wording", () => {
    expect(t("en", "afterIqamah")).toBe("Starts right after the iqamah");
  });
});

describe("localizeUrl", () => {
  it("sends Arabic readers to Arabic twins and leaves outside links alone", async () => {
    const { localizeUrl } = await import("@/lib/locale");
    expect(localizeUrl("/guides/iqama", "ar")).toBe("/ar/guides/iqama");
    expect(localizeUrl("/duroos/lesson/x", "ar")).toBe("/ar/duroos/lesson/x");
    expect(localizeUrl("/more#alerts", "ar")).toBe("/ar/more#alerts");
    expect(localizeUrl("/library", "ar")).toBe("/ar/library");
    expect(localizeUrl("/library/sharia", "ar")).toBe("/ar/library/sharia");
    expect(localizeUrl("/library/mahad#f-1", "ar")).toBe("/ar/library/mahad#f-1");
    expect(localizeUrl("/ar/guides", "ar")).toBe("/ar/guides");
    expect(localizeUrl("/archive", "ar")).toBe("/archive");
    expect(localizeUrl("/mahad", "ar")).toBe("/ar/mahad");
    expect(localizeUrl("/", "ar")).toBe("/ar");
    expect(localizeUrl("https://example.com", "ar")).toBe("https://example.com");
    expect(localizeUrl("/guides/iqama", "en")).toBe("/guides/iqama");
  });
});

describe("hijriTextAr", () => {
  it("writes the calendar's Hijri dates in Arabic", async () => {
    const { hijriTextAr } = await import("@/lib/time/hijri");
    expect(hijriTextAr("19 Safar to 19 Rabi al-Awwal 1448")).toBe("١٩ صفر إلى ١٩ ربيع الأول ١٤٤٨هـ");
    expect(hijriTextAr("8 Rajab to 17 Dhul Qa'dah 1448")).toBe("٨ رجب إلى ١٧ ذي القعدة ١٤٤٨هـ");
    expect(hijriTextAr("10 Dhul Hijjah 1448")).toBe("١٠ ذي الحجة ١٤٤٨هـ");
  });
  it("leaves no Latin letters in any calendar date", async () => {
    const { hijriTextAr } = await import("@/lib/time/hijri");
    const { KEY_DATES } = await import("@/content/key-dates");
    const latin = KEY_DATES.map((d) => hijriTextAr(d.hijri)).filter((s) => /[A-Za-z]/.test(s));
    expect(latin).toEqual([]);
    expect(KEY_DATES.filter((d) => d.after && !d.afterAr).map((d) => d.id)).toEqual([]);
  });
});
