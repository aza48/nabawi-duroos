import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/server/auth/session";
import { AuthCard } from "@/features/admin/ui";
import { TwoFactorSetup } from "@/features/admin/TwoFactorSetup";

export const metadata: Metadata = { title: "Two-step sign-in" };
export const dynamic = "force-dynamic";

export default async function Page() {
  const s = await getAdminSession();
  if (!s) redirect("/admin/login");
  if ((s.user as { twoFactorEnabled?: boolean }).twoFactorEnabled) redirect("/admin");
  return (
    <AuthCard title="Turn on two-step sign-in" subtitle="Required for every admin account.">
      <TwoFactorSetup />
    </AuthCard>
  );
}
