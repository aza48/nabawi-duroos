import type { Metadata } from "next";
import { AuthCard } from "@/features/admin/ui";
import { ResetPasswordForm } from "@/features/admin/ResetPasswordForm";

export const metadata: Metadata = { title: "Set a new password", robots: { index: false } };

export default async function Page({ searchParams }: { searchParams: Promise<{ token?: string; error?: string }> }) {
  const { token, error } = await searchParams;
  return (
    <AuthCard title="Set a new password" subtitle="For the MESH team only.">
      <ResetPasswordForm token={token && !error ? token : ""} />
    </AuthCard>
  );
}
