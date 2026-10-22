"use client";

import { useEffect, useState } from "react";
import { Lock } from "lucide-react";
import { useLang } from "../../../../lib/i18n";
import { StandaloneShell } from "../../../../components/StandaloneShell";
import { PillButton } from "../../../../components/ui";

function LoginInner() {
  const { ui } = useLang();
  const [password, setPassword] = useState("");
  const [configured, setConfigured] = useState<boolean | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    fetch("/api/admin/login")
      .then((r) => (r.ok ? r.json() : { configured: false }))
      .then((d: { configured?: boolean }) => setConfigured(!!d.configured))
      .catch(() => setConfigured(false));
  }, []);

  const submit = async () => {
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        window.location.href = "/admin";
        return;
      }
      if (res.status === 503) setConfigured(false);
      else setError(ui("wrongPassword"));
    } catch {
      setError(ui("wrongPassword"));
    }
    setBusy(false);
  };

  return (
    <div className="mx-auto max-w-md space-y-6 pt-8">
      <div className="rounded-card bg-[var(--card)] p-6 shadow-soft sm:p-8">
        <h1 className="flex items-center gap-2 text-xl font-semibold text-[var(--ink)]">
          <Lock className="h-5 w-5 text-[var(--brand-accent)]" />
          {ui("adminLoginTitle")}
        </h1>
        {configured === false ? (
          <p className="mt-4 rounded-card bg-[var(--status-pause-bg)] px-4 py-3 text-sm leading-relaxed text-[var(--status-pause-tx)]">
            {ui("adminNotConfigured")}
          </p>
        ) : (
          <div className="mt-5 space-y-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") void submit();
              }}
              placeholder={ui("password")}
              className="h-[50px] w-full rounded-pill bg-[var(--ceramic)] px-5 text-[15px] text-[var(--ink)] outline-none placeholder:text-[var(--ink-faint)] focus:ring-2 focus:ring-[var(--brand-accent)]"
            />
            <PillButton onClick={submit} className={`w-full ${busy ? "opacity-60" : ""}`}>
              {ui("login")}
            </PillButton>
            {error ? <p className="text-sm text-[var(--danger)]">{error}</p> : null}
          </div>
        )}
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <StandaloneShell>
      <LoginInner />
    </StandaloneShell>
  );
}
