"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { meshSeedQuestions, meshSeedUsers, seedQuestionToListItem } from "@/data/mesh-seed";
import { DiscussionList } from "@/components/mesh/DiscussionList";
import { useMeshPrefs } from "@/lib/mesh-i18n";

export default function ProfilePage() {
  const { lang, t } = useMeshPrefs();
  const params = useParams(); const id = Number(params.id);
  const [data, setData] = useState<{ display_name: string; bio: string | null; created_at: string; questions: ReturnType<typeof seedQuestionToListItem>[]; answersCount: number } | null>(null);
  useEffect(() => {
    fetch(`/api/mesh/users/${id}`).then(async (r) => { if (!r.ok) throw 0; setData(await r.json()); }).catch(() => {
      const u = meshSeedUsers.find((x) => x.id === id); if (!u) return;
      const qs = meshSeedQuestions.filter((q) => q.authorId === id).map(seedQuestionToListItem);
      const ac = meshSeedQuestions.reduce((n, q) => n + q.answers.filter((a) => a.authorId === id).length, 0);
      setData({ display_name: u.displayName, bio: u.bio, created_at: u.createdAt, questions: qs, answersCount: ac });
    });
  }, [id]);
  if (!data) return <div className="mesh-container" style={{ padding: "48px 0" }}><h1>{t("profile.notFound")}</h1><Link href="/mesh/browse">{t("q.browse")}</Link></div>;
  const initials = data.display_name.split(" ").map((s) => s[0]).join("").slice(0, 2).toUpperCase();
  return <div className="mesh-container" style={{ padding: "40px 0 48px", maxWidth: 860 }}>
    <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
      <div aria-hidden style={{ width: 68, height: 68, borderRadius: 999, background: "var(--mesh-primary)", color: "var(--mesh-on-primary)", display: "grid", placeItems: "center", fontWeight: 800, fontSize: 20 }}>{initials}</div>
      <div><h1 style={{ margin: "0 0 6px", fontSize: 28 }}>{data.display_name}</h1><p style={{ margin: 0, color: "var(--mesh-muted)", fontSize: 13 }}>{t("profile.memberSince")} {new Date(data.created_at).toLocaleDateString(lang === "ar" ? "ar" : "en-GB", { month: "long", year: "numeric" })} · {data.answersCount} {t("profile.answersContributed")}</p></div>
    </div>
    {data.bio && <p style={{ color: "var(--mesh-secondary)", maxWidth: 640, marginTop: 20, lineHeight: 1.7 }}>{data.bio}</p>}
    <h2 style={{ fontSize: 20, marginTop: 40, marginBottom: 12 }}>{t("profile.questionsPosted")} ({data.questions.length})</h2>
    <DiscussionList items={data.questions} />
  </div>;
}
