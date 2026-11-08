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
];

let ready: Promise<void> | null = null;

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
    return h;
  } catch {
    return null;
  }
}
