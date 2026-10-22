/** Sharing / link-embed helpers for MESH articles.
 *
 * Articles store their banner either as an https URL or as a data URI
 * (client-compressed uploads). Link scrapers (X, WhatsApp, Telegram…)
 * cannot read data URIs, so embeds point at the banner endpoint
 * (/api/mesh/articles/[id]/banner), which serves the stored image bytes
 * at a normal public URL. */

import { siteUrl } from "./site";

export const SITE_URL = siteUrl();

/** Absolute canonical URL for an article page. */
export function articleUrl(id: number | string): string {
  return `${SITE_URL}/resources/${id}`;
}

/** Absolute og:image URL for an article, or the site poster when it has no banner. */
export function articleOgImage(id: number | string, banner: string | null): string {
  if (!banner) return `${SITE_URL}/mesh-hero-poster.jpg`;
  if (banner.startsWith("https://")) return banner;
  if (banner.startsWith("data:image/")) return `${SITE_URL}/api/mesh/articles/${id}/banner`;
  return `${SITE_URL}/mesh-hero-poster.jpg`;
}
