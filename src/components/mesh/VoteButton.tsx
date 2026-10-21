"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { useMeshPrefs } from "@/lib/mesh-i18n";

export default function VoteButton({ targetType, targetId, initialCount, initialVoted, isLoggedIn, demoMode }: { targetType: "question" | "answer"; targetId: number; initialCount: number; initialVoted: boolean; isLoggedIn: boolean; demoMode: boolean }) {
  const { t } = useMeshPrefs();
  const [count, setCount] = useState(initialCount);
  const [voted, setVoted] = useState(initialVoted);
  const [busy, setBusy] = useState(false);
  const [prompt, setPrompt] = useState(false);
  async function toggle() {
    if (demoMode) { setPrompt(true); return; }
    if (!isLoggedIn) { setPrompt(true); return; }
    if (busy) return; setBusy(true);
    try {
      const r = await fetch("/api/mesh/vote", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ targetType, targetId }) });
      const d = await r.json();
      if (r.ok) { setVoted(d.voted); setCount(d.count); } else if (r.status === 401) setPrompt(true);
    } finally { setBusy(false); }
  }
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
      <button onClick={toggle} disabled={busy} aria-label={voted ? t("vote.remove") : t("vote.upvote")} aria-pressed={voted} title={demoMode ? t("vote.activates") : undefined}
        className="mesh-focus" style={{ width: 40, height: 40, borderRadius: 999, border: `1px solid ${voted ? "var(--mesh-primary)" : "var(--mesh-hairline)"}`, background: voted ? "var(--mesh-primary)" : "var(--mesh-surface)", color: voted ? "var(--mesh-on-primary)" : "var(--mesh-text)", cursor: "pointer", display: "grid", placeItems: "center" }}>
        <ArrowUp size={18} />
      </button>
      <span style={{ fontWeight: 700, fontSize: 14 }}>{count}</span>
      {prompt && <span style={{ fontSize: 12, color: "var(--mesh-secondary)", textAlign: "center", maxWidth: 140 }}>{demoMode ? t("vote.activates") + " " : ""}<Link href={`/mesh/login?next=${typeof window !== "undefined" ? encodeURIComponent(window.location.pathname) : "/mesh"}`} style={{ color: "var(--mesh-accent)", fontWeight: 600 }}>{t("vote.signIn")}</Link></span>}
    </div>
  );
}
