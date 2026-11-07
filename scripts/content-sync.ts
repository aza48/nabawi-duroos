/** Publishes the latest MESH-written guides and FAQs to the live database: npm run content:sync */
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
  const { getDb } = await import("@/server/db/client");
  const { syncContent2026 } = await import("@/server/seed/content/sync");
  console.log("Published:", await syncContent2026(await getDb()));
  process.exit(0);
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
