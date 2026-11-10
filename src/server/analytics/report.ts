import { sql, type SQL } from "drizzle-orm";
import { lowestFirst, type UsefulRow } from "@/components/useful";
import type { Db } from "@/server/db/client";
import { ensureAnalytics, rowsOf } from "./store";

export type Count = { key: string; n: number; extra?: number };
export type LiveVisitor = { path: string; country: string | null; city: string | null; device: string | null; seconds: number; pageviews: number };
export type Journey = {
  id: string; started: string; seconds: number; pageviews: number; clicks: number; country: string | null; city: string | null;
  device: string | null; browser: string | null; referrer: string | null; isNew: boolean; source: string | null; model: string | null; visit: number | null;
  steps: { ts: string; type: string; path: string | null; label: string | null; target: string | null; ms: number | null; value: number | null }[];
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
  // Arrivals
  sources: Count[];
  referrerUrls: Count[];
  campaignsFull: Count[];
  landingQueries: Count[];
  // Searches typed into the search bar and the search page
  searches: { query: string; n: number; avgResults: number; zero: number }[];
  searchesNoResults: Count[];
  /** "Was this useful?" votes per page, lowest scores first (work plan S1). */
  usefulness: UsefulRow[];
  recentSearches: { ts: string; query: string; results: number; path: string | null }[];
  searchCount: number;
  // Questions asked to the Ask MESH assistant
  questions: { ts: string; question: string; mode: string; found: boolean; path: string | null }[];
  questionsUnanswered: Count[];
  questionCount: number;
  // Audience, in detail
  regions: Count[];
  continents: Count[];
  timezones: Count[];
  places: { key: string; n: number; lat: number; lon: number }[];
  deviceModels: Count[];
  osVersions: Count[];
  browserVersions: Count[];
  screens: Count[];
  connections: Count[];
  themes: Count[];
  installed: Count[];
  phoneLanguages: Count[];
  visitNumbers: Count[];
  tenure: Count[];
  // Speed and errors
  vitals: { metric: string; p75: number; samples: number }[];
  slowPages: { path: string; lcp: number; samples: number }[];
  errors: { message: string; source: string | null; n: number; last: string }[];
  // Long-term history from the daily rollups
  monthly: { month: string; visitors: number; pageviews: number }[];
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
    select id, started_at, extract(epoch from last_seen - started_at) as seconds, pageviews, clicks, country, city, device, browser, referrer, is_new_visitor, source_type, device_model, visit_number
    from analytics_sessions where started_at >= ${since} order by started_at desc limit 40`);
  const ids = sessionsRaw.map((r) => String(r.id));
  const stepsRaw = ids.length
    ? await q<Record<string, unknown>>(sql`
        select session_id, ts, type, path, label, target, duration_ms, value from analytics_events
        where session_id in (${sql.join(ids.map((i) => sql`${i}`), sql`, `)}) and type <> 'vital' order by ts asc limit 2000`)
    : [];
  const journeys: Journey[] = sessionsRaw.map((r) => ({
    id: String(r.id), started: new Date(String(r.started_at)).toISOString(), seconds: num(r.seconds), pageviews: num(r.pageviews), clicks: num(r.clicks),
    country: (r.country as string) ?? null, city: (r.city as string) ?? null, device: (r.device as string) ?? null, browser: (r.browser as string) ?? null,
    referrer: (r.referrer as string) ?? null, isNew: Boolean(r.is_new_visitor), source: (r.source_type as string) ?? null, model: (r.device_model as string) ?? null, visit: r.visit_number == null ? null : num(r.visit_number),
    steps: stepsRaw.filter((s) => s.session_id === r.id).map((s) => ({
      ts: new Date(String(s.ts)).toISOString(), type: String(s.type), path: (s.path as string) ?? null, label: (s.label as string) ?? null, target: (s.target as string) ?? null, ms: s.duration_ms == null ? null : num(s.duration_ms), value: s.value == null ? null : num(s.value),
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

  // Arrivals
  const [sources, referrerUrls, campaignsFull, landingQueries] = await Promise.all([
    by(sql`coalesce(source_type, 'Direct')`, 10),
    count(sql`select regexp_replace(referrer_url, '[?#].*$', '') as key, count(distinct visitor_id) as n from analytics_sessions where started_at >= ${since} and referrer_url is not null group by 1 order by 2 desc limit 20`),
    count(sql`select concat_ws(' / ', utm_source, utm_medium, utm_campaign, utm_term, utm_content, click_id) as key, count(distinct visitor_id) as n from analytics_sessions where started_at >= ${since} and (utm_source is not null or click_id is not null) group by 1 order by 2 desc limit 15`),
    count(sql`select entry_path || '?' || landing_query as key, count(*) as n from analytics_sessions where started_at >= ${since} and landing_query is not null and landing_query <> '' group by 1 order by 2 desc limit 15`),
  ]);

  // Searches
  const searches = (await q<Record<string, unknown>>(sql`
    select lower(label) as query, count(*) as n, coalesce(avg(value), 0) as avg_results, count(*) filter (where value = 0) as zero
    from analytics_events where type = 'search' and ts >= ${since} and label is not null group by 1 order by 2 desc limit 40`)).map((r) => ({
    query: String(r.query), n: num(r.n), avgResults: num(r.avg_results), zero: num(r.zero),
  }));
  const usefulness = lowestFirst((await q<Record<string, unknown>>(sql`
    select path, max(label) as kind, count(*) filter (where value = 1) as yes, count(*) filter (where value = 0) as no
    from analytics_events where type = 'rate' and ts >= ${since} and path is not null group by path`)).map((r) => ({
    path: String(r.path), kind: String(r.kind ?? ""), yes: num(r.yes), no: num(r.no),
  }))).slice(0, 40);
  const searchesNoResults = await count(sql`
    select lower(label) as key, count(*) as n from analytics_events where type = 'search' and ts >= ${since} and value = 0 group by 1 order by 2 desc limit 25`);
  const recentSearches = (await q<Record<string, unknown>>(sql`
    select ts, label, value, path from analytics_events where type = 'search' and ts >= ${since} order by ts desc limit 40`)).map((r) => ({
    ts: new Date(String(r.ts)).toISOString(), query: String(r.label ?? ""), results: num(r.value), path: (r.path as string) ?? null,
  }));
  const [searchTotal] = await q<{ n: unknown }>(sql`select count(*) as n from analytics_events where type = 'search' and ts >= ${since}`);

  const questions = (await q<Record<string, unknown>>(sql`
    select ts, label, target, value, path from analytics_events where type = 'ask' and ts >= ${since} order by ts desc limit 60`)).map((r) => ({
    ts: new Date(String(r.ts)).toISOString(), question: String(r.label ?? ""), mode: String(r.target ?? ""), found: num(r.value) > 0, path: (r.path as string) ?? null,
  }));
  const questionsUnanswered = await count(sql`
    select lower(label) as key, count(*) as n from analytics_events where type = 'ask' and ts >= ${since} and value = 0 group by 1 order by 2 desc limit 25`);
  const [askTotal] = await q<{ n: unknown }>(sql`select count(*) as n from analytics_events where type = 'ask' and ts >= ${since}`);

  // Audience in detail
  const [regions, continents, timezones, deviceModels, osVersions, browserVersions, screens, connections, themes, installed, phoneLanguages, visitNumbers, tenure] = await Promise.all([
    by(sql`coalesce(region, '?') || coalesce(', ' || country, '')`, 20),
    by(sql`continent`, 8),
    by(sql`coalesce(timezone, ip_timezone)`, 15),
    by(sql`device_model`, 20),
    by(sql`os || coalesce(' ' || os_version, '')`, 20),
    by(sql`browser || coalesce(' ' || browser_version, '')`, 20),
    by(sql`case when screen_w is null then null else screen_w || ' x ' || coalesce(screen_h::text, '?') end`, 15),
    by(sql`coalesce(connection, 'Not reported') || case when save_data then ' (data saver)' else '' end`, 8),
    by(sql`color_scheme`, 4),
    by(sql`case when standalone then 'Installed app' when standalone = false then 'Browser' else null end`, 3),
    by(sql`split_part(languages, ',', 1) || case when position(',' in coalesce(languages, '')) > 0 then ' +' else '' end`, 15),
    by(sql`case when visit_number is null then null when visit_number = 1 then '1st visit' when visit_number <= 3 then '2nd or 3rd' when visit_number <= 9 then '4th to 9th' else '10 or more' end`, 5),
    by(sql`case when first_seen is null then null when started_at - first_seen < interval '1 day' then 'First day' when started_at - first_seen < interval '7 days' then 'This week' when started_at - first_seen < interval '30 days' then 'This month' when started_at - first_seen < interval '180 days' then '1 to 6 months' else 'Over 6 months' end`, 5),
  ]);
  const places = (await q<Record<string, unknown>>(sql`
    select coalesce(city, region, country, '?') as key, round(avg(latitude)::numeric, 2) as lat, round(avg(longitude)::numeric, 2) as lon, count(distinct visitor_id) as n
    from analytics_sessions where started_at >= ${since} and latitude is not null group by 1 order by 4 desc limit 25`)).map((r) => ({ key: String(r.key), n: num(r.n), lat: num(r.lat), lon: num(r.lon) }));

  // Speed (75th percentile, the Core Web Vitals convention) and script errors
  const vitals = (await q<Record<string, unknown>>(sql`
    select label as metric, percentile_cont(0.75) within group (order by value) as p75, count(*) as samples
    from analytics_events where type = 'vital' and ts >= ${since} and value is not null group by 1 order by 1`)).map((r) => ({ metric: String(r.metric), p75: num(r.p75), samples: num(r.samples) }));
  const slowPages = (await q<Record<string, unknown>>(sql`
    select path, percentile_cont(0.75) within group (order by value) as lcp, count(*) as samples
    from analytics_events where type = 'vital' and label = 'LCP' and ts >= ${since} group by 1 having count(*) >= 3 order by 2 desc limit 15`)).map((r) => ({ path: String(r.path), lcp: num(r.lcp), samples: num(r.samples) }));
  const errors = (await q<Record<string, unknown>>(sql`
    select label as message, max(target) as source, count(*) as n, max(ts) as last
    from analytics_events where type = 'error' and ts >= ${since} group by 1 order by 3 desc limit 20`)).map((r) => ({
    message: String(r.message ?? ""), source: (r.source as string) ?? null, n: num(r.n), last: new Date(String(r.last)).toISOString(),
  }));

  // Long-term history: every month ever, from the rollups (kept for ever).
  const monthly = (await q<Record<string, unknown>>(sql`
    select to_char(day, 'YYYY-MM') as month, sum(visitors) as visitors, sum(pageviews) as pageviews
    from analytics_daily where dim = 'total' group by 1 order by 1`)).map((r) => ({ month: String(r.month), visitors: num(r.visitors), pageviews: num(r.pageviews) }));

  return {
    sources, referrerUrls, campaignsFull, landingQueries,
    searches, searchesNoResults, usefulness, recentSearches, searchCount: num(searchTotal?.n),
    questions, questionsUnanswered, questionCount: num(askTotal?.n),
    regions, continents, timezones, places, deviceModels, osVersions, browserVersions, screens, connections, themes, installed, phoneLanguages, visitNumbers, tenure,
    vitals, slowPages, errors, monthly,
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
