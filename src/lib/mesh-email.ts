/**
 * MESH transactional email via Brevo (separate from the duroos email layer).
 * Uses the same Brevo account/env vars; sender name falls back to "MESH".
 * Never logs message contents or codes.
 */

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
    return res.ok;
  } catch {
    return false;
  }
}

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
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
