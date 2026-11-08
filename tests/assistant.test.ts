import { beforeAll, beforeEach, describe, expect, it } from "vitest";
import { resetTestDb, type Db } from "@/server/db/client";
import { importLegacy } from "@/server/seed/import-legacy";
import { buildKnowledge, chunkGuide, type Chunk } from "@/server/assistant/knowledge";
import { createRetriever } from "@/server/assistant/retrieve";
import { askMesh, sameQuestion, cleanDashes, isRulingQuestion, langOf, parseReply, resetAnswerCache, unsupportedNumbers, type AskOptions } from "@/server/assistant/answer";
import { systemPrompt } from "@/server/assistant/prompt";
import { detectLive } from "@/server/assistant/live";
import { extract } from "@/server/assistant/compose";
import { providers, resetProviders, write } from "@/server/assistant/llm";
import { enhanceGuideHtml } from "@/lib/guide-html";

let db: Db;
let chunks: Chunk[];

beforeAll(async () => {
  db = await resetTestDb();
  await importLegacy(db);
  chunks = await buildKnowledge(db);
});

/** Real questions students ask, with the page that answers them. Retrieval must put it in the top three. */
export const EVAL: [question: string, expected: RegExp][] = [
  ["how much does it cost to live in madinah per month", /\/guides\/cost-of-living/],
  ["how do I open a bank account", /sim-internet-bank|bank-account|\/ask\//],
  ["where can I get a sim card", /sim-internet-bank|phone-sims/],
  ["how do I rent a flat", /finding-an-apartment|rent/],
  ["how do I get to makkah from madinah", /getting-around/],
  ["can I convert my uk driving licence", /drivers-license/],
  ["how do I apply to the islamic university", /applying-to-the-islamic-university|how-to-apply/],
  ["how do I book the rawdah", /umrah-rawdah-quba|masjid-an-nabawi|rawdah/],
  ["schools for my kids", /kindergartens-and-schools/],
  ["giving birth in madinah hospital", /having-a-baby/],
  ["exit re-entry visa fee", /iqama-and-exit-reentry-fees/],
  ["family visit visa for my parents", /visas-for-family-and-visitors/],
  ["where can I learn arabic in madinah", /\/programs|mahad|arabic/],
  ["when are the final exams", /university-calendar-1448/],
  ["when is ramadan", /university-calendar-1448/],
  ["etimad flight ticket", /etimad-account/],
  ["hospital emergency number ambulance", /doctors-hospitals/],
  ["gym and martial arts", /sports-and-activities/],
  ["start a business company", /start-a-company-in-saudi/],
  ["dates varieties ajwa", /dates-of-madinah/],
  ["historic masjids to visit", /historic-sites-and-masjids/],
  ["camping in winter", /seasons-and-camping/],
  ["ma'had books level 1", /\/library|mahad/],
  ["كيف افتح حساب بنكي", /sim-internet-bank|bank|\/ask\//],
  ["discount at the dentist with university card", /\/discounts/],
  ["is there a bus from the university to the haram", /campus-life|free-bus/],
  ["how do i do umrah from madinah", /umrah-rawdah-quba/],
  ["what is etimad", /etimad/],
  ["how do I take a semester off", /tajeel/],
  ["where can sisters learn quran in madinah", /women-at-masjid|sisters-studying/],
  ["can my wife join me on a student visa", /living-on-a-visitor-id|visas-for-family/],
  ["what are the mataam prices", /mataam|campus-life/],
  ["how much is the monthly stipend", /stipend/],
  ["where can I find the books for level 2", /mahad|muqarrarat|\/library/],
  ["how do I get from the airport to the haram", /getting-around|haramain-train/],
  ["كم تكلفة المعيشة في المدينة", /cost-of-living|monthly-budget/],
  ["متى الاختبارات النهائية", /university-calendar-1448/],
  ["what should i bring when i move to madinah", /what-to-bring-to-madinah/],
  ["how do I renew my iqama", /student-iqama-renewal|iqama/],
  ["how many classes can I miss", /how-many-classes-can-i-miss|exams-results-and-attendance/],
];

describe("assistant knowledge", () => {
  it("indexes guides by section with the same anchors as the page", () => {
    const g = { slug: "x", title: "X", summary: "Sum.", bodyHtml: "<p>Intro.</p><h2>Opening an account</h2><p>Bring your passport.</p><h2>Opening an account</h2><ul><li>One</li><li>Two</li></ul>" };
    const c = chunkGuide(g);
    const { toc } = enhanceGuideHtml(g.bodyHtml);
    expect(c[0].text).toBe("Sum.");
    expect(c.filter((x) => x.section).map((x) => x.url)).toEqual(toc.map((t) => `/guides/x#${t.id}`));
    expect(c.at(-1)!.text).toContain("• One\n• Two");
  });

  it("covers every kind of content", () => {
    const kinds = new Set(chunks.map((c) => c.kind));
    for (const k of ["guide", "faq", "program", "date", "discount", "shaykh", "dars", "page"]) expect(kinds.has(k as Chunk["kind"])).toBe(true);
  });

  it("finds the right page for real questions", () => {
    const retrieve = createRetriever(chunks);
    const misses = EVAL.filter(([q, want]) => !retrieve(q, 3).some((p) => want.test(p.url)));
    if (misses.length) console.log("assistant eval misses:", misses.map(([q]) => q));
    // Leave a little room for content changes; the eval is tightened as content grows.
    expect(misses.length).toBeLessThanOrEqual(3);
  });
});

describe("assistant rules", () => {
  it("tells English from Arabic", () => {
    expect(langOf("How do I get an iqama?")).toBe("en");
    expect(langOf("كيف أستخرج الإقامة؟")).toBe("ar");
  });

  it("declines rulings but not questions about the Haram", () => {
    expect(isRulingQuestion("Is it haram to take a loan?")).toBe(true);
    expect(isRulingQuestion("What is the ruling on praying in the Rawdah?")).toBe(true);
    expect(isRulingQuestion("ما حكم الصلاة في الروضة")).toBe(true);
    expect(isRulingQuestion("Which gate of the Haram is closest to the Rawdah?")).toBe(false);
    expect(isRulingQuestion("Is the haram open all night?")).toBe(false);
  });

  it("never lets a long dash through", () => {
    expect(cleanDashes("Rent — about 1,500 SAR")).toBe("Rent, about 1,500 SAR");
    expect(cleanDashes("open 9–17 daily")).toBe("open 9 to 17 daily");
  });

  it("spots numbers that are not in the passages", () => {
    const p = [{ id: "a", kind: "guide", title: "T", text: "A room costs 1,500 SAR a month.", url: "/g" }] as Chunk[];
    expect(unsupportedNumbers("A room costs **1500 SAR** [1].", p, "how much")).toEqual([]);
    expect(unsupportedNumbers("A room costs 1,500 SAR, or 2,200 with bills, since 2019.", p, "how much")).toEqual(["2200", "2019"]);
  });

  it("reads the model's JSON reply, or its plain text", () => {
    expect(parseReply('Sure: {"answer":"Hi","sources":[2],"found":true}')).toEqual({ answer: "Hi", sources: [2], found: true });
    expect(parseReply("Plain words.")).toEqual({ answer: "Plain words.", sources: [], found: true });
    expect(parseReply("{broken")).toBeNull();
  });

  it("keeps the house rules in the prompt", () => {
    const p = systemPrompt("en");
    for (const rule of ["ONLY the facts in the numbered passages", "rulings", "alphabetically", "em dash", "untrusted", "+1 234 567 9076", "not a shaykh"]) expect(p).toContain(rule);
    expect(systemPrompt("ar")).toContain("Arabic");
  });

  it("knows when a question needs live duroos or prayer times", () => {
    const today = "2026-11-08"; // a Sunday
    expect(detectLive("what duroos are on after maghrib tonight", today).duroos).toEqual({ date: today, prayers: ["maghrib"] });
    expect(detectLive("any lessons tomorrow?", today).duroos?.date).toBe("2026-11-09");
    expect(detectLive("duroos on friday", today).duroos?.date).toBe("2026-11-13");
    expect(detectLive("دروس بعد العشاء اليوم", today).duroos).toEqual({ date: today, prayers: ["isha"] });
    expect(detectLive("what is the cost of living", today).duroos).toBeNull();
    expect(detectLive("what duroos are on tonight", today).duroos).toEqual({ date: today, prayers: ["maghrib", "isha"] });
    expect(detectLive("prayer times today", today).prayerTimes).toBe(true);
  });

  it("extracts the sentences that carry the question", () => {
    const c = { id: "x", kind: "guide", title: "Bank", text: "Banks open at nine. Bring your passport and iqama to open an account. Parking is hard.\n• Al Rajhi\n• SNB", url: "/g" } as Chunk;
    const out = extract("what do I need to open a bank account", c);
    expect(out).toContain("Bring your passport and iqama");
    expect(out).not.toContain("Parking");
  });
});

describe("assistant answers", () => {
  beforeEach(() => resetAnswerCache());
  const ask = (question: string, opts: AskOptions = {}, history: { role: "user" | "assistant"; text: string }[] = []) =>
    askMesh(db, { question, locale: "en", history }, { writer: async () => null, knowledge: chunks, ...opts });

  it("answers from the site with no AI configured", async () => {
    const r = await ask("How much does it cost to live in Madinah?");
    expect(r.mode).toBe("extract");
    expect(r.found).toBe(true);
    expect(r.sources[0].url).toMatch(/cost-of-living/);
    expect(r.answer.length).toBeGreaterThan(40);
    expect(r.answer).not.toMatch(/[\u2014\u2013]/);
  });

  it("uses the model's answer, renumbers its [n] markers to match the sources, and removes long dashes", async () => {
    const r = await ask("Tell me about renting a furnished flat near the Haram and what it involves", { writer: async () => ({ text: JSON.stringify({ answer: "Rent varies by area [2] \u2014 ask early [1, 99].", sources: [2, 1], found: true }) }) });
    expect(r.mode).toBe("ai");
    expect(r.answer).toBe("Rent varies by area [1], ask early [2].");
    expect(r.sources).toHaveLength(2);
  });

  it("rejects an answer that brings in numbers of its own", async () => {
    const r = await ask("How much is rent for a two bedroom flat?", { writer: async () => ({ text: JSON.stringify({ answer: "Rent is 4321 SAR, rising to 9876 SAR in 2031.", sources: [1], found: true }) }) });
    expect(r.mode).toBe("extract");
  });

  it("passes on the model's 'not found' with no sources", async () => {
    const r = await ask("Tell me about renting a furnished flat near the Haram and what it involves", { writer: async () => ({ text: JSON.stringify({ answer: "MESH does not cover this yet. Please message Admin on WhatsApp at +1 234 567 9076.", sources: [], found: false }) }) });
    expect(r.found).toBe(false);
    expect(r.sources).toEqual([]);
  });

  it("declines rulings without calling the model", async () => {
    let called = false;
    const r = await ask("Is it halal to use a credit card?", { writer: async () => ((called = true), null) });
    expect(r.mode).toBe("guard");
    expect(called).toBe(false);
  });

  it("says so, with the help number, when nothing matches", async () => {
    const r = await ask("What is the capital of Mongolia?");
    expect(r.found).toBe(false);
    expect(r.answer).toContain("+1 234 567 9076");
  });

  it("answers in Arabic when asked in Arabic", async () => {
    const r = await ask("ما الدروس بعد المغرب اليوم؟", { now: new Date("2026-11-10T12:00:00Z") });
    expect(r.lang).toBe("ar");
    expect(r.mode).toBe("live");
    expect(r.answer).toContain("بعد المغرب");
  });

  it("gives a live duroos answer without AI", async () => {
    const r = await ask("What duroos are on after Maghrib today?", { now: new Date("2026-11-10T12:00:00Z") });
    expect(r.mode).toBe("live");
    expect(r.answer).toMatch(/After Maghrib/);
  });

  it("narrows a live answer to the shaykh named in the question", async () => {
    const r = await ask("Is Shaykh Abdurrazzaq al-Badr teaching after Maghrib today?", { now: new Date("2026-11-10T12:00:00Z") });
    expect(r.mode).toBe("live");
    expect(r.answer).toMatch(/Abdurrazzaq/);
    expect(r.answer).not.toMatch(/Hudhayfi/);
  });

  it("lists every dars of a book that several mashayikh teach", async () => {
    const r = await ask("Who teaches Kitab at-Tawhid?");
    expect(r.answer.split("\n").filter((l) => l.startsWith("- ")).length).toBeGreaterThan(1);
  });

  it("answers a question MESH already answered from that FAQ, without a model call", async () => {
    let called = false;
    const r = await ask("How much is the University stipend?", { writer: async () => ((called = true), null) });
    expect(called).toBe(false);
    expect(r.sources[0].url).toMatch(/^\/ask\//);
    expect(r.answer).toMatch(/stipend/i);
    expect(r.answer).not.toMatch(/\s[,.]/);
  });

  it("tells a matching FAQ from a merely related one", () => {
    expect(sameQuestion("How much is the stipend?", "How much is the University stipend?")).toBe(true);
    expect(sameQuestion("Does the stipend stop during ta'jeel?", "How much is the University stipend?")).toBe(false);
  });

  it("finds an answer by its tags (mat'am)", async () => {
    const r = await ask("what are the mataam prices");
    expect(r.found).toBe(true);
    expect(r.sources.map((s) => s.url).join(" ")).toMatch(/mataam|campus-life/);
  });

  it("keeps the topic of a short follow-up", async () => {
    const r = await ask("and for families?", {}, [{ role: "user", text: "How much does it cost to live in Madinah?" }, { role: "assistant", text: "..." }]);
    expect(r.sources[0]?.url ?? "").toMatch(/cost-of-living/);
  });
});

describe("free provider chain", () => {
  it("only uses providers with a key, and never the watcher's main Gemini models", () => {
    const p = providers({ GEMINI_API_KEY: "k" } as unknown as NodeJS.ProcessEnv);
    expect(p.map((x) => x.id)).toEqual(["gemini-shared"]);
    expect(p[0].models.every((m) => m.includes("lite"))).toBe(true);
    expect(providers({ GEMINI_API_KEY: "k", ASSISTANT_SHARE_WATCHER_KEY: "0" } as unknown as NodeJS.ProcessEnv)).toEqual([]);
    const all = { GROQ_API_KEY: "a", CEREBRAS_API_KEY: "b", ASSISTANT_GEMINI_API_KEY: "c", MISTRAL_API_KEY: "d", OPENROUTER_API_KEY: "e", GEMINI_API_KEY: "f" } as unknown as NodeJS.ProcessEnv;
    expect(providers(all).map((x) => x.id)).toEqual(["groq", "cerebras", "gemini", "mistral", "openrouter", "gemini-shared"]);
  });

  it("falls through a provider that is out of quota", async () => {
    resetProviders();
    const calls: string[] = [];
    const fake = async (url: string) => {
      calls.push(new URL(url).host);
      if (url.includes("groq")) return new Response("{}", { status: 429 });
      return Response.json({ choices: [{ message: { content: "From Cerebras." } }] });
    };
    const env = { GROQ_API_KEY: "a", CEREBRAS_API_KEY: "b" } as unknown as NodeJS.ProcessEnv;
    const r = await write([{ role: "user", content: "hi" }], { fetch: fake, env });
    expect(r?.provider).toBe("cerebras");
    // Groq now rests: the next question goes straight to Cerebras.
    calls.length = 0;
    await write([{ role: "user", content: "hi" }], { fetch: fake, env });
    expect(calls).toEqual(["api.cerebras.ai"]);
  });

  it("gives up quietly when every provider fails, so the site's own answer is used", async () => {
    resetProviders();
    const r = await write([{ role: "user", content: "hi" }], { fetch: async () => new Response("quota", { status: 429 }), env: { GEMINI_API_KEY: "k" } as unknown as NodeJS.ProcessEnv });
    expect(r).toBeNull();
  });

  it("stops at the daily limit", async () => {
    resetProviders();
    const env = { CEREBRAS_API_KEY: "b", ASSISTANT_DAILY_LIMIT: "1" } as unknown as NodeJS.ProcessEnv;
    const fake = async () => Response.json({ choices: [{ message: { content: "ok" } }] });
    expect(await write([{ role: "user", content: "1" }], { fetch: fake, env })).not.toBeNull();
    expect(await write([{ role: "user", content: "2" }], { fetch: fake, env })).toBeNull();
    resetProviders();
  });
});
