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

  it("stores admin users with safe defaults: editor role, 2FA off, not banned", async () => {
    const { user, twoFactor } = await import("@/server/db/schema");
    const db = await resetTestDb();
    const now = new Date();
    await db.insert(user).values({ id: "u1", name: "Test", email: "t@example.com", emailVerified: true, createdAt: now, updatedAt: now });
    await db.insert(twoFactor).values({ id: "tf1", secret: "s", backupCodes: "b", userId: "u1" });
    const [u] = await db.select().from(user).where(eq(user.id, "u1"));
    expect(u.role).toBe("editor");
    expect(u.twoFactorEnabled).toBe(false);
    expect(u.banned).toBe(false);
  });

  it("never connects a Vercel preview to the live database", async () => {
    vi.stubEnv("VERCEL_ENV", "preview");
    vi.stubEnv("DATABASE_URL", "postgres://live-db.invalid/neondb");
    const { getDb } = await import("@/server/db/client");
    const db = await getDb();
    expect(await db.select().from(masjids)).toEqual([]);
    delete (globalThis as { __meshDb?: unknown }).__meshDb;
  });

  it("refuses to run in production without DATABASE_URL", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("DATABASE_URL", "");
    vi.stubEnv("MESH_LOCAL_DB", "");
    const { getDb } = await import("@/server/db/client");
    await expect(getDb()).rejects.toThrow("DATABASE_URL is required in production");
  });
});
