"use client";

import { useCallback, useEffect, useState } from "react";
import { Bell, BellRing, Check, Mail } from "lucide-react";
import { useLang } from "../lib/i18n";

const EMAIL_KEY = "duroos-subscriber-email";

export function getStoredEmail(): string | null {
  try {
    return window.localStorage.getItem(EMAIL_KEY);
  } catch {
    return null;
  }
}

export function storeEmail(email: string) {
  try {
    window.localStorage.setItem(EMAIL_KEY, email);
  } catch {}
}

export type SubscribeOutcome = "ok" | "unavailable" | "error" | "invalid";

/** POST /api/subscribe. A 503 (or network failure) means the backend is not
 *  configured yet — callers show the subtle "coming soon" state. */
export async function apiSubscribe(
  email: string,
  scopeType?: "shaykh" | "book",
  scopeId?: string
): Promise<{ outcome: SubscribeOutcome; status?: string }> {
  try {
    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email, scopeType, scopeId }),
    });
    if (res.status === 503) return { outcome: "unavailable" };
    if (res.status === 400) return { outcome: "invalid" };
    if (!res.ok) return { outcome: "error" };
    const data = (await res.json()) as { status?: string };
    return { outcome: "ok", status: data.status };
  } catch {
    return { outcome: "unavailable" };
  }
}

/* ---------------- SubscribeBox ---------------- */

export function SubscribeBox() {
  const { ui } = useLang();
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "busy" | "done" | "soon" | "invalid">("idle");
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    const saved = getStoredEmail();
    if (saved) setEmail(saved);
  }, []);

  const submit = async () => {
    const value = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
      setState("invalid");
      return;
    }
    setState("busy");
    const { outcome, status } = await apiSubscribe(value);
    if (outcome === "ok") {
      storeEmail(value);
      setConfirmed(status === "confirmed");
      setState("done");
    } else if (outcome === "unavailable") {
      setState("soon");
    } else if (outcome === "invalid") {
      setState("invalid");
    } else {
      setState("soon");
    }
  };

  return (
    <section className="rounded-card bg-[var(--card)] p-6 shadow-soft">
      <h2 className="flex items-center gap-2 text-lg font-semibold text-[var(--ink)]">
        <Mail className="h-5 w-5 text-[var(--brand-accent)]" />
        {ui("subscribeTitle")}
      </h2>
      <p className="mt-2 text-sm leading-loose text-[var(--ink-soft)]">{ui("subscribeHint")}</p>
      {state === "done" ? (
        <p className="mt-4 inline-flex items-center gap-2 rounded-pill bg-[var(--status-active-bg)] px-4 py-2 text-sm font-semibold text-[var(--status-active-tx)]">
          <Check className="h-4 w-4" />
          {confirmed ? ui("alreadyConfirmed") : ui("checkEmail")}
        </p>
      ) : state === "soon" ? (
        <p className="mt-4 inline-flex items-center gap-2 rounded-pill bg-[var(--ceramic)] px-4 py-2 text-sm font-medium text-[var(--ink-soft)]">
          <Bell className="h-4 w-4" />
          {ui("alertsSoon")}
        </p>
      ) : (
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <input
            type="email"
            dir="ltr"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={ui("emailPlaceholder")}
            className="h-[50px] flex-1 rounded-pill bg-[var(--ceramic)] px-5 text-[15px] text-[var(--ink)] outline-none placeholder:text-[var(--ink-faint)] focus:ring-2 focus:ring-[var(--brand-accent)]"
          />
          <button
            onClick={submit}
            disabled={state === "busy"}
            className="inline-flex h-[50px] items-center justify-center gap-2 rounded-pill bg-[var(--brand-accent)] px-6 text-[15px] font-semibold text-white shadow-soft transition-transform active:scale-95 disabled:opacity-60"
          >
            <BellRing className="h-4 w-4" />
            {ui("subscribeBtn")}
          </button>
        </div>
      )}
      {state === "invalid" ? (
        <p className="mt-2 text-sm text-[var(--danger)]">{ui("invalidEmail")}</p>
      ) : null}
    </section>
  );
}

/* ---------------- BellToggle (per shaykh / per book) ---------------- */

export function BellToggle({
  scopeType,
  scopeId,
  label,
}: {
  scopeType: "shaykh" | "book";
  scopeId: string;
  label: string;
}) {
  const { ui } = useLang();
  const [state, setState] = useState<"idle" | "busy" | "done" | "soon" | "needEmail">("idle");
  const [email, setEmail] = useState("");

  const go = useCallback(
    async (value: string) => {
      setState("busy");
      const { outcome } = await apiSubscribe(value, scopeType, scopeId);
      if (outcome === "ok") {
        storeEmail(value);
        setState("done");
      } else if (outcome === "invalid") {
        setState("needEmail");
      } else {
        setState("soon");
      }
    },
    [scopeType, scopeId]
  );

  const click = () => {
    const saved = getStoredEmail();
    if (saved) void go(saved);
    else setState("needEmail");
  };

  if (state === "soon") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-pill bg-[var(--ceramic)] px-3 py-1.5 text-xs font-medium text-[var(--ink-soft)]">
        <Bell className="h-3.5 w-3.5" />
        {ui("alertsSoon")}
      </span>
    );
  }
  if (state === "done") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-pill bg-[var(--status-active-bg)] px-3 py-1.5 text-xs font-semibold text-[var(--status-active-tx)]">
        <BellRing className="h-3.5 w-3.5" />
        {ui("alertSet")}
      </span>
    );
  }
  if (state === "needEmail") {
    return (
      <span className="inline-flex flex-wrap items-center gap-2">
        <input
          type="email"
          dir="ltr"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={ui("emailPlaceholder")}
          className="h-9 w-44 rounded-pill bg-[var(--ceramic)] px-3 text-xs text-[var(--ink)] outline-none placeholder:text-[var(--ink-faint)] focus:ring-2 focus:ring-[var(--brand-accent)]"
        />
        <button
          onClick={() => {
            const v = email.trim().toLowerCase();
            if (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) void go(v);
          }}
          className="inline-flex h-9 items-center gap-1.5 rounded-pill bg-[var(--brand-accent)] px-3 text-xs font-semibold text-white active:scale-95"
        >
          <Bell className="h-3.5 w-3.5" />
          {ui("subscribeBtn")}
        </button>
        <span className="text-xs text-[var(--ink-soft)]">{ui("needEmailFirst")}</span>
      </span>
    );
  }
  return (
    <button
      onClick={click}
      disabled={state === "busy"}
      title={label}
      aria-label={label}
      className="inline-flex items-center gap-1.5 rounded-pill border border-[var(--brand)] px-3 py-1.5 text-xs font-semibold text-[var(--brand)] transition-transform active:scale-95 disabled:opacity-60"
    >
      <Bell className="h-3.5 w-3.5" />
      {label}
    </button>
  );
}
