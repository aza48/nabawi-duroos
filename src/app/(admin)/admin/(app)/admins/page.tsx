import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "@/server/auth/session";
import { getDb } from "@/server/db/client";
import { listAdmins } from "@/server/admin/admins";
import { AdminsManager } from "@/features/admin/more/SettingsForms";

export const metadata: Metadata = { title: "Admins" };

export default async function Page() {
  const actor = await requireAdmin("admins.manage");
  const admins = await listAdmins(await getDb(), actor);
  return (
    <div className="mx-auto max-w-2xl">
      <Link href="/admin/more" className="text-sm text-muted">← More</Link>
      <h1 className="mt-1 mb-4 text-2xl font-semibold">Admins</h1>
      <AdminsManager admins={admins} selfId={actor.id} />
    </div>
  );
}
