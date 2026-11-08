"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { btnPrimary, ErrorNote, inputCls, labelCls } from "./ui";

export function ResetPasswordForm({ token }: { token: string }) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(token ? null : "This reset link is missing or has expired. Ask the site owner for a new one.");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (password.length < 8) return setError("Use at least 8 characters for your password.");
    setBusy(true);
    setError(null);
    const { error } = await authClient.resetPassword({ newPassword: password, token });
    setBusy(false);
    if (error) return setError("This reset link has expired or was already used. Ask the site owner for a new one.");
    router.push("/admin/login");
  }

  return (
    <form onSubmit={submit} className="grid gap-4">
      <div>
        <label htmlFor="password" className={labelCls}>New password</label>
        <input id="password" type="password" className={inputCls} autoComplete="new-password" minLength={8} value={password}
          onChange={(e) => setPassword(e.target.value)} required disabled={!token} />
        <p className="mt-1 text-xs text-muted">At least 8 characters.</p>
      </div>
      <button className={btnPrimary} disabled={busy || !token}>{busy ? "Saving…" : "Save new password"}</button>
      {error && <ErrorNote>{error}</ErrorNote>}
    </form>
  );
}
