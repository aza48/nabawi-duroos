"use client";
import Link from "next/link";
import { ArrowUp, Check, Lock, MessageSquare } from "lucide-react";
import { relativeTime, type MeshListItem } from "@/data/mesh-seed";
import { useMeshPrefs, pickLang } from "@/lib/mesh-i18n";
import { AuthorName } from "@/components/mesh/UserBadge";

export function DiscussionRow({ item }: { item: MeshListItem }) {
  const { lang, t } = useMeshPrefs();
  const title = pickLang(lang, item.title, (item as { title_ar?: string }).title_ar);
  const body = pickLang(lang, item.body, (item as { body_ar?: string }).body_ar);
  const catName = pickLang(lang, item.category_name, (item as { category_name_ar?: string }).category_name_ar);
  return (
    <article style={{ padding: "20px 22px", borderBottom: "1px solid var(--mesh-hairline)", display: "flex", gap: 18 }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, minWidth: 44, color: "var(--mesh-secondary)" }}>
        <ArrowUp size={16} aria-hidden />
        <span style={{ fontWeight: 700, fontSize: 14 }}>{item.vote_count}</span>
        <span style={{ fontSize: 11, color: "var(--mesh-muted)" }}>{t("disc.votes")}</span>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center", marginBottom: 6 }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".05em", textTransform: "uppercase", color: "var(--mesh-accent)" }}>{catName}</span>
          {(item as { status?: string }).status === "resolved" && <span className="mesh-solved"><Check size={12} /> {t("disc.resolved")}</span>}
          {(item as { status?: string }).status === "locked" && <span style={{ display: "inline-flex", alignItems: "center", gap: 4, background: "var(--mesh-canvas)", color: "var(--mesh-muted)", border: "1px solid var(--mesh-hairline)", fontSize: 11, fontWeight: 700, padding: "3px 9px", borderRadius: 999, textTransform: "uppercase", letterSpacing: ".04em" }}><Lock size={11} /> {t("disc.locked")}</span>}
          {!(item as { status?: string }).status && item.solved && <span className="mesh-solved"><Check size={12} /> {t("disc.solved")}</span>}
          {item.is_seed && <span style={{ fontSize: 11, color: "var(--mesh-muted)", border: "1px solid var(--mesh-hairline)", padding: "1px 6px", borderRadius: 999 }}>{t("disc.sample")}</span>}
        </div>
        <Link href={`/mesh/question/${item.id}`} style={{ fontSize: 16.5, fontWeight: 600, color: "var(--mesh-text)", textDecoration: "none", lineHeight: 1.4, display: "block" }}>{title}</Link>
        <p style={{ margin: "6px 0 10px", fontSize: 14, lineHeight: 1.6, color: "var(--mesh-secondary)", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{body}</p>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", fontSize: 12, color: "var(--mesh-muted)", alignItems: "center" }}>
          <AuthorName name={item.author_name} role={(item as {author_role?: string}).author_role} entryYear={(item as {author_entry_year?: number|null}).author_entry_year} country={(item as {author_country?: string|null}).author_country} /><span>{relativeTime(item.created_at, lang)}</span>
          <span style={{ display: "inline-flex", gap: 5, alignItems: "center" }}><MessageSquare size={13} /> {item.answer_count} {item.answer_count === 1 ? t("disc.answer") : t("disc.answers")}</span>
          {item.tags?.slice(0, 3).map((tg) => <span key={tg} style={{ background: "var(--mesh-pale)", color: "var(--mesh-accent)", padding: "3px 9px", borderRadius: 999, fontSize: 11 }}>{tg}</span>)}
        </div>
      </div>
    </article>
  );
}
export function DiscussionList({ items }: { items: MeshListItem[] }) {
  const { t } = useMeshPrefs();
  if (!items.length) return <div className="mesh-card" style={{ padding: 32, textAlign: "center", color: "var(--mesh-secondary)" }}><p style={{ fontWeight: 600, color: "var(--mesh-text)" }}>{t("disc.emptyTitle")}</p><p style={{ fontSize: 14 }}>{t("disc.emptySub")}</p><Link href="/mesh/ask" className="mesh-btn mesh-btn-primary mesh-btn-sm" style={{ marginTop: 12 }}>{t("nav.ask")}</Link></div>;
  return <div>{items.map((it) => <DiscussionRow key={it.id} item={it} />)}</div>;
}
