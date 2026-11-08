import { describe, expect, it } from "vitest";
import { eq } from "drizzle-orm";
import { resetTestDb } from "@/server/db/client";
import { faqs, guides } from "@/server/db/schema";
import { importOldMesh } from "@/server/seed/import-old-mesh";
import { syncContent2026 } from "@/server/seed/content/sync";
import { FAQS_2026 as BASE_FAQS, GUIDES_2026 as BASE_GUIDES } from "@/server/seed/content/guides-2026";
import { FAQS_STUDENT_LIFE, GUIDES_STUDENT_LIFE } from "@/server/seed/content/guides-student-life";

const GUIDES_2026 = [...BASE_GUIDES, ...GUIDES_STUDENT_LIFE];
const FAQS_2026 = [...BASE_FAQS, ...FAQS_STUDENT_LIFE];

describe("syncContent2026", () => {
  it("publishes the new guides and FAQs, replaces rewritten guides, and can run twice", async () => {
    const db = await resetTestDb();
    await importOldMesh(db);
    const [oldDriving] = await db.select().from(guides).where(eq(guides.slug, "drivers-license"));
    expect(oldDriving).toBeDefined();

    const first = await syncContent2026(db);
    const second = await syncContent2026(db);
    expect(first).toEqual({ guides: GUIDES_2026.length, faqs: FAQS_2026.length });
    expect(second).toEqual(first);

    const [cost] = await db.select().from(guides).where(eq(guides.slug, "cost-of-living"));
    expect(cost.status).toBe("published");
    expect(cost.lastVerifiedAt).not.toBeNull();
    expect(cost.readingMinutes).toBeGreaterThan(1);

    const [driving] = await db.select().from(guides).where(eq(guides.slug, "drivers-license"));
    expect(driving.title).toMatch(/Saudi driving licence/);

    const published = await db.select().from(faqs).where(eq(faqs.status, "published"));
    expect(published).toHaveLength(FAQS_2026.length);
  });
  it("never uses em or en dashes in the copy", () => {
    const all = JSON.stringify([GUIDES_2026, FAQS_2026]);
    expect(all).not.toMatch(new RegExp(`[${String.fromCharCode(0x2014)}${String.fromCharCode(0x2013)}]`));
  });
});

describe("syncBookLinks", () => {
  it("fills in reader links for known books, and never overwrites one an admin set", async () => {
    const { importLegacy } = await import("@/server/seed/import-legacy");
    const { lessons } = await import("@/server/db/schema");
    const { syncBookLinks, BOOK_LINKS } = await import("@/server/seed/content/book-links");
    const db = await resetTestDb();
    await importLegacy(db);
    await db.update(lessons).set({ bookUrl: "https://example.org/my-edition" }).where(eq(lessons.slug, "ruh-dalil"));
    const n = await syncBookLinks(db);
    expect(n).toBeGreaterThan(20);
    const [tawhid] = await db.select().from(lessons).where(eq(lessons.slug, "ruh-tawhid"));
    expect(tawhid.bookUrl).toBe(`https://app.turath.io/book/${BOOK_LINKS["ruh-tawhid"]}`);
    const [dalil] = await db.select().from(lessons).where(eq(lessons.slug, "ruh-dalil"));
    expect(dalil.bookUrl).toBe("https://example.org/my-edition");
  });
});
