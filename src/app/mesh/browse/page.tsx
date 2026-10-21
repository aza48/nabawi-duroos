"use client";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Search } from "lucide-react";
import { meshCategories, meshSeedQuestions, seedQuestionToListItem, type MeshListItem } from "@/data/mesh-seed";
import { DiscussionList } from "@/components/mesh/DiscussionList";
import { useMeshPrefs, pickLang } from "@/lib/mesh-i18n";

function Inner() {
  const { lang, t } = useMeshPrefs();
  const sp = useSearchParams();
  const [items, setItems] = useState<MeshListItem[]>(() => meshSeedQuestions.map(seedQuestionToListItem));
  const [demo, setDemo] = useState(true);
  const [search, setSearch] = useState(sp.get("q") || "");
  const [cat, setCat] = useState("all"); const [sub, setSub] = useState("all"); const [sort, setSort] = useState("recent"); const [visible, setVisible] = useState(10);
  useEffect(() => { fetch("/api/mesh/questions?limit=100").then(async (r) => { if (!r.ok) throw 0; const d = await r.json(); if (d.questions?.length) { setItems(d.questions); setDemo(false); } }).catch(() => setDemo(true)); }, []);
  useEffect(() => { setSearch(sp.get("q") || ""); }, [sp]);
  const subs = useMemo(() => meshCategories.filter((c) => !c.isMain && (cat === "all" || c.parentSlug === cat)), [cat]);
  const filtered = useMemo(() => {
    let list = [...items];
    if (cat !== "all") list = list.filter((i) => { const s = meshSeedQuestions.find((x) => x.id === i.id); return i.category_slug === cat || s?.categorySlug === cat || s?.subcategorySlug === cat; });
    if (sub !== "all") list = list.filter((i) => { const s = meshSeedQuestions.find((x) => x.id === i.id); return s?.subcategorySlug === sub || i.category_slug === sub; });
    if (search.trim()) { const q = search.toLowerCase(); list = list.filter((i) => (i.title + i.body + ((i as { title_ar?: string }).title_ar || "") + ((i as { body_ar?: string }).body_ar || "") + (i.tags || []).join(" ") + i.category_name).toLowerCase().includes(q)); }
    if (sort === "top") list.sort((a, b) => b.vote_count - a.vote_count); else if (sort === "unanswered") list = list.filter((i) => i.answer_count === 0); else list.sort((a, b) => +new Date(b.created_at) - +new Date(a.created_at));
    return list;
  }, [items, cat, sub, search, sort]);
  return <div className="mesh-container" style={{ padding: "40px 0 48px" }}>
    <h1 style={{ fontSize: 32, margin: "0 0 8px" }}>{t("browse.title")}</h1>
    <p style={{ color: "var(--mesh-secondary)", margin: "0 0 28px" }}>{t("browse.sub")} {demo && <span>{t("browse.subDemo")}</span>}</p>
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 16 }}>
      <div className="mesh-search-wrap" style={{ minWidth: 240 }}><Search size={16} className="mesh-search-icon" /><input className="mesh-input mesh-focus mesh-search-input" placeholder={t("browse.searchPh")} aria-label={t("nav.searchAria")} value={search} onChange={(e) => setSearch(e.target.value)} /></div>
      <select className="mesh-input mesh-focus" style={{ width: "auto" }} aria-label={t("sort.aria")} value={sort} onChange={(e) => setSort(e.target.value)}><option value="recent">{t("sort.recent")}</option><option value="top">{t("sort.top")}</option><option value="unanswered">{t("sort.unanswered")}</option></select>
      <Link href="/mesh/ask" className="mesh-btn mesh-btn-primary">{t("nav.ask")}</Link>
    </div>
    <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 12 }}>
      <button onClick={() => { setCat("all"); setSub("all"); }} className={`mesh-chip mesh-focus ${cat === "all" ? "mesh-chip-active" : ""}`}>{t("filter.all")}</button>
      {meshCategories.filter((c) => c.isMain).map((c) => <button key={c.slug} onClick={() => { setCat(c.slug); setSub("all"); }} className={`mesh-chip mesh-focus ${cat === c.slug ? "mesh-chip-active" : ""}`}>{pickLang(lang, c.name, c.nameAr)}</button>)}
    </div>
    {subs.length > 0 && <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 12 }}><button onClick={() => setSub("all")} className={`mesh-chip ${sub === "all" ? "mesh-chip-active" : ""}`}>{t("browse.allSubcats")}</button>{subs.map((s) => <button key={s.slug} onClick={() => setSub(s.slug)} className={`mesh-chip ${sub === s.slug ? "mesh-chip-active" : ""}`}>{pickLang(lang, s.name, s.nameAr)}</button>)}</div>}
    <DiscussionList items={filtered.slice(0, visible)} />
    {visible < filtered.length && <button className="mesh-btn mesh-btn-outline" style={{ marginTop: 24 }} onClick={() => setVisible((v) => v + 10)}>{t("browse.loadMore")} ({filtered.length - visible} {t("browse.remaining")})</button>}
  </div>;
}
export default function BrowsePage() { const { t } = useMeshPrefs(); return <Suspense fallback={<div className="mesh-container" style={{ padding: "40px 0" }}>{t("browse.loading")}</div>}><Inner /></Suspense>; }
