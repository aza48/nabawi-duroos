/**
 * Visitor counting is on by default and anonymous. It is switched off for one browser by the
 * button on /privacy (a flag in local storage), by the browser's Global Privacy Control signal,
 * and for automated browsers. Plain module: used by the tracker (client) and the track endpoint (server).
 */

/** Local storage key set by the privacy page when a reader asks not to be counted. */
export const OPT_OUT_KEY = "mesh_notrack";

/** The anonymous ids the tracker keeps in local storage; cleared when a reader opts out. */
export const VISITOR_KEYS = ["mesh_vid", "mesh_sid"] as const;

/** How long visits are kept before the daily job deletes them. */
export const RETENTION_DAYS = 180;

export function trackingAllowed(signals: { gpc?: unknown; webdriver?: unknown; optOut?: string | null }): boolean {
  if (signals.gpc === true || signals.gpc === "1") return false;
  if (signals.webdriver === true) return false;
  if (signals.optOut) return false;
  return true;
}

/** The request header browsers send when Global Privacy Control is on. */
export function gpcHeader(headers: { get(name: string): string | null }): boolean {
  return headers.get("sec-gpc") === "1";
}
