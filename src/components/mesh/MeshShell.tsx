"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Plus, Search, User } from "lucide-react";

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
  const [q, setQ] = useState("");
  const [demo, setDemo] = useState(false);
  useEffect(() => { fetch("/api/mesh/auth/me").then((r) => r.json()).then((d) => { if (d.dbConfigured === false) setDemo(true); }).catch(() => setDemo(true)); }, []);
  async function logout() { await fetch("/api/mesh/auth/logout", { method: "POST" }); setMe(null); router.push("/mesh"); router.refresh(); }
  return (
    <div>
      <header style={{ background: "#fff", borderBottom: "1px solid #EBEBEB", position: "sticky", top: 0, zIndex: 40 }}>
        <div className="mesh-container" style={{ display: "flex", alignItems: "center", gap: 20, minHeight: 64, flexWrap: "wrap", paddingTop: 8, paddingBottom: 8 }}>
          <Link href="/mesh" style={{ textDecoration: "none", color: "#171717", lineHeight: 1 }}>
            <span style={{ fontWeight: 800, fontSize: 22, letterSpacing: "-0.02em" }}>MESH</span>
            <span style={{ display: "block", fontSize: 10, color: "#8F8F8F", fontWeight: 500, letterSpacing: ".02em", marginTop: 2 }}>Medinah English Students Hub</span>
          </Link>
          <nav style={{ display: "flex", gap: 18, fontSize: 14, fontWeight: 500 }} aria-label="Main">
            <Link href="/mesh" style={{ color: "#171717", textDecoration: "none" }}>Home</Link>
            <Link href="/mesh/browse" style={{ color: "#4D4D4D", textDecoration: "none" }}>Browse Discussions</Link>
            <Link href="/mesh/category/getting-started" style={{ color: "#4D4D4D", textDecoration: "none" }}>Getting Started</Link>
          </nav>
          <form role="search" style={{ flex: 1, minWidth: 160, maxWidth: 360, marginLeft: "auto", position: "relative" }} onSubmit={(e) => { e.preventDefault(); router.push(`/mesh/browse?q=${encodeURIComponent(q)}`); }}>
            <Search size={16} style={{ position: "absolute", left: 10, top: 13, color: "#8F8F8F" }} aria-hidden />
            <input aria-label="Search discussions" className="mesh-input mesh-focus" style={{ paddingLeft: 34, minHeight: 40 }} placeholder="Search questions…" value={q} onChange={(e) => setQ(e.target.value)} />
          </form>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {me ? (<>
              <Link href={`/mesh/profile/${me.id}`} style={{ display: "inline-flex", gap: 6, alignItems: "center", fontSize: 14, fontWeight: 600, color: "#171717", textDecoration: "none" }}><User size={16} />{me.display_name}</Link>
              <button onClick={logout} className="mesh-btn mesh-btn-outline mesh-btn-sm mesh-focus" aria-label="Log out"><LogOut size={14} /> Log out</button>
            </>) : (<Link href="/mesh/login" style={{ fontSize: 14, fontWeight: 600, color: "#171717", textDecoration: "none", padding: "8px 4px" }}>Log In</Link>)}
            <Link href="/mesh/ask" className="mesh-btn mesh-btn-primary mesh-focus" style={{ minHeight: 40, padding: "0 16px" }}><Plus size={16} /> Ask a Question</Link>
          </div>
        </div>
      </header>
      {demo && <div role="status" style={{ background: "#EDF7F0", borderBottom: "1px solid #D9F0E2", color: "#0B4025", fontSize: 13 }}><div className="mesh-container" style={{ paddingTop: 8, paddingBottom: 8 }}>Demonstration mode — sample content shown. Live posting and voting activate when the database is connected.</div></div>}
      <main>{children}</main>
      <footer style={{ borderTop: "1px solid #EBEBEB", background: "#fff", marginTop: 64 }}>
        <div className="mesh-container" style={{ paddingTop: 32, paddingBottom: 32, display: "flex", gap: 24, flexWrap: "wrap", justifyContent: "space-between" }}>
          <div><div style={{ fontWeight: 800 }}>MESH</div><div style={{ fontSize: 12, color: "#8F8F8F" }}>Medinah English Students Hub — student community, not affiliated with any university or government service.</div></div>
          <nav style={{ display: "flex", gap: 18, fontSize: 14 }} aria-label="Footer">
            <Link href="/mesh/about" style={{ color: "#4D4D4D", textDecoration: "none" }}>About</Link>
            <Link href="/mesh/guidelines" style={{ color: "#4D4D4D", textDecoration: "none" }}>Community Guidelines</Link>
            <Link href="/mesh/about#contact" style={{ color: "#4D4D4D", textDecoration: "none" }}>Contact</Link>
            <Link href="/mesh/privacy" style={{ color: "#4D4D4D", textDecoration: "none" }}>Privacy</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
