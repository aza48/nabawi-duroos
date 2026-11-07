/** Canonical public origin. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://medinahub.org").replace(/\/+$/, "");

export function abs(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
