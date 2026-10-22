"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { meshSeedQuestions, meshSeedUsers, seedQuestionToListItem } from "@/data/mesh-seed";
import { DiscussionList } from "@/components/mesh/DiscussionList";
import { UserChips } from "@/components/mesh/UserBadge";
import { useMeshPrefs } from "@/lib/mesh-i18n";

type DeletedQ = { id: number; title: string; deleted_at: string };
type ProfileData = { display_name: string; bio: string | null; created_at: string; role?: string; entry_year_hijri?: number | null; country?: string | null; questions: ReturnType<typeof seedQuestionToListItem>[]; answersCount: number; own_deleted_questions?: DeletedQ[] };
type Me = { id: number; display_name: string; bio: string | null; personal_email: string | null; country: string | null };

export default function ProfilePage() {
  const { lang, t } = useMeshPrefs();
  const params = useParams(); const id = Number(params.id);
  const [data, setData] = useState<ProfileData | null>(null);
  const [me, setMe] = useState<Me | null>(null); const [dbOk, setDbOk] = useState(false);
  const [fName, setFName] = useState(""); const [fBio, setFBio] = useState(""); const [fPersonal, setFPersonal] = useState(""); const [fCountry, setFCountry] = useState("");
  const [saved, setSaved] = useState(false); const [saveErr, setSaveErr] = useState(""); const [saving, setSaving] = useState(false);
  useEffect(() => {
    fetch(`/api/mesh/users/${id}`).then(async (r) => { if (!r.ok) throw 0; setData(await r.json()); }).catch(() => {
      const u = meshSeedUsers.find((x) => x.id === id); if (!u) return;
      const qs = meshSeedQuestions.filter((q) => q.authorId === id).map(seedQuestionToListItem);
      const ac = meshSeedQuestions.reduce((n, q) => n + q.answers.filter((a) => a.authorId === id).length, 0);
      setData({ display_name: u.displayName, bio: u.bio, created_at: u.createdAt, role: u.role ?? "member", entry_year_hijri: u.entryYear ?? null, country: u.country ?? null, questions: qs, answersCount: ac });
    });
    fetch("/api/mesh/auth/me").then((r) => r.json()).then((d) => {
      setDbOk(d.dbConfigured !== false);
      if (d.user) { setMe(d.user); setFName(d.user.display_name || ""); setFBio(d.user.bio || ""); setFPersonal(d.user.personal_email || ""); setFCountry(d.user.country || ""); }
    }).catch(() => {});
  }, [id]);
  if (!data) return <div className="mesh-container" style={{ padding: "48px 0" }}><h1>{t("profile.notFound")}</h1><Link href="/browse">{t("q.browse")}</Link></div>;
  const initials = data.display_name.split(" ").map((s) => s[0]).join("").slice(0, 2).toUpperCase();
  const isSelf = dbOk && me !== null && me.id === id;
  async function saveSettings(e: React.FormEvent) {
    e.preventDefault(); setSaveErr(""); setSaved(false); if (saving) return; setSaving(true);
    try {
      const r = await fetch("/api/mesh/auth/me", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ displayName: fName, bio: fBio, personalEmail: fPersonal, country: fCountry }) });
      const d = await r.json().catch(() => ({}));
      if (!r.ok) { setSaveErr(typeof d.error === "string" ? d.error : t("auth.errGeneric")); return; }
      if (d.user) setData((prev) => prev ? { ...prev, display_name: d.user.display_name, bio: d.user.bio, country: d.user.country } : prev);
      setSaved(true);
    } finally { setSaving(false); }
  }
  async function restoreDeleted(qid: number) {
    const r = await fetch(`/api/mesh/questions/${qid}/restore`, { method: "POST" });
    if (r.ok) window.location.reload();
  }
  const labelStyle: React.CSSProperties = { display: "grid", gap: 6, fontWeight: 600, fontSize: 14 };
  return <div className="mesh-container" style={{ padding: "40px 0 48px", maxWidth: 860 }}>
    <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
      <div aria-hidden style={{ width: 68, height: 68, borderRadius: 999, background: "var(--mesh-primary)", color: "var(--mesh-on-primary)", display: "grid", placeItems: "center", fontWeight: 800, fontSize: 20 }}>{initials}</div>
      <div>
        <h1 style={{ margin: "0 0 6px", fontSize: 28 }}>{data.display_name}</h1>
        <div style={{ marginBottom: 6 }}><UserChips role={data.role} entryYear={data.entry_year_hijri} country={data.country} /></div>
        <p style={{ margin: 0, color: "var(--mesh-muted)", fontSize: 13 }}>{t("profile.memberSince")} {new Date(data.created_at).toLocaleDateString(lang === "ar" ? "ar" : "en-GB", { month: "long", year: "numeric" })} · {data.answersCount} {t("profile.answersContributed")}</p>
      </div>
    </div>
    {data.bio && <p style={{ color: "var(--mesh-secondary)", maxWidth: 640, marginTop: 20, lineHeight: 1.7 }}>{data.bio}</p>}
    {isSelf && (
      <section className="mesh-card" style={{ padding: 22, marginTop: 32 }} aria-label={t("settings.title")}>
        <h2 style={{ fontSize: 18, margin: "0 0 16px" }}>{t("settings.title")}</h2>
        <form onSubmit={saveSettings} style={{ display: "grid", gap: 20, maxWidth: 520 }}>
          <label style={labelStyle}>{t("auth.displayName")}<input className="mesh-input mesh-focus" value={fName} onChange={(e) => setFName(e.target.value)} required /></label>
          <label style={labelStyle}>{t("settings.country")}<input className="mesh-input mesh-focus" value={fCountry} onChange={(e) => setFCountry(e.target.value)} placeholder={t("settings.countryPh")} /></label>
          <label style={labelStyle}>{t("settings.personalEmail")}<input className="mesh-input mesh-focus" type="email" value={fPersonal} onChange={(e) => setFPersonal(e.target.value)} /><span style={{ fontWeight: 400, fontSize: 12, color: "var(--mesh-muted)", lineHeight: 1.6 }}>{t("settings.personalEmailHint")}</span></label>
          <label style={labelStyle}>{t("settings.bio")}<textarea className="mesh-input mesh-focus" rows={3} value={fBio} onChange={(e) => setFBio(e.target.value)} /></label>
          {saveErr && <p role="alert" style={{ color: "var(--mesh-error)", fontSize: 14 }}>{saveErr}</p>}
          {saved && <p role="status" style={{ color: "var(--mesh-accent)", fontSize: 14 }}>{t("settings.saved")}</p>}
          <button disabled={saving} className="mesh-btn mesh-btn-primary mesh-focus" style={{ justifySelf: "start" }}>{saving ? t("auth.wait") : t("settings.save")}</button>
        </form>
      </section>
    )}
    <h2 style={{ fontSize: 20, marginTop: 40, marginBottom: 12 }}>{t("profile.questionsPosted")} ({data.questions.length})</h2>
    <DiscussionList items={data.questions} />
    {isSelf && data.own_deleted_questions && data.own_deleted_questions.length > 0 && (
      <section style={{ marginTop: 40 }}>
        <h2 style={{ fontSize: 18, marginBottom: 12 }}>{t("profile.deletedTitle")}</h2>
        <div className="mesh-card" style={{ overflow: "hidden" }}>
          {data.own_deleted_questions.map((dq) => (
            <div key={dq.id} style={{ display: "flex", gap: 16, alignItems: "center", justifyContent: "space-between", padding: "14px 20px", borderBottom: "1px solid var(--mesh-hairline)" }}>
              <div style={{ minWidth: 0 }}>
                <Link href={`/question/${dq.id}`} style={{ fontSize: 14.5, fontWeight: 600, color: "var(--mesh-text)", textDecoration: "none" }}>{dq.title}</Link>
                <div style={{ fontSize: 12, color: "var(--mesh-muted)", marginTop: 2 }}>{new Date(dq.deleted_at).toLocaleDateString(lang === "ar" ? "ar" : "en-GB", { day: "numeric", month: "short", year: "numeric" })}</div>
              </div>
              <button className="mesh-btn mesh-btn-outline mesh-btn-sm mesh-focus" onClick={() => restoreDeleted(dq.id)}>{t("profile.restoreBtn")}</button>
            </div>
          ))}
        </div>
      </section>
    )}
  </div>;
}
