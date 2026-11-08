import type { Db } from "@/server/db/client";
import { createAuth } from "./auth";

/**
 * Creates a one-time reset link through Better Auth's own requestPasswordReset.
 * Returns null when no account has that email (Better Auth answers the same either way).
 */
export async function createResetLink(db: Db, email: string, baseURL: string): Promise<string | null> {
  let link: string | null = null;
  const auth = createAuth(db, { baseURL, onResetLink: (_email, url) => (link = url) });
  await auth.api.requestPasswordReset({ body: { email: email.trim().toLowerCase(), redirectTo: "/admin/reset" } });
  return link;
}
