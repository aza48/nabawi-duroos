import { and, eq, isNotNull } from "drizzle-orm";
import type { Db } from "@/server/db/client";
import { streams } from "@/server/db/schema";

/** Reads a youtube.com/@channel/live page: live means it redirected to a watch page that is live now. */
export function detectYouTubeLive(html: string): { live: boolean; url: string | null } {
  const canonical = /<link rel="canonical" href="(https:\/\/www\.youtube\.com\/watch\?v=[\w-]+)"/.exec(html)?.[1] ?? null;
  const live = !!canonical && /"isLiveNow":\s*true/.test(html);
  return live ? { live: true, url: canonical } : { live: false, url: null };
}

/** Checks every YouTube stream with a check URL. Returns true if anything changed. */
export async function refreshStreams(db: Db, fetchHtml: (url: string) => Promise<string>, now: Date = new Date()): Promise<boolean> {
  const rows = await db.select().from(streams).where(and(eq(streams.kind, "youtube"), isNotNull(streams.checkUrl)));
  let changed = false;
  for (const s of rows) {
    try {
      const { live, url } = detectYouTubeLive(await fetchHtml(s.checkUrl!));
      if (live !== s.isLive || url !== s.liveUrl) changed = true;
      await db.update(streams).set({ isLive: live, liveUrl: url, checkedAt: now }).where(eq(streams.id, s.id));
    } catch {
      /* keep the last known state */
    }
  }
  return changed;
}
