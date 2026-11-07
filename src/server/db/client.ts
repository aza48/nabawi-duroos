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

const g = globalThis as unknown as { __meshDb?: Promise<Db> };

/**
 * Neon when DATABASE_URL is set. Without it, an in-memory PGlite database,
 * migrated and seeded with the verified legacy data: for development, local
 * builds (MESH_LOCAL_DB=1) and tests. Production without a URL fails loudly.
 */
export function getDb(): Promise<Db> {
  if (!g.__meshDb) {
    g.__meshDb = (async () => {
      const url = process.env.DATABASE_URL;
      if (url) return createNeon(url);
      if (process.env.NODE_ENV === "production" && process.env.MESH_LOCAL_DB !== "1") {
        throw new Error("DATABASE_URL is required in production");
      }
      const db = await createPglite();
      if (process.env.NODE_ENV !== "test") {
        const { importLegacy } = await import("@/server/seed/import-legacy");
        await importLegacy(db);
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
