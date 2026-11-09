import { AdminHelp } from "./AdminHelp";
import { WhatsAppIcon } from "./WhatsAppIcon";

export { WhatsAppIcon };

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

/**
 * Kept for older callers. Help now always goes to Admin on WhatsApp, never to the group,
 * so the group link this used to take is ignored.
 */
export function AskOnWhatsApp({ locale = "en" }: { url?: string; compact?: boolean; locale?: "en" | "ar" }) {
  return <AdminHelp locale={locale} kind="question" />;
}
