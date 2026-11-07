import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it, vi } from "vitest";
import { resetTestDb } from "@/server/db/client";
import { sources } from "@/server/db/schema";
import { seedSources } from "@/server/watcher/sources";
import { parseChannelHtml } from "@/server/watcher/telegram";
import { buildPrompt, parseAiResponse, readPostWithGemini, type AiParse } from "@/server/watcher/ai";
import { decide, type DecideContext } from "@/server/watcher/decide";

const fixture = readFileSync(path.join(process.cwd(), "tests/fixtures/tg-drosalmadina.html"), "utf8");

describe("sources", () => {
  it("seeds the six channels, all in shadow mode", async () => {
    const db = await resetTestDb();
    await seedSources(db);
    const rows = await db.select().from(sources);
    expect(rows.map((r) => r.handle).sort()).toEqual(["Sulalruhaily", "dr_maherkhujah", "drosalmadina", "khizana_62", "sohaymi", "twijri"]);
    expect(rows.every((r) => r.trusted && !r.autoPublish)).toBe(true);
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
