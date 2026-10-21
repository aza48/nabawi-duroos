import { createHash, randomInt, timingSafeEqual } from "crypto";
import { query, queryOne } from "./db";

export type CodePurpose = "signup" | "reset";

export const IU_EMAIL_RE = /^[0-9]+@iu\.edu\.sa$/i;

export function hashCode(code: string): string {
  return createHash("sha256").update(code).digest("hex");
}

/** Current Hijri year via the Umalqura calendar; null if Intl is unavailable. */
export function currentHijriYear(now: Date = new Date()): number | null {
  try {
    const s = new Intl.DateTimeFormat("en-u-ca-islamic-umalqura", { year: "numeric" }).format(now);
    const y = parseInt(s.replace(/[^0-9]/g, ""), 10);
    return Number.isFinite(y) && y > 1300 && y < 1600 ? y : null;
  } catch {
    return null;
  }
}

/** Derive the Hijri entry year from a student-number email local part ("47..." -> 1447). */
export function parseEntryYear(email: string): number | null {
  const local = email.split("@")[0] ?? "";
  if (!/^[0-9]{4,}$/.test(local)) return null;
  const yy = parseInt(local.slice(0, 2), 10);
  if (!Number.isFinite(yy)) return null;
  const year = 1400 + yy;
  const cur = currentHijriYear();
  if (cur !== null && (year < 1430 || year > cur + 1)) return null;
  if (cur === null && (year < 1430 || year > 1470)) return null;
  return year;
}

/** Invalidate any live codes for (user, purpose), then store a fresh 6-digit code (15 min) and return it in plaintext for sending. */
export async function issueCode(userId: number, purpose: CodePurpose): Promise<string> {
  await query(`UPDATE mesh_email_codes SET consumed_at=now() WHERE user_id=$1 AND purpose=$2 AND consumed_at IS NULL`, [userId, purpose]);
  const code = String(randomInt(0, 1000000)).padStart(6, "0");
  await query(
    `INSERT INTO mesh_email_codes (user_id, purpose, code_hash, expires_at) VALUES ($1,$2,$3, now() + interval '15 minutes')`,
    [userId, purpose, hashCode(code)]
  );
  return code;
}

type CodeRow = { id: number; code_hash: string; attempts: number; expires_at: string };

/**
 * Verify a code. Returns "ok" | "invalid" | "too_many".
 * The code is consumed on success; 5 wrong attempts invalidate it.
 */
export async function verifyCode(userId: number, purpose: CodePurpose, code: string): Promise<"ok" | "invalid" | "too_many"> {
  const row = await queryOne<CodeRow>(
    `SELECT id, code_hash, attempts, expires_at FROM mesh_email_codes WHERE user_id=$1 AND purpose=$2 AND consumed_at IS NULL AND expires_at > now() ORDER BY created_at DESC LIMIT 1`,
    [userId, purpose]
  );
  if (!row) return "invalid";
  if (row.attempts >= 5) return "too_many";
  const given = Buffer.from(hashCode(code.trim()));
  const stored = Buffer.from(row.code_hash);
  const match = given.length === stored.length && timingSafeEqual(given, stored);
  if (!match) {
    const attempts = row.attempts + 1;
    if (attempts >= 5) {
      await query(`UPDATE mesh_email_codes SET attempts=$1, consumed_at=now() WHERE id=$2`, [attempts, row.id]);
      return "too_many";
    }
    await query(`UPDATE mesh_email_codes SET attempts=$1 WHERE id=$2`, [attempts, row.id]);
    return "invalid";
  }
  await query(`UPDATE mesh_email_codes SET consumed_at=now() WHERE id=$1`, [row.id]);
  return "ok";
}

/** Resend throttles: >=60s since the last code, and at most 5 codes per user+purpose per 24h. */
export async function resendStatus(userId: number, purpose: CodePurpose): Promise<{ allowed: boolean; reason?: "too_soon" | "daily_cap" }> {
  const last = await queryOne<{ created_at: string }>(
    `SELECT created_at FROM mesh_email_codes WHERE user_id=$1 AND purpose=$2 ORDER BY created_at DESC LIMIT 1`,
    [userId, purpose]
  );
  if (last && Date.now() - new Date(last.created_at).getTime() < 60_000) return { allowed: false, reason: "too_soon" };
  const day = await queryOne<{ c: string }>(
    `SELECT count(*)::text AS c FROM mesh_email_codes WHERE user_id=$1 AND purpose=$2 AND created_at > now() - interval '24 hours'`,
    [userId, purpose]
  );
  if (day && parseInt(day.c, 10) >= 5) return { allowed: false, reason: "daily_cap" };
  return { allowed: true };
}
