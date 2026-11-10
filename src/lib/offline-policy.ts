/**
 * What the service worker (public/sw.js) keeps for reading offline, as plain functions that can be tested.
 *
 * public/sw.js is served as is (it is not bundled), so it carries its own copy of these rules between the
 * "<policy>" markers. tests/offline-policy.test.ts runs the same cases against both copies and fails if they
 * drift, so change both together.
 */

/** Bump the version to drop every page and asset saved by older workers on the next activate. */
export const PAGES_CACHE = "mesh-pages-v1";
export const STATIC_CACHE = "mesh-static-v1";
/** Every cache this site creates starts with this; on activate the worker deletes any not in KEEP_CACHES. */
export const CACHE_PREFIX = "mesh-";
export const KEEP_CACHES = [PAGES_CACHE, STATIC_CACHE];

/** Most guides kept at once (the most recently saved win); the fixed pages do not count. */
export const GUIDE_CAP = 30;
/** Most build files (scripts, styles, fonts) kept at once; the oldest go first. */
export const STATIC_CAP = 600;
/** A page saved less than this long ago is not fetched again just to save it. */
export const REFRESH_AFTER_MS = 5 * 60 * 1000;
/** The offline page itself is fetched again at most once a day. */
export const OFFLINE_REFRESH_MS = 24 * 60 * 60 * 1000;

/** Headers added to each saved page: when it was saved (ms since 1970) and its title (URI encoded). */
export const SAVED_HEADER = "x-mesh-saved";
export const TITLE_HEADER = "x-mesh-title";

export const OFFLINE_PATHS = ["/offline", "/ar/offline"] as const;

export type RequestKind = "page" | "navigate" | "static" | "ignore";

const PAGE_RE = /^(?:\/ar)?(?:\/|\/duroos|\/duroos\/schedule|\/guides\/[A-Za-z0-9][A-Za-z0-9_-]{0,119}|\/offline)$/;
const GUIDE_RE = /^(?:\/ar)?\/guides\/[^/]+$/;

/** A path without its query, hash or trailing slash ("/ar/" is "/ar"). Null for anything that is not a plain path. */
export function normalisePath(path: string): string | null {
  if (typeof path !== "string" || !path.startsWith("/") || path.startsWith("//")) return null;
  let p = path.split(/[?#]/)[0];
  while (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1);
  if (p === "/ar") return "/ar";
  return p || "/";
}

/** The cache key for a page the worker may keep, or null when it must never be kept. */
export function pageKey(path: string): string | null {
  const p = normalisePath(path);
  if (!p) return null;
  const forMatch = p === "/ar" ? "/ar/" : p;
  return PAGE_RE.test(forMatch) ? p : null;
}

export function isGuide(path: string): boolean {
  const p = normalisePath(path);
  return !!p && GUIDE_RE.test(p);
}

export function isOfflinePath(path: string): boolean {
  return (OFFLINE_PATHS as readonly string[]).includes(normalisePath(path) ?? "");
}

/** The offline page in the language of the page that could not be opened. */
export function offlinePath(path: string): string {
  const p = normalisePath(path) ?? "/";
  return p === "/ar" || p.startsWith("/ar/") ? "/ar/offline" : "/offline";
}

function isPrivate(p: string): boolean {
  return p === "/admin" || p.startsWith("/admin/") || p === "/api" || p.startsWith("/api/");
}

/**
 * How the worker treats a request:
 * "page" is network first and saved on success, "navigate" is network only with the offline page as fallback,
 * "static" is a build file kept on use, and "ignore" is left to the browser (admin, api, other sites, POST,
 * and the React Server Component requests of soft navigations, which fall back to a full page load offline).
 */
export function classify(method: string, url: string, origin: string, mode: string, isRsc: boolean): RequestKind {
  if (method !== "GET") return "ignore";
  let u: URL;
  try {
    u = new URL(url);
  } catch {
    return "ignore";
  }
  if (u.origin !== origin) return "ignore";
  if (isPrivate(u.pathname)) return "ignore";
  if (isRsc || u.searchParams.has("_rsc")) return "ignore";
  if (u.pathname.startsWith("/_next/static/")) return "static";
  if (mode === "navigate") return pageKey(u.pathname) && !isOfflinePath(u.pathname) ? "page" : "navigate";
  return "ignore";
}

/** Only a complete, same-origin 200 that was not redirected is ever kept. Pages must also be HTML. */
export function canStore(res: { status: number; type: string; redirected: boolean; contentType?: string | null }, html: boolean): boolean {
  if (res.status !== 200 || res.type !== "basic" || res.redirected) return false;
  return !html || /^text\/html/i.test(res.contentType ?? "");
}

export type SavedEntry = { path: string; savedAt: number };

/** Guides to drop so that only the `cap` most recently saved remain. Other pages are never dropped here. */
export function guidesToEvict(entries: SavedEntry[], cap: number = GUIDE_CAP): string[] {
  return entries
    .filter((e) => isGuide(e.path))
    .sort((a, b) => b.savedAt - a.savedAt || (a.path < b.path ? -1 : 1))
    .slice(Math.max(0, cap))
    .map((e) => e.path);
}

/** Build files to drop (the first saved go first) so that `cap` remain. */
export function staticToEvict(keysInOrder: string[], cap: number = STATIC_CAP): string[] {
  return keysInOrder.length > cap ? keysInOrder.slice(0, keysInOrder.length - cap) : [];
}

/**
 * When a copy was saved: the response's Date header (a copy the browser had kept in its HTTP cache is older
 * than the moment it was stored), never later than now. Falls back to now.
 */
export function savedTimeFrom(dateHeader: string | null | undefined, now: number): number {
  const d = dateHeader ? Date.parse(dateHeader) : NaN;
  return Number.isFinite(d) ? Math.min(d, now) : now;
}

/** True when a copy saved at `savedAt` is recent enough not to fetch again. */
export function isFresh(savedAt: number | null | undefined, now: number, maxAge: number = REFRESH_AFTER_MS): boolean {
  return typeof savedAt === "number" && Number.isFinite(savedAt) && now - savedAt >= 0 && now - savedAt < maxAge;
}

const decodeEntities = (s: string) =>
  s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");

/** The build files a saved page's HTML names (scripts, styles, preloaded fonts), as same-origin paths. */
export function extractAssets(html: string): string[] {
  const out = new Set<string>();
  const re = /(?:src|href)=["'](\/_next\/static\/[^"'\s>]+)["']/g;
  for (let m = re.exec(html); m; m = re.exec(html)) out.add(decodeEntities(m[1]));
  return [...out];
}

/** The build files (fonts) a stylesheet at `cssPath` names with url(), resolved to same-origin paths. */
export function extractCssAssets(css: string, cssPath: string): string[] {
  const out = new Set<string>();
  const re = /url\(\s*["']?([^"')]+)["']?\s*\)/g;
  for (let m = re.exec(css); m; m = re.exec(css)) {
    const ref = m[1].trim();
    if (/^(data|blob|https?):/i.test(ref) || ref.startsWith("//")) continue;
    try {
      const u = new URL(ref, `http://x${cssPath}`);
      if (u.pathname.startsWith("/_next/static/")) out.add(u.pathname + u.search);
    } catch {}
  }
  return [...out];
}

/** The page's title without the site name, for the list of saved pages. */
export function extractTitle(html: string): string {
  const m = /<title[^>]*>([^<]*)<\/title>/i.exec(html);
  if (!m) return "";
  return decodeEntities(m[1])
    .replace(/\s*(?:\||·)\s*MESH(?: Madinah)?\s*$/u, "")
    .trim()
    .slice(0, 160);
}

/** "Mon 9 Nov, 14:05" in English; the same in Arabic with Arabic digits, always on the Gregorian calendar. */
export function formatSaved(savedAt: number, locale: "en" | "ar", timeZone?: string): string {
  const opts: Intl.DateTimeFormatOptions = { weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23", timeZone };
  return new Intl.DateTimeFormat(locale === "ar" ? "ar-u-ca-gregory-nu-arab" : "en-GB", opts).format(new Date(savedAt));
}
