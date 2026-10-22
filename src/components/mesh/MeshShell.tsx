"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Bell, BookOpen, LogOut, Menu, Moon, MoonStar, Plus, Search, Shield, Sun, User, X } from "lucide-react";
import { useMeshPrefs } from "@/lib/mesh-i18n";

export type MeshMe = { id: number; display_name: string; role: string; notifications_unread?: number } | null;

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
  const pathname = usePathname();
  const { me, setMe } = useMeshMe();
  const { lang, setLang, theme, toggleTheme, t } = useMeshPrefs();
  const [q, setQ] = useState("");
  const [demo, setDemo] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => { fetch("/api/mesh/auth/me").then((r) => r.json()).then((d) => { if (d.dbConfigured === false) setDemo(true); }).catch(() => setDemo(true)); }, []);
  // Close the sidebar on navigation, on Escape, and lock body scroll while it is open.
  useEffect(() => { setMenuOpen(false); }, [pathname]);
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuOpen(false); };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [menuOpen]);
  async function logout() { await fetch("/api/mesh/auth/logout", { method: "POST" }); setMe(null); setMenuOpen(false); router.push("/"); router.refresh(); }
  return (
    <div>
      <header className="mesh-header-bar" style={{ position: "sticky", top: 0, zIndex: 40 }}>
        <div className="mesh-container" style={{ display: "flex", alignItems: "center", gap: 20, minHeight: 64, flexWrap: "wrap", paddingTop: 10, paddingBottom: 10 }}>
          <Link href="/" style={{ textDecoration: "none", color: "var(--mesh-text)", lineHeight: 1 }}>
            <span style={{ fontWeight: 800, fontSize: 22, letterSpacing: "-0.02em" }}>MESH</span>
            <span style={{ display: "block", fontSize: 10, color: "var(--mesh-muted)", fontWeight: 500, marginTop: 3 }}>{t("brand.sub")}</span>
          </Link>
          <nav style={{ display: "flex", gap: 20, fontSize: 14, fontWeight: 500 }} aria-label={t("nav.main")}>
            <Link href="/" style={{ color: "var(--mesh-text)", textDecoration: "none" }}>{t("nav.home")}</Link>
            <Link href="/browse" style={{ color: "var(--mesh-secondary)", textDecoration: "none" }}>{t("nav.browse")}</Link>
            <Link href="/category/getting-started" style={{ color: "var(--mesh-secondary)", textDecoration: "none" }}>{t("nav.gettingStarted")}</Link>
          </nav>
          <form role="search" style={{ flex: 1, minWidth: 140, maxWidth: 320, marginInlineStart: "auto", position: "relative" }} onSubmit={(e) => { e.preventDefault(); router.push(`/browse?q=${encodeURIComponent(q)}`); }}>
            <Search size={16} className="mesh-search-icon" style={{ top: 15 }} aria-hidden />
            <input aria-label={t("nav.searchAria")} className="mesh-input mesh-focus mesh-search-input" style={{ minHeight: 40 }} placeholder={t("nav.searchPh")} value={q} onChange={(e) => setQ(e.target.value)} />
          </form>
          <button type="button" className="mesh-icon-btn mesh-focus" onClick={() => setMenuOpen(true)} aria-label={t("nav.menu")} aria-expanded={menuOpen} aria-controls="mesh-sidebar">
            <Menu size={19} />
          </button>
        </div>
      </header>

      {/* Sidebar: account actions + create post + theme/language settings */}
      <div className={`mesh-drawer-backdrop${menuOpen ? " open" : ""}`} onClick={() => setMenuOpen(false)} aria-hidden={!menuOpen} />
      <aside id="mesh-sidebar" className={`mesh-drawer${menuOpen ? " open" : ""}`} aria-hidden={!menuOpen} aria-label={t("nav.menu")}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
          <span style={{ fontWeight: 800, fontSize: 18 }}>MESH</span>
          <button type="button" className="mesh-icon-btn mesh-focus" onClick={() => setMenuOpen(false)} aria-label={t("nav.close")} tabIndex={menuOpen ? 0 : -1}>
            <X size={18} />
          </button>
        </div>

        <Link href="/ask" className="mesh-btn mesh-btn-primary mesh-focus" style={{ width: "100%", minHeight: 46 }} tabIndex={menuOpen ? 0 : -1}><Plus size={16} /> {t("nav.ask")}</Link>

        <div style={{ borderTop: "1px solid var(--mesh-hairline)", marginTop: 24, paddingTop: 24, display: "grid", gap: 10 }}>
          <Link href="/resources" className="mesh-drawer-row mesh-focus" tabIndex={menuOpen ? 0 : -1}><BookOpen size={17} /> {t("nav.resources")}</Link>
          <a href="/duroos" className="mesh-drawer-row mesh-focus" tabIndex={menuOpen ? 0 : -1}><MoonStar size={17} /> {lang === "ar" ? "دروس النبوي" : "Nabawi Duroos"}</a>
          {me ? (<>
            <Link href={`/profile/${me.id}`} className="mesh-drawer-row mesh-focus" tabIndex={menuOpen ? 0 : -1}><User size={17} /><span style={{ fontWeight: 600 }}>{me.display_name}</span></Link>
            <Link href="/notifications" className="mesh-drawer-row mesh-focus" tabIndex={menuOpen ? 0 : -1}>
              <Bell size={17} /> {t("nav.notifications")}
              {!!me.notifications_unread && <span aria-label={`${me.notifications_unread}`} style={{ marginInlineStart: "auto", background: "var(--mesh-primary)", color: "var(--mesh-on-primary)", fontSize: 11, fontWeight: 700, minWidth: 20, height: 20, borderRadius: 999, display: "inline-grid", placeItems: "center", padding: "0 6px" }}>{me.notifications_unread}</span>}
            </Link>
            {me.role === "admin" && (
              <Link href="/mesh/admin" className="mesh-drawer-row mesh-focus" tabIndex={menuOpen ? 0 : -1}><Shield size={17} /> {t("nav.admin")}</Link>
            )}
            <button onClick={logout} className="mesh-drawer-row mesh-focus" style={{ cursor: "pointer" }} tabIndex={menuOpen ? 0 : -1}><LogOut size={17} /> {t("nav.logout")}</button>
          </>) : (
            <Link href="/login" className="mesh-btn mesh-btn-outline mesh-focus" style={{ width: "100%", minHeight: 44 }} tabIndex={menuOpen ? 0 : -1}>{t("nav.login")}</Link>
          )}
        </div>

        <div style={{ borderTop: "1px solid var(--mesh-hairline)", marginTop: 24, paddingTop: 24, display: "grid", gap: 10 }}>
          <div className="mesh-drawer-row" style={{ justifyContent: "space-between" }}>
            <span>{t("theme.toggle")}</span>
            <button type="button" className="mesh-icon-btn mesh-focus" onClick={toggleTheme} aria-label={t("theme.toggle")} tabIndex={menuOpen ? 0 : -1}>
              {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
            </button>
          </div>
          <div className="mesh-drawer-row" style={{ justifyContent: "space-between" }}>
            <span>{t("lang.toggle")}</span>
            <button type="button" className="mesh-icon-btn mesh-lang-btn mesh-focus" onClick={() => setLang(lang === "ar" ? "en" : "ar")} aria-label={t("lang.toggle")} tabIndex={menuOpen ? 0 : -1}>
              {lang === "ar" ? "English" : "العربية"}
            </button>
          </div>
        </div>
      </aside>

      {demo && <div role="status" className="mesh-demo-banner"><div className="mesh-container" style={{ paddingTop: 12, paddingBottom: 12 }}>{t("demo.banner")}</div></div>}
      <main>{children}</main>
      <footer style={{ borderTop: "1px solid var(--mesh-hairline)", background: "var(--mesh-surface)", marginTop: 72 }}>
        <div className="mesh-container" style={{ paddingTop: 40, paddingBottom: 40, display: "flex", gap: 28, flexWrap: "wrap", justifyContent: "space-between" }}>
          <div><div style={{ fontWeight: 800 }}>MESH</div><div style={{ fontSize: 12, color: "var(--mesh-muted)", marginTop: 4 }}>{t("footer.tag")}</div></div>
          <nav style={{ display: "flex", gap: 20, fontSize: 14 }} aria-label={t("nav.footer")}>
            <Link href="/resources" style={{ color: "var(--mesh-secondary)", textDecoration: "none" }}>{t("nav.resources")}</Link>
            <Link href="/about" style={{ color: "var(--mesh-secondary)", textDecoration: "none" }}>{t("footer.about")}</Link>
            <Link href="/guidelines" style={{ color: "var(--mesh-secondary)", textDecoration: "none" }}>{t("footer.guidelines")}</Link>
            <Link href="/about#contact" style={{ color: "var(--mesh-secondary)", textDecoration: "none" }}>{t("footer.contact")}</Link>
            <Link href="/privacy" style={{ color: "var(--mesh-secondary)", textDecoration: "none" }}>{t("footer.privacy")}</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
