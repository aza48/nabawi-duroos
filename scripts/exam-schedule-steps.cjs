/**
 * Adds the "how to find it" steps to the live final exam schedules update (one row, by slug).
 * Run from the repo root:  node scripts/exam-schedule-steps.cjs
 */
const fs = require("fs");
const { Pool } = require("pg");

const env = fs.readFileSync(".env.production.local", "utf8");
const url = (env.match(/^DATABASE_URL\s*=\s*"?([^"\r\n]+)"?/m) || [])[1];
if (!url) throw new Error("DATABASE_URL is missing from .env.production.local");

const SLUG = "final-exam-schedules-released-1448";
const bodyEn = [
  "First-semester final exam schedules are out. To find yours:",
  "1. Sign in to your University dashboard at https://eservices.iu.edu.sa/Dashboard",
  "2. Press النظام الأكاديمي (Academic System). It opens https://eduportal.iu.edu.sa/iu/ui/student/",
  "3. Under the أكاديمي (Academic) tab, open الإختبارات النهائية (Final exams).",
  "4. Press أوافق (I agree) on the terms and conditions.",
  "Your exam schedule then appears. May Allah grant you success!",
].join("\n");
const bodyAr = [
  "صدرت جداول الاختبارات النهائية للفصل الأول. لمعرفة جدولك:",
  "١. سجّل الدخول إلى لوحة الجامعة: https://eservices.iu.edu.sa/Dashboard",
  "٢. اضغط على «النظام الأكاديمي»، وسينقلك إلى https://eduportal.iu.edu.sa/iu/ui/student/",
  "٣. من تبويب «أكاديمي» اختر «الإختبارات النهائية».",
  "٤. اضغط «أوافق» على الشروط والأحكام.",
  "سيظهر لك جدول اختباراتك. وفّقكم الله ونجّحكم.",
].join("\n");

(async () => {
  const pool = new Pool({ connectionString: url, ssl: { rejectUnauthorized: false } });
  try {
    const r = await pool.query(
      "update announcements set body_en = $2, body_ar = $3, title_en = $4, title_ar = $5, published_at = now() where slug = $1",
      [SLUG, bodyEn, bodyAr, "Final exam schedules are out", "صدرت جداول الاختبارات النهائية"]
    );
    console.log(r.rowCount ? "updated" : "not found");
  } finally {
    await pool.end();
  }
})().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
