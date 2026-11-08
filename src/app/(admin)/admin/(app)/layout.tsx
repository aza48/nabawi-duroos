import { requireAdmin } from "@/server/auth/session";
import { can, ROLE_LABELS } from "@/server/auth/permissions";
import { AdminShell } from "@/features/admin/AdminShell";

export const dynamic = "force-dynamic";

export default async function AdminAppLayout({ children }: { children: React.ReactNode }) {
  const actor = await requireAdmin();
  return <AdminShell name={actor.name} roleLabel={ROLE_LABELS[actor.role]} canUndo={can(actor.role, "activity.undo")}>{children}</AdminShell>;
}
