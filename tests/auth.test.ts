import { beforeAll, describe, expect, it } from "vitest";
import { resetTestDb, type Db } from "@/server/db/client";
import { createAuth, type Auth } from "@/server/auth/auth";
import { adminWith2fa, BASE, createAdmin, signIn } from "./helpers/auth";

let db: Db;
let auth: Auth;
beforeAll(async () => {
  db = await resetTestDb();
  auth = createAuth(db, { baseURL: BASE });
});

describe("admin authentication", () => {
  it("does not allow public sign-up", async () => {
    await expect(
      auth.api.signUpEmail({ body: { email: "x@example.com", password: "long-enough-pass", name: "X" } })
    ).rejects.toThrow();
  });

  it("lets a server-created admin sign in with a password", async () => {
    const a = await createAdmin(auth, "owner1@example.com");
    const r = await signIn(auth, a.email, a.password);
    expect((r.response as { user?: { email: string } }).user?.email).toBe("owner1@example.com");
  });

  it("asks for the TOTP code once two-factor is enabled", async () => {
    const a = await adminWith2fa(auth, "owner2@example.com");
    const r = await signIn(auth, a.email, a.password);
    expect((r.response as { twoFactorRedirect?: boolean }).twoFactorRedirect).toBe(true);
  });

  it("blocks Better Auth's built-in admin endpoints over HTTP (MESH uses its own checked services)", async () => {
    const { handleAuthRequest } = await import("@/server/auth/auth");
    for (const p of ["admin/list-users", "admin/set-role", "admin/impersonate-user", "admin/create-user"]) {
      const res = await handleAuthRequest(auth, new Request(`${BASE}/api/auth/${p}`, { method: "POST", headers: { origin: BASE } }));
      expect(res.status).toBe(404);
    }
    const ok = await handleAuthRequest(auth, new Request(`${BASE}/api/auth/get-session`, { headers: { origin: BASE } }));
    expect(ok.status).not.toBe(404);
  });

  it("rate limits repeated failed sign-ins from one address", async () => {
    await createAdmin(auth, "target@example.com");
    const attempt = () =>
      auth.handler(
        new Request(`${BASE}/api/auth/sign-in/email`, {
          method: "POST",
          headers: { "content-type": "application/json", origin: BASE, "x-forwarded-for": "203.0.113.7" },
          body: JSON.stringify({ email: "target@example.com", password: "wrong-password-123" }),
        })
      );
    const statuses: number[] = [];
    for (let i = 0; i < 7; i++) statuses.push((await attempt()).status);
    expect(statuses).toContain(429);
  });
});

describe("password reset links", () => {
  it("creates a one-time /admin/reset link that sets a new 8+ character password", async () => {
    const { createResetLink } = await import("@/server/auth/reset");
    const a = await createAdmin(auth, "forgot@example.com");
    const url = await createResetLink(db, a.email, BASE);
    expect(url).toMatch(/^http:\/\/localhost:3000\/admin\/reset\?token=/);
    const token = new URL(url!).searchParams.get("token")!;
    await expect(auth.api.resetPassword({ body: { token, newPassword: "short" } })).rejects.toThrow();
    await auth.api.resetPassword({ body: { token, newPassword: "new-pass1" } });
    const r = await signIn(auth, a.email, "new-pass1");
    expect((r.response as { user?: { email: string } }).user?.email).toBe(a.email);
    await expect(auth.api.resetPassword({ body: { token, newPassword: "another-pass" } })).rejects.toThrow();
  });

  it("returns no link for an unknown email", async () => {
    const { createResetLink } = await import("@/server/auth/reset");
    expect(await createResetLink(db, "nobody@example.com", BASE)).toBeNull();
  });
});

describe("passkey as the second factor", () => {
  it("refuses a password-only sign-in for a passkey admin, so the passkey is really a second factor", async () => {
    const { passkey } = await import("@/server/db/schema");
    const a = await createAdmin(auth, "faceid@example.com");
    const before = await signIn(auth, a.email, a.password);
    expect((before.response as { user?: { email: string } }).user?.email).toBe(a.email);
    await db.insert(passkey).values({
      id: "pk-test", userId: a.id, publicKey: "x", credentialID: "cred-test", counter: 0, deviceType: "singleDevice", backedUp: false,
    });
    await expect(signIn(auth, a.email, a.password)).rejects.toMatchObject({ status: "FORBIDDEN" });
  });
});
