/** Security headers shared by next.config (public pages) and proxy.ts (admin). */

const join = (parts: string[]) => parts.filter(Boolean).join("; ");

/**
 * Public pages are pre-rendered and CDN-cached, so a per-request nonce is not
 * possible there. They carry no user-supplied scripts (all rich text is
 * sanitized), so inline scripts are allowed but framing, plugins, foreign
 * forms and base-tag tricks are not.
 */
export function publicCsp(isDev: boolean): string {
  return join([
    "default-src 'self'",
    `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://challenges.cloudflare.com`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https:",
    "font-src 'self'",
    `connect-src 'self'${isDev ? " ws:" : ""}`,
    "frame-src https://www.youtube-nocookie.com https://challenges.cloudflare.com",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
    isDev ? "" : "upgrade-insecure-requests",
  ]);
}

/** Admin pages are always dynamic, so scripts are locked to a fresh nonce per request. */
export function adminCsp(nonce: string, isDev: boolean): string {
  return join([
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${isDev ? " 'unsafe-eval'" : ""}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "font-src 'self'",
    `connect-src 'self'${isDev ? " ws:" : ""}`,
    "frame-src https://challenges.cloudflare.com",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
    isDev ? "" : "upgrade-insecure-requests",
  ]);
}

export const BASE_HEADERS: { key: string; value: string }[] = [
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

export const ADMIN_OPEN_PATHS = ["/admin/login", "/admin/invite", "/admin/setup-2fa"];

/** Better Auth's session cookie, plain on http and __Secure- prefixed on https. */
export function hasSessionCookie(cookieNames: string[]): boolean {
  return cookieNames.some((n) => n === "better-auth.session_token" || n === "__Secure-better-auth.session_token");
}
