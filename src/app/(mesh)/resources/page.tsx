"use client";
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { BookOpen, Clock, Heart, PenLine } from "lucide-react";
import { relativeTime } from "@/data/mesh-seed";
import { useMeshPrefs } from "@/lib/mesh-i18n";
import { AuthorName } from "@/components/mesh/UserBadge";
import { useMeshMe } from "@/components/mesh/MeshShell";
import ShareButton from "@/components/mesh/ShareButton";

type ArticleItem = {
  id: number; author_id: number | null; title: string; banner: string | null; excerpt: string;
  reading_minutes: number; status: string; is_seed: boolean; created_at: string; updated_at: string;
  author_name: string; author_role: string | null; author_country: string | null;
  like_count: number; liked_by_me: boolean;
};

const clamp2: React.CSSProperties = { display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" };

function ArticleCard({ item }: { item: ArticleItem }) {
  const { lang, t } = useMeshPrefs();
  return (
    <Link href={`/resources/${item.id}`} className="mesh-article-card">
      {item.banner
        ? <img src={item.banner} alt="" className="mesh-article-banner" loading="lazy" />
        : <div className="mesh-article-banner-empty"><BookOpen size={44} /></div>}
      <div style={{ padding: "20px 22px 22px", display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
          {item.is_seed && <span style={{ fontSize: 11, color: "var(--mesh-muted)", border: "1px solid var(--mesh-hairline)", padding: "1px 6px", borderRadius: 999 }}>{t("disc.sample")}</span>}
          {item.status === "draft" && <span style={{ fontSize: 11, fontWeight: 700, color: "var(--mesh-warning)", border: "1px solid var(--mesh-hairline)", padding: "1px 6px", borderRadius: 999, textTransform: "uppercase", letterSpacing: ".04em" }}>{t("res.draft")}</span>}
        </div>
        <span style={{ fontSize: 19, fontWeight: 700, lineHeight: 1.35, color: "var(--mesh-text)", ...clamp2 }}>{item.title}</span>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: "var(--mesh-secondary)", ...clamp2 }}>{item.excerpt}</p>
        <div style={{ marginTop: "auto", paddingTop: 6, display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center", fontSize: 12, color: "var(--mesh-muted)" }}>
          <AuthorName name={item.author_name} role={item.author_role} country={item.author_country} />
          <span>{relativeTime(item.created_at, lang)}</span>
          <span style={{ display: "inline-flex", gap: 5, alignItems: "center" }}><Clock size={13} /> {t("res.minRead").replace("{n}", String(item.reading_minutes))}</span>
          <span style={{ display: "inline-flex", gap: 4, alignItems: "center", marginInlineStart: "auto" }}>
            <span style={{ display: "inline-flex", gap: 5, alignItems: "center", color: item.liked_by_me ? "var(--mesh-accent)" : undefined }}>
              <Heart size={14} fill={item.liked_by_me ? "currentColor" : "none"} /> {item.like_count}
            </span>
            <ShareButton variant="icon" articleId={item.id} title={item.title} text={item.excerpt} />
          </span>
        </div>
      </div>
    </Link>
  );
}

function Inner() {
  const { t } = useMeshPrefs();
  const sp = useSearchParams();
  const { me } = useMeshMe();
  const isWriter = !!me && (me.role === "mandoob" || me.role === "contributor" || me.role === "admin");
  const [tab, setTab] = useState<"all" | "mine">(sp.get("tab") === "mine" ? "mine" : "all");
  const [items, setItems] = useState<ArticleItem[] | null>(null);
  const [state, setState] = useState<"loading" | "ready" | "demo">("loading");

  useEffect(() => {
    if (tab === "mine" && !isWriter) { setTab("all"); return; }
    setState("loading");
    const scope = tab === "mine" ? "mine" : "published";
    fetch(`/api/mesh/articles?scope=${scope}`).then(async (r) => {
      if (!r.ok) { setState("demo"); setItems([]); return; }
      const d = await r.json();
      setItems(d.articles ?? []);
      setState("ready");
    }).catch(() => { setState("demo"); setItems([]); });
  }, [tab, isWriter]);

  return (
    <div className="mesh-container" style={{ padding: "36px 0 56px" }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
        <div style={{ maxWidth: 640 }}>
          <h1 style={{ fontSize: 30, margin: "0 0 8px" }}>{t("res.title")}</h1>
          <p style={{ margin: 0, color: "var(--mesh-secondary)", fontSize: 15, lineHeight: 1.65 }}>{t("res.sub")}</p>
        </div>
        {isWriter && <Link href="/resources/write" className="mesh-btn mesh-btn-primary mesh-focus"><PenLine size={16} /> {t("res.write")}</Link>}
      </div>

      {isWriter && (
        <div style={{ display: "flex", gap: 8, marginTop: 26 }} role="tablist" aria-label={t("res.title")}>
          <button className={`mesh-chip mesh-focus${tab === "all" ? " mesh-chip-active" : ""}`} onClick={() => setTab("all")}>{t("res.all")}</button>
          <button className={`mesh-chip mesh-focus${tab === "mine" ? " mesh-chip-active" : ""}`} onClick={() => setTab("mine")}>{t("res.mine")}</button>
        </div>
      )}

      {state === "loading" && <p style={{ color: "var(--mesh-secondary)", marginTop: 28 }}>{t("common.loading")}</p>}
      {state === "demo" && <div className="mesh-card" style={{ padding: 24, marginTop: 28 }}><p style={{ margin: 0, fontSize: 14, color: "var(--mesh-secondary)" }}>{t("demo.note")}</p></div>}
      {state === "ready" && items && items.length === 0 && (
        <div className="mesh-card" style={{ padding: 32, marginTop: 28, textAlign: "center", color: "var(--mesh-secondary)" }}>
          <p style={{ margin: 0, fontWeight: 600, color: "var(--mesh-text)" }}>{tab === "mine" ? t("res.emptyMine") : t("res.empty")}</p>
        </div>
      )}
      {state === "ready" && items && items.length > 0 && (
        <div className="mesh-article-grid" style={{ marginTop: 26 }}>
          {items.map((a) => <ArticleCard key={a.id} item={a} />)}
        </div>
      )}
    </div>
  );
}

export default function ResourcesPage() {
  const { t } = useMeshPrefs();
  return <Suspense fallback={<div className="mesh-container" style={{ padding: "36px 0" }}>{t("common.loading")}</div>}><Inner /></Suspense>;
}
