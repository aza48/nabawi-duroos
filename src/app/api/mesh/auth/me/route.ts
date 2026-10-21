
import { NextRequest, NextResponse } from "next/server";
import { dbConfigured, query } from "@/lib/db";
import { getCurrentUser } from "@/lib/mesh-auth";
import { ensureMesh } from "@/lib/mesh-db";
import { noDb, bad, clean } from "@/lib/mesh-api";

function publicUser(user: Awaited<ReturnType<typeof getCurrentUser>>) {
  if (!user) return null;
  return {
    id: user.id, display_name: user.display_name, role: user.role, bio: user.bio,
    email: user.email, email_verified: user.email_verified,
    entry_year_hijri: user.entry_year_hijri, personal_email: user.personal_email, country: user.country,
  };
}

export async function GET() {
  if (!dbConfigured()) return NextResponse.json({ user: null, dbConfigured: false });
  try { await ensureMesh(); } catch { return NextResponse.json({ user: null, dbConfigured: false }); }
  const user = await getCurrentUser();
  let notificationsUnread = 0;
  if (user) {
    try {
      const { queryOne } = await import("@/lib/db");
      const row = await queryOne<{ c: string }>(`SELECT count(*)::text AS c FROM mesh_notifications WHERE user_id=$1 AND read_at IS NULL`, [user.id]);
      notificationsUnread = parseInt(row?.c || "0", 10);
    } catch { /* notifications table may not exist yet on very first init */ }
  }
  const pub = publicUser(user);
  return NextResponse.json({ user: pub ? { ...pub, notifications_unread: notificationsUnread } : null, dbConfigured: true });
}

export async function PATCH(req: NextRequest) {
  if (!dbConfigured()) return noDb(); try { await ensureMesh(); } catch { return noDb(); }
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const body = await req.json().catch(() => ({})) as Record<string, unknown>;
  const displayName = clean(body.displayName, 60);
  const bio = typeof body.bio === "string" ? body.bio.trim().slice(0, 500) : undefined;
  const country = typeof body.country === "string" ? body.country.trim().slice(0, 80) : undefined;
  let personalEmail: string | null | undefined = undefined;
  if (typeof body.personalEmail === "string") {
    const pe = body.personalEmail.trim().toLowerCase();
    if (pe === "") personalEmail = null;
    else if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(pe) && pe.length <= 200) personalEmail = pe;
    else return NextResponse.json({ error: "invalid_personal_email" }, { status: 400 });
  }
  if (body.displayName !== undefined && !displayName) return bad("Display name is required");
  await query(
    `UPDATE mesh_users SET
       display_name = CASE WHEN $1::boolean THEN $2 ELSE display_name END,
       bio = CASE WHEN $3::boolean THEN $4 ELSE bio END,
       personal_email = CASE WHEN $5::boolean THEN $6 ELSE personal_email END,
       country = CASE WHEN $7::boolean THEN $8 ELSE country END
     WHERE id=$9`,
    [
      body.displayName !== undefined, displayName,
      bio !== undefined, bio ?? null,
      personalEmail !== undefined, personalEmail,
      country !== undefined, country || null,
      user.id,
    ]
  );
  const updated = await getCurrentUser();
  return NextResponse.json({ user: publicUser(updated) });
}
