"use server";

import { getDb } from "@/server/db/client";
import { getAuth } from "@/server/auth/auth";
import { acceptInvite } from "@/server/admin/invites";

const MESSAGES: Record<string, string> = {
  invite_invalid: "This invite link isn't valid.",
  invite_used: "This invite has already been used. Sign in instead.",
  invite_expired: "This invite has expired. Ask the owner for a new one.",
};

export async function acceptInviteAction(input: { token: string; name: string; password: string }): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    await acceptInvite(await getDb(), await getAuth(), input);
    return { ok: true };
  } catch (e) {
    const key = e instanceof Error ? e.message : "";
    return { ok: false, error: MESSAGES[key] ?? "Please check your name (2+ characters) and password (8+ characters)." };
  }
}
