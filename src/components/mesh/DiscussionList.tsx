"use client";
import Link from "next/link";
import { ArrowUp, Check, MessageSquare } from "lucide-react";
import { relativeTime, type MeshListItem } from "@/data/mesh-seed";

export function DiscussionRow({ item }: { item: MeshListItem }) {
  return (
    <article style={{ padding: "16px 0", borderBottom: "1px solid #EBEBEB", display: "flex", gap: 16 }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: 44, color: "#4D4D4D" }}>
        <ArrowUp size={16} aria-hidden />
        <span style={{ fontWeight: 700, fontSize: 14 }}>{item.vote_count}</span>
        <span style={{ fontSize: 11, color: "#8F8F8F" }}>votes</span>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center", marginBottom: 4 }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".05em", textTransform: "uppercase", color: "#125934" }}>{item.category_name}</span>
          {item.solved && <span className="mesh-solved"><Check size={12} /> Solved</span>}
          {item.is_seed && <span style={{ fontSize: 11, color: "#8F8F8F", border: "1px solid #EBEBEB", padding: "1px 6px", borderRadius: 999 }}>Sample</span>}
        </div>
        <Link href={`/mesh/question/${item.id}`} style={{ fontSize: 16, fontWeight: 600, color: "#171717", textDecoration: "none", lineHeight: 1.35, display: "block" }}>{item.title}</Link>
        <p style={{ margin: "4px 0 8px", fontSize: 14, color: "#4D4D4D", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{item.body}</p>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", fontSize: 12, color: "#8F8F8F", alignItems: "center" }}>
          <span>{item.author_name}</span><span>{relativeTime(item.created_at)}</span>
          <span style={{ display: "inline-flex", gap: 4, alignItems: "center" }}><MessageSquare size={13} /> {item.answer_count} answers</span>
          {item.tags?.slice(0, 3).map((t) => <span key={t} style={{ background: "#EDF7F0", color: "#125934", padding: "2px 8px", borderRadius: 999, fontSize: 11 }}>{t}</span>)}
        </div>
      </div>
    </article>
  );
}
export function DiscussionList({ items }: { items: MeshListItem[] }) {
  if (!items.length) return <div className="mesh-card" style={{ padding: 24, textAlign: "center", color: "#4D4D4D" }}><p style={{ fontWeight: 600, color: "#171717" }}>No discussions found</p><p style={{ fontSize: 14 }}>Try a different search or category, or ask the first question.</p><Link href="/mesh/ask" className="mesh-btn mesh-btn-primary mesh-btn-sm" style={{ marginTop: 8 }}>Ask a Question</Link></div>;
  return <div>{items.map((it) => <DiscussionRow key={it.id} item={it} />)}</div>;
}
