"use client";
import Link from "next/link";
import { ArrowUp, Check, MessageSquare } from "lucide-react";
import { relativeTime, type MeshListItem } from "@/data/mesh-seed";
import { useMeshPrefs, pickLang } from "@/lib/mesh-i18n";

export function DiscussionRow({ item }: { item: MeshListItem }) {
  const { lang, t } = useMeshPrefs();
  const title = pickLang(lang, item.title, (item as { title_ar?: string }).title_ar);
  const body = pickLang(lang, item.body, (item as { body_ar?: string }).body_ar);
  const catName = pickLang(lang, item.category_name, (item as { category_name_ar?: string }).category_name_ar);
  return (
    <article style={{ padding: "16px 0", borderBottom: "1px solid var(--mesh-hairline)", display: "flex", gap: 16 }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: 44, color: "var(--mesh-secondary)" }}>
        <ArrowUp size={16} aria-hidden />
        <span style={{ fontWeight: 700, fontSize: 14 }}>{item.vote_count}</span>
        <span style={{ fontSize: 11, color: "var(--mesh-muted)" }}>{t("disc.votes")}</span>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center", marginBottom: 4 }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".05em", textTransform: "uppercase", color: "var(--mesh-accent)" }}>{catName}</span>
          {item.solved && <span className="mesh-solved"><Check size={12} /> {t("disc.solved")}</span>}
          {item.is_seed && <span style={{ fontSize: 11, color: "var(--mesh-muted)", border: "1px solid var(--mesh-hairline)", padding: "1px 6px", borderRadius: 999 }}>{t("disc.sample")}</span>}
        </div>
        <Link href={`/mesh/question/${item.id}`} style={{ fontSize: 16, fontWeight: 600, color: "var(--mesh-text)", textDecoration: "none", lineHeight: 1.35, display: "block" }}>{title}</Link>
        <p style={{ margin: "4px 0 8px", fontSize: 14, color: "var(--mesh-secondary)", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{body}</p>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", fontSize: 12, color: "var(--mesh-muted)", alignItems: "center" }}>
          <span>{item.author_name}</span><span>{relativeTime(item.created_at, lang)}</span>
          <span style={{ display: "inline-flex", gap: 4, alignItems: "center" }}><MessageSquare size={13} /> {item.answer_count} {item.answer_count === 1 ? t("disc.answer") : t("disc.answers")}</span>
          {item.tags?.slice(0, 3).map((tg) => <span key={tg} style={{ background: "var(--mesh-pale)", color: "var(--mesh-accent)", padding: "2px 8px", borderRadius: 999, fontSize: 11 }}>{tg}</span>)}
        </div>
      </div>
    </article>
  );
}
export function DiscussionList({ items }: { items: MeshListItem[] }) {
  const { t } = useMeshPrefs();
  if (!items.length) return <div className="mesh-card" style={{ padding: 24, textAlign: "center", color: "var(--mesh-secondary)" }}><p style={{ fontWeight: 600, color: "var(--mesh-text)" }}>{t("disc.emptyTitle")}</p><p style={{ fontSize: 14 }}>{t("disc.emptySub")}</p><Link href="/mesh/ask" className="mesh-btn mesh-btn-primary mesh-btn-sm" style={{ marginTop: 8 }}>{t("nav.ask")}</Link></div>;
  return <div>{items.map((it) => <DiscussionRow key={it.id} item={it} />)}</div>;
}
