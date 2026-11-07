import { beforeAll, describe, expect, it, vi } from "vitest";
import { eq } from "drizzle-orm";
import { resetTestDb, type Db } from "@/server/db/client";
import { importLegacy } from "@/server/seed/import-legacy";
import { channelPosts, lessonOverrides, sources, user } from "@/server/db/schema";
import { approveSuggestion, dismissSuggestion, runWatcher } from "@/server/watcher/run";
import { getSetting } from "@/server/settings";
import { getToday } from "@/server/duroos/queries";
import type { AiParse } from "@/server/watcher/ai";
import type { Actor } from "@/server/auth/permissions";

const NOW = new Date("2026-11-07T09:00:00Z");
const post = (id: number, text: string, at = "2026-11-07T05:00:00+00:00") =>
  `<div class="tgme_widget_message" data-post="drosalmadina/${id}"><div class="tgme_widget_message_text">${text}</div><time datetime="${at}"></time></div>`;

const cancel: AiParse = { about_lesson: true, lesson_slug: "ruh-dalil", kind: "cancelled", dates: ["2026-11-12"], note_en: "The shaykh excused himself", note_ar: "يعتذر الشيخ", confidence: 0.95 };
const other: AiParse = { about_lesson: false, lesson_slug: null, kind: "other", dates: [], note_en: "", note_ar: "", confidence: 0.9 };

let db: Db;
let pages: Record<string, string>;
const readPost = vi.fn(async (p: { text: string }) => (p.text.includes("يعتذر") ? cancel : other));
const deps = () => ({
  fetchHtml: async (handle: string) => {
    if (handle === "twijri") throw new Error("network down");
    return pages[handle] ?? "<html></html>";
  },
  readPost,
});
const owner: Actor = { id: "o1", name: "Owner", role: "owner" };

beforeAll(async () => {
  db = await resetTestDb();
  await importLegacy(db);
  const now = new Date();
  await db.insert(user).values({ id: "o1", name: "Owner", email: "o@example.com", emailVerified: true, role: "owner", createdAt: now, updatedAt: now });
  pages = { drosalmadina: post(1, "يعتذر الشيخ سليمان الرحيلي عن درس الخميس") + post(2, "صورة من الدرس") + post(3, "قديم", "2026-10-01T05:00:00+00:00") };
});

describe("runWatcher", () => {
  it("reads new recent posts, suggests in shadow mode, ignores the rest, and records the heartbeat", async () => {
    const r = await runWatcher(db, deps(), NOW);
    expect(r).toMatchObject({ newPosts: 2, suggested: 1, published: 0, errors: 1 });
    const [p1] = await db.select().from(channelPosts).where(eq(channelPosts.postId, "drosalmadina/1"));
    expect(p1).toMatchObject({ status: "suggested", wouldAuto: true });
    const [p2] = await db.select().from(channelPosts).where(eq(channelPosts.postId, "drosalmadina/2"));
    expect(p2.status).toBe("ignored");
    expect(await getSetting(db, "watcher_last_checked_at")).toBe(NOW.toISOString());
    const [tw] = await db.select().from(sources).where(eq(sources.handle, "twijri"));
    expect(tw.lastError).toContain("network down");
  });

  it("skips posts older than three days", async () => {
    expect(await db.select().from(channelPosts).where(eq(channelPosts.postId, "drosalmadina/3"))).toEqual([]);
  });

  it("doesn't re-read a post it has already seen", async () => {
    const before = readPost.mock.calls.length;
    await runWatcher(db, deps(), NOW);
    expect(readPost.mock.calls.length).toBe(before);
  });

  it("re-reads a post when the channel edits it", async () => {
    pages.drosalmadina = post(1, "يعتذر الشيخ عن درس الخميس، تعديل") + post(2, "صورة من الدرس");
    const before = readPost.mock.calls.length;
    await runWatcher(db, deps(), NOW);
    expect(readPost.mock.calls.length).toBe(before + 1);
  });

  it("publishes automatically once the channel leaves shadow mode", async () => {
    await db.update(sources).set({ autoPublish: true }).where(eq(sources.handle, "drosalmadina"));
    pages.drosalmadina = post(4, "يعتذر الشيخ عن الدرس");
    const r = await runWatcher(db, deps(), NOW);
    expect(r.published).toBe(1);
    const [p4] = await db.select().from(channelPosts).where(eq(channelPosts.postId, "drosalmadina/4"));
    expect(p4.status).toBe("published");
    const [o] = await db.select().from(lessonOverrides).where(eq(lessonOverrides.id, p4.overrideId!));
    expect(o).toMatchObject({ origin: "watcher_auto", kind: "cancelled", startsOn: "2026-11-12", sourceUrl: "https://t.me/drosalmadina/4" });
    const t = await getToday(db, new Date("2026-11-12T09:00:00Z"));
    expect(t.lessons.find((l) => l.slug === "ruh-dalil")!.status).toBe("cancelled");
    await db.update(lessonOverrides).set({ revokedAt: new Date() }).where(eq(lessonOverrides.id, p4.overrideId!));
  });
});

describe("temporary AI failures", () => {
  it("retries a post on the next run after the AI was unavailable", async () => {
    const db2 = await resetTestDb();
    await importLegacy(db2);
    let calls = 0;
    const flaky = {
      fetchHtml: async (h: string) => (h === "drosalmadina" ? post(50, "يعتذر الشيخ") : "<html></html>"),
      readPost: async () => {
        calls++;
        if (calls === 1) throw new Error("gemini_http_503");
        return cancel;
      },
    };
    await runWatcher(db2, flaky, NOW);
    let [p] = await db2.select().from(channelPosts).where(eq(channelPosts.postId, "drosalmadina/50"));
    expect(p.status).toBe("error");
    await runWatcher(db2, flaky, NOW);
    [p] = await db2.select().from(channelPosts).where(eq(channelPosts.postId, "drosalmadina/50"));
    expect(p.status).toBe("suggested");
  });
});

describe("suggestions", () => {
  it("an admin can approve a suggestion, creating the change", async () => {
    const [p1] = await db.select().from(channelPosts).where(eq(channelPosts.postId, "drosalmadina/1"));
    await approveSuggestion(db, owner, p1.id, {});
    const [after] = await db.select().from(channelPosts).where(eq(channelPosts.id, p1.id));
    expect(after).toMatchObject({ status: "published", decidedBy: "Owner" });
    const [o] = await db.select().from(lessonOverrides).where(eq(lessonOverrides.id, after.overrideId!));
    expect(o.origin).toBe("watcher_approved");
  });

  it("an admin can dismiss a suggestion", async () => {
    const [p] = await db.insert(channelPosts).values({
      sourceHandle: "drosalmadina", postId: "drosalmadina/99", url: "https://t.me/drosalmadina/99", text: "x",
      postedAt: NOW, textHash: "h", status: "suggested", parse: cancel,
    }).returning();
    await dismissSuggestion(db, owner, p.id);
    const [after] = await db.select().from(channelPosts).where(eq(channelPosts.id, p.id));
    expect(after.status).toBe("dismissed");
  });
});

describe("time budget", () => {
  it("stops calling the AI once the run's time budget is spent and leaves the rest for the next run", async () => {
    const tdb = await resetTestDb();
    await importLegacy(tdb);
    const read = vi.fn(async () => other);
    let t = 0;
    const clock = () => (t += 20_000); // each check of the clock is 20 seconds later
    await runWatcher(tdb, { fetchHtml: async (h) => (h === "drosalmadina" ? post(11, "أ") + post(12, "ب") + post(13, "ج") : "<html></html>"), readPost: read }, NOW, { budgetMs: 35_000, clock });
    expect(read.mock.calls.length).toBeLessThan(3);
    const waiting = await tdb.select().from(channelPosts).where(eq(channelPosts.status, "new"));
    expect(waiting.length).toBeGreaterThan(0);
  });

});

describe("busy channels", () => {
  it("skips posts with no schedule words without asking the AI, and reads the rest", async () => {
    const at = "2026-11-07T06:00:00+00:00";
    const msg = (id: number, text: string) => `<div class="tgme_widget_message" data-post="almanashet/${id}"><div class="tgme_widget_message_text">${text}</div><time datetime="${at}"></time></div>`;
    pages.almanashet = msg(10, "اللهم بارك لنا في يوم الجمعة") + msg(11, "يعتذر الشيخ عن المحاضرة اليوم");
    const before = readPost.mock.calls.length;
    await runWatcher(db, deps(), NOW);
    const asked = readPost.mock.calls.slice(before).map((c) => c[0].text);
    expect(asked).toContain("يعتذر الشيخ عن المحاضرة اليوم");
    expect(asked).not.toContain("اللهم بارك لنا في يوم الجمعة");
    const [skipped] = await db.select().from(channelPosts).where(eq(channelPosts.postId, "almanashet/10"));
    expect(skipped).toMatchObject({ status: "ignored", reason: "No schedule words. Skipped without AI." });
  });
});

