"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowUp } from "lucide-react";

export default function VoteButton({ targetType, targetId, initialCount, initialVoted, isLoggedIn, demoMode }: { targetType: "question" | "answer"; targetId: number; initialCount: number; initialVoted: boolean; isLoggedIn: boolean; demoMode: boolean }) {
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
      <button onClick={toggle} disabled={busy} aria-label={voted ? "Remove upvote" : "Upvote"} aria-pressed={voted} title={demoMode ? "Sign in and database required" : undefined}
        className="mesh-focus" style={{ width: 40, height: 40, borderRadius: 999, border: `1px solid ${voted ? "#125934" : "#EBEBEB"}`, background: voted ? "#125934" : "#fff", color: voted ? "#fff" : "#171717", cursor: "pointer", display: "grid", placeItems: "center" }}>
        <ArrowUp size={18} />
      </button>
      <span style={{ fontWeight: 700, fontSize: 14 }}>{count}</span>
      {prompt && <span style={{ fontSize: 12, color: "#4D4D4D", textAlign: "center", maxWidth: 140 }}>{demoMode ? "Voting activates when the database is connected. " : ""}<Link href={`/mesh/login?next=${typeof window !== "undefined" ? encodeURIComponent(window.location.pathname) : "/mesh"}`} style={{ color: "#125934", fontWeight: 600 }}>Sign in to vote</Link></span>}
    </div>
  );
}
