"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Moon, Plus, Search, Sun, User } from "lucide-react";
import { useMeshPrefs } from "@/lib/mesh-i18n";

export type MeshMe = { id: number; display_name: string; role: string } | null;

export function useMeshMe() {
  const [me, setMe] = useState<MeshMe>(null);
  const [dbOk, setDbOk] = useState<boolean | null>(null);
  useEffect(() => {
    fetch("/api/mesh/auth/me").then(async (r) => { const d = await r.json().catch(() => ({})); setMe(d.user ?? null); setDbOk(d.dbConfigured !== false); }).catch(() => setDbOk(false));
  }, []);
  return { me, setMe, dbOk };
}

export default function MeshShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { me, setMe } = useMeshMe();
  const { lang, setLang, theme, toggleTheme, t } = useMeshPrefs();
  const [q, setQ] = useState("");
  const [demo, setDemo] = useState(false);
  useEffect(() => { fetch("/api/mesh/auth/me").then((r) => r.json()).then((d) => { if (d.dbConfigured === false) setDemo(true); }).catch(() => setDemo(true)); }, []);
  async function logout() { await fetch("/api/mesh/auth/logout", { method: "POST" }); setMe(null); router.push("/mesh"); router.refresh(); }
  return (
    <div>
      <header className="mesh-header-bar" style={{ position: "sticky", top: 0, zIndex: 40 }}>
        <div className="mesh-container" style={{ display: "flex", alignItems: "center", gap: 16, minHeight: 64, flexWrap: "wrap", paddingTop: 8, paddingBottom: 8 }}>
          <Link href="/mesh" style={{ textDecoration: "none", color: "var(--mesh-text)", lineHeight: 1 }}>
            <span style={{ fontWeight: 800, fontSize: 22, letterSpacing: "-0.02em" }}>MESH</span>
            <span style={{ display: "block", fontSize: 10, color: "var(--mesh-muted)", fontWeight: 500, marginTop: 2 }}>{t("brand.sub")}</span>
          </Link>
          <nav style={{ display: "flex", gap: 16, fontSize: 14, fontWeight: 500 }} aria-label={t("nav.main")}>
            <Link href="/mesh" style={{ color: "var(--mesh-text)", textDecoration: "none" }}>{t("nav.home")}</Link>
            <Link href="/mesh/browse" style={{ color: "var(--mesh-secondary)", textDecoration: "none" }}>{t("nav.browse")}</Link>
            <Link href="/mesh/category/getting-started" style={{ color: "var(--mesh-secondary)", textDecoration: "none" }}>{t("nav.gettingStarted")}</Link>
          </nav>
          <form role="search" style={{ flex: 1, minWidth: 140, maxWidth: 320, marginInlineStart: "auto", position: "relative" }} onSubmit={(e) => { e.preventDefault(); router.push(`/mesh/browse?q=${encodeURIComponent(q)}`); }}>
            <Search size={16} className="mesh-search-icon" style={{ top: 13 }} aria-hidden />
            <input aria-label={t("nav.searchAria")} className="mesh-input mesh-focus mesh-search-input" style={{ minHeight: 40 }} placeholder={t("nav.searchPh")} value={q} onChange={(e) => setQ(e.target.value)} />
          </form>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <button type="button" className="mesh-icon-btn mesh-lang-btn mesh-focus" onClick={() => setLang(lang === "ar" ? "en" : "ar")} aria-label={t("lang.toggle")}>
              {lang === "ar" ? "English" : "العربية"}
            </button>
            <button type="button" className="mesh-icon-btn mesh-focus" onClick={toggleTheme} aria-label={t("theme.toggle")}>
              {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            {me ? (<>
              <Link href={`/mesh/profile/${me.id}`} style={{ display: "inline-flex", gap: 6, alignItems: "center", fontSize: 14, fontWeight: 600, color: "var(--mesh-text)", textDecoration: "none" }}><User size={16} />{me.display_name}</Link>
              <button onClick={logout} className="mesh-btn mesh-btn-outline mesh-btn-sm mesh-focus" aria-label={t("nav.logout")}><LogOut size={14} /> {t("nav.logout")}</button>
            </>) : (<Link href="/mesh/login" style={{ fontSize: 14, fontWeight: 600, color: "var(--mesh-text)", textDecoration: "none", padding: "8px 4px" }}>{t("nav.login")}</Link>)}
            <Link href="/mesh/ask" className="mesh-btn mesh-btn-primary mesh-focus" style={{ minHeight: 40, padding: "0 16px" }}><Plus size={16} /> {t("nav.ask")}</Link>
          </div>
        </div>
      </header>
      {demo && <div role="status" className="mesh-demo-banner"><div className="mesh-container" style={{ paddingTop: 8, paddingBottom: 8 }}>{t("demo.banner")}</div></div>}
      <main>{children}</main>
      <footer style={{ borderTop: "1px solid var(--mesh-hairline)", background: "var(--mesh-surface)", marginTop: 64 }}>
        <div className="mesh-container" style={{ paddingTop: 32, paddingBottom: 32, display: "flex", gap: 24, flexWrap: "wrap", justifyContent: "space-between" }}>
          <div><div style={{ fontWeight: 800 }}>MESH</div><div style={{ fontSize: 12, color: "var(--mesh-muted)" }}>{t("footer.tag")}</div></div>
          <nav style={{ display: "flex", gap: 18, fontSize: 14 }} aria-label={t("nav.footer")}>
            <Link href="/mesh/about" style={{ color: "var(--mesh-secondary)", textDecoration: "none" }}>{t("footer.about")}</Link>
            <Link href="/mesh/guidelines" style={{ color: "var(--mesh-secondary)", textDecoration: "none" }}>{t("footer.guidelines")}</Link>
            <Link href="/mesh/about#contact" style={{ color: "var(--mesh-secondary)", textDecoration: "none" }}>{t("footer.contact")}</Link>
            <Link href="/mesh/privacy" style={{ color: "var(--mesh-secondary)", textDecoration: "none" }}>{t("footer.privacy")}</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
