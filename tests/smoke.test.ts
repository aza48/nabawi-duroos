import { describe, expect, it } from "vitest";

describe("legacy data", () => {
  it("exposes the 45 verified lessons through the @ alias", async () => {
    const mod = await import("@/server/seed/legacy/lessons");
    expect(mod.LESSONS).toHaveLength(45);
  });
});

describe("library titles", () => {
  it("turns Drive file names into book names", async () => {
    const { cleanTitle } = await import("@/content/library-books");
    expect(cleanTitle("Emailing القراءة م1")).toBe("القراءة م1");
    expect(cleanTitle("التدريبات م٥ merged")).toBe("التدريبات م٥");
    expect(cleanTitle("شرح شجرة الأسماء (2) (1)")).toBe("شرح شجرة الأسماء");
    expect(cleanTitle("ب محتوى مقرر القيم الإسلامية (1)-1")).toBe("ب محتوى مقرر القيم الإسلامية");
    expect(cleanTitle("الميسر في غريب القرآن \u2013 الجزء الأول")).toBe("الميسر في غريب القرآن\u060c الجزء الأول");
    expect(cleanTitle("علم-مقاصد-الشارع-\u2013-أ.د.-عبدالعزيز-بن-ربيعة")).toBe("علم مقاصد الشارع\u060c أ.د. عبدالعزيز بن ربيعة");
    expect(cleanTitle("Tafsir \u2014 part one")).toBe("Tafsir, part one");
    expect(cleanTitle("‎⁨تشجير فقه المعاملات كامل⁩")).toBe("تشجير فقه المعاملات كامل");
    expect(cleanTitle("بدون حذف النصوص الأدبية المستوى 6")).toBe("النصوص الأدبية المستوى 6");
    expect(cleanTitle("7-الماتريدية(3)doc")).toBe("7-الماتريدية");
    expect(cleanTitle("IMG 20240822 081927 953")).toBe("Photo");
    expect(cleanTitle("١٢")).toBe("١٢");
  });
});
