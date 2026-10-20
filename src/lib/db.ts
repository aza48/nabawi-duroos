import { neon } from "@neondatabase/serverless";

/**
 * Neon Postgres access. Everything is lazy and degrades gracefully:
 * when DATABASE_URL is absent, dbConfigured() is false and callers must
 * short-circuit (the public site keeps running with static data only).
 */

export function dbConfigured(): boolean {
  return !!process.env.DATABASE_URL;
}

type SqlClient = ReturnType<typeof neon>;
let _sql: SqlClient | null = null;

export function getSql(): SqlClient {
  if (!_sql) {
    const url = process.env.DATABASE_URL;
    if (!url) throw new Error("DATABASE_URL is not set");
    _sql = neon(url);
  }
  return _sql;
}

export async function query<T = Record<string, unknown>>(
  text: string,
  params: unknown[] = []
): Promise<T[]> {
  const sql = getSql();
  const rows = (await sql.query(text, params as unknown[])) as T[];
  return rows;
}

export async function queryOne<T = Record<string, unknown>>(
  text: string,
  params: unknown[] = []
): Promise<T | null> {
  const rows = await query<T>(text, params);
  return rows.length > 0 ? rows[0] : null;
}

let _init: Promise<void> | null = null;

/** Create tables if missing. Memoized; resets on failure so a later request can retry. */
export function initDb(): Promise<void> {
  if (!_init) {
    _init = doInit().catch((e) => {
      _init = null;
      throw e;
    });
  }
  return _init;
}

async function doInit(): Promise<void> {
  await query(`
    CREATE TABLE IF NOT EXISTS subscribers (
      id serial PRIMARY KEY,
      email text UNIQUE NOT NULL,
      status text NOT NULL DEFAULT 'pending',
      confirm_token text,
      manage_token text,
      created_at timestamptz NOT NULL DEFAULT now(),
      confirmed_at timestamptz
    )`);
  await query(`
    CREATE TABLE IF NOT EXISTS subscriptions (
      id serial PRIMARY KEY,
      subscriber_id int NOT NULL REFERENCES subscribers(id) ON DELETE CASCADE,
      scope_type text NOT NULL,
      scope_id text NOT NULL,
      created_at timestamptz NOT NULL DEFAULT now(),
      UNIQUE (subscriber_id, scope_type, scope_id)
    )`);
  await query(`
    CREATE TABLE IF NOT EXISTS announcements (
      id serial PRIMARY KEY,
      shaykh_id text NOT NULL,
      book_id text,
      type text NOT NULL,
      title_ar text NOT NULL,
      title_en text NOT NULL,
      body_ar text NOT NULL,
      body_en text NOT NULL,
      lesson_date date,
      status text NOT NULL DEFAULT 'draft',
      created_at timestamptz NOT NULL DEFAULT now(),
      published_at timestamptz,
      sent_at timestamptz
    )`);
  await query(`
    CREATE TABLE IF NOT EXISTS email_log (
      id serial PRIMARY KEY,
      announcement_id int REFERENCES announcements(id) ON DELETE SET NULL,
      subscriber_id int REFERENCES subscribers(id) ON DELETE SET NULL,
      kind text NOT NULL,
      sent_at timestamptz NOT NULL DEFAULT now()
    )`);
  await query(
    `CREATE INDEX IF NOT EXISTS idx_subscriptions_subscriber ON subscriptions(subscriber_id)`
  );
  await query(
    `CREATE INDEX IF NOT EXISTS idx_announcements_status ON announcements(status, published_at DESC)`
  );
}

/* ---------------- row types ----------------
   Defined in lib/types (shared with client code) and re-exported here. */

export type {
  AnnouncementRow,
  AnnouncementTypeDb,
  SubscriberRow,
  SubscriptionRow,
} from "./types";
export { ANNOUNCEMENT_TYPES } from "./types";
