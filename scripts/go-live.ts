/**
 * Switches the live database to MESH v2. See docs/OPERATIONS.md.
 *
 *   1. Put DATABASE_URL (the live Supabase transaction pooler link) in .env.production.local (git-ignored).
 *   2. npm run go-live                      dry run: shows what would happen
 *   3. npm run go-live -- --apply --owner you@example.com
 */
import { loadEnvFile } from "./load-env";

loadEnvFile(".env.production.local");

async function main() {
  const args = process.argv.slice(2);
  const apply = args.includes("--apply");
  const ownerIdx = args.indexOf("--owner");
  const owner = ownerIdx >= 0 ? args[ownerIdx + 1] : null;
  if (!process.env.DATABASE_URL) throw new Error("Put the live DATABASE_URL in .env.production.local first.");
  (process.env as Record<string, string>).NODE_ENV = "production";

  const { getDb, migrateLive } = await import("@/server/db/client");
  const { goLive } = await import("@/server/seed/go-live");
  const db = await getDb();
  const url = process.env.DATABASE_URL as string;
  const report = await goLive(db, { apply, migrate: () => migrateLive(url) });

  console.log(apply ? "Done:" : "Dry run. This would:");
  report.steps.forEach((s, i) => console.log(`  ${i + 1}. ${s}`));
  if (report.counts) console.log("Loaded:", report.counts);
  if (!apply) console.log("\nRun again with --apply to do it.");

  if (apply && owner) {
    const { createInvite } = await import("@/server/admin/invites");
    const { url } = await createInvite(db, "system", { email: owner, role: "owner" }, process.env.BETTER_AUTH_URL ?? "https://medinahub.org");
    console.log(`\nOwner invite for ${owner} (one use, 72 hours):\n${url}`);
  }
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
