import { asc, eq } from "drizzle-orm";
import { z } from "zod";
import type { Db } from "@/server/db/client";
import type { Auth } from "@/server/auth/auth";
import { session, user } from "@/server/db/schema";
import { assertCan, ROLES, type Actor } from "@/server/auth/permissions";
import { record } from "./audit";

export async function listAdmins(db: Db, actor: Actor) {
  assertCan(actor, "admins.manage");
  return db
    .select({
      id: user.id, name: user.name, email: user.email, role: user.role,
      twoFactorEnabled: user.twoFactorEnabled, banned: user.banned, createdAt: user.createdAt,
    })
    .from(user)
    .orderBy(asc(user.createdAt));
}

const roleInput = z.object({ userId: z.string().min(1), role: z.enum(ROLES) });

export async function setRole(db: Db, _auth: Auth, actor: Actor, input: z.input<typeof roleInput>) {
  assertCan(actor, "admins.manage");
  const { userId, role } = roleInput.parse(input);
  if (userId === actor.id) throw new Error("cannot_change_self");
  const [before] = await db.select({ id: user.id, role: user.role }).from(user).where(eq(user.id, userId));
  if (!before) throw new Error("admin_not_found");
  await db.update(user).set({ role, updatedAt: new Date() }).where(eq(user.id, userId));
  await record(db, actor, { action: "update", entity: "admin", entityId: userId, before, after: { id: userId, role } });
}

/** Removes an admin immediately: banned, and every live session deleted. */
export async function revokeAdmin(db: Db, _auth: Auth, actor: Actor, input: { userId: string }) {
  assertCan(actor, "admins.manage");
  if (input.userId === actor.id) throw new Error("cannot_change_self");
  const [before] = await db.select({ id: user.id, banned: user.banned }).from(user).where(eq(user.id, input.userId));
  if (!before) throw new Error("admin_not_found");
  await db.update(user).set({ banned: true, banReason: `Removed by ${actor.name}`, updatedAt: new Date() }).where(eq(user.id, input.userId));
  await db.delete(session).where(eq(session.userId, input.userId));
  await record(db, actor, { action: "update", entity: "admin", entityId: input.userId, before, after: { id: input.userId, banned: true } });
}
