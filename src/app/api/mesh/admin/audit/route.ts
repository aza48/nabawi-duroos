import { NextRequest, NextResponse } from "next/server";
import { dbConfigured, query } from "@/lib/db";
import { ensureMesh } from "@/lib/mesh-db";
import { noDb } from "@/lib/mesh-api";
import { requireAdmin } from "@/lib/mesh-admin";

export async function GET(req: NextRequest) {
  if (!dbConfigured()) return noDb(); try { await ensureMesh(); } catch { return noDb(); }
  const admin = await requireAdmin(); if (!admin) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  const limit = Math.min(100, Math.max(1, parseInt(req.nextUrl.searchParams.get("limit") || "100", 10) || 100));
  const rows = await query(
    `SELECT l.id, l.actor_id, u.display_name AS actor_name, u.email AS actor_email, l.action, l.target_type, l.target_id, l.detail, l.created_at
     FROM mesh_audit_log l LEFT JOIN mesh_users u ON u.id=l.actor_id
     ORDER BY l.created_at DESC, l.id DESC LIMIT $1`, [limit]);
  return NextResponse.json({ entries: rows });
}
