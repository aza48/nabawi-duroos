import { describe, expect, it } from "vitest";
import { expandQuery, normalize } from "@/lib/search/normalize";
import { createSearch, type SearchDoc } from "@/lib/search/engine";

describe("normalize", () => {
  it("folds Arabic letter variants and strips diacritics", () => {
    expect(normalize("التَّأْجِيل")).toBe(normalize("التاجيل"));
    expect(normalize("مكتبة")).toBe(normalize("مكتبه"));
    expect(normalize("إقامة")).toBe(normalize("اقامه"));
  });
  it("folds Latin transliteration marks and case", () => {
    expect(normalize("Ta'jeel")).toBe("tajeel");
    expect(normalize("Ma’had")).toBe("mahad");
  });
});

describe("expandQuery", () => {
  it("adds known spellings and synonyms", () => {
    const q = expandQuery("ikama renewal");
    expect(q).toContain("iqama");
    expect(expandQuery("stipend")).toContain("mukafaah");
    expect(expandQuery("deferral")).toContain("tajeel");
    expect(expandQuery("sheikh")).toContain("shaykh");
  });
});

const docs: SearchDoc[] = [
  { id: "g1", type: "guide", title: "Taking a semester off: ta'jeel and i'tithaar", subtitle: "How to postpone a semester", text: "Ta'jeel is a semester break. Your mukafa'ah stops.", url: "/guides/tajeel" },
  { id: "g2", type: "guide", title: "First steps for new students", subtitle: "Visa, iqama, Absher", text: "Get your iqama and activate Absher and Nafath.", url: "/guides/new" },
  { id: "s1", type: "shaykh", title: "Sulayman ibn Saleemullah al-Ruhayli", subtitle: "سليمان بن سليم الله الرحيلي", text: "Duroos at Masjid Quba and the Haram", url: "/duroos/shaykh/ruhayli" },
  { id: "p1", type: "program", title: "Madinah Arabic Program (MAP)", subtitle: "Arabic on the University campus", text: "Learn Arabic for a month", url: "/programs/map" },
];

describe("search", () => {
  const search = createSearch(docs);
  it("finds by spelling variants and synonyms", () => {
    expect(search("ikama")[0].id).toBe("g2");
    expect(search("deferral")[0].id).toBe("g1");
    expect(search("stipend")[0].id).toBe("g1");
  });
  it("forgives typos and partial words", () => {
    expect(search("ruhaili")[0].id).toBe("s1");
    expect(search("arab")[0].id).toBe("p1");
  });
  it("matches Arabic regardless of letter forms", () => {
    expect(search("الرحيلى")[0].id).toBe("s1");
  });
  it("returns nothing for an empty query", () => {
    expect(search("  ")).toEqual([]);
  });
});
