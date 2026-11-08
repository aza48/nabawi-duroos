import { getDb } from "@/server/db/client";
import { buildIcs, datesFeed, lessonFeed, type FeedFilter } from "@/server/calendar";
import { riyadhDateIso } from "@/lib/time/riyadh";
import { notFound } from "@/server/api";

export const dynamic = "force-dynamic";

const ICS_HEADERS = (name: string) => ({
  "Content-Type": "text/calendar; charset=utf-8",
  "Content-Disposition": `inline; filename="${name}"`,
  "Cache-Control": "public, s-maxage=900, stale-while-revalidate=3600",
});

/** /api/v1/calendar/all.ics, dates.ics, shaykh-<slug>.ics, masjid-<id>.ics, lesson-<slug>.ics */
export async function GET(_req: Request, { params }: { params: Promise<{ feed: string }> }) {
  const feed = (await params).feed;
  if (feed === "dates.ics") {
    const { title, events } = datesFeed();
    return new Response(buildIcs(title, events), { headers: ICS_HEADERS(feed) });
  }
  const m = /^(all|shaykh|masjid|lesson)(?:-([a-z0-9-]+))?\.ics$/.exec(feed);
  if (!m || (m[1] !== "all" && !m[2])) return notFound();
  const filter: FeedFilter =
    m[1] === "shaykh" ? { shaykhSlug: m[2] } : m[1] === "masjid" ? { masjidId: m[2] } : m[1] === "lesson" ? { lessonSlug: m[2] } : {};
  const { title, events } = await lessonFeed(await getDb(), filter, riyadhDateIso(), 56);
  if (m[1] !== "all" && !events.length && filter.lessonSlug) return notFound();
  return new Response(buildIcs(title, events), {
    headers: ICS_HEADERS(m[0]),
  });
}
