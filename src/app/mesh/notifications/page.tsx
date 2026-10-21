"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { relativeTime } from "@/data/mesh-seed";
import { useMeshPrefs } from "@/lib/mesh-i18n";

type Notif = { id: number; type: string; question_id: number | null; question_title: string | null; actor_name: string | null; read_at: string | null; created_at: string };

export default function NotificationsPage() {
  const { lang, t } = useMeshPrefs();
  const [items, setItems] = useState<Notif[] | null>(null);
  const [state, setState] = useState<"loading" | "ready" | "anon" | "demo">("loading");

  useEffect(() => {
    fetch("/api/mesh/notifications").then(async (r) => {
      if (r.status === 401) { setState("anon"); return; }
      if (!r.ok) { setState("demo"); return; }
      const d = await r.json();
      setItems(d.notifications ?? []);
      setState("ready");
      // Opening the page marks everything read (the sidebar badge refreshes on the next /auth/me fetch).
      fetch("/api/mesh/notifications/read", { method: "POST" }).catch(() => {});
    }).catch(() => setState("demo"));
  }, []);

  async function markAll() {
    await fetch("/api/mesh/notifications/read", { method: "POST" }).catch(() => {});
    setItems((prev) => prev ? prev.map((n) => ({ ...n, read_at: n.read_at ?? new Date().toISOString() })) : prev);
  }

  function sentence(n: Notif): string {
    const actor = n.actor_name || t("ev.someone");
    const title = n.question_title || "MESH";
    if (n.type === "outdated_flag") return t("notif.outdatedFlag").replace("{actor}", actor).replace("{title}", title);
    return t("notif.generic").replace("{title}", title);
  }

  return (
    <div className="mesh-container" style={{ padding: "36px 0 48px", maxWidth: 760 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
        <h1 style={{ fontSize: 26, margin: 0 }}>{t("notif.title")}</h1>
        {state === "ready" && items && items.some((n) => !n.read_at) && (
          <button className="mesh-btn mesh-btn-outline mesh-btn-sm mesh-focus" onClick={markAll}>{t("notif.markAll")}</button>
        )}
      </div>
      {state === "loading" && <p style={{ color: "var(--mesh-secondary)", marginTop: 24 }}>{t("common.loading")}</p>}
      {state === "anon" && <div className="mesh-card" style={{ padding: 22, marginTop: 24 }}><p style={{ margin: "0 0 14px", fontSize: 14, color: "var(--mesh-secondary)" }}>{t("notif.signin")}</p><Link href="/mesh/login?next=/mesh/notifications" className="mesh-btn mesh-btn-primary mesh-btn-sm">{t("nav.login")}</Link></div>}
      {state === "demo" && <p style={{ color: "var(--mesh-secondary)", marginTop: 24 }}>{t("demo.note")}</p>}
      {state === "ready" && items && items.length === 0 && <p style={{ color: "var(--mesh-secondary)", marginTop: 24 }}>{t("notif.empty")}</p>}
      {state === "ready" && items && items.length > 0 && (
        <div className="mesh-card" style={{ marginTop: 24, overflow: "hidden" }}>
          {items.map((n) => {
            const row = (
              <div style={{ display: "flex", justifyContent: "space-between", gap: 16, alignItems: "baseline" }}>
                <span style={{ fontSize: 14.5, lineHeight: 1.6, fontWeight: n.read_at ? 400 : 600 }}>{sentence(n)}</span>
                <span style={{ fontSize: 12, color: "var(--mesh-muted)", whiteSpace: "nowrap" }}>{relativeTime(n.created_at, lang)}</span>
              </div>
            );
            const style: React.CSSProperties = { display: "block", padding: "16px 20px", borderBottom: "1px solid var(--mesh-hairline)", background: n.read_at ? "transparent" : "var(--mesh-pale)", color: "var(--mesh-text)", textDecoration: "none" };
            return n.question_id
              ? <Link key={n.id} href={`/mesh/question/${n.question_id}`} style={style}>{row}</Link>
              : <div key={n.id} style={style}>{row}</div>;
          })}
        </div>
      )}
    </div>
  );
}
