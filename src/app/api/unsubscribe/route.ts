import { NextRequest, NextResponse } from "next/server";
import { dbConfigured, initDb, query, queryOne, SubscriberRow } from "../../../lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function page(titleAr: string, titleEn: string, bodyAr: string, bodyEn: string): NextResponse {
  const html = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${titleAr} — ${titleEn}</title></head>
<body style="margin:0;padding:32px;background:#f2f0eb;font-family:'Segoe UI',Tahoma,Arial,sans-serif;">
  <div style="max-width:520px;margin:40px auto;background:#fff;border-radius:12px;padding:32px;box-shadow:0 1px 3px rgba(0,0,0,0.14);">
    <div dir="rtl" style="text-align:right;line-height:1.9;color:rgba(0,0,0,0.87);">
      <h1 style="font-size:20px;margin:0 0 10px;">${titleAr}</h1>
      <p>${bodyAr}</p>
    </div>
    <hr style="border:none;border-top:1px solid #edebe9;margin:20px 0;" />
    <div dir="ltr" style="line-height:1.7;color:rgba(0,0,0,0.87);">
      <h1 style="font-size:20px;margin:0 0 10px;">${titleEn}</h1>
      <p>${bodyEn}</p>
    </div>
  </div>
</body>
</html>`;
  return new NextResponse(html, {
    status: 200,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

/** One-click unsubscribe from any email (uses the subscriber's manage token). */
export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  if (!dbConfigured() || !token) {
    return page(
      "رابط غير صالح",
      "Invalid link",
      "هذا الرابط غير صالح أو أن خدمة التنبيهات غير مفعّلة بعد.",
      "This link is invalid, or the alerts service is not enabled yet."
    );
  }
  try {
    await initDb();
    const sub = await queryOne<SubscriberRow>(
      `SELECT * FROM subscribers WHERE manage_token = $1`,
      [token]
    );
    if (!sub) {
      return page(
        "رابط غير صالح",
        "Invalid link",
        "لم نعثر على اشتراك مرتبط بهذا الرابط.",
        "No subscription was found for this link."
      );
    }
    await query(`DELETE FROM subscriptions WHERE subscriber_id = $1`, [sub.id]);
    await query(`UPDATE subscribers SET status = 'unsubscribed' WHERE id = $1`, [sub.id]);
    return page(
      "تم إلغاء الاشتراك",
      "You have been unsubscribed",
      "لن تصلك تنبيهات الدروس بعد الآن. يمكنك إعادة الاشتراك في أي وقت من الموقع.",
      "You will no longer receive lesson alerts. You can subscribe again at any time from the website."
    );
  } catch (e) {
    console.error("[api/unsubscribe]", e);
    return page(
      "حدث خطأ",
      "Something went wrong",
      "تعذّر إتمام إلغاء الاشتراك الآن، حاول لاحقًا.",
      "Unsubscribing failed just now — please try again later."
    );
  }
}
