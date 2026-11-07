import { beforeAll, describe, expect, it, vi } from "vitest";
import { resetTestDb, type Db } from "@/server/db/client";
import { importLegacy } from "@/server/seed/import-legacy";
import { pushSubscriptions } from "@/server/db/schema";
import { dailyBriefText, notifyOverride, subscribePush, unsubscribePush } from "@/server/push";
import { getToday } from "@/server/duroos/queries";

let db: Db;
const sub = (host: string, topics: string[], n = 1) => ({
  endpoint: `https://${host}/push/${n}`, keys: { p256dh: "BNcR".padEnd(87, "A"), auth: "tBHI".padEnd(22, "A") }, topics,
});

beforeAll(async () => {
  db = await resetTestDb();
  await importLegacy(db);
});

describe("subscribing", () => {
  it("accepts real push services and stores the topics", async () => {
    await subscribePush(db, sub("fcm.googleapis.com", ["shaykh:sulayman-ibn-saleemullah-al-ruhayli"], 1));
    await subscribePush(db, sub("web.push.apple.com", ["all", "daily"], 2));
    await subscribePush(db, sub("updates.push.services.mozilla.com", ["shaykh:salih-ibn-sad-al-suhaymi"], 3));
    expect(await db.select().from(pushSubscriptions)).toHaveLength(3);
  });
  it("refuses endpoints that aren't browser push services", async () => {
    await expect(subscribePush(db, sub("evil.example.com", ["all"]))).rejects.toThrow();
  });
  it("refuses unknown topics", async () => {
    await expect(subscribePush(db, sub("fcm.googleapis.com", ["admin"], 9))).rejects.toThrow();
  });
  it("updates topics when the same phone subscribes again", async () => {
    await subscribePush(db, sub("fcm.googleapis.com", ["shaykh:sulayman-ibn-saleemullah-al-ruhayli", "daily"], 1));
    expect(await db.select().from(pushSubscriptions)).toHaveLength(3);
  });
});

describe("sending", () => {
  it("tells followers of the shaykh and 'all changes' subscribers, and drops dead subscriptions", async () => {
    const send = vi.fn(async (endpoint: string, _payload: string) => {
      if (endpoint.includes("apple")) throw Object.assign(new Error("gone"), { statusCode: 410 });
    });
    const n = await notifyOverride(db, { lessonSlug: "ruh-dalil", kind: "cancelled", startsOn: "2026-11-12" }, send);
    expect(n).toBe(1); // delivered: the Apple subscription was dead (410) and is removed
    const sentTo = send.mock.calls.map((c) => c[0] as string);
    expect(sentTo.some((e) => e.includes("fcm"))).toBe(true);
    expect(sentTo.some((e) => e.includes("apple"))).toBe(true);
    expect(sentTo.some((e) => e.includes("mozilla"))).toBe(false);
    const payload = JSON.parse(send.mock.calls[0][1] as string);
    expect(payload.title).toMatch(/Cancelled/);
    expect(payload.url).toBe("/duroos/lesson/ruh-dalil");
    expect((await db.select().from(pushSubscriptions)).some((s) => s.endpoint.includes("apple"))).toBe(false);
  });
  it("writes a short daily brief", async () => {
    const t = await getToday(db, new Date("2026-11-07T03:00:00Z"));
    const brief = dailyBriefText(t);
    expect(brief.title).toMatch(/^Today in Madinah: \d+ duroos/);
    expect(brief.body.length).toBeLessThan(200);
  });
  it("lets a phone unsubscribe", async () => {
    await unsubscribePush(db, "https://fcm.googleapis.com/push/1");
    expect((await db.select().from(pushSubscriptions)).some((s) => s.endpoint.includes("fcm"))).toBe(false);
  });
});
