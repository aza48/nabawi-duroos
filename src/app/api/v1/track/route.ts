import { sql } from "drizzle-orm";
import { z } from "zod";
import { getDb } from "@/server/db/client";
import { ensureAnalytics, isBot, parseUa, refHost } from "@/server/analytics/store";

export const dynamic = "force-dynamic";

const id = z.string().regex(/^[A-Za-z0-9_-]{8,64}$/);
const str = (n: number) => z.string().max(2000).transform((s) => s.slice(0, n)).optional().nullable();

const body = z.object({
  t: z.enum(["pv", "hb", "click"]),
  v: id,
  s: id,
  e: id,
  path: z.string().max(2000).transform((s) => s.slice(0, 300)),
  title: str(200),
  ref: str(500),
  label: str(140),
  target: str(300),
  ms: z.number().int().min(0).max(24 * 3600 * 1000).optional(),
  scroll: z.number().int().min(0).max(100).optional(),
  w: z.number().int().min(0).max(20000).optional(),
  lang: str(20),
  utm: str(100),
  campaign: str(100),
  nv: z.boolean().optional(),
});

const empty = () => new Response(null, { status: 204, headers: { "cache-control": "no-store" } });

export async function POST(req: Request) {
  const ua = req.headers.get("user-agent") ?? "";
  if (isBot(ua)) return empty();
  let data: z.infer<typeof body>;
  try {
    const raw = await req.text();
    if (raw.length > 8000) return empty();
    data = body.parse(JSON.parse(raw));
  } catch {
    return new Response(null, { status: 400 });
  }
  if (data.path.startsWith("/admin")) return empty();

  try {
    const db = await getDb();
    await ensureAnalytics(db);
    const now = new Date();

    if (data.t === "pv") {
      const host = req.headers.get("host") ?? "medinahub.org";
      const { device, browser, os } = parseUa(ua);
      const dec = (h: string | null) => {
        if (!h) return null;
        try { return decodeURIComponent(h).slice(0, 80); } catch { return h.slice(0, 80); }
      };
      const country = req.headers.get("x-vercel-ip-country");
      const region = dec(req.headers.get("x-vercel-ip-country-region"));
      const city = dec(req.headers.get("x-vercel-ip-city"));
      const locale = data.path === "/ar" || data.path.startsWith("/ar/") ? "ar" : "en";
      await db.execute(sql`
        insert into analytics_sessions (id, visitor_id, started_at, last_seen, pageviews, entry_path, exit_path, referrer, utm_source, utm_campaign, country, region, city, device, browser, os, lang, screen_w, locale, is_new_visitor)
        values (${data.s}, ${data.v}, ${now}, ${now}, 1, ${data.path}, ${data.path}, ${refHost(data.ref, host)}, ${data.utm ?? null}, ${data.campaign ?? null}, ${country}, ${region}, ${city}, ${device}, ${browser}, ${os}, ${data.lang ?? null}, ${data.w ?? null}, ${locale}, ${data.nv ?? false})
        on conflict (id) do update set last_seen = ${now}, pageviews = analytics_sessions.pageviews + 1, exit_path = ${data.path}`);
      await db.execute(sql`
        insert into analytics_events (id, session_id, visitor_id, ts, type, path, title)
        values (${data.e}, ${data.s}, ${data.v}, ${now}, 'pageview', ${data.path}, ${data.title ?? null})
        on conflict (id) do nothing`);
      // Keep about six months of history.
      if (Math.random() < 0.005) {
        await db.execute(sql`delete from analytics_events where ts < now() - interval '180 days'`);
        await db.execute(sql`delete from analytics_sessions where last_seen < now() - interval '180 days'`);
      }
    } else if (data.t === "hb") {
      await db.execute(sql`update analytics_sessions set last_seen = ${now}, exit_path = ${data.path} where id = ${data.s}`);
      await db.execute(sql`
        update analytics_events set duration_ms = greatest(coalesce(duration_ms, 0), ${data.ms ?? 0}),
          scroll_pct = greatest(coalesce(scroll_pct, 0), ${data.scroll ?? 0})
        where id = ${data.e} and session_id = ${data.s}`);
    } else {
      await db.execute(sql`
        insert into analytics_events (id, session_id, visitor_id, ts, type, path, label, target)
        values (${data.e}, ${data.s}, ${data.v}, ${now}, 'click', ${data.path}, ${data.label ?? null}, ${data.target ?? null})
        on conflict (id) do nothing`);
      await db.execute(sql`update analytics_sessions set last_seen = ${now}, clicks = clicks + 1 where id = ${data.s}`);
    }
  } catch (e) {
    console.error("track failed", e);
  }
  return empty();
}
