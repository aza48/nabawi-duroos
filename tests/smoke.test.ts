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

describe("refresh paths", () => {
  it("adds the Arabic twin of every public page once", async () => {
    const { withArabic } = await import("@/server/admin/refresh");
    expect(withArabic(["/guides", "/guides/x", "/", "/ar/duroos"])).toEqual(["/guides", "/ar/guides", "/guides/x", "/ar/guides/x", "/", "/ar", "/ar/duroos"]);
  });
});

describe("admin error messages", () => {
  it("name fields the way the form does, never by code name", async () => {
    const { fieldLabel } = await import("@/server/admin/field-label");
    expect(fieldLabel(["bookUrl"])).toBe("Book link");
    expect(fieldLabel(["titleAr"])).toBe("Title (Arabic)");
    expect(fieldLabel(["bodyHtml"])).toBe("Body");
    expect(fieldLabel(["url"])).toBe("Link");
    expect(fieldLabel([])).toBe("Input");
  });
});
