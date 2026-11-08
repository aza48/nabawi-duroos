/**
 * Imports the verified legacy schedule into the database named by
 * DATABASE_URL. Re-running adds missing rows only: rows that exist are left as the admins have them.
 *   DATABASE_URL=... npm run seed            (local databases)
 *   DATABASE_URL=... npm run seed -- --force (anything else: a hosted database)
 */
import { importLegacy } from "./import-legacy";

async function main() {
  if (!process.env.DATABASE_URL) {
    console.error("Set DATABASE_URL to the target database first.");
    process.exit(1);
  }
  const url = process.env.DATABASE_URL as string;
  if (!/localhost|127\.0\.0\.1|\[::1\]/.test(url) && !process.argv.includes("--force")) {
    console.error("DATABASE_URL is not a local database. Re-run with --force if you really mean the live one.");
    process.exit(1);
  }
  const { getDb, migrateLive } = await import("@/server/db/client");
  await migrateLive(process.env.DATABASE_URL as string);
  const db = await getDb();
  console.log(await importLegacy(db));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
