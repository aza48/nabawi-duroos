import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getAdminSession, hasSecondFactor } from "@/server/auth/session";
import { AuthCard } from "@/features/admin/ui";
import { TwoFactorSetup } from "@/features/admin/TwoFactorSetup";

export const metadata: Metadata = { title: "Two-step sign-in" };
export const dynamic = "force-dynamic";

export default async function Page() {
  const s = await getAdminSession();
  if (!s) redirect("/admin/login");
  if (await hasSecondFactor(s.user as { id: string; twoFactorEnabled?: boolean })) redirect("/admin");
  return (
    <AuthCard title="Add a second sign-in step" subtitle="Required for every admin account.">
      <TwoFactorSetup />
    </AuthCard>
  );
}
