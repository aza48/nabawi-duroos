"use client";
import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useMeshPrefs } from "@/lib/mesh-i18n";

type T = (k: string) => string;

export function meshAuthError(t: T, d: Record<string, unknown>, status: number): string {
  const e = typeof d.error === "string" ? d.error : "";
  if (e === "invalid_email") return t("auth.errInvalidEmail");
  if (e === "invalid_code") return t("auth.errInvalidCode");
  if (e === "email_not_verified") return t("auth.errNotVerified");
  if (e === "too_many_attempts") return t("auth.errTooMany");
  if (e === "resend_too_soon") return t("auth.errResendSoon");
  if (e === "email_not_configured") return t("auth.errEmailConfig");
  if (status === 503 || e === "database_not_configured") return t("auth.errAccounts");
  return e || t("auth.errGeneric");
}

function useCountdown() {
  const [left, setLeft] = useState(0);
  useEffect(() => {
    if (left <= 0) return;
    const id = window.setTimeout(() => setLeft((s) => s - 1), 1000);
    return () => window.clearTimeout(id);
  }, [left]);
  return { left, start: (s: number) => setLeft(s) };
}

/** Code-entry view used after signup and when login is blocked on verification. Purpose is always "signup" here. */
export function VerifyView({ email, next, initialCooldown = 0, notice }: { email: string; next: string; initialCooldown?: number; notice?: string }) {
  const { t } = useMeshPrefs();
  const [code, setCode] = useState(""); const [err, setErr] = useState(notice || ""); const [info, setInfo] = useState("");
  const [busy, setBusy] = useState(false); const cd = useCountdown();
  useEffect(() => { if (initialCooldown > 0) cd.start(initialCooldown); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, []);
  async function verify(e: React.FormEvent) {
    e.preventDefault(); setErr(""); setInfo(""); if (busy) return; setBusy(true);
    try {
      const r = await fetch("/api/mesh/auth/verify", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, code: code.trim() }) });
      const d = await r.json().catch(() => ({}));
      if (!r.ok) setErr(meshAuthError(t, d, r.status));
      else window.location.href = next;
    } finally { setBusy(false); }
  }
  async function resend() {
    setErr(""); setInfo("");
    const r = await fetch("/api/mesh/auth/resend", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, purpose: "signup" }) });
    const d = await r.json().catch(() => ({}));
    if (!r.ok) setErr(meshAuthError(t, d, r.status));
    else { setInfo(t("auth.resent")); cd.start(60); }
  }
  return <div>
    <h1 style={{ fontSize: 28, margin: "0 0 8px" }}>{t("auth.verifyTitle")}</h1>
    <p style={{ color: "var(--mesh-secondary)", fontSize: 14, margin: 0, lineHeight: 1.65 }}>{t("auth.verifyBody").replace("{email}", email)}</p>
    <form onSubmit={verify} style={{ display: "grid", gap: 20, marginTop: 28 }}>
      <label style={{ display: "grid", gap: 6, fontWeight: 600, fontSize: 14 }}>{t("auth.codeLabel")}
        <input className="mesh-input mesh-focus" inputMode="numeric" autoComplete="one-time-code" autoFocus placeholder={t("auth.codePh")} value={code} onChange={(e) => setCode(e.target.value.replace(/[^0-9]/g, "").slice(0, 6))} required style={{ letterSpacing: 6, fontSize: 18 }} />
      </label>
      {err && <p role="alert" style={{ color: "var(--mesh-error)", fontSize: 14 }}>{err}</p>}
      {info && <p role="status" style={{ color: "var(--mesh-accent)", fontSize: 14 }}>{info}</p>}
      <button disabled={busy} className="mesh-btn mesh-btn-primary mesh-focus">{busy ? t("auth.wait") : t("auth.verifyBtn")}</button>
    </form>
    <p style={{ fontSize: 14, color: "var(--mesh-secondary)", marginTop: 24 }}>
      <button type="button" onClick={resend} disabled={cd.left > 0} style={{ background: "none", border: "none", padding: 0, cursor: cd.left > 0 ? "default" : "pointer", color: cd.left > 0 ? "var(--mesh-muted)" : "var(--mesh-accent)", fontWeight: 600, fontSize: 14 }}>
        {cd.left > 0 ? t("auth.resendIn").replace("{s}", String(cd.left)) : t("auth.resend")}
      </button>
    </p>
  </div>;
}

function Inner({ isSignup }: { isSignup: boolean }) {
  const { t } = useMeshPrefs();
  const router = useRouter(); const sp = useSearchParams(); const next = sp.get("next") || "/mesh";
  const [email, setEmail] = useState(""); const [password, setPassword] = useState(""); const [name, setName] = useState("");
  const [err, setErr] = useState(""); const [busy, setBusy] = useState(false);
  const [verifyEmail, setVerifyEmail] = useState<string | null>(null); const [verifyNotice, setVerifyNotice] = useState("");
  const resetDone = !isSignup && sp.get("reset") === "1";
  async function submit(e: React.FormEvent) {
    e.preventDefault(); setErr(""); if (busy) return; setBusy(true);
    try {
      const url = isSignup ? "/api/mesh/auth/signup" : "/api/mesh/auth/login"; const payload = isSignup ? { displayName: name, email, password } : { email, password };
      const r = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }); const d = await r.json().catch(() => ({}));
      if (isSignup && r.status === 201 && d.needsVerification) { setVerifyEmail(d.email || email.trim().toLowerCase()); return; }
      if (!isSignup && r.status === 403 && d.error === "email_not_verified") { setVerifyNotice(t("auth.errNotVerified")); setVerifyEmail(d.email || email.trim().toLowerCase()); return; }
      if (!r.ok) setErr(meshAuthError(t, d, r.status));
      else router.push(next);
    } finally { setBusy(false); }
  }
  if (verifyEmail) return <div className="mesh-container" style={{ padding: "48px 0 56px", maxWidth: 460 }}><VerifyView email={verifyEmail} next={next} initialCooldown={isSignup ? 60 : 0} notice={verifyNotice || undefined} /></div>;
  return <div className="mesh-container" style={{ padding: "48px 0 56px", maxWidth: 460 }}>
    <h1 style={{ fontSize: 28, margin: "0 0 8px" }}>{isSignup ? t("auth.signupTitle") : t("auth.loginTitle")}</h1>
    <p style={{ color: "var(--mesh-secondary)", fontSize: 14, margin: 0 }}>{isSignup ? t("auth.signupSub") : t("auth.welcome")}</p>
    {resetDone && <p role="status" style={{ color: "var(--mesh-accent)", fontSize: 14, marginTop: 16 }}>{t("auth.resetDone")}</p>}
    <form onSubmit={submit} style={{ display: "grid", gap: 20, marginTop: 28 }}>
      {isSignup && <label style={{ display: "grid", gap: 6, fontWeight: 600, fontSize: 14 }}>{t("auth.displayName")}<input className="mesh-input mesh-focus" value={name} onChange={(e) => setName(e.target.value)} required /></label>}
      <label style={{ display: "grid", gap: 6, fontWeight: 600, fontSize: 14 }}>{t("auth.email")}<input className="mesh-input mesh-focus" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder={isSignup ? "you@example.com" : undefined} />{isSignup && <span style={{ fontWeight: 400, fontSize: 12, color: "var(--mesh-muted)", lineHeight: 1.6 }}>{t("auth.iuHint")}</span>}</label>
      <label style={{ display: "grid", gap: 6, fontWeight: 600, fontSize: 14 }}>{t("auth.password")}<input className="mesh-input mesh-focus" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} />{isSignup && <span style={{ fontWeight: 400, fontSize: 12, color: "var(--mesh-muted)" }}>{t("auth.pwHint")}</span>}</label>
      {err && <p role="alert" style={{ color: "var(--mesh-error)", fontSize: 14 }}>{err}</p>}
      <button disabled={busy} className="mesh-btn mesh-btn-primary mesh-focus">{busy ? t("auth.wait") : (isSignup ? t("auth.signupBtn") : t("auth.loginBtn"))}</button>
    </form>
    {!isSignup && <p style={{ fontSize: 14, marginTop: 18 }}><Link href={`/mesh/forgot?next=${encodeURIComponent(next)}`} style={{ color: "var(--mesh-accent)", fontWeight: 600 }}>{t("auth.forgotLink")}</Link></p>}
    <p style={{ fontSize: 14, color: "var(--mesh-secondary)", marginTop: 24 }}>{isSignup ? <><span>{t("auth.haveAccount")} </span><Link href={`/mesh/login?next=${encodeURIComponent(next)}`} style={{ color: "var(--mesh-accent)", fontWeight: 600 }}>{t("auth.loginLink")}</Link></> : <><span>{t("auth.newTo")} </span><Link href={`/mesh/signup?next=${encodeURIComponent(next)}`} style={{ color: "var(--mesh-accent)", fontWeight: 600 }}>{t("auth.createOne")}</Link></>}</p>
  </div>;
}

function ForgotInner() {
  const { t } = useMeshPrefs();
  const sp = useSearchParams(); const next = sp.get("next") || "/mesh";
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState(""); const [code, setCode] = useState(""); const [newPassword, setNewPassword] = useState("");
  const [err, setErr] = useState(""); const [info, setInfo] = useState(""); const [busy, setBusy] = useState(false);
  const cd = useCountdown();
  async function sendCode(e: React.FormEvent) {
    e.preventDefault(); setErr(""); if (busy) return; setBusy(true);
    try {
      const r = await fetch("/api/mesh/auth/forgot", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
      const d = await r.json().catch(() => ({}));
      if (r.status === 503) { setErr(meshAuthError(t, d, r.status)); return; }
      setInfo(t("auth.forgotSent")); cd.start(60); setStep(2);
    } finally { setBusy(false); }
  }
  async function resend() {
    setErr(""); setInfo("");
    const r = await fetch("/api/mesh/auth/resend", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, purpose: "reset" }) });
    const d = await r.json().catch(() => ({}));
    if (!r.ok) setErr(meshAuthError(t, d, r.status)); else { setInfo(t("auth.resent")); cd.start(60); }
  }
  async function doReset(e: React.FormEvent) {
    e.preventDefault(); setErr(""); if (busy) return; setBusy(true);
    try {
      const r = await fetch("/api/mesh/auth/reset", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, code: code.trim(), newPassword }) });
      const d = await r.json().catch(() => ({}));
      if (!r.ok) setErr(meshAuthError(t, d, r.status));
      else window.location.href = `/mesh/login?reset=1&next=${encodeURIComponent(next)}`;
    } finally { setBusy(false); }
  }
  return <div className="mesh-container" style={{ padding: "48px 0 56px", maxWidth: 460 }}>
    <h1 style={{ fontSize: 28, margin: "0 0 8px" }}>{t("auth.forgotTitle")}</h1>
    <p style={{ color: "var(--mesh-secondary)", fontSize: 14, margin: 0, lineHeight: 1.65 }}>{t("auth.forgotSub")}</p>
    {step === 1 ? (
      <form onSubmit={sendCode} style={{ display: "grid", gap: 20, marginTop: 28 }}>
        <label style={{ display: "grid", gap: 6, fontWeight: 600, fontSize: 14 }}>{t("auth.email")}<input className="mesh-input mesh-focus" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></label>
        {err && <p role="alert" style={{ color: "var(--mesh-error)", fontSize: 14 }}>{err}</p>}
        <button disabled={busy} className="mesh-btn mesh-btn-primary mesh-focus">{busy ? t("auth.wait") : t("auth.forgotSend")}</button>
      </form>
    ) : (
      <form onSubmit={doReset} style={{ display: "grid", gap: 20, marginTop: 28 }}>
        {info && <p role="status" style={{ color: "var(--mesh-accent)", fontSize: 14 }}>{info}</p>}
        <label style={{ display: "grid", gap: 6, fontWeight: 600, fontSize: 14 }}>{t("auth.codeLabel")}
          <input className="mesh-input mesh-focus" inputMode="numeric" autoComplete="one-time-code" placeholder={t("auth.codePh")} value={code} onChange={(e) => setCode(e.target.value.replace(/[^0-9]/g, "").slice(0, 6))} required style={{ letterSpacing: 6, fontSize: 18 }} />
        </label>
        <label style={{ display: "grid", gap: 6, fontWeight: 600, fontSize: 14 }}>{t("auth.newPassword")}<input className="mesh-input mesh-focus" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required minLength={8} /><span style={{ fontWeight: 400, fontSize: 12, color: "var(--mesh-muted)" }}>{t("auth.pwHint")}</span></label>
        {err && <p role="alert" style={{ color: "var(--mesh-error)", fontSize: 14 }}>{err}</p>}
        <button disabled={busy} className="mesh-btn mesh-btn-primary mesh-focus">{busy ? t("auth.wait") : t("auth.resetBtn")}</button>
        <p style={{ fontSize: 14, color: "var(--mesh-secondary)", margin: 0 }}>
          <button type="button" onClick={resend} disabled={cd.left > 0} style={{ background: "none", border: "none", padding: 0, cursor: cd.left > 0 ? "default" : "pointer", color: cd.left > 0 ? "var(--mesh-muted)" : "var(--mesh-accent)", fontWeight: 600, fontSize: 14 }}>
            {cd.left > 0 ? t("auth.resendIn").replace("{s}", String(cd.left)) : t("auth.resend")}
          </button>
        </p>
      </form>
    )}
    <p style={{ fontSize: 14, color: "var(--mesh-secondary)", marginTop: 24 }}><Link href={`/mesh/login?next=${encodeURIComponent(next)}`} style={{ color: "var(--mesh-accent)", fontWeight: 600 }}>{t("auth.backToLogin")}</Link></p>
  </div>;
}

export function ForgotForm() {
  const { t } = useMeshPrefs();
  return <Suspense fallback={<div className="mesh-container" style={{ padding: "48px 0" }}>{t("common.loading")}</div>}><ForgotInner /></Suspense>;
}

export default function AuthForm({ isSignup }: { isSignup: boolean }) {
  const { t } = useMeshPrefs();
  return <Suspense fallback={<div className="mesh-container" style={{ padding: "48px 0" }}>{t("common.loading")}</div>}><Inner isSignup={isSignup} /></Suspense>;
}
