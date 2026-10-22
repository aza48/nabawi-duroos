"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Clock, Heart, Pencil, Trash2 } from "lucide-react";
import { relativeTime } from "@/data/mesh-seed";
import { useMeshPrefs } from "@/lib/mesh-i18n";
import { AuthorName } from "@/components/mesh/UserBadge";
import { useMeshMe } from "@/components/mesh/MeshShell";
import ShareButton from "@/components/mesh/ShareButton";

type Article = {
  id: number; author_id: number | null; title: string; banner: string | null; body_html: string; excerpt: string;
  reading_minutes: number; status: string; is_seed: boolean; created_at: string; updated_at: string;
  author_name: string; author_role: string | null; author_country: string | null;
  like_count: number; liked_by_me: boolean;
};

export default function ArticleReader({ id }: { id: string }) {
  const { lang, t } = useMeshPrefs();
  const router = useRouter();
  const { me } = useMeshMe();
  const [article, setArticle] = useState<Article | null>(null);
  const [state, setState] = useState<"loading" | "ready" | "notfound" | "demo">("loading");
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetch(`/api/mesh/articles/${id}`).then(async (r) => {
      if (r.status === 404) { setState("notfound"); return; }
      if (!r.ok) { setState("demo"); return; }
      const d = await r.json();
      setArticle(d.article);
      setLiked(!!d.article.liked_by_me);
      setLikeCount(d.article.like_count ?? 0);
      setState("ready");
    }).catch(() => setState("demo"));
  }, [id]);

  async function toggleLike() {
    if (!me) { router.push(`/login?next=/resources/${id}`); return; }
    const r = await fetch(`/api/mesh/articles/${id}/like`, { method: "POST" }).catch(() => null);
    if (r && r.status === 401) { router.push(`/login?next=/resources/${id}`); return; }
    if (r && r.ok) { const d = await r.json(); setLiked(d.liked); setLikeCount(d.like_count); }
  }

  async function remove() {
    if (!window.confirm(t("res.deleteConfirm")) || deleting) return;
    setDeleting(true);
    const r = await fetch(`/api/mesh/articles/${id}`, { method: "DELETE" }).catch(() => null);
    setDeleting(false);
    if (r && r.ok) router.push("/resources");
  }

  const canManage = !!article && !!me && (me.role === "admin" || me.id === article.author_id);
  const wasEdited = !!article && new Date(article.updated_at).getTime() - new Date(article.created_at).getTime() > 60_000;

  // Like + Share sit together, X-articles style: same pill height, even gap.
  const actions = article ? (
    <div className="mesh-article-actions">
      <button onClick={toggleLike} className={`mesh-btn mesh-focus ${liked ? "mesh-btn-primary" : "mesh-btn-outline"}`} aria-pressed={liked} title={me ? t("res.like") : t("res.loginToLike")}>
        <Heart size={16} fill={liked ? "currentColor" : "none"} /> {likeCount} · {t("res.like")}
      </button>
      <ShareButton articleId={article.id} title={article.title} text={article.excerpt} />
    </div>
  ) : null;

  return (
    <div className="mesh-container mesh-article-page" style={{ padding: "30px 0 56px", maxWidth: 820 }}>
      <Link href="/resources" style={{ display: "inline-flex", gap: 7, alignItems: "center", fontSize: 14, fontWeight: 600, color: "var(--mesh-accent)", textDecoration: "none" }}>
        <ArrowLeft size={15} className="mesh-flip-rtl" /> {t("res.back")}
      </Link>

      {state === "loading" && <p style={{ color: "var(--mesh-secondary)", marginTop: 28 }}>{t("common.loading")}</p>}
      {state === "notfound" && <div className="mesh-card" style={{ padding: 26, marginTop: 24 }}><p style={{ margin: 0, fontWeight: 600 }}>{t("res.notFound")}</p></div>}
      {state === "demo" && <div className="mesh-card" style={{ padding: 26, marginTop: 24 }}><p style={{ margin: 0, fontSize: 14, color: "var(--mesh-secondary)" }}>{t("demo.note")}</p></div>}

      {state === "ready" && article && (
        <article style={{ marginTop: 22 }}>
          {article.status === "draft" && (
            <div style={{ background: "var(--mesh-pale)", border: "1px solid var(--mesh-soft)", color: "var(--mesh-accent)", fontSize: 13.5, padding: "10px 14px", borderRadius: 10, marginBottom: 18 }}>
              <strong>{t("res.draft")}.</strong> {t("res.draftNote")}
            </div>
          )}
          {article.banner && <img src={article.banner} alt="" className="mesh-article-banner" style={{ borderRadius: 16, marginBottom: 26 }} />}
          <h1 style={{ fontSize: 34, lineHeight: 1.2, margin: "0 0 14px" }}>{article.title}</h1>
          <div style={{ display: "flex", gap: 14, rowGap: 10, flexWrap: "wrap", alignItems: "center", fontSize: 13, color: "var(--mesh-muted)" }}>
            <Link href={article.author_id ? `/profile/${article.author_id}` : "#"} style={{ color: "inherit", textDecoration: "none" }}>
              <AuthorName name={article.author_name} role={article.author_role} country={article.author_country} />
            </Link>
            <span>{relativeTime(article.created_at, lang)}</span>
            {wasEdited && <span>{t("res.updated")} {relativeTime(article.updated_at, lang)}</span>}
            <span style={{ display: "inline-flex", gap: 5, alignItems: "center" }}><Clock size={13} /> {t("res.minRead").replace("{n}", String(article.reading_minutes))}</span>
            {article.is_seed && <span style={{ fontSize: 11, color: "var(--mesh-muted)", border: "1px solid var(--mesh-hairline)", padding: "1px 6px", borderRadius: 999 }}>{t("disc.sample")}</span>}
            {canManage && (
              <span style={{ marginInlineStart: "auto", display: "inline-flex", gap: 8, alignItems: "center" }}>
                <Link href={`/resources/write?edit=${article.id}`} className="mesh-btn mesh-btn-outline mesh-btn-sm mesh-focus"><Pencil size={13} /> {t("res.edit")}</Link>
                <button onClick={remove} disabled={deleting} className="mesh-btn mesh-btn-outline mesh-btn-sm mesh-focus" style={{ color: "var(--mesh-error)" }}><Trash2 size={13} /> {t("res.delete")}</button>
              </span>
            )}
          </div>

          {actions}

          {/* body_html is sanitized server-side on every write (allowlist, no styles) */}
          <div className="mesh-article-body" style={{ marginTop: 26 }} dangerouslySetInnerHTML={{ __html: article.body_html }} />

          <div className="mesh-article-actions mesh-article-actions-bottom">
            <button onClick={toggleLike} className={`mesh-btn mesh-focus ${liked ? "mesh-btn-primary" : "mesh-btn-outline"}`} aria-pressed={liked} title={me ? t("res.like") : t("res.loginToLike")}>
              <Heart size={16} fill={liked ? "currentColor" : "none"} /> {likeCount} · {t("res.like")}
            </button>
            <ShareButton articleId={article.id} title={article.title} text={article.excerpt} />
          </div>
        </article>
      )}
    </div>
  );
}
