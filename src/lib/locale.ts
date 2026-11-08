export type Locale = "en" | "ar";

export function dir(locale: Locale): "ltr" | "rtl" {
  return locale === "ar" ? "rtl" : "ltr";
}

const AR_DIGITS = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];

export function toArabicDigits(s: string | number): string {
  return String(s).replace(/\d/g, (d) => AR_DIGITS[Number(d)]);
}

export const WEEKDAYS_EN = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] as const;
export const WEEKDAYS_AR = ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"] as const;

/** Attributes for the <html> element of a locale's root layout. */
export function htmlAttrs(locale: Locale): { lang: Locale; dir: "ltr" | "rtl" } {
  return { lang: locale, dir: dir(locale) };
}

/** English paths that have an Arabic twin under /ar. The library has an Arabic index page only. */
const AR_TWINS = /^\/(ask|discounts|duroos|guides|more|programs|search)(\/|$|[?#])/;

/** The same page in the other language where it exists; otherwise the English page. */
export function localizeUrl(url: string, locale: Locale): string {
  if (locale !== "ar" || /^https?:/.test(url) || url.startsWith("/ar")) return url;
  if (url === "/" || /^\/[?#]/.test(url)) return `/ar${url === "/" ? "" : url}`;
  if (AR_TWINS.test(url) || /^\/library(?:[?#].*)?$/.test(url)) return `/ar${url}`;
  return url;
}
