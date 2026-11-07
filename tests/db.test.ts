import { afterEach, describe, expect, it, vi } from "vitest";
import { eq } from "drizzle-orm";
import { resetTestDb } from "@/server/db/client";
import { lessons, masjids, shaykhs } from "@/server/db/schema";

describe("database", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it("stores and reads back a lesson with its weekday array intact", async () => {
    const db = await resetTestDb();
    await db.insert(masjids).values({ id: "nabawi", nameEn: "Al-Masjid an-Nabawi", nameAr: "المسجد النبوي", shortEn: "Nabawi", shortAr: "النبوي", sort: 0 });
    const [s] = await db.insert(shaykhs).values({ slug: "test-shaykh", nameEn: "Test", nameAr: "اختبار", facts: [] }).returning();
    await db.insert(lessons).values({
      slug: "test-lesson", shaykhId: s.id, masjidId: "nabawi", bookEn: "Book", bookAr: "كتاب",
      topic: "fiqh", prayer: "asr", days: [4, 5, 6], locationEn: "Circle 2", locationAr: "حلقة ٢", status: "active", sort: 0,
    });
    const [row] = await db.select().from(lessons).where(eq(lessons.slug, "test-lesson"));
    expect(row.days).toEqual([4, 5, 6]);
    expect(row.validTo).toBeNull();
  });

  it("refuses to run in production without DATABASE_URL", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("DATABASE_URL", "");
    vi.stubEnv("MESH_LOCAL_DB", "");
    const { getDb } = await import("@/server/db/client");
    await expect(getDb()).rejects.toThrow("DATABASE_URL is required in production");
  });
});
