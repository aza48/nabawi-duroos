/**
 * Publishes the mashayikh's current positions (role line, facts, corrected titles) to the live database.
 *   npm run shaykh:sync                      shows what would change, writes nothing
 *   npm run shaykh:sync -- --apply           writes every change (each one can be undone in Admin > Activity)
 *   npm run shaykh:sync -- --apply --only=slug-one,slug-two
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
  const { getDb } = await import("@/server/db/client");
  const { planShaykhSync, syncShaykhPositions } = await import("@/server/seed/content/mashayikh");
  const db = await getDb();
  const only = process.argv.find((a) => a.startsWith("--only="))?.slice(7).split(",").filter(Boolean);
  const plan = await planShaykhSync(db, undefined, only);
  for (const c of plan.changes) console.log(`${c.slug} ${c.field}:\n  now:  ${c.before}\n  new:  ${c.after}`);
  if (plan.missing.length) console.log("Not found (check the slug):", plan.missing.join(", "));
  if (!process.argv.includes("--apply")) {
    console.log(`\n${plan.changes.length} changes. Nothing written. Run again with --apply to publish.`);
    process.exit(0);
  }
  const r = await syncShaykhPositions(db, undefined, only);
  console.log("Updated:", r.updated.join(", ") || "none");
  process.exit(0);
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
