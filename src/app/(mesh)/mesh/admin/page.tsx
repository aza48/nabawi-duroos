"use client";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { relativeTime } from "@/data/mesh-seed";
import { useMeshPrefs } from "@/lib/mesh-i18n";
import { UserChips } from "@/components/mesh/UserBadge";

type Tab = "overview" | "users" | "reports" | "trash" | "audit";
type Overview = {
  users: { total: number; members: number; mandoobs: number; admins: number; suspended: number };
  questions: { total: number; open: number; resolved: number; locked: number };
  answers: { total: number }; reports: { open: number }; flags: { outdated30d: number };
  trash: { questions: number; answers: number; total: number };
};
type AdminUser = { id: number; email: string; display_name: string; role: string; country: string | null; email_verified: boolean; is_seed: boolean; suspended_at: string | null; created_at: string; questions_count: number; answers_count: number };
type Report = { id: number; target_type: string; target_id: number; reason: string; status: string; created_at: string; reporter_name: string | null; question_title: string | null; answer_question_id: number | null; answer_question_title: string | null; answer_excerpt: string | null; question_deleted: boolean | null; answer_deleted: boolean | null };
type TrashItem = { type: "question" | "answer"; id: number; title?: string; excerpt?: string; question_id?: number; question_title?: string | null; author_name: string; deleted_by_name: string | null; deleted_at: string; restorable: boolean; restore_until: string };
type AuditEntry = { id: number; actor_name: string | null; actor_email: string | null; action: string; target_type: string | null; target_id: number | null; detail: string | null; created_at: string };

const errKey = (code: string): string =>
  code === "cannot_modify_self" ? "admin.errSelf" : code === "last_admin" ? "admin.errLastAdmin" : code === "seed_user" ? "admin.errSeed" : "admin.errGeneric";

async function api(path: string, init?: RequestInit): Promise<{ status: number; data: Record<string, unknown> }> {
  const r = await fetch(path, init);
  const data = await r.json().catch(() => ({})) as Record<string, unknown>;
  return { status: r.status, data };
}
const jsonInit = (method: string, body: unknown): RequestInit => ({ method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });

const badge: React.CSSProperties = { fontSize: 10.5, fontWeight: 700, padding: "1px 7px", borderRadius: 999, border: "1px solid var(--mesh-hairline)", color: "var(--mesh-secondary)", whiteSpace: "nowrap" };
const rowBox: React.CSSProperties = { padding: "16px 20px", borderBottom: "1px solid var(--mesh-hairline)" };
const tabBtn = (active: boolean): React.CSSProperties => ({
  padding: "8px 14px", borderRadius: 999, border: "1px solid var(--mesh-hairline)", cursor: "pointer", fontSize: 13.5, fontWeight: 600, fontFamily: "inherit",
  background: active ? "var(--mesh-primary)" : "transparent", color: active ? "var(--mesh-on-primary)" : "var(--mesh-text)",
});

export default function AdminPage() {
  const { lang, t } = useMeshPrefs();
  const [state, setState] = useState<"loading" | "ready" | "forbidden" | "demo">("loading");
  const [tab, setTab] = useState<Tab>("overview");
  const [overview, setOverview] = useState<Overview | null>(null);

  useEffect(() => {
    api("/api/mesh/admin/overview").then(({ status, data }) => {
      if (status === 403) { setState("forbidden"); return; }
      if (status !== 200) { setState("demo"); return; }
      setOverview(data as unknown as Overview); setState("ready");
    }).catch(() => setState("demo"));
  }, []);

  if (state === "loading") return <div className="mesh-container" style={{ padding: "36px 0 48px" }}><p style={{ color: "var(--mesh-secondary)" }}>{t("admin.loading")}</p></div>;
  if (state === "demo") return <div className="mesh-container" style={{ padding: "36px 0 48px", maxWidth: 760 }}><h1 style={{ fontSize: 26, margin: "0 0 12px" }}>{t("admin.title")}</h1><p style={{ color: "var(--mesh-secondary)", fontSize: 14.5, lineHeight: 1.65 }}>{t("admin.unavailable")}</p></div>;
  if (state === "forbidden") return (
    <div className="mesh-container" style={{ padding: "36px 0 48px", maxWidth: 760 }}>
      <h1 style={{ fontSize: 26, margin: "0 0 12px" }}>{t("admin.only")}</h1>
      <p style={{ color: "var(--mesh-secondary)", fontSize: 14.5, lineHeight: 1.65, margin: "0 0 18px" }}>{t("admin.onlyBody")}</p>
      <Link href="/" className="mesh-btn mesh-btn-primary mesh-btn-sm">{t("admin.back")}</Link>
    </div>
  );

  const tabs: { key: Tab; label: string }[] = [
    { key: "overview", label: t("admin.tabOverview") }, { key: "users", label: t("admin.tabUsers") },
    { key: "reports", label: t("admin.tabReports") }, { key: "trash", label: t("admin.tabTrash") }, { key: "audit", label: t("admin.tabAudit") },
  ];
  return (
    <div className="mesh-container" style={{ padding: "36px 0 48px" }}>
      <h1 style={{ fontSize: 26, margin: "0 0 20px" }}>{t("admin.title")}</h1>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }} role="tablist" aria-label={t("admin.title")}>
        {tabs.map((tb) => <button key={tb.key} role="tab" aria-selected={tab === tb.key} className="mesh-focus" style={tabBtn(tab === tb.key)} onClick={() => setTab(tb.key)}>{tb.label}</button>)}
      </div>
      {tab === "overview" && overview && <OverviewTab o={overview} />}
      {tab === "users" && <UsersTab />}
      {tab === "reports" && <ReportsTab />}
      {tab === "trash" && <TrashTab />}
      {tab === "audit" && <AuditTab />}
    </div>
  );

  function OverviewTab({ o }: { o: Overview }) {
    const stats: [string, number][] = [
      [t("admin.statUsers"), o.users.total], [t("admin.statMembers"), o.users.members], [t("admin.statMandoobs"), o.users.mandoobs],
      [t("admin.statAdmins"), o.users.admins], [t("admin.statSuspended"), o.users.suspended],
      [t("admin.statQuestions"), o.questions.total], [t("admin.statOpen"), o.questions.open], [t("admin.statResolved"), o.questions.resolved], [t("admin.statLocked"), o.questions.locked],
      [t("admin.statAnswers"), o.answers.total], [t("admin.statReportsOpen"), o.reports.open], [t("admin.statFlags30"), o.flags.outdated30d], [t("admin.statTrash"), o.trash.total],
    ];
    return (
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 14 }}>
        {stats.map(([label, n]) => (
          <div key={label} className="mesh-card" style={{ padding: "18px 20px" }}>
            <div style={{ fontSize: 26, fontWeight: 800, lineHeight: 1.1 }}>{n}</div>
            <div style={{ fontSize: 12.5, color: "var(--mesh-muted)", marginTop: 6 }}>{label}</div>
          </div>
        ))}
      </div>
    );
  }

  function UsersTab() {
    const [users, setUsers] = useState<AdminUser[] | null>(null);
    const [search, setSearch] = useState("");
    const [msg, setMsg] = useState("");
    const load = useCallback(async (q: string) => {
      const { status, data } = await api(`/api/mesh/admin/users?q=${encodeURIComponent(q)}&limit=100`);
      if (status === 200) setUsers((data.users as AdminUser[]) ?? []);
    }, []);
    useEffect(() => { load(""); }, [load]);
    async function patch(id: number, body: Record<string, unknown>) {
      setMsg("");
      const { status, data } = await api(`/api/mesh/admin/users/${id}`, jsonInit("PATCH", body));
      if (status !== 200) { setMsg(t(errKey(typeof data.error === "string" ? data.error : ""))); return; }
      setMsg(t("admin.saved")); load(search);
    }
    async function remove(u: AdminUser) {
      if (!window.confirm(t("admin.deleteUserConfirm").replace("{email}", u.email))) return;
      setMsg("");
      const { status, data } = await api(`/api/mesh/admin/users/${u.id}`, { method: "DELETE" });
      if (status !== 200) { setMsg(t(errKey(typeof data.error === "string" ? data.error : ""))); return; }
      setMsg(t("admin.saved")); load(search);
    }
    return (
      <div>
        <form onSubmit={(e) => { e.preventDefault(); load(search); }} style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 16 }}>
          <input className="mesh-input mesh-focus" style={{ flex: "1 1 240px", minHeight: 40 }} placeholder={t("admin.searchPh")} value={search} onChange={(e) => setSearch(e.target.value)} aria-label={t("admin.search")} />
          <button className="mesh-btn mesh-btn-outline mesh-btn-sm mesh-focus" type="submit">{t("admin.search")}</button>
        </form>
        {msg && <p role="status" style={{ fontSize: 13.5, color: "var(--mesh-accent)" }}>{msg}</p>}
        {users === null && <p style={{ color: "var(--mesh-secondary)" }}>{t("admin.loading")}</p>}
        {users && (
          <div className="mesh-card" style={{ overflow: "hidden" }}>
            {users.map((u) => <UserRow key={u.id} u={u} />)}
          </div>
        )}
      </div>
    );

    function UserRow({ u }: { u: AdminUser }) {
      const [role, setRole] = useState(u.role);
      const [country, setCountry] = useState(u.country ?? "");
      useEffect(() => { setRole(u.role); setCountry(u.country ?? ""); }, [u.role, u.country]);
      const joined = new Date(u.created_at).toLocaleDateString(lang === "ar" ? "ar" : "en", { year: "numeric", month: "short", day: "numeric" });
      return (
        <div style={{ ...rowBox, display: "flex", flexWrap: "wrap", gap: "12px 20px", alignItems: "center" }}>
          <div style={{ flex: "1 1 220px", minWidth: 200 }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
              <span style={{ fontWeight: 700, fontSize: 14.5 }}>{u.display_name}</span>
              <UserChips role={u.role} country={u.country} />
              {u.suspended_at && <span style={{ ...badge, color: "var(--mesh-error)" }}>{t("admin.suspendedBadge")}</span>}
              {!u.email_verified && <span style={badge}>{t("admin.unverifiedBadge")}</span>}
              {u.is_seed && <span style={badge}>{t("admin.seedBadge")}</span>}
            </div>
            <div style={{ fontSize: 12.5, color: "var(--mesh-muted)", marginTop: 4 }}>{u.email} · {t("admin.joined")} {joined} · {t("admin.content")}: {u.questions_count} / {u.answers_count}</div>
          </div>
          <label style={{ display: "grid", gap: 4, fontSize: 12, color: "var(--mesh-muted)", fontWeight: 600 }}>{t("admin.role")}
            <select className="mesh-input mesh-focus" style={{ minHeight: 38 }} value={role} onChange={(e) => setRole(e.target.value)} aria-label={t("admin.role")}>
              <option value="member">{t("admin.roleMember")}</option>
              <option value="mandoob">{t("admin.roleMandoob")}</option>
              <option value="admin">{t("admin.roleAdmin")}</option>
            </select>
          </label>
          {role === "mandoob" && (
            <label style={{ display: "grid", gap: 4, fontSize: 12, color: "var(--mesh-muted)", fontWeight: 600 }}>{t("admin.country")}
              <input className="mesh-input mesh-focus" style={{ minHeight: 38 }} value={country} onChange={(e) => setCountry(e.target.value)} placeholder={t("settings.countryPh")} />
            </label>
          )}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button className="mesh-btn mesh-btn-primary mesh-btn-sm mesh-focus" onClick={() => patch(u.id, { role, ...(role === "mandoob" ? { country } : {}) })}>{t("admin.save")}</button>
            <button className="mesh-btn mesh-btn-outline mesh-btn-sm mesh-focus" onClick={() => patch(u.id, { suspended: !u.suspended_at })}>{u.suspended_at ? t("admin.unsuspend") : t("admin.suspend")}</button>
            {!u.is_seed && <button className="mesh-btn mesh-btn-outline mesh-btn-sm mesh-focus" style={{ color: "var(--mesh-error)" }} onClick={() => remove(u)}>{t("admin.deleteUser")}</button>}
          </div>
        </div>
      );
    }
  }

  function ReportsTab() {
    const [filter, setFilter] = useState("open");
    const [reports, setReports] = useState<Report[] | null>(null);
    const load = useCallback(async (f: string) => {
      const { status, data } = await api(`/api/mesh/admin/reports?status=${f}`);
      if (status === 200) setReports((data.reports as Report[]) ?? []);
    }, []);
    useEffect(() => { load(filter); }, [filter, load]);
    async function setStatus(id: number, status: string) {
      const { status: s } = await api(`/api/mesh/admin/reports/${id}`, jsonInit("PATCH", { status }));
      if (s === 200) load(filter);
    }
    const filters: [string, string][] = [["open", t("admin.filterOpen")], ["resolved", t("admin.filterResolved")], ["dismissed", t("admin.filterDismissed")], ["all", t("admin.filterAll")]];
    return (
      <div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
          {filters.map(([v, label]) => <button key={v} className="mesh-focus" style={tabBtn(filter === v)} onClick={() => setFilter(v)}>{label}</button>)}
        </div>
        {reports === null && <p style={{ color: "var(--mesh-secondary)" }}>{t("admin.loading")}</p>}
        {reports && reports.length === 0 && <p style={{ color: "var(--mesh-secondary)" }}>{t("admin.reportsEmpty")}</p>}
        {reports && reports.length > 0 && (
          <div className="mesh-card" style={{ overflow: "hidden" }}>
            {reports.map((r) => {
              const qid = r.target_type === "question" ? r.target_id : r.answer_question_id;
              const title = r.target_type === "question" ? r.question_title : r.answer_question_title;
              return (
                <div key={r.id} style={rowBox}>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "baseline" }}>
                    <span style={badge}>{r.target_type === "question" ? t("admin.reportQuestion") : t("admin.reportAnswer")}</span>
                    <span style={{ fontWeight: 600, fontSize: 14.5 }}>{title ?? `#${r.target_id}`}</span>
                    <span style={{ fontSize: 12, color: "var(--mesh-muted)", marginInlineStart: "auto" }}>{relativeTime(r.created_at, lang)}</span>
                  </div>
                  {r.target_type === "answer" && r.answer_excerpt && <p style={{ fontSize: 13.5, color: "var(--mesh-secondary)", margin: "8px 0 0", lineHeight: 1.6 }}>“{r.answer_excerpt}…”</p>}
                  <p style={{ fontSize: 13.5, margin: "8px 0 0", lineHeight: 1.6 }}>{r.reason}</p>
                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center", marginTop: 10 }}>
                    <span style={{ fontSize: 12.5, color: "var(--mesh-muted)" }}>{t("admin.reportedBy")} {r.reporter_name ?? t("admin.someone")} · {r.status}</span>
                    {qid && <Link href={`/question/${qid}`} style={{ fontSize: 13, color: "var(--mesh-accent)", fontWeight: 600 }}>{t("admin.viewQuestion")}</Link>}
                    <span style={{ marginInlineStart: "auto", display: "inline-flex", gap: 8, flexWrap: "wrap" }}>
                      {r.status !== "resolved" && <button className="mesh-btn mesh-btn-primary mesh-btn-sm mesh-focus" onClick={() => setStatus(r.id, "resolved")}>{t("admin.resolve")}</button>}
                      {r.status !== "dismissed" && <button className="mesh-btn mesh-btn-outline mesh-btn-sm mesh-focus" onClick={() => setStatus(r.id, "dismissed")}>{t("admin.dismiss")}</button>}
                      {r.status !== "open" && <button className="mesh-btn mesh-btn-outline mesh-btn-sm mesh-focus" onClick={() => setStatus(r.id, "open")}>{t("admin.reopenReport")}</button>}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  function TrashTab() {
    const [items, setItems] = useState<TrashItem[] | null>(null);
    const [msg, setMsg] = useState("");
    const load = useCallback(async () => {
      const { status, data } = await api("/api/mesh/admin/trash");
      if (status === 200) setItems((data.items as TrashItem[]) ?? []);
    }, []);
    useEffect(() => { load(); }, [load]);
    async function restore(it: TrashItem) {
      setMsg("");
      const { status } = await api("/api/mesh/admin/trash", jsonInit("POST", { type: it.type, id: it.id, action: "restore" }));
      if (status === 200) { setMsg(t("admin.saved")); load(); }
    }
    async function purge(it: TrashItem) {
      if (!window.confirm(t("admin.purgeConfirm"))) return;
      setMsg("");
      const { status } = await api("/api/mesh/admin/trash", jsonInit("DELETE", { type: it.type, id: it.id }));
      if (status === 200) { setMsg(t("admin.saved")); load(); }
    }
    if (items === null) return <p style={{ color: "var(--mesh-secondary)" }}>{t("admin.loading")}</p>;
    if (items.length === 0) return <p style={{ color: "var(--mesh-secondary)" }}>{t("admin.trashEmpty")}</p>;
    return (
      <div>
        {msg && <p role="status" style={{ fontSize: 13.5, color: "var(--mesh-accent)" }}>{msg}</p>}
        <div className="mesh-card" style={{ overflow: "hidden" }}>
          {items.map((it) => (
            <div key={`${it.type}-${it.id}`} style={{ ...rowBox, display: "flex", flexWrap: "wrap", gap: "10px 18px", alignItems: "center" }}>
              <div style={{ flex: "1 1 260px", minWidth: 220 }}>
                <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                  <span style={badge}>{it.type === "question" ? t("admin.typeQuestion") : t("admin.typeAnswer")}</span>
                  <span style={{ fontWeight: 600, fontSize: 14.5 }}>{it.type === "question" ? it.title : (it.question_title ?? `#${it.question_id ?? ""}`)}</span>
                </div>
                {it.type === "answer" && it.excerpt && <p style={{ fontSize: 13, color: "var(--mesh-secondary)", margin: "6px 0 0", lineHeight: 1.6 }}>“{it.excerpt}…”</p>}
                <div style={{ fontSize: 12.5, color: "var(--mesh-muted)", marginTop: 5 }}>
                  {t("admin.by")} {it.author_name} · {t("admin.deletedBy")} {it.deleted_by_name ?? "—"} · {relativeTime(it.deleted_at, lang)}
                </div>
                <div style={{ fontSize: 12.5, color: it.restorable ? "var(--mesh-muted)" : "var(--mesh-error)", marginTop: 3 }}>
                  {it.restorable
                    ? t("admin.restorableUntil").replace("{date}", new Date(it.restore_until).toLocaleDateString(lang === "ar" ? "ar" : "en", { year: "numeric", month: "short", day: "numeric" }))
                    : t("admin.restoreExpired")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <button className="mesh-btn mesh-btn-primary mesh-btn-sm mesh-focus" onClick={() => restore(it)}>{t("admin.restore")}</button>
                <button className="mesh-btn mesh-btn-outline mesh-btn-sm mesh-focus" style={{ color: "var(--mesh-error)" }} onClick={() => purge(it)}>{t("admin.purge")}</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  function AuditTab() {
    const [entries, setEntries] = useState<AuditEntry[] | null>(null);
    useEffect(() => {
      api("/api/mesh/admin/audit?limit=100").then(({ status, data }) => { if (status === 200) setEntries((data.entries as AuditEntry[]) ?? []); else setEntries([]); }).catch(() => setEntries([]));
    }, []);
    if (entries === null) return <p style={{ color: "var(--mesh-secondary)" }}>{t("admin.loading")}</p>;
    if (entries.length === 0) return <p style={{ color: "var(--mesh-secondary)" }}>{t("admin.auditEmpty")}</p>;
    return (
      <div className="mesh-card" style={{ overflow: "hidden" }}>
        {entries.map((e) => (
          <div key={e.id} style={{ ...rowBox, display: "flex", flexWrap: "wrap", gap: "6px 14px", alignItems: "baseline" }}>
            <span style={{ fontSize: 12, color: "var(--mesh-muted)", whiteSpace: "nowrap" }}>{relativeTime(e.created_at, lang)}</span>
            <span style={{ fontWeight: 600, fontSize: 13.5 }}>{e.actor_name ?? t("admin.someone")}</span>
            <span style={badge}>{e.action}</span>
            {e.target_type && <span style={{ fontSize: 13, color: "var(--mesh-secondary)" }}>{e.target_type}{e.target_id ? ` #${e.target_id}` : ""}</span>}
            {e.detail && <span style={{ fontSize: 13, color: "var(--mesh-secondary)", flexBasis: "100%" }}>{e.detail}</span>}
          </div>
        ))}
      </div>
    );
  }
}
