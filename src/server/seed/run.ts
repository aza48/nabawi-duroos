/**
 * Imports the verified legacy schedule into the database named by
 * DATABASE_URL (Neon). Safe to re-run: every row is upserted.
 *   DATABASE_URL=... npm run seed
 */
import { importLegacy } from "./import-legacy";

async function main() {
  if (!process.env.DATABASE_URL) {
    console.error("Set DATABASE_URL to the target database first.");
    process.exit(1);
  }
  const { getDb } = await import("@/server/db/client");
  const db = await getDb();
  const { migrate } = await import("drizzle-orm/neon-http/migrator");
  await migrate(db as never, { migrationsFolder: "drizzle" });
  console.log(await importLegacy(db));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
