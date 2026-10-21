"use client";
import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useMeshPrefs } from "@/lib/mesh-i18n";

function Inner({ isSignup }: { isSignup: boolean }) {
  const { t } = useMeshPrefs();
  const router = useRouter(); const sp = useSearchParams(); const next = sp.get("next") || "/mesh";
  const [email, setEmail] = useState(""); const [password, setPassword] = useState(""); const [name, setName] = useState(""); const [err, setErr] = useState(""); const [busy, setBusy] = useState(false);
  async function submit(e: React.FormEvent) {
    e.preventDefault(); setErr(""); if (busy) return; setBusy(true);
    try {
      const url = isSignup ? "/api/mesh/auth/signup" : "/api/mesh/auth/login"; const payload = isSignup ? { displayName: name, email, password } : { email, password };
      const r = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }); const d = await r.json().catch(() => ({}));
      if (r.status === 503) setErr(t("auth.errAccounts"));
      else if (!r.ok) setErr(d.error || t("auth.errGeneric"));
      else router.push(next);
    } finally { setBusy(false); }
  }
  return <div className="mesh-container" style={{ padding: "40px 20px", maxWidth: 460 }}>
    <h1 style={{ fontSize: 28 }}>{isSignup ? t("auth.signupTitle") : t("auth.loginTitle")}</h1>
    <p style={{ color: "var(--mesh-secondary)", fontSize: 14 }}>{isSignup ? t("auth.signupSub") : t("auth.welcome")}</p>
    <form onSubmit={submit} style={{ display: "grid", gap: 14, marginTop: 20 }}>
      {isSignup && <label style={{ display: "grid", gap: 6, fontWeight: 600, fontSize: 14 }}>{t("auth.displayName")}<input className="mesh-input mesh-focus" value={name} onChange={(e) => setName(e.target.value)} required /></label>}
      <label style={{ display: "grid", gap: 6, fontWeight: 600, fontSize: 14 }}>{t("auth.email")}<input className="mesh-input mesh-focus" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></label>
      <label style={{ display: "grid", gap: 6, fontWeight: 600, fontSize: 14 }}>{t("auth.password")}<input className="mesh-input mesh-focus" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} />{isSignup && <span style={{ fontWeight: 400, fontSize: 12, color: "var(--mesh-muted)" }}>{t("auth.pwHint")}</span>}</label>
      {err && <p role="alert" style={{ color: "var(--mesh-error)", fontSize: 14 }}>{err}</p>}
      <button disabled={busy} className="mesh-btn mesh-btn-primary mesh-focus">{busy ? t("auth.wait") : (isSignup ? t("auth.signupBtn") : t("auth.loginBtn"))}</button>
    </form>
    <p style={{ fontSize: 14, color: "var(--mesh-secondary)", marginTop: 16 }}>{isSignup ? <><span>{t("auth.haveAccount")} </span><Link href={`/mesh/login?next=${encodeURIComponent(next)}`} style={{ color: "var(--mesh-accent)", fontWeight: 600 }}>{t("auth.loginLink")}</Link></> : <><span>{t("auth.newTo")} </span><Link href={`/mesh/signup?next=${encodeURIComponent(next)}`} style={{ color: "var(--mesh-accent)", fontWeight: 600 }}>{t("auth.createOne")}</Link></>}</p>
    {!isSignup && <p style={{ fontSize: 13, color: "var(--mesh-muted)" }}>{t("auth.resetNote")}</p>}
  </div>;
}
export default function AuthForm({ isSignup }: { isSignup: boolean }) {
  const { t } = useMeshPrefs();
  return <Suspense fallback={<div className="mesh-container" style={{ padding: 40 }}>{t("common.loading")}</div>}><Inner isSignup={isSignup} /></Suspense>;
}
