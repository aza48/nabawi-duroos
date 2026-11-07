import type { Metadata } from "next";
import { AuthCard } from "@/features/admin/ui";
import { LoginForm } from "@/features/admin/LoginForm";

export const metadata: Metadata = { title: "Sign in" };

export default async function Page({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  return (
    <AuthCard title="Admin sign in" subtitle="For the MESH team only.">
      <LoginForm notice={error === "revoked" ? "Your admin access has been removed." : undefined} />
    </AuthCard>
  );
}
