import path from "node:path";
import type { PgDatabase, PgQueryResultHKT } from "drizzle-orm/pg-core";
import * as schema from "./schema";

export type Db = PgDatabase<PgQueryResultHKT, typeof schema>;

const MIGRATIONS = path.join(process.cwd(), "drizzle");

async function createPglite(): Promise<Db> {
  const { PGlite } = await import("@electric-sql/pglite");
  const { drizzle } = await import("drizzle-orm/pglite");
  const { migrate } = await import("drizzle-orm/pglite/migrator");
  const db = drizzle(new PGlite(), { schema });
  await migrate(db, { migrationsFolder: MIGRATIONS });
  return db as unknown as Db;
}

async function createNeon(url: string): Promise<Db> {
  const { neon } = await import("@neondatabase/serverless");
  const { drizzle } = await import("drizzle-orm/neon-http");
  return drizzle(neon(url), { schema }) as unknown as Db;
}

/**
 * Supabase (or any standard Postgres) through node-postgres. Its pool waits for a free
 * connection instead of pipelining queries onto a busy one, which Supabase's transaction
 * pooler cannot handle (queries hang). Unnamed statements only, so it is pooler-safe.
 */
async function createPostgres(url: string): Promise<Db> {
  const { Pool } = await import("pg");
  const { drizzle } = await import("drizzle-orm/node-postgres");
  const local = ["localhost", "127.0.0.1"].includes(new URL(url).hostname);
  const pool = new Pool({
    connectionString: url,
    max: 5,
    idleTimeoutMillis: 20_000,
    connectionTimeoutMillis: 10_000,
    ssl: local ? false : { rejectUnauthorized: false },
  });
  // node-postgres emits "error" on the pool when the pooler drops an idle client; unhandled, that kills the process.
  pool.on("error", (e) => console.error("pg pool", e.message));
  return drizzle(pool, { schema }) as unknown as Db;
}

export async function connect(url: string): Promise<Db> {
  const { driverFor } = await import("./url");
  return driverFor(url) === "neon" ? createNeon(url) : createPostgres(url);
}

/** Runs the Drizzle migrations against a live database (Supabase via its session pooler, or Neon). */
export async function migrateLive(url: string): Promise<void> {
  const { driverFor, sessionUrl } = await import("./url");
  if (driverFor(url) === "neon") {
    const { migrate } = await import("drizzle-orm/neon-http/migrator");
    await migrate((await createNeon(url)) as never, { migrationsFolder: MIGRATIONS });
    return;
  }
  const { default: postgres } = await import("postgres");
  const { drizzle } = await import("drizzle-orm/postgres-js");
  const { migrate } = await import("drizzle-orm/postgres-js/migrator");
  const client = postgres(sessionUrl(url), { max: 1, ssl: "require", onnotice: () => {} });
  try {
    await migrate(drizzle(client), { migrationsFolder: MIGRATIONS });
  } finally {
    await client.end();
  }
}

const g = globalThis as unknown as { __meshDb?: Promise<Db> };

/**
 * The live database (Supabase, or Neon) when DATABASE_URL is set. Without it, an in-memory PGlite database,
 * migrated and seeded with the verified legacy data: for development, local
 * builds (MESH_LOCAL_DB=1) and tests. Production without a URL fails loudly.
 */
export function getDb(): Promise<Db> {
  if (!g.__meshDb) {
    g.__meshDb = (async () => {
      // Preview deployments get their own seeded copy and never touch the live database.
      const preview = process.env.VERCEL_ENV === "preview";
      const url = preview ? undefined : process.env.DATABASE_URL;
      if (url) return connect(url);
      if (process.env.NODE_ENV === "production" && process.env.MESH_LOCAL_DB !== "1" && !preview) {
        throw new Error("DATABASE_URL is required in production");
      }
      const db = await createPglite();
      if (process.env.NODE_ENV !== "test") {
        const { importLegacy } = await import("@/server/seed/import-legacy");
        await importLegacy(db);
      }
      if (process.env.NODE_ENV === "development") {
        // Local only: a one-time owner invite so the admin app can be tried.
        const { createInvite } = await import("@/server/admin/invites");
        const { url } = await createInvite(db, "system", { email: "dev@mesh.local", role: "owner" }, "http://localhost:3100");
        console.log(`\n[MESH dev] Owner invite: ${url}\n`);
      }
      return db;
    })();
    g.__meshDb.catch(() => {
      g.__meshDb = undefined;
    });
  }
  return g.__meshDb;
}

/** A fresh, migrated, empty in-memory database for tests. */
export async function resetTestDb(): Promise<Db> {
  return createPglite();
}
