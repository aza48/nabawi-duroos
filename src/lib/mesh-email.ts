/**
 * MESH transactional email via Brevo (separate from the duroos email layer).
 * Uses the same Brevo account/env vars; sender name falls back to "MESH".
 * Never logs message contents or codes.
 */

import { abs } from "./site";

export function brevoConfigured(): boolean {
  return !!process.env.BREVO_API_KEY && !!process.env.BREVO_SENDER_EMAIL;
}

export async function sendMeshEmail(to: string, subject: string, html: string): Promise<boolean> {
  if (!brevoConfigured()) return false;
  try {
    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": process.env.BREVO_API_KEY as string,
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        sender: { email: process.env.BREVO_SENDER_EMAIL, name: process.env.BREVO_SENDER_NAME || "MESH" },
        to: [{ email: to }],
        subject,
        htmlContent: html,
      }),
    });
    // Log only the status — never the recipient or contents — so send failures are diagnosable in function logs.
    if (!res.ok) console.error(`mesh email send failed: Brevo HTTP ${res.status}`);
    return res.ok;
  } catch (err) {
    console.error("mesh email send failed: network error");
    return false;
  }
}

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** Bilingual (EN first, AR below) notice that an accepted solution was flagged as outdated. */
export function meshOutdatedEmail(questionId: number, title: string): { subject: string; html: string } {
  const url = abs(`/question/${questionId}`);
  const subject = "MESH — a solution was flagged as outdated";
  const html = `<!doctype html><html><body style="margin:0;padding:24px;background:#FAFAFA;font-family:Inter,Alexandria,'Segoe UI',Arial,sans-serif;color:#171717">
  <div style="max-width:520px;margin:0 auto;background:#ffffff;border:1px solid #EBEBEB;border-radius:12px;padding:28px">
    <p style="font-size:20px;font-weight:800;margin:0 0 4px">MESH</p>
    <p style="font-size:12px;color:#8F8F8F;margin:0 0 20px">Medinah English Students Hub</p>
    <p style="font-size:15px;line-height:1.6">A member flagged the accepted solution on this question as outdated or no longer working:</p>
    <p style="font-size:15px;font-weight:600;line-height:1.6;margin:12px 0">&ldquo;${esc(title)}&rdquo;</p>
    <p style="margin:16px 0"><a href="${url}" style="color:#125934;font-weight:600">Open the question</a></p>
    <p style="font-size:13px;color:#4D4D4D;line-height:1.6">If the procedure has changed, you can post an update, or reopen the thread so members can share what works now.</p>
    <hr style="border:none;border-top:1px solid #EBEBEB;margin:24px 0" />
    <div dir="rtl" lang="ar" style="text-align:right">
      <p style="font-size:15px;line-height:1.8">قام أحد الأعضاء بالإبلاغ بأن الحل المقبول في هذا السؤال قديم أو لم يعد يعمل:</p>
      <p style="font-size:15px;font-weight:600;line-height:1.8;margin:12px 0">&laquo;${esc(title)}&raquo;</p>
      <p style="margin:16px 0"><a href="${url}" style="color:#125934;font-weight:600">افتح السؤال</a></p>
      <p style="font-size:13px;color:#4D4D4D;line-height:1.8">إذا تغيّرت الإجراءات، يمكنك نشر تحديث أو إعادة فتح النقاش حتى يشارك الأعضاء ما يعمل الآن.</p>
    </div>
  </div></body></html>`;
  return { subject, html };
}

/** Bilingual (EN first, AR below) alert to admins/mandoobs/contributors that a new question was posted. */
export function meshNewQuestionEmail(questionId: number, title: string, askerName: string): { subject: string; html: string } {
  const url = abs(`/question/${questionId}`);
  const subject = "MESH — new question waiting for an answer";
  const html = `<!doctype html><html><body style="margin:0;padding:24px;background:#FAFAFA;font-family:Inter,Alexandria,'Segoe UI',Arial,sans-serif;color:#171717">
  <div style="max-width:520px;margin:0 auto;background:#ffffff;border:1px solid #EBEBEB;border-radius:12px;padding:28px">
    <p style="font-size:20px;font-weight:800;margin:0 0 4px">MESH</p>
    <p style="font-size:12px;color:#8F8F8F;margin:0 0 20px">Medinah English Students Hub</p>
    <p style="font-size:15px;line-height:1.6">${esc(askerName)} just asked a new question:</p>
    <p style="font-size:15px;font-weight:600;line-height:1.6;margin:12px 0">&ldquo;${esc(title)}&rdquo;</p>
    <p style="margin:16px 0"><a href="${url}" style="color:#125934;font-weight:600">Open the question</a></p>
    <p style="font-size:13px;color:#4D4D4D;line-height:1.6">You are receiving this because you help answer questions on MESH as an admin, mandoob or contributor. A fast first answer keeps the archive growing.</p>
    <hr style="border:none;border-top:1px solid #EBEBEB;margin:24px 0" />
    <div dir="rtl" lang="ar" style="text-align:right">
      <p style="font-size:15px;line-height:1.8">طرح ${esc(askerName)} سؤالًا جديدًا:</p>
      <p style="font-size:15px;font-weight:600;line-height:1.8;margin:12px 0">&laquo;${esc(title)}&raquo;</p>
      <p style="margin:16px 0"><a href="${url}" style="color:#125934;font-weight:600">افتح السؤال</a></p>
      <p style="font-size:13px;color:#4D4D4D;line-height:1.8">تصلك هذه الرسالة لأنك تساعد في الإجابة على الأسئلة في MESH بصفتك مسؤولًا أو مندوبًا أو مساهمًا. الإجابة السريعة الأولى تُبقي الأرشيف حيًّا ومتناميًا.</p>
    </div>
  </div></body></html>`;
  return { subject, html };
}

/** Bilingual (EN first, AR below) 6-digit code email for signup verification and password reset. */
export function meshCodeEmail(code: string, purpose: "signup" | "reset"): { subject: string; html: string } {
  const actionEn = purpose === "signup" ? "verify your MESH account" : "reset your MESH password";
  const actionAr = purpose === "signup" ? "تأكيد حسابك في MESH" : "إعادة تعيين كلمة المرور في MESH";
  const subject = `MESH — your verification code: ${code}`;
  const html = `<!doctype html><html><body style="margin:0;padding:24px;background:#FAFAFA;font-family:Inter,Alexandria,'Segoe UI',Arial,sans-serif;color:#171717">
  <div style="max-width:520px;margin:0 auto;background:#ffffff;border:1px solid #EBEBEB;border-radius:12px;padding:28px">
    <p style="font-size:20px;font-weight:800;margin:0 0 4px">MESH</p>
    <p style="font-size:12px;color:#8F8F8F;margin:0 0 20px">Medinah English Students Hub</p>
    <p style="font-size:15px;line-height:1.6">Use this code to ${actionEn}:</p>
    <p style="font-size:34px;font-weight:800;letter-spacing:8px;text-align:center;background:#EDF7F0;border:1px solid #D9F0E2;border-radius:10px;padding:16px 0;margin:16px 0;color:#0B4025">${esc(code)}</p>
    <p style="font-size:13px;color:#4D4D4D;line-height:1.6">This code expires in 15 minutes. If you did not request it, you can safely ignore this email — no changes will be made to your account.</p>
    <hr style="border:none;border-top:1px solid #EBEBEB;margin:24px 0" />
    <div dir="rtl" lang="ar" style="text-align:right">
      <p style="font-size:15px;line-height:1.8">استخدم هذا الرمز من أجل ${actionAr}:</p>
      <p style="font-size:13px;color:#4D4D4D;line-height:1.8">ينتهي هذا الرمز بعد ١٥ دقيقة. إذا لم تطلب هذا الرمز، يمكنك تجاهل هذه الرسالة بأمان — لن يتم إجراء أي تغيير على حسابك.</p>
    </div>
  </div></body></html>`;
  return { subject, html };
}
