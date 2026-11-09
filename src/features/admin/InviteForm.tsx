"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { acceptInviteAction } from "@/app/(admin)/admin/auth-actions";
import { btnPrimary, ErrorNote, inputCls, labelCls } from "./ui";

export function InviteForm({ token, email }: { token: string; email: string }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (password.length < 8) return setError("Use at least 8 characters for your password.");
    setBusy(true);
    const res = await acceptInviteAction({ token, name, password });
    if (!res.ok) {
      setBusy(false);
      return setError(res.error);
    }
    // The account exists now. If signing in fails, say so and send them to sign in by hand.
    const signed = await authClient.signIn.email({ email, password }).catch(() => null);
    if (!signed || signed.error) {
      router.push("/admin/login?error=invite_signin");
      return;
    }
    router.push("/admin/setup-2fa");
  }

  return (
    <form onSubmit={submit} className="grid gap-4">
      <p className="text-sm">You&apos;re joining as <b>{email}</b>.</p>
      <div>
        <label htmlFor="name" className={labelCls}>Your name</label>
        <input id="name" className={inputCls} autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} required minLength={2} />
      </div>
      <div>
        <label htmlFor="pw" className={labelCls}>Choose a password</label>
        <input id="pw" type="password" className={inputCls} autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <p className="mt-1 text-xs text-muted">At least 8 characters.</p>
      </div>
      <button className={btnPrimary} disabled={busy}>{busy ? "Creating your account…" : "Create account"}</button>
      {error && <ErrorNote>{error}</ErrorNote>}
    </form>
  );
}
