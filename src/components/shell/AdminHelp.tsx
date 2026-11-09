"use client";

import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { ADMIN_EMAIL, ADMIN_HELP_COPY, ADMIN_WHATSAPP, adminEmailHref, adminWhatsAppHref, type HelpKind } from "./admin-help";

type Props = {
  locale?: "en" | "ar";
  /** "report" asks for corrections (guides, answers); "question" invites a question (the answers page). */
  kind?: HelpKind;
  /** "card" is a full block; "line" is one line of text, for empty states. */
  variant?: "card" | "line";
  /** The page to name in the message. Defaults to the current page; pass it when the query matters (search). */
  path?: string;
  className?: string;
};

/**
 * The Admin link, naming the page once the page has mounted. The first render is the plain link, so the server HTML
 * and the first browser render always match, even on a prerendered page served for another address (the 404).
 */
function useAdminHref(path: string | undefined, locale: "en" | "ar"): { wa: string; email: string } {
  const pathname = usePathname();
  const [href, setHref] = useState(() => ({ wa: adminWhatsAppHref(undefined, locale), email: adminEmailHref() }));
  useEffect(() => {
    const page = path ?? pathname ?? undefined;
    setHref({ wa: adminWhatsAppHref(page, locale), email: adminEmailHref(page) });
  }, [path, pathname, locale]);
  return href;
}

function HelpNumber() {
  return <span dir="ltr" className="whitespace-nowrap">{ADMIN_WHATSAPP}</span>;
}

/** The help email as a mail link. */
export function AdminEmailLink({ href, className = "" }: { href?: string; className?: string }) {
  return (
    <a href={href ?? adminEmailHref()} dir="ltr" className={`whitespace-nowrap [unicode-bidi:isolate] ${className}`}>
      {ADMIN_EMAIL}
    </a>
  );
}

/** The one help block on the site: it always sends people to Admin on WhatsApp, with the page link filled in. */
export function AdminHelp({ locale = "en", kind = "report", variant = "card", path, className = "" }: Props) {
  const t = ADMIN_HELP_COPY[locale];
  const href = useAdminHref(path, locale);

  if (variant === "line") {
    return (
      <span className={`inline-flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1 ${className}`}>
        <a href={href.wa} target="_blank" rel="noopener noreferrer" className="inline-flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1 font-medium text-primary underline-offset-2 hover:underline">
          <WhatsAppIcon size={15} /> {t.line} <HelpNumber />
        </a>
        <span className="text-muted">{t.email}</span>
        <AdminEmailLink href={href.email} className="font-medium text-primary underline-offset-2 hover:underline" />
      </span>
    );
  }

  // The whole card opens WhatsApp (the title's link covers it); the email link sits above that and opens mail.
  return (
    <div className={`card relative flex items-center gap-3 p-4 transition hover:border-wa ${className}`}>
      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-wa text-wa-ink">
        <WhatsAppIcon size={20} />
      </span>
      <span className="min-w-0 flex-1">
        <a href={href.wa} target="_blank" rel="noopener noreferrer" className="block font-semibold after:absolute after:inset-0 after:rounded-[inherit]">
          {t[kind]}
        </a>
        <span className="block text-sm text-muted">
          {t.line} <HelpNumber /> {t.email}{" "}
          <AdminEmailLink href={href.email} className="relative z-10 font-semibold text-primary underline-offset-2 hover:underline" />
        </span>
      </span>
      <ArrowUpRight size={18} className="shrink-0 text-muted rtl:-scale-x-100" />
    </div>
  );
}

/** The footer's number as a link that also names the current page. */
export function AdminHelpLink({ locale = "en", className = "", children }: { locale?: "en" | "ar"; className?: string; children?: ReactNode }) {
  const { wa } = useAdminHref(undefined, locale);
  return (
    <a href={wa} target="_blank" rel="noopener noreferrer" className={className} dir="ltr">
      {children ?? ADMIN_WHATSAPP}
    </a>
  );
}
