"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Copy, Fingerprint } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { inviteAdminAction, revokeAdminAction, setRoleAction, setWhatsAppUrlAction } from "@/app/(admin)/admin/actions";
import { btnGhost, btnPrimary, ErrorNote, Field, inputCls } from "../ui";
import { useFeedback } from "../Feedback";

export function WhatsAppForm({ current }: { current: string }) {
  const [url, setUrl] = useState(current);
  const [msg, setMsg] = useState<string | null>(null);
  const { notify } = useFeedback();
  // Messages show in the toast above the tab bar, never under the button where a phone hides them.
  useEffect(() => { if (msg) notify(msg); }, [msg, notify]);
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();
  return (
    <form className="grid gap-3" onSubmit={(e) => { e.preventDefault(); setMsg(null); setError(null); start(async () => {
      const r = await setWhatsAppUrlAction(url.trim());
      if (r.ok) setMsg("Saved. Every Join button on the site now uses this link."); else setError(r.error);
    }); }}>
      <Field label="WhatsApp group invite link" hint="If the group link is reset in WhatsApp, paste the new one here.">
        <input className={inputCls} value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://chat.whatsapp.com/…" required />
      </Field>
      <button className={btnPrimary} disabled={pending}>{pending ? "Saving…" : "Save link"}</button>
      {error && <ErrorNote>{error}</ErrorNote>}
    </form>
  );
}

export function AddPasskey() {
  const [msg, setMsg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  async function add() {
    setMsg(null);
    setError(null);
    const res = await authClient.passkey.addPasskey({ name: navigator.userAgent.includes("iPhone") ? "iPhone" : "This device" });
    if (res?.error) setError("Passkey wasn't added. Your device may not support it, or it was cancelled.");
    else setMsg("Passkey added. Next time you can sign in with Face ID or your fingerprint.");
  }
  return (
    <div>
      <button type="button" onClick={add} className={`${btnGhost} w-full py-3`}><Fingerprint size={17} /> Add a passkey for this device</button>
      {msg && <p className="mt-2 text-sm text-on">{msg}</p>}
      {error && <ErrorNote>{error}</ErrorNote>}
    </div>
  );
}

type Admin = { id: string; name: string; email: string; role: string | null; twoFactorEnabled: boolean | null; banned: boolean | null };
const ROLES = [
  { id: "owner", label: "Owner" }, { id: "editor", label: "Editor" },
  { id: "duroos_editor", label: "Duroos editor" }, { id: "content_editor", label: "Content editor" },
] as const;

export function AdminsManager({ admins, selfId }: { admins: Admin[]; selfId: string }) {
  const { confirm, notify } = useFeedback();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<(typeof ROLES)[number]["id"]>("duroos_editor");
  const [link, setLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();

  return (
    <div className="grid gap-6">
      <form className="card grid gap-3 p-4" onSubmit={(e) => { e.preventDefault(); setError(null); setLink(null); start(async () => {
        const r = await inviteAdminAction({ email, role });
        if (!r.ok) return setError(r.error);
        setLink(r.data ?? null);
        setEmail("");
      }); }}>
        <h2 className="text-lg font-semibold">Invite an admin</h2>
        <Field label="Their email"><input type="email" className={inputCls} value={email} onChange={(e) => setEmail(e.target.value)} required /></Field>
        <Field label="Role">
          <select className={inputCls} value={role} onChange={(e) => setRole(e.target.value as typeof role)}>
            {ROLES.map((r) => <option key={r.id} value={r.id}>{r.label}</option>)}
          </select>
        </Field>
        <button className={btnPrimary} disabled={pending}>Create invite link</button>
        {link && (
          <div className="rounded-xl bg-bg-2 p-3 text-sm">
            <p className="mb-1 font-semibold">Send this link to them privately. It works once and expires in 72 hours.</p>
            <p className="break-all font-mono text-xs">{link}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <button type="button" className={btnGhost} onClick={async () => {
                try { await navigator.clipboard?.writeText(link); setCopied(true); setTimeout(() => setCopied(false), 2500); } catch { /* the link stays on screen */ }
              }}><Copy size={14} /> {copied ? "Link copied" : "Copy link"}</button>
              {/* On a phone the link usually goes by WhatsApp: the share sheet saves a copy and paste. */}
              <a className={btnGhost} href={`https://wa.me/?text=${encodeURIComponent(`Your MESH admin invite (works once, 72 hours): ${link}`)}`} target="_blank" rel="noopener noreferrer">Send on WhatsApp</a>
            </div>
          </div>
        )}
        {error && <ErrorNote>{error}</ErrorNote>}
      </form>

      <section>
        <h2 className="mb-2 text-lg font-semibold">Team</h2>
        <ul className="card divide-y divide-line">
          {admins.map((a) => (
            <li key={a.id} className="grid gap-2 p-3">
              <div>
                <p className="text-sm font-semibold">{a.name} {a.id === selfId && <span className="font-normal text-muted">(you)</span>}</p>
                <p className="text-xs text-muted">{a.email}{!a.twoFactorEnabled && " · two-step not set up yet"}{a.banned && " · removed"}</p>
              </div>
              {a.id !== selfId && !a.banned && (
                <div className="flex gap-2">
                  <select className={`${inputCls} py-2 text-sm`} defaultValue={a.role ?? "editor"} disabled={pending} aria-label={`Role for ${a.name}`}
                    onChange={async (e) => {
                      const select = e.currentTarget;
                      const role = select.value;
                      const label = ROLES.find((r) => r.id === role)?.label ?? role;
                      // A slip on a phone picker must not change someone's access: ask first.
                      const ok = await confirm({
                        title: `Make ${a.name} ${label === "Owner" || label === "Editor" ? `an ${label}` : `a ${label}`}?`,
                        body: role === "owner" ? "Owners can invite and remove admins and change every setting." : "Their access changes straight away.",
                        confirmLabel: "Change role",
                        danger: role === "owner",
                      });
                      if (!ok) { select.value = a.role ?? "editor"; return; }
                      start(async () => {
                        const r = await setRoleAction({ userId: a.id, role: role as never });
                        if (!r.ok) { setError(r.error); select.value = a.role ?? "editor"; } else notify(`${a.name} is now ${label === "Owner" || label === "Editor" ? `an ${label}` : `a ${label}`}`);
                        router.refresh();
                      });
                    }}>
                    {ROLES.map((r) => <option key={r.id} value={r.id}>{r.label}</option>)}
                  </select>
                  <button type="button" className="shrink-0 rounded-full border border-line px-3 text-xs font-semibold text-cancel" disabled={pending}
                    onClick={async () => {
                      if (!(await confirm({ title: `Remove ${a.name}?`, body: "They are signed out on every device straight away and can no longer open the admin. You can invite them again later.", confirmLabel: "Remove", danger: true }))) return;
                      start(async () => {
                        const r = await revokeAdminAction(a.id);
                        if (!r.ok) return setError(r.error);
                        notify(`${a.name} removed`);
                        router.refresh();
                      });
                    }}>
                    Remove
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
