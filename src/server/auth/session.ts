import "server-only";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getAuth } from "./auth";
import { checkAdmin } from "./check";
import { hasPasskey } from "./passkeys";
import { getDb } from "@/server/db/client";
import { Forbidden, isRole, type Actor, type Permission } from "./permissions";

export async function getAdminSession() {
  const auth = await getAuth();
  return auth.api.getSession({ headers: await headers() });
}

/**
 * Gate for every admin page and server action. Redirects people who are not
 * signed in or have no second factor (authenticator app or passkey); throws Forbidden for missing permissions.
 */
export async function requireAdmin(p?: Permission): Promise<Actor> {
  const s = await getAdminSession();
  const u = s?.user as { id: string; name: string; role?: string | null; banned?: boolean | null; twoFactorEnabled?: boolean | null } | undefined;
  const passkey = u && !u.twoFactorEnabled ? await hasPasskey(await getDb(), u.id) : false;
  const result = checkAdmin(u ? { ...u, hasPasskey: passkey } : null, p);
  if (result === "signed_out") redirect("/admin/login");
  if (result === "banned") redirect("/admin/login?error=revoked");
  if (result === "needs_2fa") redirect("/admin/setup-2fa");
  if (result === "forbidden" || !u || !isRole(u.role)) throw new Forbidden();
  return { id: u.id, name: u.name, role: u.role };
}

/** True once the signed-in admin has a second factor: an authenticator app or a passkey. */
export async function hasSecondFactor(user: { id: string; twoFactorEnabled?: boolean | null }): Promise<boolean> {
  return !!user.twoFactorEnabled || (await hasPasskey(await getDb(), user.id));
}
