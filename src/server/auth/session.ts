import "server-only";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getAuth } from "./auth";
import { checkAdmin } from "./check";
import { Forbidden, isRole, type Actor, type Permission } from "./permissions";

export async function getAdminSession() {
  const auth = await getAuth();
  return auth.api.getSession({ headers: await headers() });
}

/**
 * Gate for every admin page and server action. Redirects people who are not
 * signed in or have not set up two-factor; throws Forbidden for missing permissions.
 */
export async function requireAdmin(p?: Permission): Promise<Actor> {
  const s = await getAdminSession();
  const u = s?.user as { id: string; name: string; role?: string | null; banned?: boolean | null; twoFactorEnabled?: boolean | null } | undefined;
  const result = checkAdmin(u ?? null, p);
  if (result === "signed_out") redirect("/admin/login");
  if (result === "banned") redirect("/admin/login?error=revoked");
  if (result === "needs_2fa") redirect("/admin/setup-2fa");
  if (result === "forbidden" || !u || !isRole(u.role)) throw new Forbidden();
  return { id: u.id, name: u.name, role: u.role };
}
