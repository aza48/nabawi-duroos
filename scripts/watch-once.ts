/**
 * Runs the channel watcher once against the real channels and Gemini, on a
 * local in-memory copy of the database (nothing is published anywhere).
 * Prints what it would suggest or publish.  npm run watch:once
 */
import { readFileSync } from "node:fs";

for (const line of (() => { try { return readFileSync(".env.local", "utf8").split("\n"); } catch { return []; } })()) {
  const m = /^([A-Z_]+)=(.*)$/.exec(line.trim());
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
}

async function main() {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new Error("Add GEMINI_API_KEY to .env.local first");
  delete process.env.DATABASE_URL;
  const { getDb } = await import("@/server/db/client");
  const { liveDeps, runWatcher } = await import("@/server/watcher/run");
  const { channelPosts } = await import("@/server/db/schema");
  const db = await getDb();
  const result = await runWatcher(db, liveDeps(key));
  console.log("Run:", result);
  for (const p of await db.select().from(channelPosts)) {
    if (p.status === "new") continue;
    console.log(`\n[${p.status}${p.wouldAuto ? ", would auto-publish" : ""}] ${p.url}`);
    console.log(`  post: ${p.text.replace(/\s+/g, " ").slice(0, 160)}`);
    console.log(`  read: ${JSON.stringify(p.parse)}`);
    console.log(`  why:  ${p.reason}`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
