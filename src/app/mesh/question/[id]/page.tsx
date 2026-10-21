"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Check, ChevronRight, Flag } from "lucide-react";
import { meshCategories, meshSeedQuestions, meshSeedUsers, relativeTime, seedQuestionToListItem } from "@/data/mesh-seed";
import VoteButton from "@/components/mesh/VoteButton";
import { DiscussionList } from "@/components/mesh/DiscussionList";
import { useMeshPrefs, pickLang } from "@/lib/mesh-i18n";
import { AuthorName } from "@/components/mesh/UserBadge";

type Ans = { id: number; body: string; body_ar?: string; author_id: number; author_name: string; author_role?: string; author_entry_year?: number | null; author_country?: string | null; vote_count: number; hasVoted?: boolean; created_at: string; is_seed?: boolean };
type QDetail = { id: number; title: string; body: string; title_ar?: string; body_ar?: string; author_id: number; author_name: string; author_role?: string; author_entry_year?: number | null; author_country?: string | null; category_slug: string; category_name: string; category_name_ar?: string; tags: string[]; vote_count: number; hasVoted?: boolean; accepted_answer_id: number | null; created_at: string; is_seed?: boolean; answers: Ans[] };

export default function QuestionPage() {
  const { lang, t } = useMeshPrefs();
  const params = useParams(); const id = Number(params.id);
  const [q, setQ] = useState<QDetail | null>(null); const [demo, setDemo] = useState(false); const [me, setMe] = useState<{ id: number; role: string } | null>(null);
  const [answerBody, setAnswerBody] = useState(""); const [err, setErr] = useState(""); const [reportFor, setReportFor] = useState<string | null>(null); const [reason, setReason] = useState("spam");
  const [editingId, setEditingId] = useState<number | null>(null); const [editBody, setEditBody] = useState("");
  const seedQ = meshSeedQuestions.find((x) => x.id === id);
  function loadFromSeed() {
    if (!seedQ) { setQ(null); return; }
    setDemo(true);
    const catAr = meshCategories.find((c) => c.slug === seedQ.categorySlug)?.nameAr;
    setQ({
      id: seedQ.id, title: seedQ.title, body: seedQ.body, title_ar: seedQ.titleAr, body_ar: seedQ.bodyAr, author_id: seedQ.authorId, author_name: seedQ.authorName, author_role: meshSeedUsers.find((x) => x.id === seedQ.authorId)?.role ?? "member", author_entry_year: meshSeedUsers.find((x) => x.id === seedQ.authorId)?.entryYear ?? null, author_country: meshSeedUsers.find((x) => x.id === seedQ.authorId)?.country ?? null, category_slug: seedQ.categorySlug, category_name: seedQ.categoryName, category_name_ar: catAr, tags: seedQ.tags, vote_count: seedQ.voteCount, accepted_answer_id: seedQ.acceptedAnswerId, created_at: seedQ.createdAt, is_seed: true,
      answers: [...seedQ.answers].sort((a, b) => (seedQ.acceptedAnswerId === a.id ? -1 : seedQ.acceptedAnswerId === b.id ? 1 : b.voteCount - a.voteCount)).map((a) => { const su = meshSeedUsers.find((x) => x.id === a.authorId); return { id: a.id, body: a.body, body_ar: a.bodyAr, author_id: a.authorId, author_name: a.authorName, author_role: su?.role ?? "member", author_entry_year: su?.entryYear ?? null, author_country: su?.country ?? null, vote_count: a.voteCount, created_at: a.createdAt, is_seed: true }; }),
    });
  }
  useEffect(() => {
    fetch("/api/mesh/auth/me").then((r) => r.json()).then((d) => setMe(d.user)).catch(() => {});
    fetch(`/api/mesh/questions/${id}`).then(async (r) => { if (!r.ok) throw 0; const d = await r.json(); setQ(d.question); setDemo(false); }).catch(() => loadFromSeed());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  if (q === null && !seedQ) return <div className="mesh-container" style={{ padding: "48px 0" }}><h1>{t("q.notFound")}</h1><Link href="/mesh/browse">{t("q.browse")}</Link></div>;
  if (!q) return <div className="mesh-container" style={{ padding: "48px 0" }}>{t("common.loading")}</div>;
  const title = pickLang(lang, q.title, q.title_ar); const body = pickLang(lang, q.body, q.body_ar); const catName = pickLang(lang, q.category_name, q.category_name_ar);
  const isAuthor = me?.id === q.author_id; const canModerate = isAuthor || me?.role === "moderator" || me?.role === "admin";
  async function postAnswer(e: React.FormEvent) {
    e.preventDefault(); setErr(""); if (!answerBody.trim()) return setErr(t("q.errEmpty"));
    if (demo) return setErr(t("q.errDemo"));
    const r = await fetch(`/api/mesh/questions/${id}/answers`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ body: answerBody.trim() }) });
    if (!r.ok) { const d = await r.json().catch(() => ({})); return setErr(d.error || t("q.errPost")); }
    setAnswerBody(""); window.location.reload();
  }
  async function accept(answerId: number | null) { if (demo) return; await fetch(`/api/mesh/questions/${id}/accept`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ answerId }) }); window.location.reload(); }
  async function delAnswer(aid: number) { if (!confirm(t("q.deleteConfirm"))) return; await fetch(`/api/mesh/answers/${aid}`, { method: "DELETE" }); window.location.reload(); }
  async function saveAnswer(aid: number) { if (!editBody.trim()) return; await fetch(`/api/mesh/answers/${aid}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ body: editBody.trim() }) }); window.location.reload(); }
  async function submitReport(targetType: string, targetId: number) { if (demo) { alert(t("q.reportDemo")); return; } await fetch("/api/mesh/report", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ targetType, targetId, reason }) }); setReportFor(null); alert(t("q.reportThanks")); }
  const related = meshSeedQuestions.filter((x) => x.categorySlug === q.category_slug && x.id !== q.id).slice(0, 3).map(seedQuestionToListItem);
  const reasons = ["spam", "personal", "harassment", "incorrect", "other"];
  const ReportBox = () => (
    <div style={{ display: "flex", gap: 10, marginTop: 14, flexWrap: "wrap" }}>
      <select className="mesh-input" style={{ width: "auto" }} value={reason} onChange={(e) => setReason(e.target.value)} aria-label={t("report.aria")}>{reasons.map((r) => <option key={r} value={r}>{t(`report.${r}`)}</option>)}</select>
      <button className="mesh-btn mesh-btn-primary mesh-btn-sm" onClick={() => submitReport(reportFor === "q" ? "question" : "answer", reportFor === "q" ? q.id : Number(String(reportFor).slice(1)))}>{t("q.submitReport")}</button>
    </div>
  );
  return <div className="mesh-container" style={{ padding: "36px 0 48px", maxWidth: 860 }}>
    <nav style={{ fontSize: 13, color: "var(--mesh-muted)", display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap", marginBottom: 8 }} aria-label="Breadcrumb"><Link href="/mesh" style={{ color: "var(--mesh-accent)" }}>{t("common.home")}</Link><ChevronRight size={13} className="mesh-flip-rtl" /><Link href={`/mesh/category/${q.category_slug}`} style={{ color: "var(--mesh-accent)" }}>{catName}</Link><ChevronRight size={13} className="mesh-flip-rtl" /><span style={{ color: "var(--mesh-secondary)" }}>{title.slice(0, 50)}…</span></nav>
    {demo && <p style={{ fontSize: 12, background: "var(--mesh-pale)", border: "1px solid var(--mesh-soft)", padding: "12px 16px", borderRadius: 6, color: "var(--mesh-secondary)" }}>{t("q.sampleNote")}</p>}
    <div style={{ display: "flex", gap: 20, marginTop: 20 }}>
      <VoteButton targetType="question" targetId={q.id} initialCount={q.vote_count} initialVoted={!!q.hasVoted} isLoggedIn={!!me} demoMode={demo} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <h1 style={{ fontSize: "clamp(24px,4vw,32px)", lineHeight: 1.3, margin: "0 0 14px" }}>{title}</h1>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 14 }}><Link href={`/mesh/category/${q.category_slug}`} className="mesh-chip">{catName}</Link>{q.tags.map((tg) => <span key={tg} className="mesh-chip mesh-chip-static">{tg}</span>)}{q.accepted_answer_id && <span className="mesh-solved"><Check size={12} /> {t("disc.solved")}</span>}</div>
        <p style={{ fontSize: 13, color: "var(--mesh-muted)", margin: "0 0 16px" }}>{t("q.askedBy")} <Link href={`/mesh/profile/${q.author_id}`} style={{ color: "inherit", fontWeight: 600, textDecoration: "none" }}><AuthorName name={q.author_name} role={q.author_role} entryYear={q.author_entry_year} country={q.author_country} /></Link> · {relativeTime(q.created_at, lang)}</p>
        <div style={{ fontSize: 15, lineHeight: 1.75 }}>{body.split("\n\n").map((p, i) => <p key={i}>{p}</p>)}</div>
        <button className="mesh-btn mesh-btn-outline mesh-btn-sm" onClick={() => setReportFor(reportFor === "q" ? null : "q")} aria-label={t("q.report")}><Flag size={13} /> {t("q.report")}</button>
        {reportFor === "q" && <ReportBox />}
      </div>
    </div>
    <h2 style={{ fontSize: 22, margin: "44px 0 16px" }}>{q.answers.length} {q.answers.length === 1 ? t("q.answer") : t("q.answers")}</h2>
    <div style={{ display: "grid", gap: 16 }}>
      {q.answers.map((ans) => {
        const accepted = q.accepted_answer_id === ans.id; const ansBody = pickLang(lang, ans.body, ans.body_ar); return (
          <article key={ans.id} style={{ border: `1px solid ${accepted ? "var(--mesh-emerald)" : "var(--mesh-hairline)"}`, background: accepted ? "var(--mesh-pale)" : "var(--mesh-surface)", borderRadius: 12, padding: 22, display: "flex", gap: 18 }}>
            <VoteButton targetType="answer" targetId={ans.id} initialCount={ans.vote_count} initialVoted={!!ans.hasVoted} isLoggedIn={!!me} demoMode={demo} />
            <div style={{ flex: 1, minWidth: 0 }}>
              {accepted && <span className="mesh-solved"><Check size={12} /> {t("q.accepted")}</span>}
              {editingId === ans.id ? (
                <div style={{ display: "grid", gap: 12, marginTop: 8 }}><textarea className="mesh-textarea mesh-focus" rows={4} value={editBody} onChange={(e) => setEditBody(e.target.value)} aria-label={t("q.edit")} /><div style={{ display: "flex", gap: 10 }}><button className="mesh-btn mesh-btn-primary mesh-btn-sm" onClick={() => saveAnswer(ans.id)}>{t("q.save")}</button><button className="mesh-btn mesh-btn-outline mesh-btn-sm" onClick={() => setEditingId(null)}>{t("q.cancel")}</button></div></div>
              ) : <div style={{ fontSize: 15, lineHeight: 1.75, marginTop: 8 }}>{ansBody.split("\n\n").map((p, i) => <p key={i}>{p}</p>)}</div>}
              <p style={{ fontSize: 13, color: "var(--mesh-muted)" }}>— <Link href={`/mesh/profile/${ans.author_id}`} style={{ color: "inherit", fontWeight: 600, textDecoration: "none" }}><AuthorName name={ans.author_name} role={ans.author_role} entryYear={ans.author_entry_year} country={ans.author_country} /></Link> · {relativeTime(ans.created_at, lang)}</p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {canModerate && !demo && (accepted ? <button className="mesh-btn mesh-btn-outline mesh-btn-sm" onClick={() => accept(null)}>{t("q.removeSolution")}</button> : <button className="mesh-btn mesh-btn-primary mesh-btn-sm" onClick={() => accept(ans.id)}>{t("q.markSolution")}</button>)}
                {me?.id === ans.author_id && !demo && <><button className="mesh-btn mesh-btn-outline mesh-btn-sm" onClick={() => { setEditingId(ans.id); setEditBody(ans.body); }}>{t("q.edit")}</button><button className="mesh-btn mesh-btn-outline mesh-btn-sm" onClick={() => delAnswer(ans.id)}>{t("q.delete")}</button></>}
                <button className="mesh-btn mesh-btn-outline mesh-btn-sm" onClick={() => setReportFor(reportFor === `a${ans.id}` ? null : `a${ans.id}`)}><Flag size={13} /> {t("q.report")}</button>
              </div>
              {reportFor === `a${ans.id}` && <ReportBox />}
            </div>
          </article>);
      })}
      {q.answers.length === 0 && <p style={{ color: "var(--mesh-secondary)" }}>{t("q.noAnswers")}</p>}
    </div>
    <section style={{ marginTop: 40 }}><h3 style={{ fontSize: 18, margin: "0 0 16px" }}>{t("q.yourAnswer")}</h3>
      {me && !demo ? (<form onSubmit={postAnswer} style={{ display: "grid", gap: 16 }}><textarea className="mesh-textarea mesh-focus" rows={5} value={answerBody} onChange={(e) => setAnswerBody(e.target.value)} placeholder={t("q.answerPh")} aria-label={t("q.yourAnswer")} />{err && <p role="alert" style={{ color: "var(--mesh-error)", fontSize: 14, margin: 0 }}>{err}</p>}<div><button className="mesh-btn mesh-btn-primary">{t("q.postAnswer")}</button></div></form>)
        : (<div className="mesh-card" style={{ padding: 22 }}><p style={{ margin: "0 0 14px", fontSize: 14, color: "var(--mesh-secondary)" }}>{demo ? t("q.signinDemo") : t("q.signin")}</p><Link href={`/mesh/login?next=/mesh/question/${id}`} className="mesh-btn mesh-btn-primary mesh-btn-sm">{t("q.loginToAnswer")}</Link></div>)}
    </section>
    {related.length > 0 && <section style={{ marginTop: 48 }}><h3 style={{ fontSize: 18, margin: "0 0 12px" }}>{t("q.related")}</h3><DiscussionList items={related} /></section>}
  </div>;
}
