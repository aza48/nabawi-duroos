"use client";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import { meshSeedQuestions, seedQuestionToListItem, type MeshListItem } from "@/data/mesh-seed";
import { DiscussionList } from "@/components/mesh/DiscussionList";

const CARDS = [
  { slug: "getting-started", pre: "Getting", accent: "Started", desc: "Admissions, paperwork, residency, and your first steps in Madinah.", tags: ["University admission", "Visa and Iqama", "Nafath", "Absher", "University registration"], visual: "started" },
  { slug: "getting-settled", pre: "Getting", accent: "Settled", desc: "Find housing, get connected, navigate the city, and settle into daily life.", tags: ["Accommodation", "Transport", "SIM cards", "Banking", "Groceries and essentials"], visual: "settled" },
  { slug: "getting-ready-to-leave", pre: "Getting Ready to", accent: "Leave", desc: "Travel plans, final paperwork, closing accounts, and moving on from Madinah.", tags: ["Exit procedures", "Travel", "Final paperwork", "Accommodation handover", "Closing accounts"], visual: "leave" },
] as const;

function CardVisual({ kind }: { kind: string }) {
  if (kind === "started") return (
    <div className="mesh-glass" style={{ minWidth: 240, flex: 1 }} aria-hidden>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <span style={{ background: "#fff", color: "#171717", fontWeight: 700, padding: "10px 18px", borderRadius: 999, fontSize: 15 }}>Nafath</span>
        <span style={{ background: "rgba(255,255,255,.12)", color: "#fff", fontWeight: 700, padding: "10px 18px", borderRadius: 999, fontSize: 15, border: "1px solid rgba(255,255,255,.25)" }}>Absher</span>
      </div>
      <div style={{ marginTop: 18, display: "grid", gap: 8 }}><div style={{ height: 8, borderRadius: 99, background: "rgba(255,255,255,.35)", width: "82%" }} /><div style={{ height: 8, borderRadius: 99, background: "rgba(54,184,117,.7)", width: "58%" }} /><div style={{ height: 8, borderRadius: 99, background: "rgba(255,255,255,.18)", width: "68%" }} /></div>
      <p style={{ fontSize: 11, color: "rgba(255,255,255,.6)", marginTop: 14 }}>Community guidance only — always check the official service for current steps.</p>
    </div>);
  if (kind === "settled") return (
    <div className="mesh-glass" style={{ minWidth: 240, flex: 1 }} aria-hidden>
      <svg viewBox="0 0 260 120" width="100%" height="110" role="img" aria-label="Minimal map of Madinah streets with location pins">
        <path d="M10 90 C60 70 90 95 130 55 S210 25 250 40" stroke="rgba(255,255,255,.4)" fill="none" strokeWidth="2" /><path d="M20 20 C70 45 120 30 160 70 S230 95 248 80" stroke="rgba(54,184,117,.8)" fill="none" strokeWidth="2" />
        <circle cx="70" cy="55" r="7" fill="#36B875" /><circle cx="170" cy="48" r="7" fill="#fff" /><circle cx="215" cy="78" r="7" fill="#36B875" />
      </svg>
      <div style={{ display: "flex", gap: 8, marginTop: 6 }}><span style={{ border: "1px solid rgba(255,255,255,.3)", borderRadius: 8, padding: "6px 10px", fontSize: 12 }}>SIM</span><span style={{ border: "1px solid rgba(255,255,255,.3)", borderRadius: 8, padding: "6px 10px", fontSize: 12 }}>Housing</span><span style={{ border: "1px solid rgba(54,184,117,.6)", borderRadius: 8, padding: "6px 10px", fontSize: 12, color: "#7ee2ae" }}>Transport</span></div>
    </div>);
  return (
    <div className="mesh-glass" style={{ minWidth: 240, flex: 1 }} aria-hidden>
      <div style={{ display: "flex", gap: 14 }}>
        <div style={{ width: 64, height: 84, borderRadius: 8, border: "2px solid rgba(255,255,255,.5)", display: "grid", placeItems: "center", fontSize: 10, letterSpacing: ".1em", color: "rgba(255,255,255,.8)" }}>PASS</div>
        <div style={{ flex: 1, display: "grid", gap: 8, alignContent: "start" }}>
          {["MADINAH → HOME", "CLEARANCE ✓", "HANDOVER"].map((r) => <div key={r} style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,.15)", paddingBottom: 6, fontSize: 12, fontFamily: "var(--font-inter)" }}><span>{r}</span><span style={{ color: "#36B875" }}>—</span></div>)}
        </div>
      </div>
    </div>);
}

export default function MeshHome() {
  const [items, setItems] = useState<MeshListItem[]>(() => meshSeedQuestions.map(seedQuestionToListItem));
  const [demo, setDemo] = useState(true);
  const [search, setSearch] = useState(""); const [cat, setCat] = useState("all"); const [sort, setSort] = useState("recent");
  useEffect(() => {
    fetch("/api/mesh/questions?limit=30").then(async (r) => { if (!r.ok) throw new Error("demo"); const d = await r.json(); if (Array.isArray(d.questions) && d.questions.length) { setItems(d.questions); setDemo(false); } }).catch(() => setDemo(true));
  }, []);
  const filtered = useMemo(() => {
    let list = [...items];
    if (cat !== "all") list = list.filter((i) => i.category_slug === cat || meshSeedQuestions.find((s) => s.id === i.id)?.categorySlug === cat);
    if (search.trim()) { const t = search.toLowerCase(); list = list.filter((i) => (i.title + i.body + (i.tags || []).join(" ")).toLowerCase().includes(t)); }
    if (sort === "top") list.sort((a, b) => b.vote_count - a.vote_count);
    else if (sort === "unanswered") list = list.filter((i) => i.answer_count === 0);
    else list.sort((a, b) => +new Date(b.created_at) - +new Date(a.created_at));
    return list;
  }, [items, cat, search, sort]);
  return (
    <div className="mesh-container">
      <section style={{ padding: "40px 0 28px", maxWidth: 720 }}>
        <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "#125934", margin: 0 }}>MESH · Medinah English Students Hub</p>
        <h1 style={{ fontSize: "clamp(32px,5vw,46px)", lineHeight: 1.08, margin: "12px 0", fontWeight: 800 }}>New to Madinah?<br /><span style={{ color: "#125934" }}>Find your footing.</span></h1>
        <p style={{ fontSize: 17, color: "#4D4D4D", margin: "0 0 20px" }}>Practical answers, local knowledge, and advice from students who’ve been there.</p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Link href="/mesh/browse" className="mesh-btn mesh-btn-primary mesh-focus">Browse Discussions</Link>
          <Link href="/mesh/ask" className="mesh-btn mesh-btn-outline mesh-focus">Ask a Question</Link>
        </div>
        {demo && <p style={{ fontSize: 12, color: "#8F8F8F", marginTop: 12 }}>Sample / demonstration content is shown below and labelled as such.</p>}
      </section>
      <section style={{ display: "grid", gap: 16 }} aria-label="Main categories">
        {CARDS.map((c) => (
          <Link key={c.slug} href={`/mesh/category/${c.slug}`} className="mesh-cat-card mesh-focus">
            <div style={{ flex: 1.2, minWidth: 240 }}>
              <h2 style={{ fontSize: "clamp(24px,3vw,32px)", margin: "0 0 8px", lineHeight: 1.15 }}>{c.pre} <span className="mesh-grad-text">{c.accent}</span></h2>
              <p style={{ color: "rgba(255,255,255,.75)", fontSize: 15, margin: "0 0 16px", maxWidth: 440 }}>{c.desc}</p>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>{c.tags.map((t) => <span key={t} style={{ fontSize: 11, border: "1px solid rgba(255,255,255,.22)", padding: "4px 9px", borderRadius: 999, color: "rgba(255,255,255,.85)" }}>{t}</span>)}</div>
              <span style={{ display: "inline-flex", gap: 6, alignItems: "center", marginTop: 18, fontWeight: 600, fontSize: 14 }}>Explore <ArrowRight size={16} className="mesh-arrow" /></span>
            </div>
            <CardVisual kind={c.visual} />
          </Link>
        ))}
      </section>
      <section style={{ padding: "40px 0 8px" }}>
        <h2 style={{ fontSize: 26, margin: "0 0 4px" }}>Recent Discussions</h2>
        <p style={{ color: "#4D4D4D", margin: "0 0 18px", fontSize: 14 }}>Questions, answers, and advice from the MESH community.</p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center", marginBottom: 8 }}>
          <div style={{ position: "relative", flex: 1, minWidth: 200 }}><Search size={16} style={{ position: "absolute", left: 10, top: 14, color: "#8F8F8F" }} /><input className="mesh-input mesh-focus" style={{ paddingLeft: 34 }} placeholder="Search discussions…" aria-label="Search discussions" value={search} onChange={(e) => setSearch(e.target.value)} /></div>
          <select className="mesh-input mesh-focus" style={{ width: "auto" }} aria-label="Sort discussions" value={sort} onChange={(e) => setSort(e.target.value)}><option value="recent">Recent</option><option value="top">Most Upvoted</option><option value="unanswered">Unanswered</option></select>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", margin: "10px 0" }}>
          {[["all", "All"], ["getting-started", "Getting Started"], ["getting-settled", "Getting Settled"], ["getting-ready-to-leave", "Getting Ready to Leave"]].map(([v, l]) => <button key={v} onClick={() => setCat(v)} className={`mesh-chip mesh-focus ${cat === v ? "mesh-chip-active" : ""}`}>{l}</button>)}
        </div>
        <DiscussionList items={filtered.slice(0, 8)} />
        <div style={{ padding: "20px 0" }}><Link href="/mesh/browse" style={{ color: "#125934", fontWeight: 600, textDecoration: "none" }}>View all discussions →</Link></div>
      </section>
      <section className="mesh-card" style={{ padding: 24, marginBottom: 16 }}>
        <h3 style={{ margin: "0 0 6px", fontSize: 18 }}>Browse by Topic</h3>
        <p style={{ fontSize: 14, color: "#4D4D4D", margin: "0 0 12px" }}>Start with the stage you are in, then narrow by subcategory on each category page.</p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>{CARDS.map((c) => <Link key={c.slug} href={`/mesh/category/${c.slug}`} className="mesh-chip mesh-focus">{c.pre} {c.accent}</Link>)}</div>
        <p style={{ fontSize: 14, color: "#4D4D4D", marginTop: 16 }}>Know an answer? <Link href="/mesh/browse" style={{ color: "#125934", fontWeight: 600 }}>Help another student by answering a question.</Link></p>
      </section>
    </div>
  );
}
