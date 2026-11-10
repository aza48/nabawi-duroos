/**
 * "Was this useful?" votes (work plan S1). Each vote is one analytics event of type "rate" (no new table):
 * path is the page, label the content kind ("guide" or "faq"), value 1 for yes and 0 for no.
 * A vote is remembered on the device per page, so one reader counts once per page.
 */
export type UsefulKind = "guide" | "faq";

export const USEFUL_STORAGE_KEY = "mesh-useful-v1";

/** The page a vote counts for: the path without /ar, so English and Arabic readers of one guide add up together. */
export function votePath(pathname: string): string {
  const p = pathname.split(/[?#]/)[0].replace(/\/+$/, "") || "/";
  return p === "/ar" ? "/" : p.startsWith("/ar/") ? p.slice(3) : p;
}

/** Saved votes, as { "/guides/x": 1 | 0 }. Anything malformed reads as no votes. */
export function readVotes(raw: string | null | undefined): Record<string, 0 | 1> {
  try {
    const o = JSON.parse(raw ?? "{}");
    if (!o || typeof o !== "object" || Array.isArray(o)) return {};
    const out: Record<string, 0 | 1> = {};
    for (const [k, v] of Object.entries(o)) if (typeof k === "string" && k.startsWith("/") && (v === 0 || v === 1)) out[k] = v;
    return out;
  } catch {
    return {};
  }
}

/** Adds a vote, keeping the 200 most recent pages so storage stays small. */
export function withVote(votes: Record<string, 0 | 1>, path: string, yes: boolean): Record<string, 0 | 1> {
  const rest = Object.entries(votes).filter(([k]) => k !== path);
  return Object.fromEntries([...rest.slice(-199), [path, yes ? 1 : 0]]);
}

export type UsefulRow = { path: string; kind: string; yes: number; no: number };

/** Low scores first: pages with the most "no" votes relative to all their votes, then the most votes. */
export function lowestFirst(rows: UsefulRow[]): UsefulRow[] {
  const score = (r: UsefulRow) => (r.yes + 1) / (r.yes + r.no + 2); // smoothed, so one "no" does not outrank ten mixed votes
  return [...rows].sort((a, b) => score(a) - score(b) || b.yes + b.no - (a.yes + a.no) || a.path.localeCompare(b.path));
}
