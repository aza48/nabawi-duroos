import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { requireAdmin } from "@/server/auth/session";
import { can, ROLE_LABELS } from "@/server/auth/permissions";
import { AddPasskey } from "@/features/admin/more/SettingsForms";

export const metadata: Metadata = { title: "More" };

export default async function Page() {
  const actor = await requireAdmin();
  const links = [
    can(actor.role, "settings.write") && { href: "/admin/settings", label: "Site settings", note: "WhatsApp group link" },
    can(actor.role, "admins.manage") && { href: "/admin/admins", label: "Admins", note: "Invite people, change roles, remove access" },
    { href: "/", label: "View the public site", note: "Opens MESH as visitors see it" },
  ].filter(Boolean) as { href: string; label: string; note: string }[];
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-2xl font-semibold">More</h1>
      <p className="mb-4 text-sm text-muted">Signed in as {actor.name} · {ROLE_LABELS[actor.role]}</p>
      <ul className="card divide-y divide-line">
        {links.map((l) => (
          <li key={l.href}><Link href={l.href} className="flex items-center justify-between gap-3 p-3.5">
            <span><b className="block text-sm">{l.label}</b><span className="text-xs text-muted">{l.note}</span></span>
            <ChevronRight size={16} className="text-muted" />
          </Link></li>
        ))}
      </ul>
      <h2 className="mt-7 mb-2 text-lg font-semibold">Faster sign-in</h2>
      <p className="mb-3 text-sm text-muted">Add a passkey and sign in with Face ID or your fingerprint instead of a password and code.</p>
      <AddPasskey />
    </div>
  );
}
