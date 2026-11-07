/** Applies migrations, then publishes the latest MESH guides, FAQs and book links to the live database: npm run content:sync */
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
  console.log("Published:", await syncContent2026(db));
  console.log("Duroos with a book link:", await syncBookLinks(db));
  process.exit(0);
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
