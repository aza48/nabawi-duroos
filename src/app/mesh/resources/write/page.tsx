"use client";
import { Suspense, useMemo, useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ImagePlus, X } from "lucide-react";
import { useMeshPrefs } from "@/lib/mesh-i18n";
import { compressImageFile } from "@/components/mesh/imageCompress";

const ArticleEditor = dynamic(() => import("@/components/mesh/ArticleEditor"), { ssr: false });

type Phase = "loading" | "demo" | "anon" | "member" | "ready" | "notfound";

function wordCount(html: string): number {
  if (typeof document === "undefined") return 0;
  const el = document.createElement("div");
  el.innerHTML = html;
  return (el.textContent || "").trim().split(/\s+/).filter(Boolean).length;
}

function Inner() {
  const { t } = useMeshPrefs();
  const router = useRouter();
  const sp = useSearchParams();
  const editId = sp.get("edit");
  const bannerRef = useRef<HTMLInputElement>(null);

  const [phase, setPhase] = useState<Phase>("loading");
  const [title, setTitle] = useState("");
  const [banner, setBanner] = useState<string | null>(null);
  const [bodyHtml, setBodyHtml] = useState("");
  const [savedStatus, setSavedStatus] = useState<"draft" | "published">("draft");
  const [err, setErr] = useState("");
  const [saving, setSaving] = useState<"draft" | "published" | null>(null);

  useEffect(() => {
    (async () => {
      const meRes = await fetch("/api/mesh/auth/me").then((r) => r.json()).catch(() => null);
      if (!meRes || meRes.dbConfigured === false) { setPhase("demo"); return; }
      const user = meRes.user;
      if (!user) { setPhase("anon"); return; }
      if (user.role !== "mandoob" && user.role !== "admin") { setPhase("member"); return; }
      if (editId) {
        const r = await fetch(`/api/mesh/articles/${editId}`).catch(() => null);
        if (!r || !r.ok) { setPhase("notfound"); return; }
        const d = await r.json();
        const a = d.article;
        if (!(user.role === "admin" || a.author_id === user.id)) { setPhase("member"); return; }
        setTitle(a.title); setBanner(a.banner); setBodyHtml(a.body_html); setSavedStatus(a.status);
      }
      setPhase("ready");
    })();
  }, [editId]);

  const words = useMemo(() => wordCount(bodyHtml), [bodyHtml]);

  async function onBannerFile(file: File | undefined) {
    if (!file) return;
    try { setBanner(await compressImageFile(file, 1500, 0.82)); } catch { /* unreadable image */ }
  }

  async function save(status: "draft" | "published") {
    setErr("");
    if (title.trim().length < 3) { setErr(t("res.errTitle")); return; }
    setSaving(status);
    try {
      const payload = { title: title.trim(), banner, bodyHtml, status };
      const r = editId
        ? await fetch(`/api/mesh/articles/${editId}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) })
        : await fetch("/api/mesh/articles", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const d = await r.json().catch(() => ({}));
      if (!r.ok) { setErr(d.error === "invalid_title" ? t("res.errTitle") : t("res.errSave")); return; }
      if (status === "published") router.push(`/mesh/resources/${d.id}`);
      else router.push("/mesh/resources?tab=mine");
    } finally { setSaving(null); }
  }

  if (phase === "loading") return <div className="mesh-container" style={{ padding: "40px 0" }}>{t("common.loading")}</div>;
  if (phase === "demo") return <div className="mesh-container" style={{ padding: "40px 0", maxWidth: 720 }}><div className="mesh-card" style={{ padding: 24 }}><p style={{ margin: 0, fontSize: 14, color: "var(--mesh-secondary)" }}>{t("demo.note")}</p></div></div>;
  if (phase === "anon") return (
    <div className="mesh-container" style={{ padding: "40px 0", maxWidth: 720 }}>
      <div className="mesh-card" style={{ padding: 24 }}>
        <p style={{ margin: "0 0 14px", fontSize: 14, color: "var(--mesh-secondary)" }}>{t("res.writersOnly")}</p>
        <Link href="/mesh/login?next=/mesh/resources/write" className="mesh-btn mesh-btn-primary mesh-btn-sm">{t("res.loginToWrite")}</Link>
      </div>
    </div>
  );
  if (phase === "member") return (
    <div className="mesh-container" style={{ padding: "40px 0", maxWidth: 720 }}>
      <div className="mesh-card" style={{ padding: 24 }}>
        <p style={{ margin: "0 0 6px", fontWeight: 600 }}>{t("res.writersOnly")}</p>
        <p style={{ margin: "0 0 14px", fontSize: 14, color: "var(--mesh-secondary)" }}>{t("res.writersOnlySub")}</p>
        <Link href="/mesh/resources" className="mesh-btn mesh-btn-outline mesh-btn-sm">{t("res.back")}</Link>
      </div>
    </div>
  );
  if (phase === "notfound") return (
    <div className="mesh-container" style={{ padding: "40px 0", maxWidth: 720 }}>
      <div className="mesh-card" style={{ padding: 24 }}>
        <p style={{ margin: "0 0 14px", fontWeight: 600 }}>{t("res.notFound")}</p>
        <Link href="/mesh/resources" className="mesh-btn mesh-btn-outline mesh-btn-sm">{t("res.back")}</Link>
      </div>
    </div>
  );

  return (
    <div className="mesh-container" style={{ padding: "36px 0 56px", maxWidth: 860 }}>
      <h1 style={{ fontSize: 28, margin: "0 0 24px" }}>{editId ? t("res.edit") : t("res.write")}</h1>

      <div style={{ display: "grid", gap: 22 }}>
        <div>
          <span style={{ display: "block", fontWeight: 600, fontSize: 14, marginBottom: 8 }}>{t("res.banner")}</span>
          {banner ? (
            <div>
              <img src={banner} alt="" style={{ width: "100%", aspectRatio: "5 / 2", objectFit: "cover", borderRadius: 12, display: "block" }} />
              <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                <button type="button" className="mesh-btn mesh-btn-outline mesh-btn-sm mesh-focus" onClick={() => bannerRef.current?.click()}>{t("res.changeBanner")}</button>
                <button type="button" className="mesh-btn mesh-btn-outline mesh-btn-sm mesh-focus" onClick={() => setBanner(null)}><X size={14} /> {t("res.removeBanner")}</button>
              </div>
            </div>
          ) : (
            <button type="button" onClick={() => bannerRef.current?.click()} className="mesh-focus"
              style={{ width: "100%", aspectRatio: "5 / 2", border: "1.5px dashed var(--mesh-border-strong)", borderRadius: 12, background: "var(--mesh-surface)", color: "var(--mesh-secondary)", display: "grid", placeItems: "center", cursor: "pointer", fontFamily: "inherit" }}>
              <span style={{ display: "grid", justifyItems: "center", gap: 8, fontSize: 14, fontWeight: 600 }}><ImagePlus size={26} /> {t("res.addBanner")}</span>
            </button>
          )}
          <p style={{ fontSize: 12, color: "var(--mesh-muted)", margin: "8px 0 0" }}>{t("res.bannerHint")}</p>
          <input ref={bannerRef} type="file" accept="image/*" hidden onChange={(e) => { onBannerFile(e.target.files?.[0]); e.target.value = ""; }} />
        </div>

        <label style={{ display: "grid", gap: 6, fontWeight: 600, fontSize: 14 }}>{t("res.titleLabel")}
          <input className="mesh-input mesh-focus" value={title} onChange={(e) => setTitle(e.target.value)} placeholder={t("res.titlePh")} maxLength={140} style={{ fontSize: 17, fontWeight: 600 }} />
        </label>

        <div>
          <span style={{ display: "block", fontWeight: 600, fontSize: 14, marginBottom: 8 }}>{t("res.bodyLabel")}</span>
          <ArticleEditor initialHtml={bodyHtml} onChange={setBodyHtml} />
          <p style={{ fontSize: 12, color: "var(--mesh-muted)", margin: "8px 0 0" }}>{t("res.words").replace("{n}", String(words))}</p>
        </div>

        {err && <p role="alert" style={{ color: "var(--mesh-error)", fontSize: 14, margin: 0 }}>{err}</p>}

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {editId && savedStatus === "published" ? (
            <>
              <button className="mesh-btn mesh-btn-outline mesh-focus" disabled={saving !== null} onClick={() => save("draft")}>{saving === "draft" ? t("res.saving") : t("res.unpublish")}</button>
              <button className="mesh-btn mesh-btn-primary mesh-focus" disabled={saving !== null} onClick={() => save("published")}>{saving === "published" ? t("res.saving") : t("res.publish")}</button>
            </>
          ) : (
            <>
              <button className="mesh-btn mesh-btn-outline mesh-focus" disabled={saving !== null} onClick={() => save("draft")}>{saving === "draft" ? t("res.saving") : t("res.saveDraft")}</button>
              <button className="mesh-btn mesh-btn-primary mesh-focus" disabled={saving !== null} onClick={() => save("published")}>{saving === "published" ? t("res.saving") : t("res.publish")}</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function WritePage() {
  const { t } = useMeshPrefs();
  return <Suspense fallback={<div className="mesh-container" style={{ padding: "40px 0" }}>{t("common.loading")}</div>}><Inner /></Suspense>;
}
