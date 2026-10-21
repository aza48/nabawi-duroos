"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { meshCategories } from "@/data/mesh-seed";
import { useMeshPrefs, pickLang } from "@/lib/mesh-i18n";

export default function AskPage() {
  const { lang, t } = useMeshPrefs();
  const router = useRouter();
  const [me, setMe] = useState<null | { id: number }>(null); const [dbChecked, setDbChecked] = useState(false); const [dbOk, setDbOk] = useState(true);
  const [title, setTitle] = useState(""); const [cat, setCat] = useState("getting-started"); const [sub, setSub] = useState(""); const [body, setBody] = useState(""); const [tags, setTags] = useState("");
  const [err, setErr] = useState(""); const [busy, setBusy] = useState(false);
  useEffect(() => { fetch("/api/mesh/auth/me").then((r) => r.json()).then((d) => { setMe(d.user); setDbOk(d.dbConfigured !== false); setDbChecked(true); }).catch(() => setDbChecked(true)); }, []);
  const subs = meshCategories.filter((c) => c.parentSlug === cat);
  async function submit(e: React.FormEvent) {
    e.preventDefault(); setErr("");
    if (title.trim().length < 10) return setErr(t("ask.errTitle"));
    if (body.trim().length < 20) return setErr(t("ask.errBody"));
    if (busy) return; setBusy(true);
    try {
      const r = await fetch("/api/mesh/questions", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ title: title.trim(), categorySlug: cat, subcategorySlug: sub || undefined, body: body.trim(), tags: tags.split(",").map((s) => s.trim()).filter(Boolean) }) });
      const d = await r.json().catch(() => ({}));
      if (r.status === 503) setErr(t("ask.errDemo"));
      else if (r.status === 401) setErr(t("ask.errSignin"));
      else if (!r.ok) setErr(d.error || t("ask.errPost"));
      else router.push(`/mesh/question/${d.id}`);
    } finally { setBusy(false); }
  }
  if (dbChecked && !me) return <div className="mesh-container" style={{ padding: "48px 0", maxWidth: 640 }}><h1>{t("ask.title")}</h1><p style={{ color: "var(--mesh-secondary)", marginBottom: 20 }}>{t("ask.needAccount")}</p><Link href="/mesh/login?next=/mesh/ask" className="mesh-btn mesh-btn-primary">{t("ask.loginToAsk")}</Link> <Link href="/mesh/signup?next=/mesh/ask" className="mesh-btn mesh-btn-outline">{t("ask.createAccount")}</Link>{!dbOk && <p style={{ fontSize: 13, color: "var(--mesh-muted)", marginTop: 20 }}>{t("ask.dbNote")}</p>}</div>;
  return <div className="mesh-container" style={{ padding: "40px 0 56px", maxWidth: 760 }}>
    <h1 style={{ fontSize: 30, margin: "0 0 8px" }}>{t("ask.title")}</h1>
    <p style={{ color: "var(--mesh-secondary)", fontSize: 14, margin: 0 }}>{t("ask.helper")}</p>
    <form onSubmit={submit} style={{ display: "grid", gap: 20, marginTop: 28 }}>
      <label style={{ display: "grid", gap: 6, fontWeight: 600, fontSize: 14 }}>{t("ask.fieldTitle")}<input className="mesh-input mesh-focus" value={title} onChange={(e) => setTitle(e.target.value)} placeholder={t("ask.titlePh")} required /><span style={{ fontWeight: 400, color: "var(--mesh-muted)", fontSize: 12 }}>{t("ask.titleHint")}</span></label>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <label style={{ display: "grid", gap: 6, fontWeight: 600, fontSize: 14 }}>{t("ask.mainCat")}<select className="mesh-input" value={cat} onChange={(e) => { setCat(e.target.value); setSub(""); }}>{meshCategories.filter((c) => c.isMain).map((c) => <option key={c.slug} value={c.slug}>{pickLang(lang, c.name, c.nameAr)}</option>)}</select></label>
        <label style={{ display: "grid", gap: 6, fontWeight: 600, fontSize: 14 }}>{t("ask.subCat")}<select className="mesh-input" value={sub} onChange={(e) => setSub(e.target.value)}><option value="">{t("ask.none")}</option>{subs.map((c) => <option key={c.slug} value={c.slug}>{pickLang(lang, c.name, c.nameAr)}</option>)}</select></label>
      </div>
      <label style={{ display: "grid", gap: 6, fontWeight: 600, fontSize: 14 }}>{t("ask.details")}<textarea className="mesh-textarea mesh-focus" rows={8} value={body} onChange={(e) => setBody(e.target.value)} required /></label>
      <label style={{ display: "grid", gap: 6, fontWeight: 600, fontSize: 14 }}>{t("ask.tags")}<input className="mesh-input" value={tags} onChange={(e) => setTags(e.target.value)} placeholder={t("ask.tagsPh")} /></label>
      {err && <p role="alert" style={{ color: "var(--mesh-error)", fontSize: 14, background: "var(--mesh-surface)", border: "1px solid var(--mesh-error)", borderRadius: 6, padding: "12px 14px", margin: 0 }}>{err}</p>}
      <div><button disabled={busy} className="mesh-btn mesh-btn-primary mesh-focus">{busy ? t("ask.posting") : t("ask.post")}</button></div>
    </form>
  </div>;
}
