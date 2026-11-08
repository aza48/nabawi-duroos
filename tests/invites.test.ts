import { beforeAll, describe, expect, it } from "vitest";
import { eq } from "drizzle-orm";
import { resetTestDb, type Db } from "@/server/db/client";
import { createAuth, type Auth } from "@/server/auth/auth";
import { acceptInvite, createInvite } from "@/server/admin/invites";
import { adminInvites, auditLog, user } from "@/server/db/schema";
import type { Actor } from "@/server/auth/permissions";
import { BASE } from "./helpers/auth";

let db: Db;
let auth: Auth;
const owner: Actor = { id: "owner-1", name: "Owner", role: "owner" };
const editor: Actor = { id: "editor-1", name: "Editor", role: "editor" };

beforeAll(async () => {
  db = await resetTestDb();
  auth = createAuth(db, { baseURL: BASE });
  const now = new Date();
  await db.insert(user).values([
    { id: owner.id, name: owner.name, email: "o@example.com", emailVerified: true, role: "owner", createdAt: now, updatedAt: now },
    { id: editor.id, name: editor.name, email: "e@example.com", emailVerified: true, role: "editor", createdAt: now, updatedAt: now },
  ]);
});

describe("admin invites", () => {
  it("creates an account with the invited role, once", async () => {
    const { token, url } = await createInvite(db, owner, { email: "new@example.com", role: "duroos_editor" });
    expect(url).toContain(`/admin/invite?token=${token}`);
    const { userId } = await acceptInvite(db, auth, { token, name: "New Admin", password: "a-strong-password-1" });
    const [u] = await db.select().from(user).where(eq(user.id, userId));
    expect(u.role).toBe("duroos_editor");
    expect(u.email).toBe("new@example.com");
    await expect(acceptInvite(db, auth, { token, name: "Again", password: "a-strong-password-1" })).rejects.toThrow("invite_used");
    const log = await db.select().from(auditLog).where(eq(auditLog.entity, "admin"));
    expect(log.some((l) => l.entityId.startsWith("invite:") && l.actorId === owner.id)).toBe(true);
    expect(log.some((l) => l.entityId === userId && l.action === "create")).toBe(true);
    expect(JSON.stringify(log)).not.toContain(token);
  });

  it("rejects an expired invite", async () => {
    const { token } = await createInvite(db, owner, { email: "late@example.com", role: "editor" });
    await db.update(adminInvites).set({ expiresAt: new Date(Date.now() - 1000) }).where(eq(adminInvites.email, "late@example.com"));
    await expect(acceptInvite(db, auth, { token, name: "Late", password: "a-strong-password-1" })).rejects.toThrow("invite_expired");
  });

  it("rejects an unknown token", async () => {
    await expect(acceptInvite(db, auth, { token: "nope", name: "Someone", password: "a-strong-password-1" })).rejects.toThrow("invite_invalid");
  });

  it("only lets the owner invite", async () => {
    await expect(createInvite(db, editor, { email: "z@example.com", role: "editor" })).rejects.toThrow("forbidden");
  });

  it("rejects unknown roles", async () => {
    await expect(createInvite(db, owner, { email: "r@example.com", role: "superuser" as never })).rejects.toThrow();
  });

  it("stores only a hash of the token", async () => {
    const { token } = await createInvite(db, owner, { email: "h@example.com", role: "editor" });
    const [row] = await db.select().from(adminInvites).where(eq(adminInvites.email, "h@example.com"));
    expect(row.tokenHash).not.toBe(token);
    expect(row.tokenHash).toHaveLength(64);
  });
});
