import { describe, expect, it } from "vitest";
import { AR_NOUNS, AR_PHRASES, arCount, arNounFor, enCount } from "@/lib/arabic-count";

describe("arCount (D2)", () => {
  it("reads every range of a masculine noun", () => {
    expect(arCount(0, "dars")).toBe("لا دروس");
    expect(arCount(1, "dars")).toBe("درس واحد");
    expect(arCount(2, "dars")).toBe("درسان");
    expect(arCount(3, "dars")).toBe("٣ دروس");
    expect(arCount(10, "dars")).toBe("١٠ دروس");
    expect(arCount(11, "dars")).toBe("١١ درسًا");
    expect(arCount(99, "dars")).toBe("٩٩ درسًا");
    expect(arCount(100, "dars")).toBe("١٠٠ درس");
    expect(arCount(101, "dars")).toBe("١٠١ درس");
    expect(arCount(102, "dars")).toBe("١٠٢ درس");
    expect(arCount(103, "dars")).toBe("١٠٣ دروس");
    expect(arCount(110, "dars")).toBe("١١٠ دروس");
    expect(arCount(111, "dars")).toBe("١١١ درسًا");
    expect(arCount(200, "dars")).toBe("٢٠٠ درس");
    expect(arCount(1000, "dars")).toBe("١٠٠٠ درس");
  });

  it("reads a feminine noun, whose 11+ form has no added alif", () => {
    expect(arCount(1, "result")).toBe("نتيجة واحدة");
    expect(arCount(2, "result")).toBe("نتيجتان");
    expect(arCount(5, "result")).toBe("٥ نتائج");
    expect(arCount(11, "result")).toBe("١١ نتيجة");
    expect(arCount(12, "minute")).toBe("١٢ دقيقة");
    expect(arCount(11, "level")).toBe("١١ مستوى");
  });

  it("uses the oblique dual after a preposition or as an object", () => {
    expect(`بعد ${arCount(2, "day", { case: "gen" })}`).toBe("بعد يومين");
    expect(`في ${arCount(2, "masjid", { case: "gen" })}`).toBe("في مسجدين");
    expect(arCount(2, "day")).toBe("يومان");
    expect(arCount(1, "dars", { case: "acc" })).toBe("درسًا واحدًا");
    expect(arCount(1, "step", { case: "acc" })).toBe("خطوة واحدة");
    expect(`بعد ${arCount(1, "day", { case: "gen" })}`).toBe("بعد يوم واحد");
  });

  it("can drop واحد, cap with plus, and say zero its own way", () => {
    expect(`${arCount(1, "minute", { one: "bare" })} للقراءة`).toBe("دقيقة للقراءة");
    expect(arCount(60, "file", { plus: true })).toBe("٦٠+ ملفًا");
    expect(arCount(0, "result", { zero: "لا نتائج" })).toBe("لا نتائج");
  });

  it("agrees the adjective in the phrases", () => {
    expect(`عرض ${arCount(1, AR_PHRASES.darsOther, { case: "gen", one: "bare" })}`).toBe("عرض درس آخر");
    expect(`عرض ${arCount(2, AR_PHRASES.darsOther, { case: "gen" })}`).toBe("عرض درسين آخرين");
    expect(`عرض ${arCount(3, AR_PHRASES.darsOther, { case: "gen" })}`).toBe("عرض ٣ دروس أخرى");
    expect(`عرض ${arCount(11, AR_PHRASES.darsOther, { case: "gen" })}`).toBe("عرض ١١ درسًا آخر");
    expect(`${arCount(3, AR_PHRASES.darsLive)} الآن`).toBe("٣ دروس مباشرة الآن");
  });

  it("never prints Western digits or long dashes", () => {
    for (const key of Object.keys(AR_NOUNS) as (keyof typeof AR_NOUNS)[]) {
      for (const k of [0, 1, 2, 3, 7, 10, 11, 25, 99, 100, 101, 103, 111, 250]) {
        const s = arCount(k, key);
        expect(s, `${key} ${k}`).not.toMatch(/[0-9–—]/);
      }
    }
  });

  it("gives the noun alone when the number is shown elsewhere", () => {
    expect(arNounFor(3, "step")).toBe("خطوات");
    expect(arNounFor(12, "step")).toBe("خطوة");
    expect(arNounFor(2, "step", "gen")).toBe("خطوتين");
  });

  it("counts in English too", () => {
    expect(enCount(1, "dars", "duroos")).toBe("1 dars");
    expect(enCount(4, "dars", "duroos")).toBe("4 duroos");
  });
});
