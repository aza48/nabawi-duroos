import { can, type Permission } from "./permissions";

export type AdminCheck = "ok" | "signed_out" | "needs_2fa" | "banned" | "forbidden";

/** Pure gate used by requireAdmin: 2FA first, then bans, then the permission. */
export function checkAdmin(
  u: { role?: string | null; banned?: boolean | null; twoFactorEnabled?: boolean | null } | null,
  p?: Permission
): AdminCheck {
  if (!u) return "signed_out";
  if (u.banned) return "banned";
  if (!u.twoFactorEnabled) return "needs_2fa";
  if (p && !can(u.role, p)) return "forbidden";
  return "ok";
}
