"use client";
import { Suspense, useMemo, useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { AlertTriangle, Check, ImagePlus, Loader2, X } from "lucide-react";
import { useMeshPrefs } from "@/lib/mesh-i18n";
import { relativeTime } from "@/data/mesh-seed";
import { compressImageFile } from "@/components/mesh/imageCompress";

const ArticleEditor = dynamic(() => import("@/components/mesh/ArticleEditor"), { ssr: false });

type Phase = "loading" | "demo" | "anon" | "member" | "ready" | "notfound";
type SaveState = "idle" | "dirty" | "saving" | "saved" | "error";

const JSON_HEADERS = { "Content-Type": "application/json" };
const UNTITLED = "Untitled draft"; // stored placeholder for autosave-created drafts with no real title yet

function wordCount(html: string): number {
  if (typeof document === "undefined") return 0;
  const el = document.createElement("div");
  el.innerHTML = html;
  return (el.textContent || "").trim().split(/\s+/).filter(Boolean).length;
}

function Inner() {
  const { t, lang } = useMeshPrefs();
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

  // --- Autosave state -------------------------------------------------------
  const [articleId, setArticleId] = useState<number | null>(editId ? Number(editId) : null);
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null);
  const [hasEdited, setHasEdited] = useState(false);
  const [resumeDraft, setResumeDraft] = useState<{ id: number; title: string; updated_at: string } | null>(null);
  const [resumeDismissed, setResumeDismissed] = useState(false);

  const phaseRef = useRef(phase); phaseRef.current = phase;
  const stateRef = useRef({ title, banner, bodyHtml }); stateRef.current = { title, banner, bodyHtml };
  const articleIdRef = useRef<number | null>(editId ? Number(editId) : null);
  const versionRef = useRef(0);          // bumped on every change
  const savedVersionRef = useRef(0);     // version covered by the last successful save
  const hasUnsavedRef = useRef(false);
  const savingRef = useRef(false);
  const pendingRef = useRef(false);
  const savePromiseRef = useRef<Promise<boolean> | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const selfNavRef = useRef(false);      // set before our own router.replace(?edit=id) so the load effect skips

  function scheduleSave(ms: number) {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => { timerRef.current = null; void runSaveRef.current(); }, ms);
  }

  function markDirty() {
    versionRef.current += 1;
    hasUnsavedRef.current = true;
    setHasEdited(true);
    setSaveState((prev) => (prev === "saving" ? prev : "dirty"));
    scheduleSave(2000);
  }

  /** One autosave pass. Creates the draft on first save (POST), then PATCHes content
   *  (never status — autosave must not publish or unpublish anything). */
  async function runSave(opts?: { keepalive?: boolean }): Promise<boolean> {
    if (phaseRef.current !== "ready") return false;
    if (savingRef.current) { if (!opts?.keepalive) pendingRef.current = true; return savePromiseRef.current ?? Promise.resolve(false); }
    if (!hasUnsavedRef.current) return true;
    const snap = { ...stateRef.current, version: versionRef.current };
    // Never create an empty draft from a blank page visit.
    if (snap.title.trim().length === 0 && wordCount(snap.bodyHtml) === 0) return true;
    const realTitle = snap.title.trim().length >= 3 ? snap.title.trim() : null;
    const id = articleIdRef.current;
    savingRef.current = true; pendingRef.current = false;
    if (!opts?.keepalive) setSaveState("saving");
    const p = (async (): Promise<boolean> => {
      let ok = false;
      try {
        if (opts?.keepalive) {
          // Fire-and-forget while the page goes away; the draft lands server-side or not at all.
          const payload = id
            ? { ...(realTitle ? { title: realTitle } : {}), banner: snap.banner, bodyHtml: snap.bodyHtml }
            : { title: realTitle ?? UNTITLED, banner: snap.banner, bodyHtml: snap.bodyHtml, status: "draft" as const };
          fetch(id ? `/api/mesh/articles/${id}` : "/api/mesh/articles", {
            method: id ? "PATCH" : "POST", headers: JSON_HEADERS, body: JSON.stringify(payload), keepalive: true,
          }).catch(() => { /* best effort */ });
          savedVersionRef.current = snap.version;
          if (versionRef.current === snap.version) hasUnsavedRef.current = false;
          return true;
        }
        let r: Response;
        if (id) {
          const payload: Record<string, unknown> = { banner: snap.banner, bodyHtml: snap.bodyHtml };
          if (realTitle) payload.title = realTitle; // a <3-char title keeps the stored one for now
          r = await fetch(`/api/mesh/articles/${id}`, { method: "PATCH", headers: JSON_HEADERS, body: JSON.stringify(payload) });
        } else {
          r = await fetch("/api/mesh/articles", {
            method: "POST", headers: JSON_HEADERS,
            body: JSON.stringify({ title: realTitle ?? UNTITLED, banner: snap.banner, bodyHtml: snap.bodyHtml, status: "draft" }),
          });
        }
        const d = await r.json().catch(() => ({}));
        if (!r.ok) throw new Error(typeof d.error === "string" ? d.error : "save_failed");
        if (!id && d.id) {
          articleIdRef.current = d.id; setArticleId(d.id);
          selfNavRef.current = true;
          router.replace(`/mesh/resources/write?edit=${d.id}`, { scroll: false });
        }
        if (d.updated_at) setLastSavedAt(d.updated_at);
        savedVersionRef.current = snap.version;
        if (versionRef.current === snap.version) { hasUnsavedRef.current = false; setSaveState("saved"); }
        else setSaveState("dirty");
        ok = true;
        return true;
      } catch {
        setSaveState("error");
        return false;
      } finally {
        savingRef.current = false; savePromiseRef.current = null;
        // Changes that arrived mid-save (or a queued save request) get one follow-up pass.
        // Failures are NOT auto-retried here — the next edit or an indicator click retries.
        if (ok && !opts?.keepalive && hasUnsavedRef.current && savedVersionRef.current !== versionRef.current) {
          const queued = pendingRef.current; pendingRef.current = false;
          scheduleSave(queued ? 0 : 800);
        } else pendingRef.current = false;
      }
    })();
    savePromiseRef.current = p;
    return p;
  }
  const runSaveRef = useRef(runSave); runSaveRef.current = runSave;

  // Best-effort flush when the tab is hidden or the page is closed.
  useEffect(() => {
    const flush = (createToo: boolean) => {
      if (!hasUnsavedRef.current || savingRef.current) return;
      if (!createToo && articleIdRef.current === null) return; // hidden tab: PATCH an existing draft only; creating waits for pagehide
      void runSaveRef.current({ keepalive: true });
    };
    const onVis = () => { if (document.visibilityState === "hidden") flush(false); };
    const onHide = () => flush(true);
    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("pagehide", onHide);
    return () => { document.removeEventListener("visibilitychange", onVis); window.removeEventListener("pagehide", onHide); };
  }, []);

  // Native "leave page?" prompt while there are unsaved changes.
  useEffect(() => {
    const onBeforeUnload = (e: BeforeUnloadEvent) => { if (hasUnsavedRef.current) { e.preventDefault(); e.returnValue = ""; } };
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, []);

  useEffect(() => {
    // Our own autosave router.replace(?edit=id) must not trigger a reload of the article.
    if (selfNavRef.current) { selfNavRef.current = false; return; }
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
        articleIdRef.current = Number(editId); setArticleId(Number(editId));
        setLastSavedAt(a.updated_at); setSaveState("saved");
      } else {
        // Offer to resume the most recently edited draft — never force it into the editor.
        const mine = await fetch("/api/mesh/articles?scope=mine").then((r) => (r.ok ? r.json() : null)).catch(() => null);
        const drafts = ((mine?.articles ?? []) as { id: number; title: string; status: string; updated_at: string }[]).filter((a) => a.status === "draft");
        if (drafts.length) setResumeDraft({ id: drafts[0].id, title: drafts[0].title, updated_at: drafts[0].updated_at });
      }
      setPhase("ready");
    })();
  }, [editId]);

  const words = useMemo(() => wordCount(bodyHtml), [bodyHtml]);

  async function onBannerFile(file: File | undefined) {
    if (!file) return;
    try { setBanner(await compressImageFile(file, 1500, 0.82)); markDirty(); } catch { /* unreadable image */ }
  }

  async function save(status: "draft" | "published") {
    setErr("");
    if (title.trim().length < 3) { setErr(t("res.errTitle")); return; }
    setSaving(status);
    try {
      // Flush the autosave first: cancel the debounce and let any in-flight save settle,
      // then send the full current content with the requested status (supersedes autosave).
      if (timerRef.current) { clearTimeout(timerRef.current); timerRef.current = null; }
      if (savePromiseRef.current) { try { await savePromiseRef.current; } catch { /* superseded by the save below */ } }
      const id = articleIdRef.current ?? (editId ? Number(editId) : null);
      const payload = { title: title.trim(), banner, bodyHtml, status };
      const r = id
        ? await fetch(`/api/mesh/articles/${id}`, { method: "PATCH", headers: JSON_HEADERS, body: JSON.stringify(payload) })
        : await fetch("/api/mesh/articles", { method: "POST", headers: JSON_HEADERS, body: JSON.stringify(payload) });
      const d = await r.json().catch(() => ({}));
      if (!r.ok) { setErr(d.error === "invalid_title" ? t("res.errTitle") : d.error === "empty_body" ? t("res.errEmpty") : t("res.errSave")); return; }
      if (d.id) { articleIdRef.current = d.id; setArticleId(d.id); }
      if (d.updated_at) setLastSavedAt(d.updated_at);
      savedVersionRef.current = versionRef.current; hasUnsavedRef.current = false; setSaveState("saved"); setSavedStatus(status);
      if (status === "published") router.push(`/mesh/resources/${d.id ?? id}`);
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

  const savedTime = lastSavedAt
    ? new Intl.DateTimeFormat(lang === "ar" ? "ar" : "en", { hour: "2-digit", minute: "2-digit" }).format(new Date(lastSavedAt))
    : "";
  const indicator = saveState === "saving" ? (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--mesh-muted)" }}>
      <Loader2 size={14} className="mesh-spin" /> {t("res.save.saving")}
    </span>
  ) : saveState === "saved" && lastSavedAt ? (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--mesh-muted)" }}>
      <Check size={14} style={{ color: "var(--mesh-accent)" }} /> {(hasEdited ? t("res.save.saved") : t("res.save.lastSaved")).replace("{time}", savedTime)}
    </span>
  ) : saveState === "dirty" ? (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 13, color: "var(--mesh-muted)" }}>
      <span style={{ width: 8, height: 8, borderRadius: 999, background: "var(--mesh-muted)", display: "inline-block" }} /> {t("res.save.unsaved")}
    </span>
  ) : saveState === "error" ? (
    <button type="button" className="mesh-focus" onClick={() => { void runSaveRef.current(); }}
      style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: "var(--mesh-error)", background: "none", border: "none", padding: 0, cursor: "pointer", fontFamily: "inherit" }}>
      <AlertTriangle size={14} /> {t("res.save.error")}
    </button>
  ) : null;

  return (
    <div className="mesh-container" style={{ padding: "36px 0 56px", maxWidth: 860 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap", margin: "0 0 24px" }}>
        <h1 style={{ fontSize: 28, margin: 0 }}>{editId ? t("res.edit") : t("res.write")}</h1>
        <div style={{ marginInlineStart: "auto" }} aria-live="polite">{indicator}</div>
      </div>

      {resumeDraft && !resumeDismissed && !editId && articleId === null && (
        <div className="mesh-card" style={{ padding: "14px 16px", marginBottom: 22, display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
          <p style={{ margin: 0, fontSize: 13.5, color: "var(--mesh-secondary)" }}>
            {t("res.save.resume").replace("{title}", resumeDraft.title)} · {t("res.save.editedAgo").replace("{when}", relativeTime(resumeDraft.updated_at, lang))}
          </p>
          <span style={{ marginInlineStart: "auto", display: "flex", gap: 8 }}>
            <button type="button" className="mesh-btn mesh-btn-primary mesh-btn-sm mesh-focus"
              onClick={() => { window.location.href = `/mesh/resources/write?edit=${resumeDraft.id}`; }}>{t("res.save.resumeBtn")}</button>
            <button type="button" className="mesh-btn mesh-btn-outline mesh-btn-sm mesh-focus" onClick={() => setResumeDismissed(true)}>{t("res.save.dismiss")}</button>
          </span>
        </div>
      )}

      <div style={{ display: "grid", gap: 22 }}>
        <div>
          <span style={{ display: "block", fontWeight: 600, fontSize: 14, marginBottom: 8 }}>{t("res.banner")}</span>
          {banner ? (
            <div>
              <img src={banner} alt="" style={{ width: "100%", aspectRatio: "5 / 2", objectFit: "cover", borderRadius: 12, display: "block" }} />
              <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                <button type="button" className="mesh-btn mesh-btn-outline mesh-btn-sm mesh-focus" onClick={() => bannerRef.current?.click()}>{t("res.changeBanner")}</button>
                <button type="button" className="mesh-btn mesh-btn-outline mesh-btn-sm mesh-focus" onClick={() => { setBanner(null); markDirty(); }}><X size={14} /> {t("res.removeBanner")}</button>
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
          <input className="mesh-input mesh-focus" value={title} onChange={(e) => { setTitle(e.target.value); markDirty(); }} placeholder={t("res.titlePh")} maxLength={140} style={{ fontSize: 17, fontWeight: 600 }} />
        </label>

        <div>
          <span style={{ display: "block", fontWeight: 600, fontSize: 14, marginBottom: 8 }}>{t("res.bodyLabel")}</span>
          <ArticleEditor initialHtml={bodyHtml} onChange={(html) => { setBodyHtml(html); markDirty(); }} />
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
