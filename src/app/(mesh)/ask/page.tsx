"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { meshCategories } from "@/data/mesh-seed";
import { useMeshPrefs, pickLang } from "@/lib/mesh-i18n";
import { analyzeQuery, searchKeywords } from "@/lib/mesh-ask";

type Match = { id: number; title: string; solved: boolean; answer_count: number };

export default function AskPage() {
  const { lang, t } = useMeshPrefs();
  const router = useRouter();
  const [me, setMe] = useState<null | { id: number }>(null); const [dbChecked, setDbChecked] = useState(false); const [dbOk, setDbOk] = useState(true);
  const [question, setQuestion] = useState("");
  const [title, setTitle] = useState(""); const [cat, setCat] = useState("getting-started"); const [sub, setSub] = useState(""); const [body, setBody] = useState(""); const [tags, setTags] = useState("");
  const [matches, setMatches] = useState<Match[]>([]); const [searched, setSearched] = useState(false);
  const [err, setErr] = useState(""); const [busy, setBusy] = useState(false);
  // Fields the member has edited by hand stop following the auto-derived values.
  const titleTouched = useRef(false); const catTouched = useRef(false); const tagsTouched = useRef(false);

  useEffect(() => { fetch("/api/mesh/auth/me").then((r) => r.json()).then((d) => { setMe(d.user); setDbOk(d.dbConfigured !== false); setDbChecked(true); }).catch(() => setDbChecked(true)); }, []);
  // Arriving from the homepage search ("Ask this question") pre-fills the question.
  useEffect(() => { const q = new URLSearchParams(window.location.search).get("q"); if (q) setQuestion(q); }, []);

  // Code-only derivation: title, category and tags follow the question until edited.
  useEffect(() => {
    if (!question.trim()) return;
    const a = analyzeQuery(question);
    if (!titleTouched.current) setTitle(a.title);
    if (!catTouched.current && a.subcategorySlug) { setCat(a.categorySlug); setSub(a.subcategorySlug); }
    if (!tagsTouched.current && a.tags.length) setTags(a.tags.join(", "));
  }, [question]);

  // Live matches against existing threads (plain keyword search — no AI).
  useEffect(() => {
    const kw = searchKeywords(question);
    if (question.trim().length < 4 || !kw.length) { setMatches([]); setSearched(false); return; }
    const h = setTimeout(() => {
      fetch(`/api/mesh/questions?sort=relevant&limit=5&q=${encodeURIComponent(question.trim())}`)
        .then((r) => r.json()).then((d) => { setMatches((d.questions ?? []).map((m: Match) => ({ id: m.id, title: m.title, solved: !!m.solved, answer_count: m.answer_count ?? 0 }))); setSearched(true); })
        .catch(() => { setMatches([]); setSearched(true); });
    }, 350);
    return () => clearTimeout(h);
  }, [question]);

  const subs = meshCategories.filter((c) => c.parentSlug === cat);
  async function submit(e: React.FormEvent) {
    e.preventDefault(); setErr("");
    if (title.trim().length < 10) return setErr(t("ask.errTitle"));
    if (busy) return; setBusy(true);
    try {
      const r = await fetch("/api/mesh/questions", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ title: title.trim(), categorySlug: cat, subcategorySlug: sub || undefined, body: body.trim(), tags: tags.split(",").map((s) => s.trim()).filter(Boolean) }) });
      const d = await r.json().catch(() => ({}));
      if (r.status === 503) setErr(t("ask.errDemo"));
      else if (r.status === 401) setErr(t("ask.errSignin"));
      else if (!r.ok) setErr(d.error || t("ask.errPost"));
      else router.push(`/question/${d.id}`);
    } finally { setBusy(false); }
  }
  if (dbChecked && !me) return <div className="mesh-container" style={{ padding: "48px 0", maxWidth: 640 }}><h1>{t("ask.title")}</h1><p style={{ color: "var(--mesh-secondary)", marginBottom: 20 }}>{t("ask.needAccount")}</p><Link href="/login?next=/ask" className="mesh-btn mesh-btn-primary">{t("ask.loginToAsk")}</Link> <Link href="/signup?next=/ask" className="mesh-btn mesh-btn-outline">{t("ask.createAccount")}</Link>{!dbOk && <p style={{ fontSize: 13, color: "var(--mesh-muted)", marginTop: 20 }}>{t("ask.dbNote")}</p>}</div>;
  return <div className="mesh-container" style={{ padding: "40px 0 56px", maxWidth: 760 }}>
    <h1 style={{ fontSize: 30, margin: "0 0 8px" }}>{t("ask.title")}</h1>
    <p style={{ color: "var(--mesh-secondary)", fontSize: 14, margin: 0 }}>{t("ask.helper")}</p>
    <form onSubmit={submit} style={{ display: "grid", gap: 20, marginTop: 28 }}>
      <label style={{ display: "grid", gap: 6, fontWeight: 600, fontSize: 14 }}>{t("ask.fieldQuestion")}<input className="mesh-input mesh-focus" value={question} onChange={(e) => setQuestion(e.target.value)} placeholder={t("ask.questionPh")} /></label>
      {searched && matches.length > 0 && (
        <div className="mesh-card" style={{ padding: "16px 18px" }}>
          <p style={{ margin: "0 0 10px", fontWeight: 700, fontSize: 13.5 }}>{t("ask.matchesTitle")}</p>
          <div style={{ display: "grid", gap: 8 }}>
            {matches.map((m) => (
              <Link key={m.id} href={`/question/${m.id}`} style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "baseline", color: "var(--mesh-text)", textDecoration: "none", fontSize: 14 }}>
                <span style={{ fontWeight: 600 }}>{m.title}</span>
                <span style={{ display: "inline-flex", gap: 8, whiteSpace: "nowrap", fontSize: 12, color: "var(--mesh-muted)" }}>
                  {m.solved && <span style={{ color: "var(--mesh-accent)", fontWeight: 700 }}>{t("disc.solved")}</span>}
                  <span>{m.answer_count} {t("disc.answers")}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
      {searched && matches.length === 0 && <p style={{ margin: 0, fontSize: 13, color: "var(--mesh-muted)" }}>{t("ask.matchesNone")}</p>}
      <p style={{ margin: 0, fontSize: 12.5, color: "var(--mesh-muted)" }}>{t("ask.autoNote")}</p>
      <label style={{ display: "grid", gap: 6, fontWeight: 600, fontSize: 14 }}>{t("ask.fieldTitle")}<input className="mesh-input mesh-focus" value={title} onChange={(e) => { titleTouched.current = true; setTitle(e.target.value); }} placeholder={t("ask.titlePh")} required /><span style={{ fontWeight: 400, color: "var(--mesh-muted)", fontSize: 12 }}>{t("ask.titleHint")}</span></label>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <label style={{ display: "grid", gap: 6, fontWeight: 600, fontSize: 14 }}>{t("ask.mainCat")}<select className="mesh-input" value={cat} onChange={(e) => { catTouched.current = true; setCat(e.target.value); setSub(""); }}>{meshCategories.filter((c) => c.isMain).map((c) => <option key={c.slug} value={c.slug}>{pickLang(lang, c.name, c.nameAr)}</option>)}</select></label>
        <label style={{ display: "grid", gap: 6, fontWeight: 600, fontSize: 14 }}>{t("ask.subCat")}<select className="mesh-input" value={sub} onChange={(e) => { catTouched.current = true; setSub(e.target.value); }}><option value="">{t("ask.none")}</option>{subs.map((c) => <option key={c.slug} value={c.slug}>{pickLang(lang, c.name, c.nameAr)}</option>)}</select></label>
      </div>
      <label style={{ display: "grid", gap: 6, fontWeight: 600, fontSize: 14 }}>{t("ask.details")}<textarea className="mesh-textarea mesh-focus" rows={6} value={body} onChange={(e) => setBody(e.target.value)} /><span style={{ fontWeight: 400, color: "var(--mesh-muted)", fontSize: 12 }}>{t("ask.detailsHint")}</span></label>
      <label style={{ display: "grid", gap: 6, fontWeight: 600, fontSize: 14 }}>{t("ask.tags")}<input className="mesh-input" value={tags} onChange={(e) => { tagsTouched.current = true; setTags(e.target.value); }} placeholder={t("ask.tagsPh")} /></label>
      {err && <p role="alert" style={{ color: "var(--mesh-error)", fontSize: 14, background: "var(--mesh-surface)", border: "1px solid var(--mesh-error)", borderRadius: 6, padding: "12px 14px", margin: 0 }}>{err}</p>}
      <div><button disabled={busy} className="mesh-btn mesh-btn-primary mesh-focus">{busy ? t("ask.posting") : t("ask.post")}</button></div>
    </form>
  </div>;
}
