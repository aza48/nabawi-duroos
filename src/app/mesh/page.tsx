"use client";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { meshCategories, meshSeedQuestions, seedQuestionToListItem, type MeshListItem } from "@/data/mesh-seed";
import { DiscussionList } from "@/components/mesh/DiscussionList";
import CategoryCard from "@/components/mesh/CategoryCard";
import { useMeshPrefs, pickLang } from "@/lib/mesh-i18n";

const MAIN_SLUGS = ["getting-started", "getting-settled", "getting-ready-to-leave"];

export default function MeshHome() {
  const { lang, t } = useMeshPrefs();
  const [items, setItems] = useState<MeshListItem[]>(() => meshSeedQuestions.map(seedQuestionToListItem));
  const [demo, setDemo] = useState(true);
  const [search, setSearch] = useState(""); const [cat, setCat] = useState("all"); const [sort, setSort] = useState("recent");
  useEffect(() => {
    fetch("/api/mesh/questions?limit=30").then(async (r) => { if (!r.ok) throw new Error("demo"); const d = await r.json(); if (Array.isArray(d.questions) && d.questions.length) { setItems(d.questions); setDemo(false); } }).catch(() => setDemo(true));
  }, []);
  const filtered = useMemo(() => {
    let list = [...items];
    if (cat !== "all") list = list.filter((i) => i.category_slug === cat || meshSeedQuestions.find((s) => s.id === i.id)?.categorySlug === cat);
    if (search.trim()) { const q = search.toLowerCase(); list = list.filter((i) => (i.title + i.body + ((i as { title_ar?: string }).title_ar || "") + ((i as { body_ar?: string }).body_ar || "") + (i.tags || []).join(" ")).toLowerCase().includes(q)); }
    if (sort === "top") list.sort((a, b) => b.vote_count - a.vote_count);
    else if (sort === "unanswered") list = list.filter((i) => i.answer_count === 0);
    else list.sort((a, b) => +new Date(b.created_at) - +new Date(a.created_at));
    return list;
  }, [items, cat, search, sort]);
  const mains = meshCategories.filter((c) => c.isMain);
  return (
    <div className="mesh-container">
      <section style={{ padding: "56px 0 48px", maxWidth: 720 }}>
        <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--mesh-accent)", margin: 0 }}>{t("hero.kicker")}</p>
        <h1 style={{ fontSize: "clamp(32px,5vw,46px)", lineHeight: 1.12, margin: "16px 0 12px", fontWeight: 800 }}>{t("hero.h1a")}<br /><span style={{ color: "var(--mesh-accent)" }}>{t("hero.h1b")}</span></h1>
        <div className="mesh-fade-line" aria-hidden />
        <p style={{ fontSize: 17, lineHeight: 1.65, color: "var(--mesh-secondary)", margin: "18px 0 26px" }}>{t("hero.sub")}</p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link href="/mesh/browse" className="mesh-btn mesh-btn-primary mesh-focus">{t("hero.browse")}</Link>
          <Link href="/mesh/ask" className="mesh-btn mesh-btn-outline mesh-focus">{t("hero.ask")}</Link>
        </div>
        {demo && <p style={{ fontSize: 12, color: "var(--mesh-muted)", marginTop: 16 }}>{t("demo.note")}</p>}
      </section>
      <section style={{ display: "grid", gap: 20 }} aria-label={t("home.categoriesAria")}>
        {MAIN_SLUGS.map((slug) => <CategoryCard key={slug} slug={slug} />)}
      </section>
      <section style={{ marginTop: 48, padding: "0 0 8px" }}>
        <h2 style={{ fontSize: 26, margin: "0 0 6px" }}>{t("home.recent")}</h2>
        <p style={{ color: "var(--mesh-secondary)", margin: "0 0 24px", fontSize: 14 }}>{t("home.recentSub")}</p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center", marginBottom: 12 }}>
          <div className="mesh-search-wrap" style={{ minWidth: 220 }}><Search size={16} className="mesh-search-icon" /><input className="mesh-input mesh-focus mesh-search-input" placeholder={t("home.searchPh")} aria-label={t("nav.searchAria")} value={search} onChange={(e) => setSearch(e.target.value)} /></div>
          <select className="mesh-input mesh-focus" style={{ width: "auto" }} aria-label={t("sort.aria")} value={sort} onChange={(e) => setSort(e.target.value)}><option value="recent">{t("sort.recent")}</option><option value="top">{t("sort.top")}</option><option value="unanswered">{t("sort.unanswered")}</option></select>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", margin: "14px 0 6px" }}>
          <button onClick={() => setCat("all")} className={`mesh-chip mesh-focus ${cat === "all" ? "mesh-chip-active" : ""}`}>{t("filter.all")}</button>
          {mains.map((c) => <button key={c.slug} onClick={() => setCat(c.slug)} className={`mesh-chip mesh-focus ${cat === c.slug ? "mesh-chip-active" : ""}`}>{pickLang(lang, c.name, c.nameAr)}</button>)}
        </div>
        <DiscussionList items={filtered.slice(0, 8)} />
        <div style={{ padding: "28px 0" }}><Link href="/mesh/browse" style={{ color: "var(--mesh-accent)", fontWeight: 600, textDecoration: "none" }}>{t("home.viewAll")} →</Link></div>
      </section>
      <section className="mesh-card" style={{ padding: 28, marginBottom: 24 }}>
        <h3 style={{ margin: "0 0 8px", fontSize: 18 }}>{t("home.browseTopic")}</h3>
        <p style={{ fontSize: 14, color: "var(--mesh-secondary)", margin: "0 0 16px" }}>{t("home.browseTopicSub")}</p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>{mains.map((c) => <Link key={c.slug} href={`/mesh/category/${c.slug}`} className="mesh-chip mesh-focus">{pickLang(lang, c.name, c.nameAr)}</Link>)}</div>
        <p style={{ fontSize: 14, color: "var(--mesh-secondary)", marginTop: 20 }}>{t("home.help")} <Link href="/mesh/browse" style={{ color: "var(--mesh-accent)", fontWeight: 600 }}>{t("home.helpLink")}</Link></p>
      </section>
    </div>
  );
}
