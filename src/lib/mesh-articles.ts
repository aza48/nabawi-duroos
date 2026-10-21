import { sanitizeArticleHtml, excerptOf, readingMinutes, plainTextOf } from "./mesh-sanitize";

/** Shared validation for article create/update. Bodies are always sanitized server-side
 *  before storage, so anything read back out of the DB is already safe to render. */

export const ARTICLE_TITLE_MAX = 140;
export const ARTICLE_BODY_MAX = 400_000;
export const ARTICLE_BANNER_MAX = 900_000;

const BANNER_RE = /^(https:\/\/|data:image\/(jpeg|png|webp);base64,)/;

export type ArticleInput = { title: string; banner: string | null; bodyHtml: string; status: "draft" | "published" };

export function validBanner(value: unknown): string | null | undefined {
  if (value === undefined) return undefined; // not provided — caller decides (keep / default null)
  if (value === null || value === "") return null;
  if (typeof value !== "string") return undefined;
  if (value.length > ARTICLE_BANNER_MAX) return undefined;
  return BANNER_RE.test(value) ? value : undefined;
}

/** Parse a full article body for POST. Returns { input } or { error }. */
export function parseArticleInput(body: Record<string, unknown>): { input: ArticleInput } | { error: string } {
  const title = typeof body.title === "string" ? body.title.trim() : "";
  if (title.length < 3 || title.length > ARTICLE_TITLE_MAX) return { error: "invalid_title" };
  const rawBanner = validBanner(body.banner);
  if (rawBanner === undefined && body.banner !== undefined) return { error: "invalid_banner" };
  const banner = rawBanner ?? null; // banner is optional on create — omitted means no banner
  const rawBody = typeof body.bodyHtml === "string" ? body.bodyHtml : "";
  if (rawBody.length > ARTICLE_BODY_MAX) return { error: "body_too_large" };
  const bodyHtml = sanitizeArticleHtml(rawBody);
  const status = body.status === "draft" ? "draft" : "published";
  if (status === "published" && plainTextOf(bodyHtml).length === 0) return { error: "empty_body" };
  return { input: { title, banner, bodyHtml, status } };
}

/** Parse a partial article body for PATCH. Only provided fields are validated + returned. */
export function parseArticlePatch(body: Record<string, unknown>): { patch: Partial<ArticleInput> } | { error: string } {
  const patch: Partial<ArticleInput> = {};
  if (body.title !== undefined) {
    const title = typeof body.title === "string" ? body.title.trim() : "";
    if (title.length < 3 || title.length > ARTICLE_TITLE_MAX) return { error: "invalid_title" };
    patch.title = title;
  }
  if (body.banner !== undefined) {
    const banner = validBanner(body.banner);
    if (banner === undefined) return { error: "invalid_banner" };
    patch.banner = banner;
  }
  if (body.bodyHtml !== undefined) {
    const rawBody = typeof body.bodyHtml === "string" ? body.bodyHtml : "";
    if (rawBody.length > ARTICLE_BODY_MAX) return { error: "body_too_large" };
    patch.bodyHtml = sanitizeArticleHtml(rawBody);
  }
  if (body.status !== undefined) {
    if (body.status !== "draft" && body.status !== "published") return { error: "invalid_status" };
    patch.status = body.status;
  }
  return { patch };
}

export type ArticleRow = {
  id: number; author_id: number | null; title: string; banner: string | null; body_html: string;
  status: string; is_seed: boolean; created_at: string; updated_at: string;
  author_name: string; author_role: string | null; author_country: string | null;
  like_count: number; liked_by_me: boolean;
};

/** Base article query. Pass the SQL placeholder (e.g. "$1") that will hold the viewer's
 *  user id (or -1 for guests) so liked_by_me is computed in the same round trip. */
export function articleSelect(uidPlaceholder: string): string {
  return `
  SELECT a.id, a.author_id, a.title, a.banner, a.body_html, a.status, a.is_seed, a.created_at, a.updated_at,
    COALESCE(u.display_name, 'Deleted User') AS author_name, u.role AS author_role, u.country AS author_country,
    (SELECT count(*)::int FROM mesh_article_likes l WHERE l.article_id = a.id) AS like_count,
    EXISTS (SELECT 1 FROM mesh_article_likes l WHERE l.article_id = a.id AND l.user_id = ${uidPlaceholder}) AS liked_by_me
  FROM mesh_articles a LEFT JOIN mesh_users u ON u.id = a.author_id`;
}

/** Shape a row for list responses: full body is replaced by an excerpt + reading time. */
export function articleListItem(row: ArticleRow) {
  return {
    id: row.id, author_id: row.author_id, title: row.title, banner: row.banner,
    excerpt: excerptOf(row.body_html), reading_minutes: readingMinutes(row.body_html),
    status: row.status, is_seed: row.is_seed, created_at: row.created_at, updated_at: row.updated_at,
    author_name: row.author_name, author_role: row.author_role, author_country: row.author_country,
    like_count: row.like_count, liked_by_me: row.liked_by_me,
  };
}

/** Shape a row for the reader page: full (already sanitized) body included. */
export function articleDetail(row: ArticleRow) {
  return { ...articleListItem(row), body_html: row.body_html };
}
