import Link from "next/link";
import type { Locale } from "@/lib/locale";
import { BottomNav, DesktopNav } from "./BottomNav";
import { ThemeToggle } from "./ThemeToggle";
import { WhatsAppFab } from "./WhatsApp";

export function SiteShell({
  locale,
  whatsappUrl,
  children,
}: {
  locale: Locale;
  whatsappUrl: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:start-2 focus:z-50 focus:rounded focus:bg-card focus:p-2">
        {locale === "ar" ? "تخطَّ إلى المحتوى" : "Skip to content"}
      </a>
      <header className="sticky top-0 z-30 border-b border-line/60 bg-bg/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-3 px-4">
          <Link href="/" className="flex flex-col leading-none" dir="ltr">
            <span className="font-heading text-2xl font-semibold tracking-wide text-primary">MESH</span>
            <span className="text-[10px] tracking-wide text-muted">Medina English Student Hub</span>
          </Link>
          <DesktopNav locale={locale} />
          <ThemeToggle label={locale === "ar" ? "تبديل المظهر" : "Switch light / dark"} />
        </div>
      </header>
      <main id="main" className="mx-auto max-w-5xl px-4 pt-4 pb-safe md:pb-16">
        {children}
      </main>
      <WhatsAppFab url={whatsappUrl} />
      <BottomNav locale={locale} />
    </>
  );
}
