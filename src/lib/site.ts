/**
 * Canonical public origin of the site.
 *
 * NEXT_PUBLIC_SITE_URL is set in production; the fallback keeps every
 * generated absolute URL — canonicals, Open Graph, sitemap entries,
 * email links — on the real domain everywhere else too (local builds,
 * previews), instead of leaking the deployment's vercel.app host.
 */
export function siteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL || "https://medinahub.org").replace(/\/+$/, "");
}

/** Absolute URL for a site path ("/question/1" → "https://medinahub.org/question/1"). */
export function abs(path: string): string {
  return `${siteUrl()}${path.startsWith("/") ? path : `/${path}`}`;
}
