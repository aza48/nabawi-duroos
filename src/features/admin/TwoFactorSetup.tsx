"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import QRCode from "qrcode";
import { Copy, Fingerprint, ShieldCheck } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { btnGhost, btnPrimary, ErrorNote, inputCls, labelCls } from "./ui";

export function TwoFactorSetup() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [qr, setQr] = useState<string | null>(null);
  const [secret, setSecret] = useState("");
  const [backup, setBackup] = useState<string[]>([]);
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function start(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const { data, error } = await authClient.twoFactor.enable({ password });
    setBusy(false);
    if (error || !data || !("totpURI" in data)) return setError("Password is incorrect.");
    setSecret(new URL(data.totpURI).searchParams.get("secret") ?? "");
    setBackup(data.backupCodes);
    setQr(await QRCode.toDataURL(data.totpURI, { margin: 1, width: 220 }));
  }

  async function addPasskey() {
    setBusy(true);
    setError(null);
    const res = await authClient.passkey.addPasskey({ name: "MESH admin" });
    setBusy(false);
    if (res?.error) return setError("Face ID or fingerprint setup was cancelled or isn't available on this device. Try again, or use an authenticator app below.");
    router.push("/admin");
    router.refresh();
  }

  async function verify(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const { error } = await authClient.twoFactor.verifyTotp({ code: code.replace(/\s/g, "") });
    setBusy(false);
    if (error) return setError("That code didn't work. Check your phone's clock and try the newest code.");
    router.push("/admin");
    router.refresh();
  }

  if (!qr) {
    return (
      <div className="grid gap-4">
        <p className="text-sm">Every MESH admin needs a second step when signing in. The easiest is your phone or laptop&apos;s Face ID or fingerprint.</p>
        <button type="button" onClick={addPasskey} className={`${btnPrimary} w-full py-3`} disabled={busy}>
          <Fingerprint size={18} /> {busy ? "Waiting for your device…" : "Use Face ID or fingerprint (recommended)"}
        </button>
        <div className="flex items-center gap-3 text-xs text-muted"><span className="h-px flex-1 bg-line" />or use an authenticator app<span className="h-px flex-1 bg-line" /></div>
        <form onSubmit={start} className="grid gap-4">
          <p className="text-sm text-muted">Works with Google Authenticator, Microsoft Authenticator or 1Password.</p>
          <div>
            <label htmlFor="pw" className={labelCls}>Confirm your password</label>
            <input id="pw" type="password" className={inputCls} autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button className={btnGhost} disabled={busy}>{busy ? "Preparing…" : "Set up an authenticator app"}</button>
        </form>
        {error && <ErrorNote>{error}</ErrorNote>}
      </div>
    );
  }

  return (
    <form onSubmit={verify} className="grid gap-4">
      <ol className="grid gap-1 text-sm">
        <li>1. Scan this code with your authenticator app.</li>
        <li>2. Save the backup codes somewhere safe.</li>
        <li>3. Enter the 6-digit code the app shows.</li>
      </ol>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={qr} alt="QR code for your authenticator app" width={220} height={220} className="mx-auto rounded-xl bg-white p-2" />
      <p className="text-center text-xs text-muted">
        Can&apos;t scan? Enter this key: <code className="break-all font-semibold text-ink">{secret}</code>
      </p>
      <div className="rounded-xl bg-bg-2 p-3">
        <p className="mb-2 text-sm font-semibold">Backup codes (each works once)</p>
        <ul className="grid grid-cols-2 gap-1 font-mono text-sm">{backup.map((c) => <li key={c}>{c}</li>)}</ul>
        <button type="button" className={`${btnGhost} mt-3`} onClick={() => navigator.clipboard?.writeText(backup.join("\n"))}>
          <Copy size={15} /> Copy codes
        </button>
      </div>
      <div>
        <label htmlFor="code" className={labelCls}>6-digit code</label>
        <input id="code" className={`${inputCls} tracking-widest`} inputMode="numeric" autoComplete="one-time-code" value={code} onChange={(e) => setCode(e.target.value)} required />
      </div>
      <button className={btnPrimary} disabled={busy}><ShieldCheck size={17} />{busy ? "Checking…" : "Turn on and continue"}</button>
      {error && <ErrorNote>{error}</ErrorNote>}
    </form>
  );
}
