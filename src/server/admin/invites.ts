import { createHash, randomBytes } from "node:crypto";
import { eq } from "drizzle-orm";
import { z } from "zod";
import type { Db } from "@/server/db/client";
import type { Auth } from "@/server/auth/auth";
import { adminInvites } from "@/server/db/schema";
import { assertCan, ROLES, type Actor, type Role } from "@/server/auth/permissions";
import { SITE_URL } from "@/lib/site";
import { record } from "./audit";

export const INVITE_TTL_HOURS = 72;

const hash = (token: string) => createHash("sha256").update(token).digest("hex");

const inviteInput = z.object({ email: z.email().transform((e) => e.toLowerCase()), role: z.enum(ROLES) });

export async function createInvite(
  db: Db,
  actor: Actor | "system",
  input: { email: string; role: Role },
  baseUrl: string = SITE_URL
): Promise<{ url: string; token: string }> {
  assertCan(actor, "admins.manage");
  const { email, role } = inviteInput.parse(input);
  const token = randomBytes(32).toString("base64url");
  const [row] = await db.insert(adminInvites).values({
    email,
    role,
    tokenHash: hash(token),
    invitedBy: actor === "system" ? null : actor.id,
    expiresAt: new Date(Date.now() + INVITE_TTL_HOURS * 3_600_000),
  }).returning({ id: adminInvites.id, expiresAt: adminInvites.expiresAt });
  // Activity shows who invited whom and with what role (never the token).
  await record(db, actor, { action: "create", entity: "admin", entityId: `invite:${row.id}`, before: null, after: { invite: row.id, email, role, expiresAt: row.expiresAt } });
  return { token, url: `${baseUrl}/admin/invite?token=${token}` };
}

const acceptInput = z.object({
  token: z.string().min(1),
  name: z.string().trim().min(2).max(60),
  password: z.string().min(8).max(128),
});

export async function acceptInvite(
  db: Db,
  auth: Auth,
  input: { token: string; name: string; password: string }
): Promise<{ userId: string }> {
  const { token, name, password } = acceptInput.parse(input);
  const [invite] = await db.select().from(adminInvites).where(eq(adminInvites.tokenHash, hash(token)));
  if (!invite) throw new Error("invite_invalid");
  if (invite.usedAt) throw new Error("invite_used");
  if (invite.expiresAt.getTime() < Date.now()) throw new Error("invite_expired");
  // Mark used first so a double submit cannot create two accounts.
  const claimed = await db
    .update(adminInvites)
    .set({ usedAt: new Date() })
    .where(eq(adminInvites.id, invite.id))
    .returning({ id: adminInvites.id, usedAt: adminInvites.usedAt });
  if (!claimed.length) throw new Error("invite_used");
  const res = await auth.api.createUser({
    body: { email: invite.email, password, name, role: invite.role as "owner" },
  });
  await record(db, "system", { action: "create", entity: "admin", entityId: res.user.id, before: null, after: { id: res.user.id, name, email: invite.email, role: invite.role, invite: invite.id } });
  return { userId: res.user.id };
}

/** Peek at an invite for the accept page (never returns the token). */
export async function describeInvite(db: Db, token: string) {
  const [invite] = await db.select().from(adminInvites).where(eq(adminInvites.tokenHash, hash(token)));
  if (!invite) return { state: "invalid" as const };
  if (invite.usedAt) return { state: "used" as const };
  if (invite.expiresAt.getTime() < Date.now()) return { state: "expired" as const };
  return { state: "ok" as const, email: invite.email, role: invite.role as Role };
}
