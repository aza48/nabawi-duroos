/**
 * A small per-instance rate limit for the public write endpoints (push subscribe, track).
 * It is a sliding window in memory: each serverless instance keeps its own counts, so the
 * real ceiling is the limit times the number of warm instances. That is enough to stop one
 * phone or script from filling the database from a single address; a stronger limit belongs
 * in the Vercel firewall in front of the site.
 */
const windows = new Map<string, number[]>();
let lastSweep = 0;

/** Drops stale entries now and then so the map never grows without bound. */
function sweep(now: number, windowMs: number) {
  if (now - lastSweep < windowMs) return;
  lastSweep = now;
  for (const [k, hits] of windows) {
    const live = hits.filter((t) => now - t < windowMs);
    if (live.length) windows.set(k, live);
    else windows.delete(k);
  }
}

/** True when `key` may make another request: at most `max` in the last `windowMs`. */
export function allow(key: string, max: number, windowMs: number, now: number = Date.now()): boolean {
  sweep(now, windowMs);
  const hits = (windows.get(key) ?? []).filter((t) => now - t < windowMs);
  if (hits.length >= max) {
    windows.set(key, hits);
    return false;
  }
  hits.push(now);
  windows.set(key, hits);
  return true;
}

/** The caller's address as the platform reports it; "unknown" when there is none. */
export function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  const first = fwd?.split(",")[0]?.trim();
  return first || req.headers.get("x-real-ip")?.trim() || "unknown";
}

/** Test hook. */
export function resetRateLimits() {
  windows.clear();
  lastSweep = 0;
}
