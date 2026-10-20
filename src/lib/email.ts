import { AnnouncementRow } from "./db";
import { lessonDateBracket } from "./dates";
import { Localized, MASJIDS, PRAYERS } from "./types";
import { Lesson } from "./types";

/**
 * Email via Brevo (https://api.brevo.com/v3/smtp/email).
 * When BREVO_API_KEY is missing, sendEmail logs and returns { skipped: true }
 * so callers can proceed — the request must never fail because email is off.
 */

export interface SendResult {
  ok: boolean;
  skipped?: boolean;
  error?: string;
}

export function emailConfigured(): boolean {
  return !!process.env.BREVO_API_KEY;
}

export async function sendEmail(opts: {
  to: string;
  subject: string;
  html: string;
  unsubscribeUrl?: string;
}): Promise<SendResult> {
  const key = process.env.BREVO_API_KEY;
  if (!key) {
    console.log(`[email] BREVO_API_KEY not set — skipping email to ${opts.to}: ${opts.subject}`);
    return { ok: false, skipped: true };
  }
  const senderEmail = process.env.BREVO_SENDER_EMAIL || "no-reply@example.com";
  const senderName = process.env.BREVO_SENDER_NAME || "Duroos Aggregator";
  try {
    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": key,
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        sender: { email: senderEmail, name: senderName },
        to: [{ email: opts.to }],
        subject: opts.subject,
        htmlContent: opts.html,
        ...(opts.unsubscribeUrl
          ? { headers: { "List-Unsubscribe": `<${opts.unsubscribeUrl}>` } }
          : {}),
      }),
    });
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      console.error(`[email] Brevo ${res.status} for ${opts.to}: ${body.slice(0, 300)}`);
      return { ok: false, error: `brevo_${res.status}` };
    }
    return { ok: true };
  } catch (e) {
    console.error(`[email] Brevo request failed for ${opts.to}:`, e);
    return { ok: false, error: "network" };
  }
}

/* ---------------- template plumbing ---------------- */

export function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const FONT = "font-family:'Segoe UI',Tahoma,Arial,sans-serif;";

/** Arabic block first (RTL), then the English block (LTR), in one email. */
function bilingual(arInner: string, enInner: string, footer: { ar: string; en: string }): string {
  return `<!DOCTYPE html>
<html>
<body style="margin:0;padding:24px;background:#f2f0eb;${FONT}">
  <div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:12px;padding:28px;box-shadow:0 1px 3px rgba(0,0,0,0.12);">
    <div dir="rtl" lang="ar" style="text-align:right;color:rgba(0,0,0,0.87);line-height:1.9;">
      ${arInner}
    </div>
    <hr style="border:none;border-top:1px solid #edebe9;margin:24px 0;" />
    <div dir="ltr" lang="en" style="text-align:left;color:rgba(0,0,0,0.87);line-height:1.7;">
      ${enInner}
    </div>
    <hr style="border:none;border-top:1px solid #edebe9;margin:24px 0;" />
    <div dir="rtl" lang="ar" style="text-align:right;font-size:12px;color:rgba(0,0,0,0.58);line-height:1.8;">${footer.ar}</div>
    <div dir="ltr" lang="en" style="font-size:12px;color:rgba(0,0,0,0.58);line-height:1.6;">${footer.en}</div>
  </div>
</body>
</html>`;
}

function footerLinks(manageUrl: string, unsubscribeUrl: string): { ar: string; en: string } {
  return {
    ar: `<a href="${manageUrl}" style="color:#00754a;">إدارة التنبيهات</a> · <a href="${unsubscribeUrl}" style="color:#00754a;">إلغاء الاشتراك</a>`,
    en: `<a href="${manageUrl}" style="color:#00754a;">Manage alerts</a> · <a href="${unsubscribeUrl}" style="color:#00754a;">Unsubscribe</a>`,
  };
}

function button(url: string, label: string): string {
  return `<a href="${url}" style="display:inline-block;background:#00754a;color:#ffffff;text-decoration:none;padding:12px 28px;border-radius:999px;font-weight:600;">${label}</a>`;
}

/* ---------------- confirmation email ---------------- */

export function confirmationEmail(opts: {
  confirmUrl: string;
  manageUrl: string;
  unsubscribeUrl: string;
}): { subject: string; html: string } {
  const subject = "تأكيد اشتراكك في تنبيهات الدروس — Confirm your duroos alerts subscription";
  const ar = `
    <h1 style="font-size:20px;margin:0 0 12px;">تأكيد الاشتراك في تنبيهات الدروس</h1>
    <p>اشتركت في تنبيهات دروس المسجد النبوي وقباء والجامعة الإسلامية. اضغط الزر التالي لتأكيد بريدك وتفعيل التنبيهات:</p>
    <p style="text-align:center;margin:24px 0;">${button(opts.confirmUrl, "تأكيد الاشتراك")}</p>
    <p>بعد التأكيد يمكنك اختيار المشايخ والكتب التي تصلك تنبيهاتها من صفحة إدارة التنبيهات.</p>`;
  const en = `
    <h1 style="font-size:20px;margin:0 0 12px;">Confirm your duroos alerts subscription</h1>
    <p>You subscribed to lesson alerts for Al-Masjid an-Nabawi, Masjid Quba and the Islamic University. Click below to confirm your email and activate alerts:</p>
    <p style="text-align:center;margin:24px 0;">${button(opts.confirmUrl, "Confirm subscription")}</p>
    <p>After confirming, you can choose which shuyukh and books you receive alerts for on the manage-alerts page.</p>`;
  return { subject, html: bilingual(ar, en, footerLinks(opts.manageUrl, opts.unsubscribeUrl)) };
}

/* ---------------- announcement alert email ---------------- */

export const ANNOUNCEMENT_TYPE_LABELS: Record<string, Localized> = {
  cancelled: { ar: "إلغاء", en: "Cancelled" },
  delayed: { ar: "تأجيل", en: "Delayed / postponed" },
  paused: { ar: "توقف مؤقت", en: "Paused" },
  resumed: { ar: "استئناف", en: "Resumed" },
  book_started: { ar: "بدء كتاب جديد", en: "New book started" },
  book_finished: { ar: "ختم كتاب", en: "Book completed" },
  guest: { ar: "درس ضيف", en: "Guest lesson" },
  schedule_change: { ar: "تغيير في الجدول", en: "Schedule change" },
  other: { ar: "إعلان", en: "Announcement" },
};

export function alertEmail(opts: {
  announcement: AnnouncementRow;
  shaykhName: Localized;
  bookName?: Localized | null;
  manageUrl: string;
  unsubscribeUrl: string;
}): { subject: string; html: string } {
  const a = opts.announcement;
  const type = ANNOUNCEMENT_TYPE_LABELS[a.type] ?? ANNOUNCEMENT_TYPE_LABELS.other;
  // Absolute, bracketed lesson date — never a relative word (today/tonight…).
  const date = a.lesson_date ? lessonDateBracket(a.lesson_date) : null;
  const subject = `${type.ar}: ${a.title_ar} — ${type.en}: ${a.title_en}`;
  const bookLine = (name: Localized | null | undefined, label: Localized) =>
    name
      ? `<p style="margin:4px 0;"><strong>${label.ar}:</strong> ${esc(name.ar)}</p>`
      : "";
  const bookLineEn = (name: Localized | null | undefined, label: Localized) =>
    name
      ? `<p style="margin:4px 0;"><strong>${label.en}:</strong> ${esc(name.en)}</p>`
      : "";

  const ar = `
    <p style="margin:0 0 8px;"><span style="background:#1e3932;color:#fff;padding:4px 14px;border-radius:999px;font-size:13px;font-weight:600;">${type.ar}</span></p>
    <h1 style="font-size:20px;margin:8px 0;">${esc(a.title_ar)}</h1>
    <p style="margin:4px 0;"><strong>الشيخ:</strong> ${esc(opts.shaykhName.ar)}</p>
    ${bookLine(opts.bookName, { ar: "الكتاب", en: "Book" })}
    ${date ? `<p style="margin:4px 0;"><strong>تاريخ الدرس:</strong> ${date.ar}</p>` : ""}
    <p style="white-space:pre-line;">${esc(a.body_ar)}</p>`;
  const en = `
    <p style="margin:0 0 8px;"><span style="background:#1e3932;color:#fff;padding:4px 14px;border-radius:999px;font-size:13px;font-weight:600;">${type.en}</span></p>
    <h1 style="font-size:20px;margin:8px 0;">${esc(a.title_en)}</h1>
    <p style="margin:4px 0;"><strong>Shaykh:</strong> ${esc(opts.shaykhName.en)}</p>
    ${bookLineEn(opts.bookName, { ar: "الكتاب", en: "Book" })}
    ${date ? `<p style="margin:4px 0;"><strong>Lesson date:</strong> ${date.en}</p>` : ""}
    <p style="white-space:pre-line;">${esc(a.body_en)}</p>`;
  return { subject, html: bilingual(ar, en, footerLinks(opts.manageUrl, opts.unsubscribeUrl)) };
}

/* ---------------- daily reminder email ---------------- */

export function reminderEmail(opts: {
  lessons: Lesson[];
  todayAr: string;
  todayEn: string;
  manageUrl: string;
  unsubscribeUrl: string;
}): { subject: string; html: string } {
  const subject = `تذكير بدروس اليوم — Today's lessons reminder`;
  const row = (l: Lesson, lang: "ar" | "en") => {
    const prayer = PRAYERS[l.prayer][lang];
    return `<tr>
      <td style="padding:8px 6px;border-bottom:1px solid #edebe9;">${esc(l.shaykh[lang])}</td>
      <td style="padding:8px 6px;border-bottom:1px solid #edebe9;">${esc(l.book[lang])}</td>
      <td style="padding:8px 6px;border-bottom:1px solid #edebe9;">${lang === "ar" ? "بعد" : "After"} ${prayer}</td>
      <td style="padding:8px 6px;border-bottom:1px solid #edebe9;">${esc(MASJIDS[l.masjid][lang])}</td>
    </tr>`;
  };
  const table = (lang: "ar" | "en") => `
    <table style="width:100%;border-collapse:collapse;font-size:14px;">
      ${opts.lessons.map((l) => row(l, lang)).join("")}
    </table>`;
  const ar = `
    <h1 style="font-size:20px;margin:0 0 8px;">تذكير بدروس اليوم</h1>
    <p style="margin:0 0 12px;">${esc(opts.todayAr)}</p>
    <p>دروس اليوم من اشتراكاتك:</p>
    ${table("ar")}`;
  const en = `
    <h1 style="font-size:20px;margin:0 0 8px;">Today's lessons reminder</h1>
    <p style="margin:0 0 12px;">${esc(opts.todayEn)}</p>
    <p>Today's lessons from your subscriptions:</p>
    ${table("en")}`;
  return { subject, html: bilingual(ar, en, footerLinks(opts.manageUrl, opts.unsubscribeUrl)) };
}
