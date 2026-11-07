"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Fingerprint, KeyRound } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { btnGhost, btnPrimary, ErrorNote, inputCls, labelCls } from "./ui";

export function LoginForm({ notice }: { notice?: string }) {
  const router = useRouter();
  const [step, setStep] = useState<"password" | "code">("password");
  const [useBackup, setUseBackup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(notice ?? null);
  const [busy, setBusy] = useState(false);

  async function submitPassword(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const { data, error } = await authClient.signIn.email({ email, password });
    setBusy(false);
    if (error) return setError(error.status === 429 ? "Too many attempts. Wait a minute and try again." : "Email or password is incorrect.");
    if ((data as { twoFactorRedirect?: boolean } | null)?.twoFactorRedirect) return setStep("code");
    router.push("/admin/setup-2fa");
  }

  async function submitCode(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const res = useBackup
      ? await authClient.twoFactor.verifyBackupCode({ code: code.trim() })
      : await authClient.twoFactor.verifyTotp({ code: code.replace(/\s/g, "") });
    setBusy(false);
    if (res.error) return setError(res.error.status === 429 ? "Too many attempts. Wait a minute and try again." : "That code didn't work. Try the newest code.");
    router.push("/admin");
    router.refresh();
  }

  async function passkeySignIn() {
    setError(null);
    const res = await authClient.signIn.passkey();
    if (res?.error) return setError("Passkey sign-in was cancelled or isn't set up on this device.");
    router.push("/admin");
    router.refresh();
  }

  if (step === "code") {
    return (
      <form onSubmit={submitCode} className="grid gap-4">
        <div>
          <label htmlFor="code" className={labelCls}>{useBackup ? "Backup code" : "6-digit code from your authenticator app"}</label>
          <input id="code" className={`${inputCls} tracking-widest`} inputMode={useBackup ? "text" : "numeric"} autoComplete="one-time-code"
            autoFocus value={code} onChange={(e) => setCode(e.target.value)} required />
        </div>
        <button className={btnPrimary} disabled={busy}>{busy ? "Checking…" : "Sign in"}</button>
        <button type="button" className="text-sm font-medium text-muted underline" onClick={() => { setUseBackup(!useBackup); setCode(""); }}>
          {useBackup ? "Use my authenticator app instead" : "Lost your phone? Use a backup code"}
        </button>
        {error && <ErrorNote>{error}</ErrorNote>}
      </form>
    );
  }

  return (
    <div className="grid gap-4">
      <button type="button" onClick={passkeySignIn} className={`${btnGhost} w-full py-3`}>
        <Fingerprint size={18} /> Sign in with a passkey
      </button>
      <div className="flex items-center gap-3 text-xs text-muted"><span className="h-px flex-1 bg-line" />or<span className="h-px flex-1 bg-line" /></div>
      <form onSubmit={submitPassword} className="grid gap-4">
        <div>
          <label htmlFor="email" className={labelCls}>Email</label>
          <input id="email" type="email" className={inputCls} autoComplete="username webauthn" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="password" className={labelCls}>Password</label>
          <input id="password" type="password" className={inputCls} autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button className={btnPrimary} disabled={busy}><KeyRound size={17} />{busy ? "Signing in…" : "Continue"}</button>
      </form>
      {error && <ErrorNote>{error}</ErrorNote>}
    </div>
  );
}
