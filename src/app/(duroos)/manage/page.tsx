"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { BellRing, Check } from "lucide-react";
import { useLang } from "../../../lib/i18n";
import { BookScope, ShaykhScope } from "../../../lib/scopes";
import { StandaloneShell } from "../../../components/StandaloneShell";
import { PillButton } from "../../../components/ui";

interface ManageData {
  email: string;
  status: string;
  subscriptions: { scopeType: string; scopeId: string }[];
  catalogue: { shaykhs: ShaykhScope[]; books: BookScope[] };
}

/**
 * Selection keys are the scope ids themselves for shaykhs (already prefixed
 * "shaykh:<slug>") and "book:<lessonId>" for books.
 */
function keyOf(scopeType: string, scopeId: string): string {
  return scopeType === "book" ? `book:${scopeId}` : scopeId;
}
function parseKey(key: string): { scopeType: string; scopeId: string } {
  return key.startsWith("book:")
    ? { scopeType: "book", scopeId: key.slice("book:".length) }
    : { scopeType: "shaykh", scopeId: key };
}

function ManageInner() {
  const { t, ui } = useLang();
  const params = useSearchParams();
  const token = params.get("token") ?? "";
  const [data, setData] = useState<ManageData | null>(null);
  const [state, setState] = useState<"loading" | "invalid" | "soon" | "ready">("loading");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [saved, setSaved] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!token) {
      setState("invalid");
      return;
    }
    fetch(`/api/manage?token=${encodeURIComponent(token)}`)
      .then(async (r) => {
        if (r.status === 503) return setState("soon");
        if (!r.ok) return setState("invalid");
        const d = (await r.json()) as ManageData;
        setData(d);
        setSelected(new Set(d.subscriptions.map((s) => keyOf(s.scopeType, s.scopeId))));
        setState("ready");
      })
      .catch(() => setState("soon"));
  }, [token]);

  const toggle = (key: string) => {
    setSaved(false);
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const save = async () => {
    setBusy(true);
    const subscriptions = Array.from(selected).map(parseKey);
    const res = await fetch("/api/manage", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ manageToken: token, subscriptions }),
    });
    setBusy(false);
    if (res.ok) setSaved(true);
  };

  if (state === "loading") {
    return (
      <div className="animate-pulse rounded-card bg-[var(--card)] p-6 shadow-soft">
        <div className="h-4 w-2/5 rounded bg-[var(--ceramic)]" />
        <div className="mt-3 h-4 w-4/5 rounded bg-[var(--ceramic)]" />
      </div>
    );
  }
  if (state === "soon") {
    return (
      <div className="rounded-card bg-[var(--card)] p-6 text-center shadow-soft">
        <p className="font-semibold text-[var(--ink)]">{ui("alertsSoon")}</p>
      </div>
    );
  }
  if (state === "invalid" || !data) {
    return (
      <div className="rounded-card bg-[var(--card)] p-6 text-center shadow-soft">
        <p className="font-semibold text-[var(--ink)]">{ui("invalidLink")}</p>
        <a href="/duroos" className="mt-3 inline-block text-sm font-medium text-[var(--brand)] hover:underline">
          {ui("backHome")}
        </a>
      </div>
    );
  }

  const chip = (active: boolean) =>
    `inline-flex items-center gap-1.5 rounded-pill px-4 py-2 text-sm font-medium transition-all active:scale-95 ${
      active
        ? "bg-[var(--brand-deep)] text-white shadow-soft"
        : "bg-[var(--card)] text-[var(--ink-soft)] shadow-soft"
    }`;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="flex items-center gap-2 text-2xl font-semibold text-[var(--ink)]">
          <BellRing className="h-6 w-6 text-[var(--brand-accent)]" />
          {ui("manageTitle")}
        </h1>
        <p className="mt-2 text-sm text-[var(--ink-soft)]">
          {ui("yourEmail")}:{" "}
          <span dir="ltr" className="font-medium text-[var(--ink)]">
            {data.email}
          </span>
        </p>
        {data.status !== "confirmed" ? (
          <p className="mt-3 rounded-card bg-[var(--status-pause-bg)] px-4 py-3 text-sm text-[var(--status-pause-tx)]">
            {ui("notConfirmedYet")}
          </p>
        ) : (
          <p className="mt-1 text-sm text-[var(--ink-soft)]">{ui("manageHint")}</p>
        )}
      </div>

      <section>
        <h2 className="mb-3 text-lg font-semibold text-[var(--ink)]">{ui("shaykh")}</h2>
        <div className="flex flex-wrap gap-2">
          {data.catalogue.shaykhs.map((s) => {
            const active = selected.has(s.id);
            return (
              <button key={s.id} onClick={() => toggle(s.id)} className={chip(active)}>
                {active ? <Check className="h-4 w-4" /> : null}
                {t(s.name)}
              </button>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-semibold text-[var(--ink)]">{ui("book")}</h2>
        <div className="space-y-5">
          {data.catalogue.shaykhs.map((s) => {
            const books = data.catalogue.books.filter((b) => b.shaykhId === s.id);
            if (books.length === 0) return null;
            return (
              <div key={s.id}>
                <p className="mb-2 text-sm font-semibold text-[var(--ink-soft)]">{t(s.name)}</p>
                <div className="flex flex-wrap gap-2">
                  {books.map((b) => {
                    const key = keyOf("book", b.id);
                    const active = selected.has(key);
                    return (
                      <button key={b.id} onClick={() => toggle(key)} className={chip(active)}>
                        {active ? <Check className="h-4 w-4" /> : null}
                        {t(b.book)}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <div className="flex flex-wrap items-center gap-3">
        <PillButton onClick={save} className={busy ? "opacity-60" : ""}>
          {ui("saveChanges")}
        </PillButton>
        {saved ? (
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--status-active-tx)]">
            <Check className="h-4 w-4" /> {ui("changesSaved")}
          </span>
        ) : null}
      </div>
    </div>
  );
}

export default function ManagePage() {
  return (
    <StandaloneShell>
      <Suspense fallback={null}>
        <ManageInner />
      </Suspense>
    </StandaloneShell>
  );
}
