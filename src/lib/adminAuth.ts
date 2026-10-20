/**
 * Admin authentication: a single shared password from ADMIN_PASSWORD.
 * The session cookie `duroos_admin` holds sha256hex(ADMIN_PASSWORD + ':duroos-admin').
 * All hashing uses Web Crypto so the same helpers work in route handlers
 * (Node runtime) and in middleware (Edge runtime).
 */

export const ADMIN_COOKIE = "duroos_admin";
const SALT = ":duroos-admin";

export function adminConfigured(): boolean {
  return !!process.env.ADMIN_PASSWORD;
}

async function sha256Hex(text: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function tokenForPassword(password: string): Promise<string> {
  return sha256Hex(password + SALT);
}

/** The expected cookie value, or null when ADMIN_PASSWORD is unset. */
export async function adminToken(): Promise<string | null> {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw) return null;
  return tokenForPassword(pw);
}

/** Constant-time-ish string comparison (avoids early-exit timing leaks). */
export function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export function cookieValue(header: string | null, name: string): string | null {
  if (!header) return null;
  for (const part of header.split(";")) {
    const idx = part.indexOf("=");
    if (idx === -1) continue;
    if (part.slice(0, idx).trim() === name) {
      return decodeURIComponent(part.slice(idx + 1).trim());
    }
  }
  return null;
}

/** True when the request carries a valid admin cookie. */
export async function isAdmin(req: Request): Promise<boolean> {
  const expected = await adminToken();
  if (!expected) return false;
  const got = cookieValue(req.headers.get("cookie"), ADMIN_COOKIE);
  return !!got && safeEqual(got, expected);
}
