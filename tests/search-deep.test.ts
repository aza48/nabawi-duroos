import { beforeAll, describe, expect, it } from "vitest";
import { resetTestDb, type Db } from "@/server/db/client";
import { importLegacy } from "@/server/seed/import-legacy";
import { buildSearchDocs } from "@/server/search/docs";
import { deepSearch, snippetOf } from "@/server/search/deep";
import { coversAll, createSearch, highlight, queryWords, weighQuery, type SearchDoc } from "@/lib/search/engine";
import { arabicBare } from "@/lib/search/normalize";
import { buildKnowledge, type Chunk } from "@/server/assistant/knowledge";
import { askMesh, resetAnswerCache } from "@/server/assistant/answer";
import { deepLeads, freshDeep, looksLikeQuestion } from "@/features/search/SearchUI";
import { aboutPage, plainAnswer } from "@/features/assistant/AssistantPanel";

/**
 * The search box and Ask the MESHaykh, after the November 2026 audit (mstudy): full-text sections and instant
 * answers from the server, spelling correction, generic words, Arabic articles, key dates and the glossary in
 * search, the glossary in the assistant, and questions asked about the page the person is reading.
 */

const NOW = new Date("2026-11-09T09:00:00Z");

describe("search engine", () => {
  const docs: SearchDoc[] = [
    { id: "flat", type: "guide", title: "Finding and renting a flat", subtitle: "Ejar, agents and deposits", text: "How to find an apartment in Madinah.", url: "/guides/flat" },
    { id: "renew", type: "faq", title: "Who renews my student iqama?", subtitle: "The University will renew it", text: "Iqama renewal for students.", url: "/ask/renew" },
    { id: "tafsir", type: "dars", title: "Tafsir as-Sa'di", subtitle: "after Maghrib", text: "تفسير السعدي", url: "/duroos/lesson/tafsir" },
    { id: "durus", type: "library", title: "Durus al-Madinah", subtitle: "A channel of lessons", text: "", url: "https://example.org/durus" },
    { id: "ruhayli", type: "shaykh", title: "Sulayman al-Ruhayli", subtitle: "سليمان الرحيلي", titleAr: "سليمان الرحيلي", text: "", url: "/duroos/shaykh/ruhayli" },
    { id: "term-iqama", type: "term", title: "Iqama", subtitle: "The residence permit for foreigners.", titleAr: "إقامة", text: "iqama meaning", url: "/glossary#iqama" },
    { id: "lost", type: "guide", title: "Lost your iqama or passport", subtitle: "What to do first", text: "Police report, then Jawazat.", url: "/guides/lost" },
  ];
  const search = createSearch(docs);

  it("corrects a misspelt word to one the site uses, and says so", () => {
    expect(search.correct("apartmnt")).toBe("apartment");
    expect(search("apartmnt")[0].id).toBe("flat");
    // A dropped letter is the usual slip: "renw" is "renew", not a word one letter away.
    expect(search.correct("renw iqma")).toBe("renew iqama");
  });
  it("leaves known words, and words still being typed, alone", () => {
    expect(search.correct("iqama")).toBeNull();
    expect(search.correct("apartm")).toBeNull();
    expect(search.correct("tafsir")).toBeNull();
  });
  it("knows an Arabic word typed without the article the site uses", () => {
    const ar = createSearch([{ id: "d", type: "date", title: "Internal transfer", titleAr: "طلبات تأجيل الدراسة والتحويل الداخلي", url: "/guides/c" }]);
    expect(ar.correct("داخلي")).toBeNull();
    expect(ar.correct("تحويل")).toBeNull();
  });
  it("keeps the word first typed with its own place when a particle is dropped", () => {
    const { typed } = weighQuery("the iqama", ["the", "iqma"]);
    expect(typed[0]).toContain("iqma");
    expect(typed[0]).not.toContain("the");
  });
  it("lets the topic decide when a generic word is typed next to it", () => {
    expect(search("tafsir dars")[0].id).toBe("tafsir");
    expect(search("دروس الرحيلي")[0].id).toBe("ruhayli");
  });
  it("finds an Arabic word with or without its article", () => {
    expect(arabicBare("الرحيلي")).toBe("رحيلي");
    expect(arabicBare("والعوده")).toBe("عوده");
    expect(arabicBare("iqama")).toBe("iqama");
    expect(search("رحيلي")[0].id).toBe("ruhayli");
  });
  it("shows a word's meaning for the word, and the page for a longer search", () => {
    expect(search("iqama")[0].id).toBe("term-iqama");
    expect(search("lost iqama")[0].id).toBe("lost");
  });
  it("marks the words typed in a title", () => {
    const parts = highlight("Finding and renting a flat", queryWords("rent flat"));
    expect(parts.filter((p) => p.hit).map((p) => p.t.trim())).toEqual(["renting", "flat"]);
    expect(highlight("Iqama", [])).toEqual([{ t: "Iqama", hit: false }]);
    // Question words are not marked: only what the search is about.
    expect(queryWords("how do I renew my iqama")).not.toContain("how");
    expect(queryWords("how do I renew my iqama")).toContain("iqama");
  });
  it("tells when a heading is exactly what was searched", () => {
    expect(coversAll("Uhud", "uhud")).toBe(true);
    expect(coversAll("Quba, Uhud and the other places", "uhud")).toBe(true);
    expect(coversAll("Having a baby in Madinah", "uhud")).toBe(false);
    expect(coversAll("Tafsir as-Sa'di", "tafsir dars")).toBe(true);
  });
});

describe("search index and the full-text pass", () => {
  let db: Db;
  let docs: SearchDoc[];
  let knowledge: Chunk[];
  beforeAll(async () => {
    db = await resetTestDb();
    await importLegacy(db);
    docs = await buildSearchDocs(db, NOW);
    knowledge = await buildKnowledge(db);
  });

  it("indexes key dates from today on, the glossary, and the start and glossary pages", () => {
    const ids = new Set(docs.map((d) => d.id));
    expect(ids.has("date-finals-1")).toBe(true);
    // Postponing for the first semester closed on 1 September 2026.
    expect(ids.has("date-postpone-1")).toBe(false);
    expect(ids.has("term-iqama")).toBe(true);
    expect(ids.has("page-start")).toBe(true);
    expect(ids.has("page-glossary")).toBe(true);
    const finals = docs.find((d) => d.id === "date-finals-1")!;
    expect(finals.subtitle).toMatch(/29 November 2026 to 14 December 2026/);
  });
  it("finds a guide by a section heading deep inside it", () => {
    const search = createSearch(docs);
    expect(search("uhud").slice(0, 3).map((h) => h.url)).toContain("/guides/historic-sites-and-masjids");
    expect(search("final exams date")[0].url).toBe("/guides/university-calendar-1448");
    expect(search("glossary")[0].url).toBe("/glossary");
  });
  it("links to the section of a long guide that holds the words, with its best sentence", async () => {
    const r = await deepSearch(db, "uhud", "en", NOW, knowledge);
    expect(r.hits[0].url).toBe("/guides/historic-sites-and-masjids#uhud");
    expect(r.hits[0].snippet).toMatch(/Uhud/);
    const parcels = await deepSearch(db, "aramex", "en", NOW, knowledge);
    expect(parcels.hits[0].url).toMatch(/shipping-and-receiving-parcels#/);
  });
  it("finds Arabic searches in English guides", async () => {
    const r = await deepSearch(db, "الخروج والعودة", "ar", NOW, knowledge);
    expect(r.hits[0].url).toMatch(/exit-and-re-entry/);
  });
  it("answers adhan times, the Hijri date and tonight's duroos at once", async () => {
    const fajr = await deepSearch(db, "fajr time", "en", NOW, knowledge);
    expect(fajr.instant?.kind).toBe("live");
    expect(fajr.instant?.text).toMatch(/Fajr \d/);
    const hijri = await deepSearch(db, "hijri date", "en", NOW, knowledge);
    expect(hijri.instant?.text).toMatch(/1448/);
    const tonight = await deepSearch(db, "duroos tonight", "en", NOW, knowledge);
    expect(tonight.instant?.text).toMatch(/Maghrib/);
  });
  it("shows the short answer to a question MESH has answered", async () => {
    const r = await deepSearch(db, "how much is the stipend", "en", NOW, knowledge);
    expect(r.instant).toMatchObject({ kind: "answer", url: "/ask/stipend-amount" });
  });
  it("returns nothing for a search too short to mean anything", async () => {
    expect(await deepSearch(db, "a", "en", NOW, knowledge)).toEqual({ instant: null, hits: [] });
  });
  it("keeps the matched word in view in a long sentence", () => {
    const long = `${"Every student should read the rules of the University before the semester starts, ".repeat(4)}and the Aramex office is by the gate.`;
    const snip = snippetOf(long, ["aramex"]);
    expect(snip).toMatch(/Aramex/);
    expect(snip.length).toBeLessThanOrEqual(226);
  });
  it("answers today's date for a date search only, not for a word that only starts one", async () => {
    expect((await deepSearch(db, "hijri", "en", NOW, knowledge)).instant?.kind).toBe("live");
    expect((await deepSearch(db, "islamic", "en", NOW, knowledge)).instant).toBeNull();
    expect((await deepSearch(db, "التاريخ", "ar", NOW, knowledge)).instant).toBeNull();
  });
  it("cuts a snippet to its best sentence", () => {
    expect(snippetOf("Opening hours vary. The library opens at 8 am. Bags stay outside.", ["library"])).toBe("The library opens at 8 am.");
    expect(snippetOf("x ".repeat(300), []).length).toBeLessThanOrEqual(223);
  });
});

describe("Ask the MESHaykh: the glossary and the page being read", () => {
  let db: Db;
  let knowledge: Chunk[];
  beforeAll(async () => {
    db = await resetTestDb();
    await importLegacy(db);
    knowledge = await buildKnowledge(db);
  });
  const ask = (question: string, page?: string) => {
    resetAnswerCache();
    return askMesh(db, { question, locale: "en", page }, { now: NOW, writer: async () => null, knowledge });
  };

  it("answers what a local word means, linking to the page that explains it", async () => {
    const r = await ask("what is an iqama");
    expect(r.answer).toMatch(/residence permit/);
    expect(r.sources[0].url).toBe("/guides/iqama-and-exit-reentry-fees");
    const m = await ask("what does mukafaah mean");
    expect(m.found).toBe(true);
    expect(m.answer).toMatch(/monthly stipend/);
  });
  it("keeps the glossary out of questions that are not about a word's meaning", async () => {
    const r = await ask("how do I renew my iqama");
    expect(r.sources.map((s) => s.url).join(" ")).not.toMatch(/glossary/);
  });
  it("answers a short question about the page being read", async () => {
    const r = await ask("how much does it cost?", "/guides/drivers-license");
    expect(r.sources[0].url).toBe("/guides/drivers-license#what-it-costs");
    const dars = await ask("what time does it start", "/duroos/lesson/abadr-tawhid");
    expect(dars.sources[0].url).toBe("/duroos/lesson/abadr-tawhid");
  });
  it("reads an answer page as that answer, not the glossary word that links to it", async () => {
    // The glossary's Ejar links to this answer and comes first in the knowledge; the page is still the answer.
    const r = await ask("what do I need for it?", "/ask/what-is-ejar");
    expect(r.found).toBe(true);
    expect(r.sources.map((s) => s.url)).toContain("/ask/what-is-ejar");
  });
  it("answers a question that stands on its own without the page", async () => {
    const r = await ask("prayer times", "/guides/drivers-license");
    expect(r.mode).toBe("live");
    expect(r.answer).toMatch(/Fajr/);
  });
});

describe("search and assistant helpers", () => {
  it("tells a question from a search", () => {
    expect(looksLikeQuestion("how do I renew my iqama")).toBe(true);
    expect(looksLikeQuestion("كيف أجدد الإقامة")).toBe(true);
    expect(looksLikeQuestion("iqama renewal?")).toBe(true);
    expect(looksLikeQuestion("iqama")).toBe(false);
    expect(looksLikeQuestion("ruhayli")).toBe(false);
  });
  it("shows only sections the box has not already listed", () => {
    const deep = [
      { title: "A", snippet: "", url: "/guides/a", kind: "guide" },
      { title: "A", section: "Fees", snippet: "", url: "/guides/a#fees", kind: "guide" },
    ];
    expect(freshDeep(deep, [{ id: "a", type: "guide", title: "A", url: "/guides/a", score: 1 }], 4).map((d) => d.url)).toEqual(["/guides/a#fees"]);
  });
  it("puts a section first when it is headed with the search and no result title is", () => {
    const covers = (h: string) => coversAll(h, "uhud");
    const uhud = { title: "Historic sites", section: "Uhud", snippet: "", url: "/guides/historic#uhud", kind: "guide" };
    const baby = { id: "baby", type: "guide" as const, title: "Having a baby in Madinah", url: "/guides/baby", score: 9 };
    expect(deepLeads([uhud], [baby], covers)).toBe(true);
    expect(deepLeads([uhud], [{ ...baby, title: "Visiting Uhud" }], covers)).toBe(false);
    expect(deepLeads([{ ...uhud, section: undefined }], [baby], covers)).toBe(false);
  });
  it("copies an answer as plain text with its links", () => {
    const text = plainAnswer("The fee is **100 SAR** [1].", [{ title: "Iqama fees", section: "Renewal", url: "/guides/iqama#renewal" }], "https://medinahub.org");
    expect(text).toBe("The fee is 100 SAR.\n\nIqama fees: Renewal https://medinahub.org/guides/iqama#renewal");
  });
  it("knows which pages a question can be about", () => {
    expect(aboutPage("/guides/drivers-license")).toBe(true);
    expect(aboutPage("/ar/ask/stipend-amount")).toBe(true);
    expect(aboutPage("/duroos/lesson/abadr-tawhid")).toBe(true);
    expect(aboutPage("/")).toBe(false);
    expect(aboutPage("/guides")).toBe(false);
    expect(aboutPage(undefined)).toBe(false);
  });
});
