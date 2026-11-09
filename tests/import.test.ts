import { beforeAll, describe, expect, it } from "vitest";
import { count, eq, isNull } from "drizzle-orm";
import { resetTestDb, type Db } from "@/server/db/client";
import { lessons, masjids, shaykhs, streams } from "@/server/db/schema";
import { importLegacy } from "@/server/seed/import-legacy";
import { getSetting } from "@/server/settings";
import { hijriIsoBounds } from "@/lib/time/hijri";

let db: Db;
let first: Awaited<ReturnType<typeof importLegacy>>;

beforeAll(async () => {
  db = await resetTestDb();
  first = await importLegacy(db);
});

describe("importLegacy", () => {
  it("imports every masjid and lesson", () => {
    expect(first.masjids).toBe(10);
    expect(first.lessons).toBe(65);
    expect(first.shaykhs).toBeGreaterThanOrEqual(15);
  });

  it("is idempotent", async () => {
    const again = await importLegacy(db);
    expect(again).toEqual(first);
    const [{ n }] = await db.select({ n: count() }).from(lessons);
    expect(n).toBe(65);
  });

  it("keeps the verified details of al-Ruhayli's Dalil al-Talib lesson", async () => {
    const [l] = await db.select().from(lessons).where(eq(lessons.slug, "ruh-dalil"));
    expect(l.days).toEqual([4, 5, 6]);
    expect(l.prayer).toBe("asr");
    expect(l.masjidId).toBe("nabawi");
    const [s] = await db.select().from(shaykhs).where(eq(shaykhs.id, l.shaykhId));
    expect(s.slug).toBe("sulayman-ibn-saleemullah-al-ruhayli");
    expect(s.photo).toBe("/images/ruhaily.png");
    const rows = await db.select().from(lessons).where(eq(lessons.shaykhId, s.id));
    expect(rows).toHaveLength(4); // 3 at Nabawi + al-Kabair at Quba
  });

  it("gives Quba lessons their 1/4–30/6/1448 validity period", async () => {
    const rows = await db.select().from(lessons).where(eq(lessons.masjidId, "quba"));
    expect(rows.length).toBeGreaterThan(0);
    for (const r of rows.filter((x) => !x.slug.startsWith("sisters-"))) {
      expect(r.validFrom).toBe(hijriIsoBounds(1448, 4, 1));
      expect(r.validTo).toBe(hijriIsoBounds(1448, 6, 30));
    }
  });

  it("leaves non-Quba lessons open-ended", async () => {
    const rows = await db.select().from(lessons).where(isNull(lessons.validTo));
    expect(rows.every((r) => r.masjidId !== "quba" || r.slug.startsWith("sisters-"))).toBe(true);
  });

  it("seeds the WhatsApp invite link and the Nabawi YouTube stream", async () => {
    expect(await getSetting<string>(db, "whatsapp_invite_url")).toBe("https://chat.whatsapp.com/KKNn4fLv51eIVq8OMLErL0");
    const [yt] = await db.select().from(streams).where(eq(streams.slug, "nabawi-youtube"));
    expect(yt.kind).toBe("youtube");
    expect(yt.url).toBe("https://www.youtube.com/@wmngovksa/live");
  });

  it("stores no em dashes in any displayed text", async () => {
    const { announcements, events } = await import("@/server/db/schema");
    const tables = [masjids, shaykhs, lessons, announcements, events, streams];
    for (const t of tables) {
      const rows = await db.select().from(t);
      expect(JSON.stringify(rows)).not.toMatch(/[—]/);
    }
  });

  it("every lesson points at an existing masjid", async () => {
    const ids = new Set((await db.select({ id: masjids.id }).from(masjids)).map((r) => r.id));
    const all = await db.select({ m: lessons.masjidId }).from(lessons);
    expect(all.every((r) => ids.has(r.m))).toBe(true);
  });
});

describe("Al-Midad import", () => {
  it("adds the sisters' duroos and fills al-Badr's tafsir days without touching admin edits", async () => {
    const [t] = await db.select().from(lessons).where(eq(lessons.slug, "abadr-tafsir"));
    expect(t.days).toEqual([0, 1, 2, 3, 4, 5]);
    const [s] = await db.select().from(lessons).where(eq(lessons.slug, "sisters-talhi-ighathah"));
    expect(s.masjidId).toBe("quba");
    expect(s.prayer).toBe("maghrib");
    await db.update(lessons).set({ days: [1] }).where(eq(lessons.slug, "abadr-tafsir"));
    const { syncAlMidad } = await import("@/server/seed/content/al-midad");
    expect(await syncAlMidad(db)).toEqual({ added: 0, updated: 0 });
    const [t2] = await db.select().from(lessons).where(eq(lessons.slug, "abadr-tafsir"));
    expect(t2.days).toEqual([1]);
  });
});

describe("audience", () => {
  it("tags the Al-Midad women's duroos and leaves the rest for everyone", async () => {
    const rows = await db.select({ slug: lessons.slug, audience: lessons.audience }).from(lessons);
    const women = rows.filter((r) => r.audience === "women").map((r) => r.slug).sort();
    expect(women).toEqual(["sisters-muzayni-mujadilah", "sisters-radadi-tawhid", "sisters-talhi-ighathah", "sisters-umari-arbain", "sisters-umari-kabair"]);
  });
});
