"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Check, ChevronRight, Flag } from "lucide-react";
import { meshCategories, meshProcedureSlugs, meshSeedQuestions, meshSeedUsers, relativeTime, seedQuestionToListItem } from "@/data/mesh-seed";
import VoteButton from "@/components/mesh/VoteButton";
import { DiscussionList } from "@/components/mesh/DiscussionList";
import { useMeshPrefs, pickLang } from "@/lib/mesh-i18n";
import { AuthorName } from "@/components/mesh/UserBadge";

type Caps = { canReopen: boolean; canStaffUpdate: boolean; canDelete: boolean; canLock: boolean; canRestore: boolean };
type QEvent = { id: number; type: string; detail: string | null; actor_id: number | null; actor_name: string | null; created_at: string };
type Ans = { id: number; body: string; body_ar?: string; author_id: number; author_name: string; author_role?: string; author_entry_year?: number | null; author_country?: string | null; vote_count: number; hasVoted?: boolean; created_at: string; is_seed?: boolean; is_staff_update?: boolean; deleted?: boolean };
type QDetail = { id: number; title: string; body: string; title_ar?: string; body_ar?: string; author_id: number; author_name: string; author_role?: string; author_entry_year?: number | null; author_country?: string | null; category_slug: string; category_name: string; category_name_ar?: string; subcategory_slug?: string | null; tags: string[]; vote_count: number; hasVoted?: boolean; accepted_answer_id: number | null; created_at: string; is_seed?: boolean; answers: Ans[]; status?: string; deleted?: boolean; deleted_at?: string | null; restorable?: boolean; events?: QEvent[]; has_outdated_flags?: number; capabilities?: Caps };

const NO_CAPS: Caps = { canReopen: false, canStaffUpdate: false, canDelete: false, canLock: false, canRestore: false };
const YEAR_MS = 365.25 * 24 * 3600 * 1000;

export default function QuestionPage() {
  const { lang, t } = useMeshPrefs();
  const router = useRouter();
  const params = useParams(); const id = Number(params.id);
  const [q, setQ] = useState<QDetail | null>(null); const [demo, setDemo] = useState(false); const [me, setMe] = useState<{ id: number; role: string } | null>(null);
  const [answerBody, setAnswerBody] = useState(""); const [err, setErr] = useState(""); const [reportFor, setReportFor] = useState<string | null>(null); const [reason, setReason] = useState("spam");
  const [editingId, setEditingId] = useState<number | null>(null); const [editBody, setEditBody] = useState("");
  const [staffBody, setStaffBody] = useState(""); const [staffErr, setStaffErr] = useState("");
  const [showFlag, setShowFlag] = useState(false); const [flagNote, setFlagNote] = useState(""); const [flagMsg, setFlagMsg] = useState<{ kind: "ok" | "err"; text: string } | null>(null);
  const seedQ = meshSeedQuestions.find((x) => x.id === id);
  function loadFromSeed() {
    if (!seedQ) { setQ(null); return; }
    setDemo(true);
    const catAr = meshCategories.find((c) => c.slug === seedQ.categorySlug)?.nameAr;
    setQ({
      id: seedQ.id, title: seedQ.title, body: seedQ.body, title_ar: seedQ.titleAr, body_ar: seedQ.bodyAr, author_id: seedQ.authorId, author_name: seedQ.authorName, author_role: meshSeedUsers.find((x) => x.id === seedQ.authorId)?.role ?? "member", author_entry_year: meshSeedUsers.find((x) => x.id === seedQ.authorId)?.entryYear ?? null, author_country: meshSeedUsers.find((x) => x.id === seedQ.authorId)?.country ?? null, category_slug: seedQ.categorySlug, category_name: seedQ.categoryName, category_name_ar: catAr, subcategory_slug: seedQ.subcategorySlug ?? null, tags: seedQ.tags, vote_count: seedQ.voteCount, accepted_answer_id: seedQ.acceptedAnswerId, created_at: seedQ.createdAt, is_seed: true,
      status: seedQ.acceptedAnswerId ? "resolved" : "open", deleted: false, events: [], has_outdated_flags: 0, capabilities: NO_CAPS,
      answers: [...seedQ.answers].sort((a, b) => (seedQ.acceptedAnswerId === a.id ? -1 : seedQ.acceptedAnswerId === b.id ? 1 : b.voteCount - a.voteCount)).map((a) => { const su = meshSeedUsers.find((x) => x.id === a.authorId); return { id: a.id, body: a.body, body_ar: a.bodyAr, author_id: a.authorId, author_name: a.authorName, author_role: su?.role ?? "member", author_entry_year: su?.entryYear ?? null, author_country: su?.country ?? null, vote_count: a.voteCount, created_at: a.createdAt, is_seed: true, is_staff_update: false, deleted: false }; }),
    });
  }
  useEffect(() => {
    fetch("/api/mesh/auth/me").then((r) => r.json()).then((d) => setMe(d.user)).catch(() => {});
    fetch(`/api/mesh/questions/${id}`).then(async (r) => { if (!r.ok) throw 0; const d = await r.json(); setQ(d.question); setDemo(false); }).catch(() => loadFromSeed());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  if (q === null && !seedQ) return <div className="mesh-container" style={{ padding: "48px 0" }}><h1>{t("q.notFound")}</h1><Link href="/browse">{t("q.browse")}</Link></div>;
  if (!q) return <div className="mesh-container" style={{ padding: "48px 0" }}>{t("common.loading")}</div>;
  const title = pickLang(lang, q.title, q.title_ar); const body = pickLang(lang, q.body, q.body_ar); const catName = pickLang(lang, q.category_name, q.category_name_ar);
  const isAuthor = me?.id === q.author_id; const canModerate = isAuthor || me?.role === "moderator" || me?.role === "admin";
  const caps: Caps = q.capabilities ?? NO_CAPS;
  const status = q.status ?? (q.accepted_answer_id ? "resolved" : "open");
  const isClosed = status !== "open";
  const acceptedAns = q.answers.find((a) => a.id === q.accepted_answer_id) ?? null;
  const effectiveSlug = q.subcategory_slug || q.category_slug;
  const oldProcedureSolution = !!acceptedAns && meshProcedureSlugs.includes(effectiveSlug) && (Date.now() - new Date(acceptedAns.created_at).getTime() > YEAR_MS);
  async function postAnswer(e: React.FormEvent) {
    e.preventDefault(); setErr(""); if (!answerBody.trim()) return setErr(t("q.errEmpty"));
    if (demo) return setErr(t("q.errDemo"));
    const r = await fetch(`/api/mesh/questions/${id}/answers`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ body: answerBody.trim() }) });
    if (!r.ok) { const d = await r.json().catch(() => ({})); return setErr(d.error === "thread_closed" ? t("q.errClosed") : (d.error || t("q.errPost"))); }
    setAnswerBody(""); window.location.reload();
  }
  async function postStaffUpdate(e: React.FormEvent) {
    e.preventDefault(); setStaffErr(""); if (!staffBody.trim()) return setStaffErr(t("q.errEmpty"));
    const r = await fetch(`/api/mesh/questions/${id}/answers`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ body: staffBody.trim(), staffUpdate: true }) });
    if (!r.ok) { const d = await r.json().catch(() => ({})); return setStaffErr(d.error || t("q.errPost")); }
    setStaffBody(""); window.location.reload();
  }
  async function accept(answerId: number | null) { if (demo) return; await fetch(`/api/mesh/questions/${id}/accept`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ answerId }) }); window.location.reload(); }
  async function delAnswer(aid: number) { if (!confirm(t("q.deleteConfirm"))) return; await fetch(`/api/mesh/answers/${aid}`, { method: "DELETE" }); window.location.reload(); }
  async function saveAnswer(aid: number) { if (!editBody.trim()) return; await fetch(`/api/mesh/answers/${aid}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ body: editBody.trim() }) }); window.location.reload(); }
  async function submitReport(targetType: string, targetId: number) { if (demo) { alert(t("q.reportDemo")); return; } await fetch("/api/mesh/report", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ targetType, targetId, reason }) }); setReportFor(null); alert(t("q.reportThanks")); }
  async function flagOutdated(e: React.FormEvent) {
    e.preventDefault(); setFlagMsg(null);
    const r = await fetch(`/api/mesh/questions/${id}/flag-outdated`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ note: flagNote.trim() }) });
    if (r.ok) { setFlagMsg({ kind: "ok", text: t("q.flagThanks") }); setShowFlag(false); return; }
    const d = await r.json().catch(() => ({}));
    setFlagMsg({ kind: "err", text: d.error === "already_flagged" ? t("q.flagAlready") : t("q.flagErr") });
  }
  async function reopen() { const r = await fetch(`/api/mesh/questions/${id}/reopen`, { method: "POST" }); if (r.ok) window.location.reload(); }
  async function toggleLock() { await fetch(`/api/mesh/questions/${id}/lock`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ locked: status !== "locked" }) }); window.location.reload(); }
  async function deleteQuestion() { if (!confirm(t("q.deleteQuestionConfirm"))) return; const r = await fetch(`/api/mesh/questions/${id}`, { method: "DELETE" }); if (r.ok) router.push("/"); }
  async function restoreQuestion() { const r = await fetch(`/api/mesh/questions/${id}/restore`, { method: "POST" }); if (r.ok) window.location.reload(); }
  function eventLabel(e: QEvent): string {
    if (e.type === "reopened" && e.detail === "solution unmarked") return t("ev.reopenedUnmarked");
    if (e.type === "restored" && (e.detail ?? "").startsWith("answer")) return t("ev.restoredAnswer");
    const s = t(`ev.${e.type}`); return s === `ev.${e.type}` ? e.type : s;
  }
  const related = meshSeedQuestions.filter((x) => x.categorySlug === q.category_slug && x.id !== q.id).slice(0, 3).map(seedQuestionToListItem);
  const reasons = ["spam", "personal", "harassment", "incorrect", "other"];
  const ReportBox = () => (
    <div style={{ display: "flex", gap: 10, marginTop: 14, flexWrap: "wrap" }}>
      <select className="mesh-input" style={{ width: "auto" }} value={reason} onChange={(e) => setReason(e.target.value)} aria-label={t("report.aria")}>{reasons.map((r) => <option key={r} value={r}>{t(`report.${r}`)}</option>)}</select>
      <button className="mesh-btn mesh-btn-primary mesh-btn-sm" onClick={() => submitReport(reportFor === "q" ? "question" : "answer", reportFor === "q" ? q.id : Number(String(reportFor).slice(1)))}>{t("q.submitReport")}</button>
    </div>
  );
  return <div className="mesh-container" style={{ padding: "36px 0 48px", maxWidth: 860 }}>
    <nav style={{ fontSize: 13, color: "var(--mesh-muted)", display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap", marginBottom: 8 }} aria-label="Breadcrumb"><Link href="/" style={{ color: "var(--mesh-accent)" }}>{t("common.home")}</Link><ChevronRight size={13} className="mesh-flip-rtl" /><Link href={`/category/${q.category_slug}`} style={{ color: "var(--mesh-accent)" }}>{catName}</Link><ChevronRight size={13} className="mesh-flip-rtl" /><span style={{ color: "var(--mesh-secondary)" }}>{title.slice(0, 50)}…</span></nav>
    {demo && <p style={{ fontSize: 12, background: "var(--mesh-pale)", border: "1px solid var(--mesh-soft)", padding: "12px 16px", borderRadius: 6, color: "var(--mesh-secondary)" }}>{t("q.sampleNote")}</p>}
    {q.deleted && (
      <div style={{ marginTop: 16, border: "1px solid var(--mesh-error)", borderRadius: 12, padding: "16px 20px", display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center", justifyContent: "space-between" }}>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6 }}>{q.restorable ? t("q.deletedBanner") : t("q.deletedExpired")}</p>
        {q.restorable && caps.canRestore && <button className="mesh-btn mesh-btn-primary mesh-btn-sm" onClick={restoreQuestion}>{t("q.restore")}</button>}
      </div>
    )}
    {!q.deleted && status === "resolved" && (
      <div style={{ marginTop: 16, background: "var(--mesh-pale)", border: "1px solid var(--mesh-soft)", borderRadius: 12, padding: "14px 20px" }}>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: "var(--mesh-text)" }}>{t("q.resolvedBanner").replace("{name}", acceptedAns ? acceptedAns.author_name : q.author_name)}</p>
        {(q.has_outdated_flags ?? 0) > 0 && <p style={{ margin: "6px 0 0", fontSize: 13, color: "var(--mesh-secondary)" }}>{t("q.flagsCount").replace("{n}", String(q.has_outdated_flags))}</p>}
      </div>
    )}
    {!q.deleted && status === "locked" && (
      <div style={{ marginTop: 16, background: "var(--mesh-canvas)", border: "1px solid var(--mesh-hairline)", borderRadius: 12, padding: "14px 20px" }}>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: "var(--mesh-secondary)" }}>{t("q.lockedBanner")}</p>
      </div>
    )}
    <div style={{ display: "flex", gap: 20, marginTop: 20 }}>
      <VoteButton targetType="question" targetId={q.id} initialCount={q.vote_count} initialVoted={!!q.hasVoted} isLoggedIn={!!me} demoMode={demo} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <h1 style={{ fontSize: "clamp(24px,4vw,32px)", lineHeight: 1.3, margin: "0 0 14px" }}>{title}</h1>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 14 }}><Link href={`/category/${q.category_slug}`} className="mesh-chip">{catName}</Link>{q.tags.map((tg) => <span key={tg} className="mesh-chip mesh-chip-static">{tg}</span>)}{q.accepted_answer_id && <span className="mesh-solved"><Check size={12} /> {t("disc.solved")}</span>}</div>
        <p style={{ fontSize: 13, color: "var(--mesh-muted)", margin: "0 0 16px" }}>{t("q.askedBy")} <Link href={`/profile/${q.author_id}`} style={{ color: "inherit", fontWeight: 600, textDecoration: "none" }}><AuthorName name={q.author_name} role={q.author_role} entryYear={q.author_entry_year} country={q.author_country} /></Link> · {relativeTime(q.created_at, lang)}</p>
        <div style={{ fontSize: 15, lineHeight: 1.75 }}>{body.split("\n\n").map((p, i) => <p key={i}>{p}</p>)}</div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button className="mesh-btn mesh-btn-outline mesh-btn-sm" onClick={() => setReportFor(reportFor === "q" ? null : "q")} aria-label={t("q.report")}><Flag size={13} /> {t("q.report")}</button>
          {!demo && caps.canLock && <button className="mesh-btn mesh-btn-outline mesh-btn-sm" onClick={toggleLock}>{status === "locked" ? t("q.unlock") : t("q.lock")}</button>}
          {!demo && caps.canDelete && <button className="mesh-btn mesh-btn-outline mesh-btn-sm" style={{ color: "var(--mesh-error)", borderColor: "var(--mesh-error)" }} onClick={deleteQuestion}>{t("q.deleteQuestion")}</button>}
        </div>
        {reportFor === "q" && <ReportBox />}
      </div>
    </div>
    <h2 style={{ fontSize: 22, margin: "44px 0 16px" }}>{q.answers.length} {q.answers.length === 1 ? t("q.answer") : t("q.answers")}</h2>
    <div style={{ display: "grid", gap: 16 }}>
      {q.answers.map((ans) => {
        const accepted = q.accepted_answer_id === ans.id; const ansBody = pickLang(lang, ans.body, ans.body_ar);
        if (ans.deleted) return (
          <article key={ans.id} style={{ border: "1px solid var(--mesh-hairline)", background: "var(--mesh-canvas)", borderRadius: 12, padding: 22 }}>
            {accepted && <span className="mesh-solved"><Check size={12} /> {t("q.accepted")}</span>}
            <p style={{ fontSize: 15, fontStyle: "italic", color: "var(--mesh-muted)", margin: "10px 0 0" }}>{t("q.answerDeleted")}</p>
            {accepted && oldProcedureSolution && <OldSolutionNotice t={t} />}
          </article>
        );
        return (
          <article key={ans.id} style={{ border: `1px solid ${accepted ? "var(--mesh-emerald)" : "var(--mesh-hairline)"}`, borderInlineStart: ans.is_staff_update ? "4px solid var(--mesh-accent)" : undefined, background: accepted ? "var(--mesh-pale)" : "var(--mesh-surface)", borderRadius: 12, padding: 22, display: "flex", gap: 18 }}>
            <VoteButton targetType="answer" targetId={ans.id} initialCount={ans.vote_count} initialVoted={!!ans.hasVoted} isLoggedIn={!!me} demoMode={demo} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {accepted && <span className="mesh-solved"><Check size={12} /> {t("q.accepted")}</span>}
                {ans.is_staff_update && <span style={{ display: "inline-flex", alignItems: "center", background: "var(--mesh-pale)", color: "var(--mesh-accent)", border: "1px solid var(--mesh-soft)", fontSize: 11, fontWeight: 700, padding: "3px 9px", borderRadius: 999, textTransform: "uppercase", letterSpacing: ".04em" }}>{t("q.staffUpdateChip")}</span>}
              </div>
              {editingId === ans.id ? (
                <div style={{ display: "grid", gap: 12, marginTop: 8 }}><textarea className="mesh-textarea mesh-focus" rows={4} value={editBody} onChange={(e) => setEditBody(e.target.value)} aria-label={t("q.edit")} /><div style={{ display: "flex", gap: 10 }}><button className="mesh-btn mesh-btn-primary mesh-btn-sm" onClick={() => saveAnswer(ans.id)}>{t("q.save")}</button><button className="mesh-btn mesh-btn-outline mesh-btn-sm" onClick={() => setEditingId(null)}>{t("q.cancel")}</button></div></div>
              ) : <div style={{ fontSize: 15, lineHeight: 1.75, marginTop: 8 }}>{ansBody.split("\n\n").map((p, i) => <p key={i}>{p}</p>)}</div>}
              {accepted && oldProcedureSolution && <OldSolutionNotice t={t} />}
              <p style={{ fontSize: 13, color: "var(--mesh-muted)" }}>— <Link href={`/profile/${ans.author_id}`} style={{ color: "inherit", fontWeight: 600, textDecoration: "none" }}><AuthorName name={ans.author_name} role={ans.author_role} entryYear={ans.author_entry_year} country={ans.author_country} /></Link> · {relativeTime(ans.created_at, lang)}</p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {canModerate && !demo && !isClosed && (accepted ? <button className="mesh-btn mesh-btn-outline mesh-btn-sm" onClick={() => accept(null)}>{t("q.removeSolution")}</button> : <button className="mesh-btn mesh-btn-primary mesh-btn-sm" onClick={() => accept(ans.id)}>{t("q.markSolution")}</button>)}
                {canModerate && !demo && isClosed && accepted && <button className="mesh-btn mesh-btn-outline mesh-btn-sm" onClick={() => accept(null)}>{t("q.removeSolution")}</button>}
                {me?.id === ans.author_id && !demo && <><button className="mesh-btn mesh-btn-outline mesh-btn-sm" onClick={() => { setEditingId(ans.id); setEditBody(ans.body); }}>{t("q.edit")}</button><button className="mesh-btn mesh-btn-outline mesh-btn-sm" onClick={() => delAnswer(ans.id)}>{t("q.delete")}</button></>}
                <button className="mesh-btn mesh-btn-outline mesh-btn-sm" onClick={() => setReportFor(reportFor === `a${ans.id}` ? null : `a${ans.id}`)}><Flag size={13} /> {t("q.report")}</button>
              </div>
              {reportFor === `a${ans.id}` && <ReportBox />}
            </div>
          </article>);
      })}
      {q.answers.length === 0 && <p style={{ color: "var(--mesh-secondary)" }}>{t("q.noAnswers")}</p>}
    </div>
    {!demo && !q.deleted && isClosed ? (
      <section style={{ marginTop: 40 }}>
        <div className="mesh-card" style={{ padding: 22, display: "grid", gap: 18 }}>
          <p style={{ margin: 0, fontSize: 14.5, fontWeight: 600 }}>{t("q.closedNotice")}</p>
          {me ? (<>
            {status === "resolved" && (
              <div>
                {!showFlag && !flagMsg && <button className="mesh-btn mesh-btn-outline mesh-btn-sm" onClick={() => setShowFlag(true)}>{t("q.flagOutdated")}</button>}
                {showFlag && (
                  <form onSubmit={flagOutdated} style={{ display: "grid", gap: 12 }}>
                    <textarea className="mesh-textarea mesh-focus" rows={3} value={flagNote} onChange={(e) => setFlagNote(e.target.value)} placeholder={t("q.flagNotePh")} aria-label={t("q.flagOutdated")} maxLength={300} />
                    <div style={{ display: "flex", gap: 10 }}><button className="mesh-btn mesh-btn-primary mesh-btn-sm">{t("q.flagSubmit")}</button><button type="button" className="mesh-btn mesh-btn-outline mesh-btn-sm" onClick={() => setShowFlag(false)}>{t("q.cancel")}</button></div>
                  </form>
                )}
                {flagMsg && <p role={flagMsg.kind === "ok" ? "status" : "alert"} style={{ margin: "10px 0 0", fontSize: 14, color: flagMsg.kind === "ok" ? "var(--mesh-accent)" : "var(--mesh-error)" }}>{flagMsg.text}</p>}
              </div>
            )}
            {caps.canStaffUpdate && (
              <form onSubmit={postStaffUpdate} style={{ display: "grid", gap: 12, borderTop: "1px solid var(--mesh-hairline)", paddingTop: 18 }}>
                <h3 style={{ fontSize: 16, margin: 0 }}>{t("q.staffUpdateTitle")}</h3>
                <textarea className="mesh-textarea mesh-focus" rows={4} value={staffBody} onChange={(e) => setStaffBody(e.target.value)} placeholder={t("q.answerPh")} aria-label={t("q.staffUpdateTitle")} />
                {staffErr && <p role="alert" style={{ color: "var(--mesh-error)", fontSize: 14, margin: 0 }}>{staffErr}</p>}
                <div><button className="mesh-btn mesh-btn-primary mesh-btn-sm">{t("q.staffUpdateBtn")}</button></div>
              </form>
            )}
            {caps.canReopen && <div style={{ borderTop: "1px solid var(--mesh-hairline)", paddingTop: 18 }}><button className="mesh-btn mesh-btn-outline" onClick={reopen}>{t("q.reopen")}</button></div>}
          </>) : (
            <p style={{ margin: 0, fontSize: 14, color: "var(--mesh-secondary)" }}>{t("q.signin")} <Link href={`/login?next=/question/${id}`} style={{ color: "var(--mesh-accent)", fontWeight: 600 }}>{t("q.loginToAnswer")}</Link></p>
          )}
        </div>
      </section>
    ) : (
      <section style={{ marginTop: 40 }}><h3 style={{ fontSize: 18, margin: "0 0 16px" }}>{t("q.yourAnswer")}</h3>
        {me && !demo ? (<form onSubmit={postAnswer} style={{ display: "grid", gap: 16 }}><textarea className="mesh-textarea mesh-focus" rows={5} value={answerBody} onChange={(e) => setAnswerBody(e.target.value)} placeholder={t("q.answerPh")} aria-label={t("q.yourAnswer")} />{err && <p role="alert" style={{ color: "var(--mesh-error)", fontSize: 14, margin: 0 }}>{err}</p>}<div><button className="mesh-btn mesh-btn-primary">{t("q.postAnswer")}</button></div></form>)
          : (<div className="mesh-card" style={{ padding: 22 }}><p style={{ margin: "0 0 14px", fontSize: 14, color: "var(--mesh-secondary)" }}>{demo ? t("q.signinDemo") : t("q.signin")}</p><Link href={`/login?next=/question/${id}`} className="mesh-btn mesh-btn-primary mesh-btn-sm">{t("q.loginToAnswer")}</Link></div>)}
      </section>
    )}
    {!demo && q.events && q.events.length > 0 && (
      <section style={{ marginTop: 40 }}>
        <details>
          <summary style={{ fontSize: 16, fontWeight: 600, cursor: "pointer" }}>{t("q.history")}</summary>
          <ul style={{ listStyle: "none", margin: "14px 0 0", padding: 0, display: "grid", gap: 8 }}>
            {q.events.map((e) => (
              <li key={e.id} style={{ fontSize: 13.5, color: "var(--mesh-secondary)", lineHeight: 1.6 }}>
                <span style={{ fontWeight: 600, color: "var(--mesh-text)" }}>{e.actor_name ?? t("ev.someone")}</span> {eventLabel(e)}
                {e.type === "outdated_flagged" && e.detail && <span style={{ color: "var(--mesh-muted)" }}> — “{e.detail}”</span>}
                <span style={{ color: "var(--mesh-muted)" }}> · {relativeTime(e.created_at, lang)}</span>
              </li>
            ))}
          </ul>
        </details>
      </section>
    )}
    {related.length > 0 && <section style={{ marginTop: 48 }}><h3 style={{ fontSize: 18, margin: "0 0 12px" }}>{t("q.related")}</h3><DiscussionList items={related} /></section>}
  </div>;
}

function OldSolutionNotice({ t }: { t: (k: string) => string }) {
  return (
    <p style={{ margin: "14px 0 4px", fontSize: 13, lineHeight: 1.6, border: "1px solid var(--mesh-warning)", color: "var(--mesh-text)", borderRadius: 8, padding: "10px 14px" }}>
      <strong>{t("q.oldSolution")}</strong>
    </p>
  );
}
