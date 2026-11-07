import type { Metadata } from "next";
import Link from "next/link";
import { getDb } from "@/server/db/client";
import { describeInvite } from "@/server/admin/invites";
import { AuthCard } from "@/features/admin/ui";
import { InviteForm } from "@/features/admin/InviteForm";

export const metadata: Metadata = { title: "Join the MESH team" };
export const dynamic = "force-dynamic";

const PROBLEMS = {
  invalid: "This invite link isn't valid. Check you copied the whole link.",
  used: "This invite has already been used.",
  expired: "This invite has expired. Ask the owner to send a new one.",
};

export default async function Page({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
  const { token } = await searchParams;
  const info = token ? await describeInvite(await getDb(), token) : { state: "invalid" as const };
  if (info.state !== "ok") {
    return (
      <AuthCard title="Invite problem">
        <p className="text-sm">{PROBLEMS[info.state]}</p>
        <Link href="/admin/login" className="mt-4 inline-block text-sm font-semibold underline">Go to sign in</Link>
      </AuthCard>
    );
  }
  return (
    <AuthCard title="Join the MESH team" subtitle="Set up your admin account.">
      <InviteForm token={token!} email={info.email} />
    </AuthCard>
  );
}
