/**
 * Applies migrations, then publishes the latest MESH guides, FAQs, book links and watched channels to the live database: npm run content:sync
 * To publish only some guides or FAQs (leaving every other live row as it is): npm run content:sync -- --only=slug-one,slug-two
 */
import { readFileSync } from "node:fs";

try {
  for (const line of readFileSync(".env.production.local", "utf8").split("\n")) {
    const m = /^([A-Z_]+)=(.*)$/.exec(line.trim());
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^"|"$/g, "");
  }
} catch {}

async function main() {
  if (!process.env.DATABASE_URL) throw new Error("Put the live DATABASE_URL in .env.production.local first.");
  (process.env as Record<string, string>).NODE_ENV = "production";
  const { getDb, migrateLive } = await import("@/server/db/client");
  // Schema first, so new columns exist before any new code or data uses them.
  await migrateLive(process.env.DATABASE_URL as string);
  console.log("Migrations applied");
  const { syncContent2026 } = await import("@/server/seed/content/sync");
  const { syncBookLinks } = await import("@/server/seed/content/book-links");
  const db = await getDb();
  const only = process.argv.find((a) => a.startsWith("--only="))?.slice(7).split(",").filter(Boolean);
  if (only?.length) {
    console.log("Published only", only.join(", "), await syncContent2026(db, new Date(), { only }));
    process.exit(0);
  }
  console.log("Published:", await syncContent2026(db));
  console.log("Duroos with a book link:", await syncBookLinks(db));
  const { syncAlMidad } = await import("@/server/seed/content/al-midad");
  console.log("Al-Midad duroos:", await syncAlMidad(db));
  const { seedSources } = await import("@/server/watcher/sources");
  await seedSources(db);
  console.log("Watched channels refreshed");
  process.exit(0);
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
