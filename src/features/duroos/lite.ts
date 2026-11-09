import type { getToday } from "@/server/duroos/queries";
import type { Locale } from "@/lib/locale";
import { PRAYERS } from "@/lib/time/prayers";
import { formatClock } from "@/lib/time/riyadh";
import { HELP_CONTACT_DEFAULT, HELP_EMAIL_DEFAULT } from "@/server/settings";
import { t } from "./strings";

type Today = Awaited<ReturnType<typeof getToday>>;

/** The light page must stay small enough to load on one bar inside the Haram. */
export const LITE_MAX_BYTES = 15_000;

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const CSS =
  "body{font:16px/1.45 system-ui,sans-serif;margin:0 auto;max-width:40rem;padding:12px;color:#17251d;background:#fff}" +
  "h1{font-size:20px;margin:0;color:#145c3e}h2{font-size:15px;margin:16px 0 2px;padding-bottom:2px;border-bottom:2px solid #e2b23a;color:#145c3e}" +
  "ul{margin:0;padding:0;list-style:none}li{padding:6px 0;border-bottom:1px solid #eee}small{color:#555}a{color:#145c3e}" +
  ".x{color:#b42318;font-weight:700}.v{color:#b42318;font-weight:700}.d{color:#777}";

/**
 * Today's duroos as one small text page, no scripts, no fonts, no images. Statuses, live and done
 * come from the same getToday() as /duroos. Served at /lite and /ar/lite.
 */
export function liteHtml(today: Today, locale: Locale, now: Date = new Date()): string {
  const ar = locale === "ar";
  const other = ar ? `<a href="/lite" lang="en" dir="ltr">English</a>` : `<a href="/ar/lite" lang="ar" dir="rtl">العربية</a>`;
  const groups = PRAYERS.map((p) => {
    const rows = today.lessons.filter((l) => l.prayer === p);
    if (!rows.length) return "";
    const timed = rows.some((l) => l.timeKnown);
    const head = `${t(locale, "after")} ${t(locale, p)}${timed ? ` · ${t(locale, "adhan")} ${formatClock(new Date(today.prayers[p]), locale)}` : ""}`;
    const items = rows.map((l) => {
      const off = l.status === "cancelled" || l.status === "postponed";
      const tag =
        l.status !== "on" ? ` <span class="x">${esc(t(locale, l.status))}</span>`
        : l.phase === "live" ? ` <span class="v">${esc(t(locale, "liveNow"))}</span>`
        : l.phase === "done" ? ` <small class="d">${ar ? "انتهى" : "done"}</small>` : "";
      const note = ar ? l.overrideNoteAr ?? l.overrideNoteEn : l.overrideNoteEn ?? l.overrideNoteAr;
      const book = ar ? esc(l.bookAr) : `${esc(l.bookEn)}</b><br><b lang="ar" dir="rtl">${esc(l.bookAr)}`;
      return (
        `<li${off ? ' class="d"' : ""}><b>${book}</b>${tag}<br>${esc(ar ? l.shaykh.nameAr : l.shaykh.nameEn)}` +
        `<br><small>${esc(ar ? l.masjid.shortAr : l.masjid.shortEn)} · ${esc(ar ? l.locationAr : l.locationEn)}` +
        `${l.timeKnown ? "" : ` · ${esc(t(locale, "timeNotConfirmed"))}`}${note ? `<br>${esc(note)}` : ""}</small></li>`
      );
    });
    return `<h2>${esc(head)}</h2><ul>${items.join("")}</ul>`;
  }).join("");

  const title = ar ? "دروس اليوم" : "Today's duroos";
  const date = ar ? `${today.hijri.ar} (${today.gregorian.ar})` : `${today.hijri.en} (${today.gregorian.en})`;
  const updated = `${ar ? "حُدّثت" : "Updated"} ${formatClock(now, locale)}`;
  const help = ar
    ? `معلومة خاطئة؟ راسل المشرف على واتساب على الرقم <a href="https://wa.me/${HELP_CONTACT_DEFAULT.replace(/\D/g, "")}" dir="ltr">${HELP_CONTACT_DEFAULT}</a> أو على البريد الإلكتروني <a href="mailto:${HELP_EMAIL_DEFAULT}" dir="ltr">${HELP_EMAIL_DEFAULT}</a>`
    : `Something wrong? Message Admin on WhatsApp at <a href="https://wa.me/${HELP_CONTACT_DEFAULT.replace(/\D/g, "")}">${HELP_CONTACT_DEFAULT}</a> or email <a href="mailto:${HELP_EMAIL_DEFAULT}">${HELP_EMAIL_DEFAULT}</a>`;
  return (
    `<!doctype html><html lang="${locale}" dir="${ar ? "rtl" : "ltr"}"><head><meta charset="utf-8">` +
    `<meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex">` +
    `<link rel="canonical" href="${ar ? "/ar/duroos" : "/duroos"}"><title>${title} · MESH</title><style>${CSS}</style></head><body>` +
    `<h1>${title}</h1><p><small>${esc(date)}. ${esc(updated)}.</small></p>` +
    (groups || `<p>${ar ? "لا دروس اليوم." : "No duroos today."}</p>`) +
    `<p><a href="${ar ? "/ar/duroos" : "/duroos"}">${ar ? "الموقع كاملًا" : "Full site"}</a> · ${other}</p><p><small>${help}</small></p>` +
    `</body></html>`
  );
}
