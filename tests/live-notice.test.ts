import { readFileSync } from "node:fs";
import path from "node:path";
import { beforeAll, describe, expect, it, vi } from "vitest";
import { eq } from "drizzle-orm";
import { resetTestDb, type Db } from "@/server/db/client";
import { importLegacy } from "@/server/seed/import-legacy";
import { lessons, shaykhs } from "@/server/db/schema";
import { parseChannelHtml } from "@/server/watcher/telegram";
import { isLiveNotice, matchLiveLesson, pickLiveLink, type LessonForMatch } from "@/server/watcher/live-notice";
import { runWatcher } from "@/server/watcher/run";
import { getToday } from "@/server/duroos/queries";

const posts = parseChannelHtml(readFileSync(path.join(process.cwd(), "tests/fixtures/tg-drosalmadina.html"), "utf8"), "drosalmadina");
const byId = (n: number) => posts.find((p) => p.postId === `drosalmadina/${n}`)!;

let db: Db;
let candidates: LessonForMatch[];
beforeAll(async () => {
  db = await resetTestDb();
  await importLegacy(db);
  candidates = (await db.select({ slug: lessons.slug, bookAr: lessons.bookAr, masjidId: lessons.masjidId, shaykhAr: shaykhs.nameAr })
    .from(lessons).innerJoin(shaykhs, eq(lessons.shaykhId, shaykhs.id)));
});

describe("live broadcast notices", () => {
  it("recognises the notice despite stretched letters", () => {
    expect(isLiveNotice(byId(12581).text)).toBe(true);
    expect(isLiveNotice("دعوة لحضور محاضرة")).toBe(false);
  });
  it("prefers the video or audio stream link over maps and channel links", () => {
    expect(pickLiveLink(byId(12581).links)).toBe("http://youtube.com/live/xjrTJdEk9bo");
    expect(pickLiveLink(byId(12577).links)).toBe("https://sualruhaily.mixlr.com/");
    expect(pickLiveLink(byId(12575).links)).toBe("https://t.me/sohaymi?livestream");
  });
  it("matches Shaykh Sulayman al-Ruhayli's Targhib lesson", () =>
    expect(matchLiveLesson(byId(12581).text, candidates)).toBe("ruh-targhib"));
  it("matches the Kaba'ir lesson at Quba", () =>
    expect(matchLiveLesson(byId(12577).text, candidates)).toBe("quba-ruh-kabair"));
  it("tells al-Badr's Kitab at-Tawhid apart from al-Ruhayli's", () => {
    const slug = matchLiveLesson(byId(12574).text, candidates);
    expect(slug).not.toBe("ruh-tawhid");
    expect(candidates.find((c) => c.slug === slug)?.shaykhAr).toContain("البدر");
  });
  it("matches al-Suhaymi's al-Mu'taqad as-Sahih", () => {
    const slug = matchLiveLesson(byId(12575).text, candidates);
    expect(candidates.find((c) => c.slug === slug)?.bookAr).toContain("المعتقد");
  });
});

describe("watcher with live notices", () => {
  it("marks the dars live with its link, without asking the AI", async () => {
    const readPost = vi.fn();
    const at = byId(12581).postedAt;
    const html = readFileSync(path.join(process.cwd(), "tests/fixtures/tg-drosalmadina.html"), "utf8");
    await runWatcher(db, { fetchHtml: async (h) => (h === "drosalmadina" ? html : "<html></html>"), readPost: readPost as never }, new Date(at.getTime() + 5 * 60_000));
    const t = await getToday(db, new Date(at.getTime() + 10 * 60_000));
    const l = t.lessons.find((x) => x.slug === "ruh-targhib");
    if (l) {
      expect(l.stream).toMatchObject({ isLive: true, liveUrl: "http://youtube.com/live/xjrTJdEk9bo" });
      expect(l.phase).toBe("live");
    }
    const liveTexts = readPost.mock.calls.map((c) => (c[0] as { text: string }).text).filter((tx) => isLiveNotice(tx));
    expect(liveTexts).toEqual([]);
  });
});
