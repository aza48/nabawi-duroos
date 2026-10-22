import { NextRequest, NextResponse } from "next/server";
import { dbConfigured, query } from "@/lib/db";
import { ensureMesh } from "@/lib/mesh-db";
import { noDb } from "@/lib/mesh-api";
import { requireAdmin, TOMBSTONE_EMAIL } from "@/lib/mesh-admin";

export async function GET(req: NextRequest) {
  if (!dbConfigured()) return noDb(); try { await ensureMesh(); } catch { return noDb(); }
  const admin = await requireAdmin(); if (!admin) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  const sp = req.nextUrl.searchParams;
  const q = (sp.get("q") || "").trim();
  const limit = Math.min(100, Math.max(1, parseInt(sp.get("limit") || "50", 10) || 50));
  const offset = Math.max(0, parseInt(sp.get("offset") || "0", 10) || 0);
  const params: unknown[] = [TOMBSTONE_EMAIL];
  let where = `WHERE u.email<>$1`;
  if (q) { params.push(`%${q}%`); where += ` AND (u.email ILIKE $${params.length} OR u.display_name ILIKE $${params.length})`; }
  params.push(limit); params.push(offset);
  const rows = await query(
    `SELECT u.id, u.email, u.display_name, u.role, u.country, u.email_verified, u.is_seed, u.suspended_at, u.created_at,
       (SELECT count(*)::int FROM mesh_questions qq WHERE qq.author_id=u.id) AS questions_count,
       (SELECT count(*)::int FROM mesh_answers aa WHERE aa.author_id=u.id) AS answers_count
     FROM mesh_users u ${where}
     ORDER BY CASE u.role WHEN 'admin' THEN 0 WHEN 'mandoob' THEN 1 WHEN 'contributor' THEN 2 ELSE 3 END, u.created_at DESC
     LIMIT $${params.length - 1} OFFSET $${params.length}`, params);
  return NextResponse.json({ users: rows });
}
