import { beforeAll, describe, expect, it } from "vitest";
import { eq } from "drizzle-orm";
import { resetTestDb, type Db } from "@/server/db/client";
import { can, type Actor } from "@/server/auth/permissions";
import { checkAdmin } from "@/server/auth/check";
import { listActivity, record, undo } from "@/server/admin/audit";
import { auditLog, faqs, user } from "@/server/db/schema";

describe("permissions", () => {
  it("gives the owner everything", () => {
    for (const p of ["duroos.write", "announcements.write", "content.write", "settings.write", "admins.manage", "activity.undo"] as const)
      expect(can("owner", p)).toBe(true);
  });
  it("keeps editors away from managing admins", () => {
    expect(can("editor", "admins.manage")).toBe(false);
    expect(can("editor", "duroos.write")).toBe(true);
  });
  it("limits duroos editors to duroos and announcements", () => {
    expect(can("duroos_editor", "duroos.write")).toBe(true);
    expect(can("duroos_editor", "announcements.write")).toBe(true);
    expect(can("duroos_editor", "content.write")).toBe(false);
    expect(can("duroos_editor", "settings.write")).toBe(false);
  });
  it("limits content editors to content", () => {
    expect(can("content_editor", "content.write")).toBe(true);
    expect(can("content_editor", "duroos.write")).toBe(false);
  });
  it("denies unknown and missing roles", () => {
    expect(can("admin", "content.write")).toBe(false);
    expect(can(null, "content.write")).toBe(false);
  });
});

describe("checkAdmin", () => {
  it("sends signed-out visitors to sign in", () => expect(checkAdmin(null)).toBe("signed_out"));
  it("requires two-factor before anything else", () =>
    expect(checkAdmin({ role: "owner", twoFactorEnabled: false, banned: false })).toBe("needs_2fa"));
  it("accepts a passkey as the second factor", () =>
    expect(checkAdmin({ role: "owner", twoFactorEnabled: false, hasPasskey: true, banned: false })).toBe("ok"));
  it("still requires a second factor when there is neither TOTP nor a passkey", () =>
    expect(checkAdmin({ role: "owner", twoFactorEnabled: false, hasPasskey: false, banned: false })).toBe("needs_2fa"));
  it("blocks banned admins even with 2FA", () =>
    expect(checkAdmin({ role: "owner", twoFactorEnabled: true, banned: true })).toBe("banned"));
  it("checks the permission", () =>
    expect(checkAdmin({ role: "content_editor", twoFactorEnabled: true, banned: false }, "duroos.write")).toBe("forbidden"));
  it("lets a set-up admin through", () =>
    expect(checkAdmin({ role: "editor", twoFactorEnabled: true, banned: false }, "duroos.write")).toBe("ok"));
});

describe("activity log and undo", () => {
  let db: Db;
  const actor: Actor = { id: "a1", name: "Aisha", role: "owner" };
  beforeAll(async () => {
    db = await resetTestDb();
    const now = new Date();
    await db.insert(user).values({ id: "a1", name: "Aisha", email: "a@example.com", emailVerified: true, role: "owner", createdAt: now, updatedAt: now });
  });

  async function makeFaq(slug: string, question: string) {
    const [row] = await db.insert(faqs).values({ slug, question, answerHtml: "<p>a</p>", category: "university", status: "published" }).returning();
    return row;
  }

  it("restores the previous version when an update is undone", async () => {
    const before = await makeFaq("q1", "Old question");
    const [after] = await db.update(faqs).set({ question: "New question" }).where(eq(faqs.slug, "q1")).returning();
    const id = await record(db, actor, { action: "update", entity: "faq", entityId: "q1", before, after });
    expect(await undo(db, actor, id)).toEqual({ ok: true });
    const [row] = await db.select().from(faqs).where(eq(faqs.slug, "q1"));
    expect(row.question).toBe("Old question");
  });

  it("only undoes once", async () => {
    const before = await makeFaq("q2", "A");
    const [after] = await db.update(faqs).set({ question: "B" }).where(eq(faqs.slug, "q2")).returning();
    const id = await record(db, actor, { action: "update", entity: "faq", entityId: "q2", before, after });
    await undo(db, actor, id);
    expect(await undo(db, actor, id)).toEqual({ ok: false, error: "already_undone" });
  });

  it("reports a missing row instead of throwing", async () => {
    const before = await makeFaq("q3", "A");
    const [after] = await db.update(faqs).set({ question: "B" }).where(eq(faqs.slug, "q3")).returning();
    const id = await record(db, actor, { action: "update", entity: "faq", entityId: "q3", before, after });
    await db.delete(faqs).where(eq(faqs.slug, "q3"));
    expect(await undo(db, actor, id)).toEqual({ ok: false, error: "missing_row" });
  });

  it("removes a created row when the create is undone", async () => {
    const after = await makeFaq("q4", "Created");
    const id = await record(db, actor, { action: "create", entity: "faq", entityId: "q4", before: null, after });
    await undo(db, actor, id);
    expect(await db.select().from(faqs).where(eq(faqs.slug, "q4"))).toEqual([]);
  });

  it("logs the undo itself and lists activity newest first", async () => {
    const rows = await listActivity(db, { limit: 50 });
    const undoRow = rows.find((r) => r.action === "undo");
    expect(undoRow?.undoOf).toBeTypeOf("number");
    expect(rows[0].id).toBeGreaterThan(rows[rows.length - 1].id);
    const [orig] = await db.select().from(auditLog).where(eq(auditLog.id, undoRow!.undoOf!));
    expect(orig.undoneAt).not.toBeNull();
  });

  it("refuses to undo without permission", async () => {
    const before = await makeFaq("q5", "A");
    const id = await record(db, actor, { action: "update", entity: "faq", entityId: "q5", before, after: before });
    await expect(undo(db, { id: "x", name: "C", role: "content_editor" }, id)).rejects.toThrow("forbidden");
  });
});
