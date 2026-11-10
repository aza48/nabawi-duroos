export type Locale = "en" | "ar";

export function dir(locale: Locale): "ltr" | "rtl" {
  return locale === "ar" ? "rtl" : "ltr";
}

const AR_DIGITS = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];

export function toArabicDigits(s: string | number): string {
  return String(s).replace(/\d/g, (d) => AR_DIGITS[Number(d)]);
}

const EASTERN = "٠١٢٣٤٥٦٧٨٩";
const PERSIAN = "۰۱۲۳۴۵۶۷۸۹";
/** Arabic-Indic and Persian digits as ASCII digits. */
export const toAsciiDigits = (s: string) =>
  s.replace(/[٠-٩۰-۹]/g, (d) => String(EASTERN.includes(d) ? EASTERN.indexOf(d) : PERSIAN.indexOf(d)));

export const WEEKDAYS_EN = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] as const;
export const WEEKDAYS_AR = ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"] as const;
export const WEEKDAYS_SHORT_EN = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

/** Attributes for the <html> element of a locale's root layout. */
export function htmlAttrs(locale: Locale): { lang: Locale; dir: "ltr" | "rtl" } {
  return { lang: locale, dir: dir(locale) };
}

/**
 * English paths that have an Arabic twin at the same path under /ar. Every public section has one;
 * the home page is handled on its own.
 */
const AR_TWINS = /^\/(ask|assistant|discounts|duroos|glossary|guides|library|mahad|more|programs|search|start)(\/|$|[?#])/;

/** True when an English path has an Arabic page at /ar + path. */
export function hasArabicTwin(path: string): boolean {
  return path === "/" || /^\/[?#]/.test(path) || AR_TWINS.test(path);
}

/** The same page in the other language where it exists; otherwise the English page. */
export function localizeUrl(url: string, locale: Locale): string {
  if (locale !== "ar" || /^https?:/.test(url) || url === "/ar" || url.startsWith("/ar/") || /^\/ar[?#]/.test(url)) return url;
  if (url === "/" || /^\/[?#]/.test(url)) return `/ar${url === "/" ? "" : url}`;
  if (AR_TWINS.test(url)) return `/ar${url}`;
  return url;
}
