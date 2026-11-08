import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin, captcha, twoFactor } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import { passkey } from "@better-auth/passkey";
import { createAccessControl } from "better-auth/plugins/access";
import { adminAc, defaultStatements } from "better-auth/plugins/admin/access";
import { getDb, type Db } from "@/server/db/client";
import * as schema from "@/server/db/schema";

/** Better Auth user-management powers: owner only. Content permissions live in permissions.ts. */
const ac = createAccessControl(defaultStatements);
const owner = ac.newRole({ ...adminAc.statements });
const noAdminPowers = ac.newRole({ user: [], session: [] });
export const AUTH_ROLES = { owner, editor: noAdminPowers, duroos_editor: noAdminPowers, content_editor: noAdminPowers };

/** Previews hold demo data only; a random per-instance secret means no preview session can be forged. */
const PREVIEW_SECRET = crypto.randomUUID() + crypto.randomUUID();
const DEV_SECRET = "mesh-local-development-secret-not-for-production-use";

function secret(): string {
  const s = process.env.BETTER_AUTH_SECRET;
  if (s) return s;
  if (process.env.VERCEL_ENV === "preview") return PREVIEW_SECRET;
  if (process.env.NODE_ENV === "production" && process.env.MESH_LOCAL_DB !== "1") {
    throw new Error("BETTER_AUTH_SECRET is required in production");
  }
  return DEV_SECRET;
}

/** The reset page admins use. Links are only ever handed to the caller (the admin:reset script); nothing is emailed or logged. */
export function resetLink(baseURL: string, token: string): string {
  return `${baseURL.replace(/\/$/, "")}/admin/reset?token=${encodeURIComponent(token)}`;
}

export function createAuth(db: Db, opts: { baseURL?: string; onResetLink?: (email: string, url: string) => void } = {}) {
  const baseURL =
    opts.baseURL ??
    process.env.BETTER_AUTH_URL ??
    (process.env.VERCEL_ENV === "preview" && process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");
  const url = new URL(baseURL);
  const turnstile = process.env.TURNSTILE_SECRET_KEY;
  return betterAuth({
    appName: "MESH Admin",
    baseURL,
    secret: secret(),
    database: drizzleAdapter(db, {
      provider: "pg",
      transaction: false,
      schema: {
        user: schema.user,
        session: schema.session,
        account: schema.account,
        verification: schema.verification,
        twoFactor: schema.twoFactor,
        passkey: schema.passkey,
        rateLimit: schema.rateLimit,
      },
    }),
    emailAndPassword: {
      enabled: true,
      disableSignUp: true,
      minPasswordLength: 8,
      resetPasswordTokenExpiresIn: 60 * 60 * 24,
      revokeSessionsOnPasswordReset: true,
      sendResetPassword: async ({ user, token }) => {
        opts.onResetLink?.(user.email, resetLink(baseURL, token));
      },
    },
    session: { expiresIn: 60 * 60 * 24 * 7, updateAge: 60 * 60 * 24 },
    rateLimit: {
      enabled: true,
      storage: "database",
      window: 60,
      max: 30,
      customRules: {
        "/sign-in/email": { window: 60, max: 5 },
        "/request-password-reset": { window: 60, max: 3 },
        "/reset-password": { window: 60, max: 5 },
        "/two-factor/verify-totp": { window: 60, max: 5 },
        "/two-factor/verify-backup-code": { window: 60, max: 5 },
      },
    },
    telemetry: { enabled: false },
    advanced: { useSecureCookies: url.protocol === "https:" },
    plugins: [
      twoFactor({ issuer: "MESH Admin" }),
      admin({ ac, roles: AUTH_ROLES, defaultRole: "editor", adminRoles: ["owner"] }),
      passkey({ rpID: url.hostname, rpName: "MESH Admin", origin: url.origin }),
      ...(turnstile ? [captcha({ provider: "cloudflare-turnstile", secretKey: turnstile, endpoints: ["/sign-in/email"] })] : []),
      nextCookies(),
    ],
  });
}

export type Auth = ReturnType<typeof createAuth>;

const g = globalThis as unknown as { __meshAuth?: Promise<Auth> };

export function getAuth(): Promise<Auth> {
  if (!g.__meshAuth) g.__meshAuth = getDb().then((db) => createAuth(db));
  return g.__meshAuth;
}

/**
 * Better Auth's admin plugin endpoints (list users, set role, impersonate…)
 * are never needed over HTTP: MESH manages admins through its own services,
 * which also enforce two-step sign-in. Blocking them removes that surface.
 */
export function isBlockedAuthPath(pathname: string): boolean {
  return /^\/api\/auth\/admin(\/|$)/.test(pathname);
}

export async function handleAuthRequest(auth: Auth, req: Request): Promise<Response> {
  if (isBlockedAuthPath(new URL(req.url).pathname)) return new Response("Not found", { status: 404 });
  return auth.handler(req);
}
