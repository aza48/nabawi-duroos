/**
 * A small per-instance rate limit for the public write endpoints (push subscribe, track).
 * It is a sliding window in memory: each serverless instance keeps its own counts, so the
 * real ceiling is the limit times the number of warm instances. That is enough to stop one
 * phone or script from filling the database from a single address; a stronger limit belongs
 * in the Vercel firewall in front of the site.
 */
const windows = new Map<string, { windowMs: number; hits: number[] }>();
let lastSweep = 0;
const SWEEP_EVERY_MS = 60_000;

/**
 * Drops stale entries now and then so the map never grows without bound. Each key is
 * swept with its own window: endpoints use different windows (a minute for tracking, an
 * hour for the assistant), and sweeping with the caller's window would wipe the longer ones.
 */
function sweep(now: number) {
  if (now - lastSweep < SWEEP_EVERY_MS) return;
  lastSweep = now;
  for (const [k, w] of windows) {
    const live = w.hits.filter((t) => now - t < w.windowMs);
    if (live.length) windows.set(k, { windowMs: w.windowMs, hits: live });
    else windows.delete(k);
  }
}

/** True when `key` may make another request: at most `max` in the last `windowMs`. */
export function allow(key: string, max: number, windowMs: number, now: number = Date.now()): boolean {
  sweep(now);
  const hits = (windows.get(key)?.hits ?? []).filter((t) => now - t < windowMs);
  if (hits.length >= max) {
    windows.set(key, { windowMs, hits });
    return false;
  }
  hits.push(now);
  windows.set(key, { windowMs, hits });
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
