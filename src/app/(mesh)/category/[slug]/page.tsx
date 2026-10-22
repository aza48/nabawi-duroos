"use client";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Search } from "lucide-react";
import { meshCategories, meshSeedQuestions, seedQuestionToListItem, type MeshListItem } from "@/data/mesh-seed";
import { DiscussionList } from "@/components/mesh/DiscussionList";
import CategoryCard from "@/components/mesh/CategoryCard";
import { useMeshPrefs, pickLang } from "@/lib/mesh-i18n";

export default function CategoryPage() {
  const { lang, t } = useMeshPrefs();
  const params = useParams(); const slug = String(params.slug || "");
  const cat = meshCategories.find((c) => c.slug === slug);
  const subs = meshCategories.filter((c) => c.parentSlug === slug);
  const [items, setItems] = useState<MeshListItem[]>(() => meshSeedQuestions.map(seedQuestionToListItem));
  const [search, setSearch] = useState(""); const [sub, setSub] = useState("all"); const [sort, setSort] = useState("recent"); const [visible, setVisible] = useState(10);
  useEffect(() => { fetch(`/api/mesh/questions?category=${encodeURIComponent(slug)}&limit=100`).then(async (r) => { if (!r.ok) throw 0; const d = await r.json(); if (d.questions) { setItems(d.questions); } }).catch(() => {}); }, [slug]);
  const filtered = useMemo(() => {
    let list = items.filter((i) => { const s = meshSeedQuestions.find((x) => x.id === i.id); if (!s) return i.category_slug === slug; return s.categorySlug === slug || s.subcategorySlug === slug; });
    if (sub !== "all") list = list.filter((i) => meshSeedQuestions.find((x) => x.id === i.id)?.subcategorySlug === sub);
    if (search.trim()) { const q = search.toLowerCase(); list = list.filter((i) => (i.title + i.body + ((i as { title_ar?: string }).title_ar || "") + ((i as { body_ar?: string }).body_ar || "")).toLowerCase().includes(q)); }
    if (sort === "top") list.sort((a, b) => b.vote_count - a.vote_count); else if (sort === "unanswered") list = list.filter((i) => i.answer_count === 0); else list.sort((a, b) => +new Date(b.created_at) - +new Date(a.created_at));
    return list;
  }, [items, slug, sub, search, sort]);
  if (!cat) return <div className="mesh-container" style={{ padding: "48px 0" }}><h1>{t("cat.notFound")}</h1><Link href="/browse">{t("cat.backBrowse")}</Link></div>;
  const name = pickLang(lang, cat.name, cat.nameAr);
  const desc = pickLang(lang, cat.description, cat.descriptionAr);
  return <div className="mesh-container" style={{ padding: "40px 0 48px" }}>
    <nav style={{ fontSize: 13, color: "var(--mesh-muted)", marginBottom: 16 }}><Link href="/" style={{ color: "var(--mesh-accent)" }}>{t("common.home")}</Link> / {name}</nav>
    {cat.isMain ? <div style={{ marginBottom: 32 }}><CategoryCard slug={slug} variant="header" /></div> : <><h1 style={{ fontSize: 30, margin: "0 0 8px" }}>{name}</h1><p style={{ color: "var(--mesh-secondary)", margin: "0 0 8px" }}>{desc}</p></>}
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap", margin: "24px 0 20px" }}>
      <div className="mesh-search-wrap" style={{ minWidth: 220 }}><Search size={16} className="mesh-search-icon" /><input className="mesh-input mesh-focus mesh-search-input" placeholder={t("cat.searchPh")} aria-label={t("cat.searchAria")} value={search} onChange={(e) => setSearch(e.target.value)} /></div>
      <select className="mesh-input" style={{ width: "auto" }} aria-label={t("sort.aria")} value={sort} onChange={(e) => setSort(e.target.value)}><option value="recent">{t("sort.recent")}</option><option value="top">{t("sort.top")}</option><option value="unanswered">{t("sort.unanswered")}</option></select>
      <Link href="/ask" className="mesh-btn mesh-btn-primary">{t("nav.ask")}</Link>
    </div>
    {subs.length > 0 && <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 16 }}><button onClick={() => setSub("all")} className={`mesh-chip ${sub === "all" ? "mesh-chip-active" : ""}`}>{t("filter.all")}</button>{subs.map((s) => <button key={s.slug} onClick={() => setSub(s.slug)} className={`mesh-chip ${sub === s.slug ? "mesh-chip-active" : ""}`}>{pickLang(lang, s.name, s.nameAr)}</button>)}</div>}
    {slug === "getting-started" && <p style={{ fontSize: 13, color: "var(--mesh-secondary)", background: "var(--mesh-pale)", border: "1px solid var(--mesh-soft)", borderRadius: 8, padding: "14px 18px", marginBottom: 20 }}>{t("cat.notAffiliated")}</p>}
    <DiscussionList items={filtered.slice(0, visible)} />
    {visible < filtered.length && <button className="mesh-btn mesh-btn-outline" style={{ marginTop: 24 }} onClick={() => setVisible((v) => v + 10)}>{t("browse.loadMore")}</button>}
  </div>;
}
