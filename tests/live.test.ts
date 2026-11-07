import { describe, expect, it } from "vitest";
import { eq } from "drizzle-orm";
import { resetTestDb } from "@/server/db/client";
import { importLegacy } from "@/server/seed/import-legacy";
import { streams } from "@/server/db/schema";
import { detectYouTubeLive, refreshStreams } from "@/server/watcher/live";
import { cronAuthorized } from "@/server/watcher/cron";

const LIVE = `<html><link rel="canonical" href="https://www.youtube.com/watch?v=abc123XYZ_-"><script>var x={"isLiveNow":true}</script></html>`;
const OFF = `<html><link rel="canonical" href="https://www.youtube.com/channel/UC0XNCc-DU8J5_ksR-eufPaw"></html>`;

describe("YouTube live detection", () => {
  it("finds the exact live video", () =>
    expect(detectYouTubeLive(LIVE)).toEqual({ live: true, url: "https://www.youtube.com/watch?v=abc123XYZ_-" }));
  it("reports not live when the channel page is shown", () => expect(detectYouTubeLive(OFF)).toEqual({ live: false, url: null }));
  it("updates the Nabawi stream row", async () => {
    const db = await resetTestDb();
    await importLegacy(db);
    await refreshStreams(db, async () => LIVE, new Date("2026-11-07T12:00:00Z"));
    const [yt] = await db.select().from(streams).where(eq(streams.slug, "nabawi-youtube"));
    expect(yt).toMatchObject({ isLive: true, liveUrl: "https://www.youtube.com/watch?v=abc123XYZ_-" });
    await refreshStreams(db, async () => OFF);
    const [after] = await db.select().from(streams).where(eq(streams.slug, "nabawi-youtube"));
    expect(after).toMatchObject({ isLive: false, liveUrl: null });
  });
});

describe("cron authorization", () => {
  it("needs the exact bearer secret", () => {
    expect(cronAuthorized("Bearer s3cret-value", "s3cret-value")).toBe(true);
    expect(cronAuthorized("Bearer wrong", "s3cret-value")).toBe(false);
    expect(cronAuthorized(null, "s3cret-value")).toBe(false);
    expect(cronAuthorized("Bearer ", "")).toBe(false);
  });
});
