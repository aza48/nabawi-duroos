import { timingSafeEqual } from "node:crypto";

/** Constant-time check of "Authorization: Bearer <secret>". An empty secret never authorizes. */
export function cronAuthorized(header: string | null, secret: string | undefined): boolean {
  if (!secret || !header?.startsWith("Bearer ")) return false;
  const given = Buffer.from(header.slice(7));
  const want = Buffer.from(secret);
  return given.length === want.length && timingSafeEqual(given, want);
}
