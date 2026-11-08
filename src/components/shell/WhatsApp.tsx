import { ArrowUpRight } from "lucide-react";

export function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.66.15-.2.3-.76.96-.93 1.16-.17.2-.34.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.66-1.6-.91-2.19-.24-.58-.48-.5-.66-.5h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.06 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.48.71.31 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.08 1.75-.72 2-1.41.25-.69.25-1.28.17-1.41-.07-.12-.27-.2-.57-.35zM12.04 21.5h-.01a9.4 9.4 0 0 1-4.8-1.32l-.34-.2-3.57.94.95-3.48-.22-.36a9.43 9.43 0 0 1-1.45-5.03c0-5.2 4.24-9.44 9.45-9.44a9.38 9.38 0 0 1 6.68 2.77 9.38 9.38 0 0 1 2.76 6.68c0 5.21-4.24 9.44-9.45 9.44zm8.04-17.48A11.3 11.3 0 0 0 12.04.7C5.77.7.67 5.8.67 12.06c0 2 .52 3.96 1.52 5.68L.57 23.7l6.1-1.6a11.33 11.33 0 0 0 5.37 1.37h.01c6.27 0 11.37-5.1 11.37-11.37 0-3.04-1.18-5.9-3.34-8.04z" />
    </svg>
  );
}

export function WhatsAppBanner({ url }: { url: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 rounded-2xl bg-primary p-3.5 text-primary-ink shadow-md transition hover:brightness-105"
    >
      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-wa text-wa-ink">
        <WhatsAppIcon size={24} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-semibold leading-tight">Join the MESH group</span>
        <span className="block text-sm opacity-85">Announcements, events &amp; daily help</span>
      </span>
      <span className="rounded-full bg-primary-ink px-3.5 py-1.5 text-sm font-bold text-primary">Join</span>
    </a>
  );
}

export function AskOnWhatsApp({ url, compact = false, locale = "en" }: { url: string; compact?: boolean; locale?: "en" | "ar" }) {
  const ar = locale === "ar";
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`card flex items-center gap-3 ${compact ? "p-3" : "p-4"} transition hover:border-wa`}
    >
      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-wa text-wa-ink">
        <WhatsAppIcon size={20} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-semibold">{ar ? "عندك سؤال؟" : "Have a question?"}</span>
        <span className="block text-sm text-muted">{ar ? "اكتبه في مجموعة MESH على واتساب" : "Post it in the MESH WhatsApp chat"}</span>
      </span>
      <ArrowUpRight size={18} className="text-muted rtl:-scale-x-100" />
    </a>
  );
}
