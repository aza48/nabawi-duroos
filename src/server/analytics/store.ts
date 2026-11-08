import { sql } from "drizzle-orm";
import type { Db } from "@/server/db/client";

/**
 * First-party visitor analytics. Anonymous: a random id per browser, no IP address, no name.
 * The tables create themselves on first use, so no manual migration step is needed.
 * Row level security is switched on so the tables are never readable through Supabase's public API;
 * the app connects as the table owner and is not affected.
 */
const DDL = [
  sql`create table if not exists analytics_sessions (
    id text primary key,
    visitor_id text not null,
    started_at timestamptz not null default now(),
    last_seen timestamptz not null default now(),
    pageviews integer not null default 0,
    clicks integer not null default 0,
    entry_path text,
    exit_path text,
    referrer text,
    utm_source text,
    utm_campaign text,
    country text,
    region text,
    city text,
    device text,
    browser text,
    os text,
    lang text,
    screen_w integer,
    locale text,
    is_new_visitor boolean not null default false
  )`,
  sql`create index if not exists analytics_sessions_last_seen_idx on analytics_sessions (last_seen)`,
  sql`create index if not exists analytics_sessions_started_idx on analytics_sessions (started_at)`,
  sql`create table if not exists analytics_events (
    id text primary key,
    session_id text not null,
    visitor_id text not null,
    ts timestamptz not null default now(),
    type text not null,
    path text,
    title text,
    label text,
    target text,
    duration_ms integer,
    scroll_pct integer
  )`,
  sql`create index if not exists analytics_events_ts_idx on analytics_events (ts)`,
  sql`create index if not exists analytics_events_session_idx on analytics_events (session_id)`,
  sql`alter table analytics_sessions enable row level security`,
  sql`alter table analytics_events enable row level security`,
  // Added 9 November 2026: how people arrive, what they use, and how fast the site is for them.
  sql`alter table analytics_sessions
    add column if not exists referrer_url text,
    add column if not exists source_type text,
    add column if not exists landing_query text,
    add column if not exists utm_medium text,
    add column if not exists utm_term text,
    add column if not exists utm_content text,
    add column if not exists click_id text,
    add column if not exists continent text,
    add column if not exists postal text,
    add column if not exists latitude real,
    add column if not exists longitude real,
    add column if not exists ip_timezone text,
    add column if not exists browser_version text,
    add column if not exists os_version text,
    add column if not exists device_model text,
    add column if not exists screen_h integer,
    add column if not exists viewport_w integer,
    add column if not exists viewport_h integer,
    add column if not exists dpr real,
    add column if not exists touch boolean,
    add column if not exists timezone text,
    add column if not exists languages text,
    add column if not exists connection text,
    add column if not exists save_data boolean,
    add column if not exists color_scheme text,
    add column if not exists standalone boolean,
    add column if not exists memory_gb real,
    add column if not exists cpu_cores integer,
    add column if not exists visit_number integer,
    add column if not exists first_seen timestamptz,
    add column if not exists ua text`,
  sql`alter table analytics_events
    add column if not exists query text,
    add column if not exists value real,
    add column if not exists extra text`,
  sql`create index if not exists analytics_events_type_ts_idx on analytics_events (type, ts)`,
  sql`create index if not exists analytics_sessions_visitor_idx on analytics_sessions (visitor_id)`,
  // One row per day, dimension and value, kept for ever: the long-term history after raw visits are purged.
  sql`create table if not exists analytics_daily (
    day date not null,
    dim text not null,
    key text not null,
    visitors integer not null default 0,
    sessions integer not null default 0,
    pageviews integer not null default 0,
    primary key (day, dim, key)
  )`,
  sql`alter table analytics_daily enable row level security`,
];

let ready: Promise<void> | null = null;

/** How long raw visits and events are kept. The daily rollups in analytics_daily are kept for ever. */
export const RETENTION_DAYS = 365;

/** Dimensions summarised per day into analytics_daily (SQL over analytics_sessions, aliased s). */
export const ROLLUP_DIMS: Record<string, string> = {
  total: "'all'",
  source: "coalesce(s.source_type, 'Direct')",
  referrer: "coalesce(s.referrer, 'Direct')",
  campaign: "coalesce(s.utm_source, '(none)') || coalesce(' / ' || s.utm_medium, '') || coalesce(' / ' || s.utm_campaign, '')",
  entry: "coalesce(s.entry_path, '?')",
  country: "coalesce(s.country, '?')",
  city: "coalesce(s.city, '?') || coalesce(', ' || s.country, '')",
  device: "coalesce(s.device, '?')",
  browser: "coalesce(s.browser, '?')",
  os: "coalesce(s.os, '?')",
  language: "coalesce(split_part(s.lang, '-', 1), '?')",
  locale: "coalesce(s.locale, '?')",
};

const riyadhDay = (col: string) => sql.raw(`(${col} at time zone 'Asia/Riyadh')::date`);

/**
 * Summarises every finished day (Madinah time) that has raw data and no rollup yet, and yesterday again
 * (late heartbeats). Pages are rolled up from events. Safe to run repeatedly.
 */
export async function rollupAnalytics(db: Db): Promise<number> {
  await ensureAnalytics(db);
  const today = sql.raw(`(now() at time zone 'Asia/Riyadh')::date`);
  const days = rowsOf<{ day: string }>(await db.execute(sql`
    select distinct to_char(${riyadhDay("started_at")}, 'YYYY-MM-DD') as day
    from analytics_sessions
    where ${riyadhDay("started_at")} < ${today}
      and (${riyadhDay("started_at")} >= ${today} - 1
        or ${riyadhDay("started_at")} not in (select day from analytics_daily where dim = 'total'))
    order by 1`)).map((r) => String(r.day));
  for (const day of days) {
    await db.execute(sql`delete from analytics_daily where day = ${day}::date`);
    for (const [dim, expr] of Object.entries(ROLLUP_DIMS)) {
      await db.execute(sql`
        insert into analytics_daily (day, dim, key, visitors, sessions, pageviews)
        select ${day}::date, ${dim}, left(${sql.raw(expr)}, 300), count(distinct s.visitor_id), count(*), coalesce(sum(s.pageviews), 0)
        from analytics_sessions s
        where ${riyadhDay("s.started_at")} = ${day}::date
        group by 3`);
    }
    await db.execute(sql`
      insert into analytics_daily (day, dim, key, visitors, sessions, pageviews)
      select ${day}::date, 'page', left(e.path, 300), count(distinct e.visitor_id), count(distinct e.session_id), count(*)
      from analytics_events e
      where e.type = 'pageview' and ${riyadhDay("e.ts")} = ${day}::date and e.path is not null
      group by 3`);
  }
  return days.length;
}

/** Deletes raw visits older than the retention period, after rolling them up. Run from the daily cron, never inside a visitor's request. */
export async function purgeAnalytics(db: Db): Promise<void> {
  await ensureAnalytics(db);
  await rollupAnalytics(db);
  await db.execute(sql`delete from analytics_events where ts < now() - make_interval(days => ${RETENTION_DAYS})`);
  await db.execute(sql`delete from analytics_sessions where last_seen < now() - make_interval(days => ${RETENTION_DAYS})`);
}

/**
 * Creates the tables if they are missing. Called from the daily cron and the admin report,
 * not from the track endpoint: a visitor's request should never take a table lock.
 */
export function ensureAnalytics(db: Db): Promise<void> {
  ready ??= (async () => {
    for (const stmt of DDL) await db.execute(stmt);
  })().catch((e) => {
    ready = null;
    throw e;
  });
  return ready;
}

/** Rows from db.execute, whichever driver is in use. */
export function rowsOf<T>(res: unknown): T[] {
  if (Array.isArray(res)) return res as T[];
  return ((res as { rows?: T[] })?.rows ?? []) as T[];
}

const BOT = /bot|crawl|spider|slurp|preview|headless|lighthouse|pingdom|uptime|monitor|curl|wget|python|axios|node-fetch|go-http|facebookexternalhit|whatsapp|telegram/i;
export const isBot = (ua: string) => !ua || BOT.test(ua);

const SEARCH = new Set(["Google", "Bing", "DuckDuckGo", "Yahoo", "Yandex", "Ecosia", "Baidu", "Brave Search"]);
const MESSAGING = new Set(["WhatsApp", "Telegram", "Messenger", "Gmail", "Outlook"]);
const SOCIAL = new Set(["Instagram", "Facebook", "X (Twitter)", "YouTube", "TikTok", "Reddit", "LinkedIn", "Snapchat", "Pinterest", "Threads"]);
const AI = new Set(["ChatGPT", "Perplexity", "Gemini", "Copilot", "Claude", "DeepSeek"]);

/** Which kind of place a visit came from. */
export function classifySource(input: { ref: string | null; utmSource?: string | null; utmMedium?: string | null; clickId?: string | null }): string {
  const medium = (input.utmMedium ?? "").toLowerCase();
  if (/cpc|ppc|paid|^ads?$/.test(medium) || input.clickId === "gclid" || input.clickId === "msclkid") return "Paid ads";
  if (input.utmSource) {
    if (/whatsapp|telegram/i.test(input.utmSource)) return "Messaging";
    if (/email|newsletter/i.test(`${input.utmSource} ${medium}`)) return "Email";
    return "Campaign link";
  }
  const r = input.ref;
  if (!r) return input.clickId ? "Social" : "Direct";
  if (SEARCH.has(r)) return "Search engines";
  if (MESSAGING.has(r)) return "Messaging";
  if (SOCIAL.has(r)) return "Social";
  if (AI.has(r)) return "AI assistants";
  return "Other sites";
}

/** Browser and system versions and, on Android, the phone model the browser reports. */
export function uaDetails(ua: string): { browserVersion: string | null; osVersion: string | null; model: string | null } {
  const pick = (re: RegExp) => re.exec(ua)?.[1] ?? null;
  const browserVersion =
    pick(/Edg\/(\d+)/) ?? pick(/OPR\/(\d+)/) ?? pick(/SamsungBrowser\/(\d+)/) ?? pick(/(?:Firefox|FxiOS)\/(\d+)/) ?? pick(/(?:CriOS|Chrome)\/(\d+)/) ?? pick(/Version\/(\d+(?:\.\d+)?).*Safari/);
  const ios = pick(/(?:iPhone|CPU) OS (\d+(?:_\d+)?)/);
  const mac = pick(/Mac OS X (\d+[._]\d+)/);
  const osVersion = ios ? ios.replace("_", ".") : pick(/Android (\d+(?:\.\d+)?)/) ?? pick(/Windows NT (\d+\.\d+)/) ?? (mac ? mac.replace("_", ".") : null);
  let model: string | null = null;
  const android = /Android [^;)]*;\s*([^;)]+?)(?:\s+Build\/[^;)]*)?\)/.exec(ua);
  if (android && !/^(K|wv|Mobile|Linux|U)$/.test(android[1].trim())) model = android[1].trim().slice(0, 60);
  else if (/iPhone/.test(ua)) model = "iPhone";
  else if (/iPad/.test(ua)) model = "iPad";
  return { browserVersion, osVersion, model };
}

export function parseUa(ua: string): { device: string; browser: string; os: string } {
  const device = /ipad|tablet|playbook|silk|(android(?!.*mobile))/i.test(ua) ? "Tablet" : /mobi|iphone|ipod|android/i.test(ua) ? "Phone" : "Desktop";
  const browser = /edg\//i.test(ua) ? "Edge"
    : /opr\/|opera/i.test(ua) ? "Opera"
    : /samsungbrowser/i.test(ua) ? "Samsung Internet"
    : /fxios|firefox/i.test(ua) ? "Firefox"
    : /crios|chrome/i.test(ua) ? "Chrome"
    : /safari/i.test(ua) ? "Safari"
    : "Other";
  const os = /iphone|ipad|ipod/i.test(ua) ? "iOS"
    : /android/i.test(ua) ? "Android"
    : /windows/i.test(ua) ? "Windows"
    : /mac os x|macintosh/i.test(ua) ? "macOS"
    : /cros/i.test(ua) ? "ChromeOS"
    : /linux/i.test(ua) ? "Linux"
    : "Other";
  return { device, browser, os };
}

export function refHost(ref: string | null | undefined, ownHost: string): string | null {
  if (!ref) return null;
  try {
    const h = new URL(ref).hostname.replace(/^www\./, "");
    if (!h || h === ownHost.replace(/^www\./, "")) return null;
    if (/^mail\.google\./.test(h)) return "Gmail";
    if (/^gemini\.google\./.test(h)) return "Gemini";
    if (/(^|\.)google\./.test(h)) return "Google";
    if (/(^|\.)bing\.com$/.test(h)) return "Bing";
    if (/(^|\.)duckduckgo\.com$/.test(h)) return "DuckDuckGo";
    if (/whatsapp|wa\.me/.test(h)) return "WhatsApp";
    if (/(^|\.)t\.me$|telegram/.test(h)) return "Telegram";
    if (/instagram/.test(h)) return "Instagram";
    if (/facebook|fb\.com/.test(h)) return "Facebook";
    if (/(^|\.)(x|twitter|t)\.co(m)?$/.test(h)) return "X (Twitter)";
    if (/youtube/.test(h)) return "YouTube";
    if (/chatgpt|openai/.test(h)) return "ChatGPT";
    if (/perplexity/.test(h)) return "Perplexity";
    if (/copilot\.microsoft/.test(h)) return "Copilot";
    if (/(^|\.)claude\.ai$/.test(h)) return "Claude";
    if (/deepseek/.test(h)) return "DeepSeek";
    if (/(^|\.)yahoo\./.test(h)) return "Yahoo";
    if (/(^|\.)yandex\./.test(h)) return "Yandex";
    if (/(^|\.)ecosia\.org$/.test(h)) return "Ecosia";
    if (/(^|\.)baidu\.com$/.test(h)) return "Baidu";
    if (/search\.brave\.com$/.test(h)) return "Brave Search";
    if (/tiktok/.test(h)) return "TikTok";
    if (/reddit/.test(h)) return "Reddit";
    if (/linkedin|lnkd\.in/.test(h)) return "LinkedIn";
    if (/snapchat/.test(h)) return "Snapchat";
    if (/pinterest/.test(h)) return "Pinterest";
    if (/threads\.net/.test(h)) return "Threads";
    if (/messenger\.com|(^|\.)m\.me$/.test(h)) return "Messenger";
    if (/outlook\.|(^|\.)live\.com$/.test(h)) return "Outlook";
    return h;
  } catch {
    return null;
  }
}
