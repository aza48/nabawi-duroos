import { beforeAll, describe, expect, it } from "vitest";
import { eq } from "drizzle-orm";
import { resetTestDb, type Db } from "@/server/db/client";
import { importLegacy } from "@/server/seed/import-legacy";
import { auditLog, shaykhs } from "@/server/db/schema";
import { planShaykhSync, syncShaykhPositions, type ShaykhPosition } from "@/server/seed/content/mashayikh";

let db: Db;
beforeAll(async () => {
  db = await resetTestDb();
  await importLegacy(db);
});

describe("shaykh positions sync", () => {
  it("plans without writing, applies with an audit entry, and never creates a shaykh", async () => {
    const [s] = await db.select().from(shaykhs).limit(1);
    const positions: Record<string, ShaykhPosition> = {
      [s.slug]: { roleEn: "Dean of a test college", roleAr: "عميد كلية للاختبار", facts: [{ en: "A fact", ar: "معلومة" }] },
      "no-such-shaykh": { roleEn: "x", roleAr: "x", facts: [] },
    };
    const plan = await planShaykhSync(db, positions);
    expect(plan.missing).toEqual(["no-such-shaykh"]);
    expect(plan.changes.some((c) => c.slug === s.slug && c.field === "role")).toBe(true);
    expect((await db.select().from(shaykhs).where(eq(shaykhs.slug, s.slug)))[0].roleEn).toBe(s.roleEn);

    const r = await syncShaykhPositions(db, positions);
    expect(r.updated).toEqual([s.slug]);
    const [after] = await db.select().from(shaykhs).where(eq(shaykhs.slug, s.slug));
    expect(after).toMatchObject({ roleEn: "Dean of a test college", facts: [{ en: "A fact", ar: "معلومة" }] });
    expect((await db.select().from(auditLog).where(eq(auditLog.entityId, s.slug))).length).toBe(1);
    expect((await planShaykhSync(db, positions)).changes).toEqual([]);
  });
});
