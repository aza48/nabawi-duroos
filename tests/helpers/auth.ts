import { TOTP } from "otpauth";
import type { Auth } from "@/server/auth/auth";

export const BASE = "http://localhost:3000";

/** Turns a Set-Cookie response into a Cookie request header. */
export function cookieHeader(h: Headers): Headers {
  const cookies = (h.getSetCookie?.() ?? [h.get("set-cookie") ?? ""])
    .filter(Boolean)
    .map((c) => c.split(";")[0]);
  return new Headers({ cookie: cookies.join("; "), origin: BASE });
}

export async function createAdmin(auth: Auth, email: string, role = "owner", password = "correct-horse-battery") {
  const res = await auth.api.createUser({ body: { email, password, name: email.split("@")[0], role: role as "owner" } });
  return { id: res.user.id, email, password };
}

export async function signIn(auth: Auth, email: string, password: string) {
  return auth.api.signInEmail({ body: { email, password }, returnHeaders: true });
}

export function totpCode(uri: string): string {
  const secret = new URL(uri).searchParams.get("secret")!;
  return new TOTP({ secret, digits: 6, period: 30 }).generate();
}

/** Signs in, enables TOTP and verifies it, returning a session cookie header for a fully set-up admin. */
export async function adminWith2fa(auth: Auth, email: string, role = "owner") {
  const a = await createAdmin(auth, email, role);
  const first = await signIn(auth, email, a.password);
  const headers = cookieHeader(first.headers);
  const en = await auth.api.enableTwoFactor({ body: { password: a.password }, headers });
  if (en.method !== "totp") throw new Error("expected TOTP enrolment");
  await auth.api.verifyTOTP({ body: { code: totpCode(en.totpURI) }, headers });
  return { ...a, headers, totpURI: en.totpURI };
}
