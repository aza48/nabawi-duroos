import { sql, type SQL } from "drizzle-orm";
import type { Db } from "@/server/db/client";
import { ensureAnalytics, rowsOf } from "./store";

export type Count = { key: string; n: number; extra?: number };
export type LiveVisitor = { path: string; country: string | null; city: string | null; device: string | null; seconds: number; pageviews: number };
export type Journey = {
  id: string; started: string; seconds: number; pageviews: number; clicks: number; country: string | null; city: string | null;
  device: string | null; browser: string | null; referrer: string | null; isNew: boolean;
  steps: { ts: string; type: string; path: string | null; label: string | null; target: string | null; ms: number | null }[];
};

export type Report = {
  days: number;
  liveNow: number;
  live: LiveVisitor[];
  visitors: number;
  newVisitors: number;
  sessions: number;
  pageviews: number;
  clicks: number;
  avgSessionSec: number;
  avgPageSec: number;
  bounceRate: number;
  pagesPerSession: number;
  peakDay: { day: string; visitors: number } | null;
  daily: { day: string; visitors: number; pageviews: number }[];
  hours: { hour: number; n: number }[];
  pages: { path: string; views: number; visitors: number; avgSec: number; scroll: number }[];
  entries: Count[];
  exits: Count[];
  clicksTop: { label: string; target: string; n: number }[];
  outbound: Count[];
  referrers: Count[];
  campaigns: Count[];
  countries: Count[];
  cities: Count[];
  devices: Count[];
  browsers: Count[];
  oses: Count[];
  languages: Count[];
  locales: Count[];
  journeys: Journey[];
};

const num = (v: unknown) => Number(v ?? 0) || 0;

export async function analyticsReport(db: Db, days: number): Promise<Report> {
  await ensureAnalytics(db);
  const since = sql`now() - make_interval(days => ${days})`;
  const q = async <T>(s: SQL) => rowsOf<T>(await db.execute(s));
  const count = async (s: SQL) => (await q<{ key: string | null; n: unknown; extra?: unknown }>(s)).map((r) => ({ key: r.key ?? "(none)", n: num(r.n), extra: r.extra == null ? undefined : num(r.extra) }));
  const by = (col: SQL, limit = 12) => count(sql`select ${col} as key, count(distinct visitor_id) as n from analytics_sessions where started_at >= ${since} group by 1 order by 2 desc limit ${limit}`);

  const [totals] = await q<Record<string, unknown>>(sql`
    select count(distinct visitor_id) as visitors,
      count(distinct visitor_id) filter (where is_new_visitor) as new_visitors,
      count(*) as sessions,
      coalesce(sum(pageviews), 0) as pageviews,
      coalesce(sum(clicks), 0) as clicks,
      coalesce(avg(extract(epoch from last_seen - started_at)), 0) as avg_session,
      coalesce(avg(case when pageviews <= 1 then 1 else 0 end), 0) as bounce,
      coalesce(avg(pageviews), 0) as pps
    from analytics_sessions where started_at >= ${since}`);
  const [pageAvg] = await q<{ avg: unknown }>(sql`select coalesce(avg(duration_ms) / 1000, 0) as avg from analytics_events where type = 'pageview' and ts >= ${since} and duration_ms > 0`);

  const live = (await q<Record<string, unknown>>(sql`
    select exit_path as path, country, city, device, extract(epoch from last_seen - started_at) as seconds, pageviews
    from analytics_sessions where last_seen >= now() - interval '90 seconds' order by last_seen desc limit 50`)).map((r) => ({
    path: String(r.path ?? "/"), country: (r.country as string) ?? null, city: (r.city as string) ?? null, device: (r.device as string) ?? null, seconds: num(r.seconds), pageviews: num(r.pageviews),
  }));

  const daily = (await q<Record<string, unknown>>(sql`
    select to_char((ts at time zone 'Asia/Riyadh')::date, 'YYYY-MM-DD') as day, count(distinct visitor_id) as visitors, count(*) as pageviews
    from analytics_events where type = 'pageview' and ts >= ${since} group by 1 order by 1`)).map((r) => ({ day: String(r.day), visitors: num(r.visitors), pageviews: num(r.pageviews) }));
  const peak = daily.reduce<{ day: string; visitors: number } | null>((m, d) => (!m || d.visitors > m.visitors ? { day: d.day, visitors: d.visitors } : m), null);

  const hoursRaw = await q<Record<string, unknown>>(sql`
    select extract(hour from ts at time zone 'Asia/Riyadh')::int as hour, count(*) as n
    from analytics_events where type = 'pageview' and ts >= ${since} group by 1`);
  const hours = Array.from({ length: 24 }, (_, h) => ({ hour: h, n: num(hoursRaw.find((r) => num(r.hour) === h)?.n) }));

  const pages = (await q<Record<string, unknown>>(sql`
    select path, count(*) as views, count(distinct visitor_id) as visitors,
      coalesce(avg(duration_ms) filter (where duration_ms > 0) / 1000, 0) as avg_sec,
      coalesce(avg(scroll_pct) filter (where scroll_pct is not null), 0) as scroll
    from analytics_events where type = 'pageview' and ts >= ${since} group by path order by views desc limit 40`)).map((r) => ({
    path: String(r.path), views: num(r.views), visitors: num(r.visitors), avgSec: num(r.avg_sec), scroll: num(r.scroll),
  }));

  const clicksTop = (await q<Record<string, unknown>>(sql`
    select label, target, count(*) as n from analytics_events where type = 'click' and ts >= ${since}
    group by label, target order by n desc limit 40`)).map((r) => ({ label: String(r.label ?? ""), target: String(r.target ?? ""), n: num(r.n) }));

  const outbound = await count(sql`
    select regexp_replace(target, '^https?://(www\\.)?([^/]+).*$', '\\2') as key, count(*) as n
    from analytics_events where type = 'click' and ts >= ${since} and target ~ '^https?://' group by 1 order by 2 desc limit 15`);

  const sessionsRaw = await q<Record<string, unknown>>(sql`
    select id, started_at, extract(epoch from last_seen - started_at) as seconds, pageviews, clicks, country, city, device, browser, referrer, is_new_visitor
    from analytics_sessions where started_at >= ${since} order by started_at desc limit 40`);
  const ids = sessionsRaw.map((r) => String(r.id));
  const stepsRaw = ids.length
    ? await q<Record<string, unknown>>(sql`
        select session_id, ts, type, path, label, target, duration_ms from analytics_events
        where session_id in (${sql.join(ids.map((i) => sql`${i}`), sql`, `)}) order by ts asc limit 2000`)
    : [];
  const journeys: Journey[] = sessionsRaw.map((r) => ({
    id: String(r.id), started: new Date(String(r.started_at)).toISOString(), seconds: num(r.seconds), pageviews: num(r.pageviews), clicks: num(r.clicks),
    country: (r.country as string) ?? null, city: (r.city as string) ?? null, device: (r.device as string) ?? null, browser: (r.browser as string) ?? null,
    referrer: (r.referrer as string) ?? null, isNew: Boolean(r.is_new_visitor),
    steps: stepsRaw.filter((s) => s.session_id === r.id).map((s) => ({
      ts: new Date(String(s.ts)).toISOString(), type: String(s.type), path: (s.path as string) ?? null, label: (s.label as string) ?? null, target: (s.target as string) ?? null, ms: s.duration_ms == null ? null : num(s.duration_ms),
    })),
  }));

  const [entries, exits, referrers, campaigns, countries, cities, devices, browsers, oses, languages, locales] = await Promise.all([
    count(sql`select entry_path as key, count(*) as n from analytics_sessions where started_at >= ${since} group by 1 order by 2 desc limit 12`),
    count(sql`select exit_path as key, count(*) as n from analytics_sessions where started_at >= ${since} group by 1 order by 2 desc limit 12`),
    by(sql`coalesce(referrer, 'Direct / typed / app')`, 15),
    count(sql`select utm_source || coalesce(' / ' || utm_campaign, '') as key, count(distinct visitor_id) as n from analytics_sessions where started_at >= ${since} and utm_source is not null group by 1 order by 2 desc limit 12`),
    by(sql`country`, 20),
    by(sql`coalesce(city, '?') || coalesce(', ' || country, '')`, 20),
    by(sql`device`),
    by(sql`browser`),
    by(sql`os`),
    by(sql`split_part(lang, '-', 1)`),
    by(sql`locale`),
  ]);

  return {
    days,
    liveNow: live.length,
    live,
    visitors: num(totals?.visitors),
    newVisitors: num(totals?.new_visitors),
    sessions: num(totals?.sessions),
    pageviews: num(totals?.pageviews),
    clicks: num(totals?.clicks),
    avgSessionSec: num(totals?.avg_session),
    avgPageSec: num(pageAvg?.avg),
    bounceRate: num(totals?.bounce),
    pagesPerSession: num(totals?.pps),
    peakDay: peak,
    daily,
    hours,
    pages,
    entries,
    exits,
    clicksTop,
    outbound,
    referrers,
    campaigns,
    countries,
    cities,
    devices,
    browsers,
    oses,
    languages,
    locales,
    journeys,
  };
}
