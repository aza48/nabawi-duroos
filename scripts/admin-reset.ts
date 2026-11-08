/**
 * Prints a one-time password reset link for an existing admin, valid 24 hours.
 * Nothing is emailed: send the link to the admin yourself.
 *   DATABASE_URL=... BETTER_AUTH_URL=https://medinahub.org npm run admin:reset -- them@example.com
 */
import { createResetLink } from "@/server/auth/reset";

async function main() {
  const [email] = process.argv.slice(2);
  if (!email) {
    console.error("Usage: npm run admin:reset -- <email>");
    process.exit(1);
  }
  const { getDb } = await import("@/server/db/client");
  const base = process.env.BETTER_AUTH_URL ?? "http://localhost:3000";
  const url = await createResetLink(await getDb(), email, base);
  if (!url) {
    console.error(`No admin account found for ${email}.`);
    process.exit(1);
  }
  console.log(`Password reset link for ${email}, works once, valid 24 hours:\n${url}`);
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
