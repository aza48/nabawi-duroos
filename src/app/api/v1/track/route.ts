import { sql } from "drizzle-orm";
import { z } from "zod";
import { getDb } from "@/server/db/client";
import { classifySource, ensureAnalytics, isBot, parseUa, refHost, uaDetails } from "@/server/analytics/store";
import { allow, clientIp } from "@/server/rate-limit";

export const dynamic = "force-dynamic";

const id = z.string().regex(/^[A-Za-z0-9_-]{8,64}$/);
const str = (n: number) => z.string().max(4000).transform((s) => s.slice(0, n)).optional().nullable();
const int = (max: number) => z.number().int().min(0).max(max).optional().nullable();

const body = z.object({
  t: z.enum(["pv", "hb", "click", "vital", "err", "search", "ask", "rate"]),
  v: id,
  s: id,
  e: id,
  path: z.string().max(2000).regex(/^\/(?!\/)/, "a path on this site").transform((s) => s.slice(0, 300)),
  q: str(500),
  title: str(200),
  ref: str(1000),
  label: str(200),
  target: str(500),
  ms: z.number().int().min(0).max(24 * 3600 * 1000).optional(),
  scroll: z.number().int().min(0).max(100).optional(),
  value: z.number().min(0).max(1e7).optional(),
  w: int(20000),
  // Pageview extras: how the visitor arrived and what they are using.
  utm: str(100),
  medium: str(100),
  campaign: str(100),
  term: str(150),
  content: str(150),
  cid: z.enum(["gclid", "fbclid", "msclkid", "ttclid", "twclid", "li_fat_id", "igshid"]).optional().nullable(),
  lang: str(20),
  langs: str(120),
  tz: str(60),
  sh: int(20000),
  vw: int(20000),
  vh: int(20000),
  dpr: z.number().min(0).max(10).optional().nullable(),
  touch: z.boolean().optional().nullable(),
  net: str(20),
  sd: z.boolean().optional().nullable(),
  scheme: str(10),
  pwa: z.boolean().optional().nullable(),
  mem: z.number().min(0).max(1024).optional().nullable(),
  cpu: int(1024),
  vn: int(1_000_000),
  fs: z.number().int().min(0).optional().nullable(),
  nv: z.boolean().optional(),
});

const empty = () => new Response(null, { status: 204, headers: { "cache-control": "no-store" } });

/** A busy visitor sends a few events a minute; far more from one address is a script, and is dropped quietly. */
export const TRACK_LIMIT = { max: 120, windowMs: 60_000 };

/** The tables are created by the daily cron. If a brand-new database has none yet (or lacks new columns), create them once and retry. */
let healed = false;
async function withTables<T>(db: Awaited<ReturnType<typeof getDb>>, work: () => Promise<T>): Promise<T> {
  try {
    return await work();
  } catch (e) {
    if (healed) throw e;
    healed = true;
    await ensureAnalytics(db);
    return work();
  }
}

const dec = (h: string | null, n = 80) => {
  if (!h) return null;
  try { return decodeURIComponent(h).slice(0, n); } catch { return h.slice(0, n); }
};
const coord = (h: string | null) => {
  const n = h == null ? NaN : Number(h);
  return Number.isFinite(n) ? n : null;
};

export async function POST(req: Request) {
  const ua = req.headers.get("user-agent") ?? "";
  if (isBot(ua)) return empty();
  const ip = clientIp(req);
  if (!allow(`track:${ip}`, TRACK_LIMIT.max, TRACK_LIMIT.windowMs)) return empty();
  let data: z.infer<typeof body>;
  try {
    const raw = await req.text();
    if (raw.length > 12000) return empty();
    data = body.parse(JSON.parse(raw));
  } catch {
    return new Response(null, { status: 400 });
  }
  if (data.path.startsWith("/admin")) return empty();

  try {
    const db = await getDb();
    const now = new Date();
    await withTables(db, async () => {
      if (data.t === "pv") {
        const host = req.headers.get("host") ?? "medinahub.org";
        const { device, browser, os } = parseUa(ua);
        const { browserVersion, osVersion, model } = uaDetails(ua);
        const ref = refHost(data.ref, host);
        const source = classifySource({ ref, utmSource: data.utm, utmMedium: data.medium, clickId: data.cid });
        const h = (n: string) => req.headers.get(n);
        const locale = data.path === "/ar" || data.path.startsWith("/ar/") ? "ar" : "en";
        const firstSeen = data.fs ? new Date(data.fs) : null;
        await db.execute(sql`
          insert into analytics_sessions (id, visitor_id, started_at, last_seen, pageviews, entry_path, exit_path, referrer, utm_source, utm_campaign,
            country, region, city, device, browser, os, lang, screen_w, locale, is_new_visitor,
            referrer_url, source_type, landing_query, utm_medium, utm_term, utm_content, click_id, continent, postal, latitude, longitude, ip_timezone,
            browser_version, os_version, device_model, screen_h, viewport_w, viewport_h, dpr, touch, timezone, languages, connection, save_data, color_scheme,
            standalone, memory_gb, cpu_cores, visit_number, first_seen, ua)
          values (${data.s}, ${data.v}, ${now}, ${now}, 1, ${data.path}, ${data.path}, ${ref}, ${data.utm ?? null}, ${data.campaign ?? null},
            ${h("x-vercel-ip-country")}, ${dec(h("x-vercel-ip-country-region"))}, ${dec(h("x-vercel-ip-city"))}, ${device}, ${browser}, ${os}, ${data.lang ?? null}, ${data.w ?? null}, ${locale}, ${data.nv ?? false},
            ${ref ? (data.ref ?? null) : null}, ${source}, ${data.q ?? null}, ${data.medium ?? null}, ${data.term ?? null}, ${data.content ?? null}, ${data.cid ?? null},
            ${h("x-vercel-ip-continent")}, ${dec(h("x-vercel-ip-postal-code"), 20)}, ${coord(h("x-vercel-ip-latitude"))}, ${coord(h("x-vercel-ip-longitude"))}, ${dec(h("x-vercel-ip-timezone"), 60)},
            ${browserVersion}, ${osVersion}, ${model}, ${data.sh ?? null}, ${data.vw ?? null}, ${data.vh ?? null}, ${data.dpr ?? null}, ${data.touch ?? null}, ${data.tz ?? null}, ${data.langs ?? null},
            ${data.net ?? null}, ${data.sd ?? null}, ${data.scheme ?? null}, ${data.pwa ?? null}, ${data.mem ?? null}, ${data.cpu ?? null}, ${data.vn ?? null},
            ${firstSeen && !Number.isNaN(firstSeen.getTime()) ? firstSeen : null}, ${ua.slice(0, 400)})
          on conflict (id) do update set last_seen = ${now}, pageviews = analytics_sessions.pageviews + 1, exit_path = ${data.path}`);
        await db.execute(sql`
          insert into analytics_events (id, session_id, visitor_id, ts, type, path, title, query)
          values (${data.e}, ${data.s}, ${data.v}, ${now}, 'pageview', ${data.path}, ${data.title ?? null}, ${data.q ?? null})
          on conflict (id) do nothing`);
      } else if (data.t === "hb") {
        await db.execute(sql`update analytics_sessions set last_seen = ${now}, exit_path = ${data.path} where id = ${data.s}`);
        await db.execute(sql`
          update analytics_events set duration_ms = greatest(coalesce(duration_ms, 0), ${data.ms ?? 0}),
            scroll_pct = greatest(coalesce(scroll_pct, 0), ${data.scroll ?? 0})
          where id = ${data.e} and session_id = ${data.s}`);
      } else if (data.t === "click") {
        await db.execute(sql`
          insert into analytics_events (id, session_id, visitor_id, ts, type, path, label, target)
          values (${data.e}, ${data.s}, ${data.v}, ${now}, 'click', ${data.path}, ${data.label ?? null}, ${data.target ?? null})
          on conflict (id) do nothing`);
        await db.execute(sql`update analytics_sessions set last_seen = ${now}, clicks = clicks + 1 where id = ${data.s}`);
      } else {
        // A page-speed measurement (label is the metric: LCP, CLS, INP, FCP, TTFB), a script error (label is the message),
        // a search (label is what was typed, target how it was sent, value the number of results shown),
        // or a "Was this useful?" vote (label is guide or faq, value 1 for yes and 0 for no).
        await db.execute(sql`
          insert into analytics_events (id, session_id, visitor_id, ts, type, path, label, target, value)
          values (${data.e}, ${data.s}, ${data.v}, ${now}, ${data.t === "err" ? "error" : data.t}, ${data.path}, ${data.label ?? null}, ${data.target ?? null}, ${data.value ?? null})
          on conflict (id) do nothing`);
      }
    });
  } catch (e) {
    console.error("track failed", e);
  }
  return empty();
}
