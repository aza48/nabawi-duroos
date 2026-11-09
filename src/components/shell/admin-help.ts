import { abs } from "@/lib/site";

/**
 * The help number. Help, corrections and questions always go to Admin on WhatsApp, never to the group.
 * Kept here, with no server imports, so client components can use it. A test checks it equals
 * HELP_CONTACT_DEFAULT in src/server/settings.ts.
 */
export const ADMIN_WHATSAPP = "+1 234 567 9076";

/** The help email, shown beside the number. A test checks it equals HELP_EMAIL_DEFAULT in src/server/settings.ts. */
export const ADMIN_EMAIL = "mesh@albaseerah.org";

/** mailto link to Admin, with the page the reader is on as the subject when a path is given. */
export function adminEmailHref(path?: string): string {
  if (!path || path.startsWith("/_")) return `mailto:${ADMIN_EMAIL}`;
  return `mailto:${ADMIN_EMAIL}?subject=${encodeURIComponent(`MESH: ${abs(path)}`)}`;
}

export type HelpKind = "report" | "question";

export const ADMIN_HELP_COPY = {
  en: {
    report: "Something wrong or missing?",
    question: "Have a question?",
    line: "Message Admin on WhatsApp at",
    email: "or email",
    greeting: "Assalamu alaykum. About this page on MESH:",
  },
  ar: {
    report: "معلومة خاطئة أو ناقصة؟",
    question: "عندك سؤال؟",
    line: "راسل المشرف على واتساب على الرقم",
    email: "أو على البريد الإلكتروني",
    greeting: "السلام عليكم. بخصوص هذه الصفحة في MESH:",
  },
} as const;

/** wa.me link to Admin, with a greeting and the page the reader is on filled in when a path is given. */
export function adminWhatsAppHref(path?: string, locale: "en" | "ar" = "en"): string {
  const base = `https://wa.me/${ADMIN_WHATSAPP.replace(/\D/g, "")}`;
  // Internal routes (the prerendered "/_not-found") are not a page the reader can be sent back to.
  if (!path || path.startsWith("/_")) return base;
  const text = `${ADMIN_HELP_COPY[locale].greeting} ${abs(path)}`;
  return `${base}?text=${encodeURIComponent(text)}`;
}
