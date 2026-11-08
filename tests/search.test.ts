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

import { expandQuery as expandMore } from "@/lib/search/normalize";
describe("student vocabulary", () => {
  it("connects the spellings students actually type", () => {
    expect(expandMore("mukafah")).toContain("stipend");
    expect(expandMore("tazkia")).toContain("recommendation");
    expect(expandMore("ta jeel")).toContain("tajeel");
    expect(expandMore("paediatrician")).toContain("doctor");
    expect(expandMore("optician")).toContain("glasses");
    expect(expandMore("salary")).toContain("stipend");
    expect(expandMore("aqidah")).toContain("tawhid");
  });
});

import { weighQuery } from "@/lib/search/engine";
describe("ranking: typed words over related words", () => {
  const books: SearchDoc[] = [
    { id: "tawhid", type: "dars", title: "Explanation of Kitab al-Tawhid", subtitle: "after Maghrib", text: "", url: "/duroos/lesson/tawhid" },
    { id: "wasitiyyah", type: "dars", title: "Al-Aqidah al-Wasitiyyah", subtitle: "after Isha", text: "", url: "/duroos/lesson/wasitiyyah" },
    { id: "kafi", type: "dars", title: "Kitab al-Kafi", subtitle: "after Asr", text: "", url: "/duroos/lesson/kafi" },
    { id: "campus", type: "guide", title: "Student life at the University", subtitle: "Meals at the mat'am and buses", text: "Eat at the mat'am. Buses stop at the gate at Fajr.", url: "/guides/campus" },
  ];
  const search = createSearch(books);
  it("puts the book named in the query first, whatever the particle or spelling", () => {
    expect(search("kitab at-tawhid")[0].id).toBe("tawhid");
    expect(search("kitab al tawheed")[0].id).toBe("tawhid");
    expect(search("tawheed")[0].id).toBe("tawhid");
  });
  it("lets a synonym help without beating the word typed", () => {
    expect(search("tawhid").map((h) => h.id).slice(0, 2)).toEqual(["tawhid", "wasitiyyah"]);
  });
  it("never matches on a particle alone", () => {
    expect(search("kitab at-tawhid").map((h) => h.id)).not.toContain("campus");
  });
  it("keeps spellings at full weight and related words lower", () => {
    const { typed, weight } = weighQuery("Kitab at-Tawheed");
    expect(typed.map((t) => t[0])).toEqual(["kitab", "tawheed"]);
    expect(weight("tawhid")).toBe(1);
    expect(weight("aqidah")).toBeLessThan(1);
    expect(weighQuery("at").query).toBe("at");
  });
});
