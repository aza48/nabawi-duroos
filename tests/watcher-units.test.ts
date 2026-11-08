import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it, vi } from "vitest";
import { resetTestDb } from "@/server/db/client";
import { sources } from "@/server/db/schema";
import { DEFAULT_SOURCES, isBroadSource, seedSources, sourceRank } from "@/server/watcher/sources";
import { worthReading } from "@/server/watcher/prefilter";
import { parseChannelHtml } from "@/server/watcher/telegram";
import { buildPrompt, GEMINI_MODELS, parseAiResponse, readPostWithGemini, type AiParse } from "@/server/watcher/ai";
import { decide, type DecideContext } from "@/server/watcher/decide";

const fixture = readFileSync(path.join(process.cwd(), "tests/fixtures/tg-drosalmadina.html"), "utf8");

describe("sources", () => {
  it("seeds every channel in shadow mode, with the corrected al-Ruhayli handle", async () => {
    const db = await resetTestDb();
    await seedSources(db);
    const rows = await db.select().from(sources);
    expect(rows.map((r) => r.handle).sort()).toEqual(DEFAULT_SOURCES.map((s) => s.handle).sort());
    expect(rows.map((r) => r.handle)).toContain("Sualruhaily");
    expect(rows.map((r) => r.handle)).not.toContain("Sulalruhaily");
    expect(rows.every((r) => r.trusted && !r.autoPublish)).toBe(true);
  });
  it("removes a retired handle that nothing refers to", async () => {
    const db = await resetTestDb();
    await db.insert(sources).values({ handle: "Sulalruhaily", name: "old" });
    await seedSources(db);
    expect((await db.select().from(sources)).map((r) => r.handle)).not.toContain("Sulalruhaily");
  });
  it("reads core channels before busy ones", () => {
    expect(sourceRank("drosalmadina")).toBeLessThan(sourceRank("Miraathalanbeyaa"));
    expect(isBroadSource("almanashet")).toBe(true);
    expect(isBroadSource("drosalmadina")).toBe(false);
  });
});

describe("worthReading", () => {
  const lessons = [{ shaykhAr: "أ.د. سليمان بن سليم الله الرحيلي" }, { shaykhAr: "الشيخ صالح بن سعد السحيمي" }];
  it("lets through schedule changes and new announcements", () => {
    expect(worthReading("يعتذر فضيلة الشيخ عن درس اليوم", lessons)).toBe(true);
    expect(worthReading("تأجيل الدرس إلى الأسبوع القادم", lessons)).toBe(true);
    expect(worthReading("محاضرة بعنوان: فضل العلم، بعد المغرب", lessons)).toBe(true);
    expect(worthReading("يُستأنف الدرس بإذن الله يوم الأحد", lessons)).toBe(true);
  });
  it("lets through posts that name a shaykh we track", () => {
    expect(worthReading("من فوائد الشيخ السحيمي حفظه الله", lessons)).toBe(true);
  });
  it("skips general benefits and reminders", () => {
    expect(worthReading("قال ابن القيم رحمه الله: القلب يمرض كما يمرض البدن", lessons)).toBe(false);
    expect(worthReading("اللهم بارك لنا في يوم الجمعة", lessons)).toBe(false);
  });
});

describe("parseChannelHtml", () => {
  const posts = parseChannelHtml(fixture, "drosalmadina");
  it("reads every post with its id, link and date", () => {
    expect(posts).toHaveLength(20);
    expect(posts.every((p) => /^drosalmadina\/\d+$/.test(p.postId) && p.postedAt instanceof Date && !Number.isNaN(p.postedAt.getTime()))).toBe(true);
    expect(posts[0].url).toBe(`https://t.me/${posts[0].postId}`);
  });
  it("finds flyer images", () => {
    expect(posts.some((p) => p.imageUrl?.startsWith("https://"))).toBe(true);
  });
  it("returns plain text without HTML", () => {
    expect(posts.some((p) => p.text.length > 10)).toBe(true);
    expect(posts.every((p) => !/<[a-z]/i.test(p.text))).toBe(true);
  });
});

const good: AiParse = {
  about_lesson: true, lesson_slug: "ruh-dalil", kind: "cancelled", dates: ["2026-11-12"],
  note_en: "The shaykh excused himself", note_ar: "يعتذر الشيخ", confidence: 0.93,
};

describe("AI reader", () => {
  it("accepts a well-formed reading", () => expect(parseAiResponse(good)).toEqual(good));
  it("rejects missing fields and bad dates", () => {
    expect(parseAiResponse({ ...good, dates: ["12/11/2026"] })).toBeNull();
    expect(parseAiResponse({ about_lesson: true })).toBeNull();
    expect(parseAiResponse("not json")).toBeNull();
  });
  it("tells the model the night rule and the lesson list", () => {
    const p = buildPrompt({ text: "يعتذر الشيخ ليلة الأحد", imageUrl: null }, [{ slug: "ruh-dalil", label: "Ruhayli: Dalil" }], "2026-11-07");
    expect(p).toContain("ruh-dalil");
    expect(p).toContain("Sunday night");
    expect(p).toContain("2026-11-07");
  });
  it("sends the key in a header, asks for JSON, and validates the reply", async () => {
    const fetchMock = vi.fn(async () =>
      new Response(JSON.stringify({ candidates: [{ content: { parts: [{ text: JSON.stringify(good) }] } }] }), { status: 200 })
    );
    const out = await readPostWithGemini({ text: "x", imageUrl: null }, [], "2026-11-07", { apiKey: "KEY", fetch: fetchMock as never });
    expect(out).toEqual(good);
    const [url, init] = fetchMock.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).not.toContain("KEY");
    expect((init.headers as Record<string, string>)["x-goog-api-key"]).toBe("KEY");
    expect(JSON.parse(String(init.body)).generationConfig.responseMimeType).toBe("application/json");
  });
  it("moves to the next model when one has used up its free daily quota", async () => {
    const ok = new Response(JSON.stringify({ candidates: [{ content: { parts: [{ text: JSON.stringify(good) }] } }] }));
    const fetchMock = vi.fn(async (url: string) => (url.includes(GEMINI_MODELS[0]) || url.includes(GEMINI_MODELS[1]) ? new Response("{}", { status: 429 }) : ok));
    expect(await readPostWithGemini({ text: "x", imageUrl: null }, [], "2026-11-07", { apiKey: "K", fetch: fetchMock as never })).toEqual(good);
    expect(fetchMock).toHaveBeenCalledTimes(3);
    expect(GEMINI_MODELS.length).toBeGreaterThanOrEqual(4);
  });
  it("returns null when the model replies with garbage", async () => {
    const fetchMock = vi.fn(async () => new Response(JSON.stringify({ candidates: [{ content: { parts: [{ text: "sorry" }] } }] })));
    expect(await readPostWithGemini({ text: "x", imageUrl: null }, [], "2026-11-07", { apiKey: "K", fetch: fetchMock as never })).toBeNull();
  });
});

describe("decide", () => {
  const ctx = (o: Partial<DecideContext> = {}): DecideContext => ({
    today: "2026-11-07", trusted: true, autoPublish: true, lessonDays: { "ruh-dalil": [4, 5, 6] }, ...o,
  });
  it("auto-publishes a confident cancellation of a known lesson from a trusted channel", () =>
    expect(decide(good, ctx())).toMatchObject({ action: "auto", wouldAuto: true }));
  it("only suggests in shadow mode, noting it would have auto-published", () =>
    expect(decide(good, ctx({ autoPublish: false }))).toMatchObject({ action: "suggest", wouldAuto: true }));
  it("never auto-publishes past dates, far dates or several dates", () => {
    expect(decide({ ...good, dates: ["2026-11-01"] }, ctx()).action).toBe("suggest");
    expect(decide({ ...good, dates: ["2027-01-20"] }, ctx()).action).toBe("suggest");
    expect(decide({ ...good, dates: ["2026-11-12", "2026-11-13"] }, ctx()).action).toBe("suggest");
  });
  it("never auto-publishes when the date isn't one of the lesson's days", () =>
    expect(decide({ ...good, dates: ["2026-11-09"] }, ctx()).action).toBe("suggest"));
  it("needs high confidence, a trusted channel, a known lesson and a simple change", () => {
    expect(decide({ ...good, confidence: 0.6 }, ctx()).action).toBe("suggest");
    expect(decide(good, ctx({ trusted: false })).action).toBe("suggest");
    expect(decide({ ...good, lesson_slug: "unknown" }, ctx()).action).toBe("suggest");
    expect(decide({ ...good, kind: "moved" }, ctx()).action).toBe("suggest");
  });
  it("suggests lectures and ignores posts that aren't about lessons", () => {
    expect(decide({ ...good, about_lesson: false, kind: "lecture", lesson_slug: null }, ctx()).action).toBe("suggest");
    expect(decide({ ...good, about_lesson: false, kind: "other", lesson_slug: null }, ctx()).action).toBe("ignore");
  });
});

describe("prefilter and live-notice wordings from the audit", () => {
  it("lets suspension, return, move, holiday, absence and live wordings through", async () => {
    const { worthReading } = await import("@/server/watcher/prefilter");
    const { isLiveNotice } = await import("@/server/watcher/live-notice");
    for (const t of ["تعليق الدرس حتى إشعار آخر", "عودة الدرس يوم السبت", "الدرس منقول إلى الروضة", "يُستكمل الدرس بعد العشاء", "عطلة نهاية الفصل", "غياب الشيخ هذا الأسبوع", "البث المباشر الآن لدرس الشيخ"]) {
      expect(worthReading(t, [])).toBe(true);
    }
    expect(isLiveNotice("بدأ البث المباشر لدرس الشيخ")).toBe(true);
    expect(isLiveNotice("يبث الآن مباشر درس الشيخ")).toBe(true);
    expect(isLiveNotice("البث المباشر الآن")).toBe(true);
    expect(isLiveNotice("سيكون الدرس مباشرة بعد المغرب")).toBe(false);
    expect(isLiveNotice("رابط البث المباشر للدرس")).toBe(false);
  });
});

describe("deterministic checks before auto-publish (audit H3)", () => {
  const base: AiParse = { about_lesson: true, lesson_slug: "ruh-dalil", kind: "cancelled", dates: ["2026-11-12"], note_en: "x", note_ar: "", confidence: 0.95 };
  const shaykhs = {
    "ruh-dalil": { ar: "أ.د. سليمان بن سليم الله الرحيلي", en: "Prof. Dr. Sulayman ibn Saleemullah al-Ruhayli" },
    "abadr-tawhid": { ar: "أ. د. عبد الرزاق بن عبد المحسن البدر", en: "Prof. Dr. Abdurrazzaq ibn Abdulmuhsin al-Badr" },
  };
  const ctx = (text: string, o: Partial<DecideContext> = {}): DecideContext => ({
    today: "2026-11-07", trusted: true, autoPublish: true, lessonDays: { "ruh-dalil": [4, 5, 6], "abadr-tawhid": [0, 1, 2, 3, 4] },
    text, lessonShaykhs: shaykhs, sourceHandle: "drosalmadina", ...o,
  });

  it("reads Hijri dates written with Arabic or Latin digits, with or without a year, and month names", async () => {
    const { hijriDatesIn } = await import("@/server/watcher/decide");
    expect(hijriDatesIn("يعتذر الشيخ عن درس الخميس ٢/٦/١٤٤٨هـ", "2026-11-07")).toEqual(["2026-11-12"]);
    expect(hijriDatesIn("الدرس يوم 2/6", "2026-11-07")).toEqual(["2026-11-12"]);
    expect(hijriDatesIn("درس ٢ جمادى الآخرة", "2026-11-07")).toEqual(["2026-11-12"]);
    expect(hijriDatesIn("الدرس الساعة 5/30 مساء 12/11/2026", "2026-11-07")).toEqual([]);
  });
  it("reads weekday names, today and tomorrow, and counts a night as its named day", async () => {
    const { weekdaysIn } = await import("@/server/watcher/decide");
    expect(weekdaysIn("يعتذر الشيخ عن درس ليلة الأحد", "2026-11-07")).toEqual([0]);
    expect(weekdaysIn("لا درس اليوم", "2026-11-07")).toEqual([6]);
    expect(weekdaysIn("الدرس غداً بإذن الله", "2026-11-07")).toEqual([0]);
    expect(weekdaysIn("يعتذر الشيخ عن الدرس", "2026-11-07")).toEqual([]);
  });
  it("accepts a shaykh only when his family name and another part of his name appear", async () => {
    const { namesShaykh } = await import("@/server/watcher/decide");
    expect(namesShaykh("يعتذر فضيلة الشيخ سليمان الرحيلي", shaykhs["ruh-dalil"].ar)).toBe(true);
    expect(namesShaykh("يعتذر الشيخ الرحيلي عن الدرس", shaykhs["ruh-dalil"].ar)).toBe(false);
    expect(namesShaykh("درس الشيخ عبدالرزاق البدر", shaykhs["abadr-tawhid"].ar)).toBe(true);
    expect(namesShaykh("درس الشيخ عبد الرزاق البدر", shaykhs["abadr-tawhid"].ar)).toBe(true);
    expect(namesShaykh("درس الشيخ بدر البدر", shaykhs["abadr-tawhid"].ar)).toBe(false);
  });
  it("auto-publishes when the post agrees with the AI on the date, the weekday and the shaykh", () => {
    expect(decide(base, ctx("يعتذر الشيخ سليمان الرحيلي عن درس الخميس ٢/٦/١٤٤٨")).action).toBe("auto");
  });
  it("sends a post to the inbox when its Hijri date or weekday contradicts the AI's date", () => {
    expect(decide(base, ctx("يعتذر الشيخ سليمان الرحيلي عن درس ٣/٦/١٤٤٨"))).toMatchObject({ action: "suggest", reason: expect.stringContaining("Hijri date") });
    expect(decide(base, ctx("يعتذر الشيخ سليمان الرحيلي عن درس الجمعة"))).toMatchObject({ action: "suggest", reason: expect.stringContaining("weekday") });
  });
  it("needs the shaykh named on a general channel, but not on his own channel", () => {
    expect(decide(base, ctx("يعتذر الشيخ عن درس الخميس"))).toMatchObject({ action: "suggest", reason: expect.stringContaining("name the shaykh") });
    expect(decide(base, ctx("يعتذر الشيخ الرحيلي عن درس الخميس")).action).toBe("suggest");
    expect(decide(base, ctx("يعتذر الشيخ عن درس الخميس", { sourceHandle: "Sualruhaily" })).action).toBe("auto");
    expect(decide({ ...base, lesson_slug: "abadr-tawhid", dates: ["2026-11-12"] }, ctx("يعتذر الشيخ عن درس الخميس", { sourceHandle: "Sualruhaily" })).action).toBe("suggest");
  });
  it("never auto-publishes a flyer with no text", () => {
    expect(decide(base, ctx("", { imageOnly: true })).action).toBe("suggest");
  });
});
