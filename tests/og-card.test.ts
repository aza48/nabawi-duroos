import { describe, expect, it } from "vitest";
import { arSegments, fitLine, fitTitle, isArabic, ogWords } from "@/app/_og/text";

describe("share card text", () => {
  it("tells Arabic from English", () => {
    expect(isArabic("شرح كتاب التوحيد")).toBe(true);
    expect(isArabic("أجوبة MESH")).toBe(true);
    expect(isArabic("Kitab at-Tawhid")).toBe(false);
  });

  it("splits a line into words", () => {
    expect(ogWords("  شرح   كتاب التوحيد ")).toEqual(["شرح", "كتاب", "التوحيد"]);
    expect(ogWords("")).toEqual([]);
  });

  it("splits an Arabic word into letters, numbers and punctuation in reading order", () => {
    expect(arSegments("أ.د.")).toEqual(["أ", ".", "د", "."]);
    expect(arSegments("المغرب،")).toEqual(["المغرب", "،"]);
    expect(arSegments("للطالب؟")).toEqual(["للطالب", "؟"]);
    expect(arSegments("كتاب…")).toEqual(["كتاب", "…"]);
    expect(arSegments("٥:٣٧")).toEqual(["٥:٣٧"]);
    expect(arSegments("MESH")).toEqual(["MESH"]);
    expect(arSegments("(التأشيرة)")).toEqual(["(", "التأشيرة", ")"]);
    expect(arSegments("«دليل»")).toEqual(["»", "دليل", "«"]);
    expect(arSegments("مُحَمَّد")).toEqual(["مُحَمَّد"]);
  });

  it("keeps short titles whole and large", () => {
    expect(fitTitle("Kitab at-Tawhid")).toEqual({ text: "Kitab at-Tawhid", size: 76 });
    expect(fitTitle("كتاب التوحيد")).toEqual({ text: "كتاب التوحيد", size: 68 });
  });

  it("cuts long titles by character count with an ellipsis", () => {
    const en = fitTitle("An explanation of the book of the foundations of the Sunnah and the creed of the people of hadith");
    expect(en.text.length).toBeLessThanOrEqual(96);
    expect(en.text.endsWith("…")).toBe(true);
    expect(en.size).toBe(54);
    const ar = fitTitle("شرح كتاب أصول السنة واعتقاد أهل الحديث والأثر في مسائل الإيمان والقدر والصحابة");
    expect(ar.text.length).toBeLessThanOrEqual(60);
    expect(ar.text.endsWith("…")).toBe(true);
    expect(ar.size).toBe(52);
  });

  it("cuts secondary lines shorter in Arabic", () => {
    expect(fitLine("a ".repeat(60)).length).toBeLessThanOrEqual(90);
    expect(fitLine("كلمة ".repeat(20)).length).toBeLessThanOrEqual(60);
    expect(fitLine("Al-Masjid an-Nabawi")).toBe("Al-Masjid an-Nabawi");
  });
});
