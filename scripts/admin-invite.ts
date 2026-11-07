/**
 * Prints a one-time admin invite link. Used to create the first owner, and as
 * a fallback if the admin app is unreachable.
 *   DATABASE_URL=... BETTER_AUTH_URL=https://medinahub.org npm run admin:invite -- you@example.com owner
 */
import { createInvite } from "@/server/admin/invites";
import { isRole } from "@/server/auth/permissions";

async function main() {
  const [email, role = "owner"] = process.argv.slice(2);
  if (!email || !isRole(role)) {
    console.error("Usage: npm run admin:invite -- <email> [owner|editor|duroos_editor|content_editor]");
    process.exit(1);
  }
  const { getDb } = await import("@/server/db/client");
  const base = process.env.BETTER_AUTH_URL ?? "http://localhost:3000";
  const { url } = await createInvite(await getDb(), "system", { email, role }, base);
  console.log(`Invite for ${email} (${role}), valid 72 hours:\n${url}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
