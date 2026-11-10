import { AdminHelp } from "./AdminHelp";
import { WhatsAppIcon } from "./WhatsAppIcon";

export { WhatsAppIcon };

/**
 * Kept for older callers. Help now always goes to Admin on WhatsApp, never to the group,
 * so the group link this used to take is ignored.
 */
export function AskOnWhatsApp({ locale = "en" }: { url?: string; compact?: boolean; locale?: "en" | "ar" }) {
  return <AdminHelp locale={locale} kind="question" />;
}
