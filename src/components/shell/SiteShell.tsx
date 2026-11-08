import Link from "next/link";
import type { Locale } from "@/lib/locale";
import { BottomNav, DesktopNav } from "./BottomNav";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSwitch } from "./LanguageSwitch";
import { WhatsAppIcon } from "./WhatsApp";
import { Wordmark } from "./Wordmark";
import { SearchPalette } from "@/features/search/SearchUI";

export function SiteShell({
  locale,
  whatsappUrl,
  helpContact,
  children,
}: {
  locale: Locale;
  whatsappUrl: string;
  helpContact: string;
  children: React.ReactNode;
}) {
  const ar = locale === "ar";
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:start-2 focus:z-50 focus:rounded focus:bg-card focus:p-2">
        {ar ? "تخطَّ إلى المحتوى" : "Skip to content"}
      </a>
      <header className="sticky top-0 z-30 border-b border-line/70 bg-bg/85 backdrop-blur-md">
        <div className="shell flex h-16 items-center justify-between gap-2 sm:gap-4 md:h-[72px] lg:gap-3 xl:gap-4">
          <Link href={ar ? "/ar" : "/"} aria-label={ar ? "الصفحة الرئيسية لـ MESH" : "MESH home"} className="shrink-0">
            <Wordmark />
          </Link>
          <DesktopNav locale={locale} />
          <div className="flex items-center gap-1.5 sm:gap-2">
            <SearchPalette locale={locale} />
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={ar ? "انضم لمجموعة MESH على واتساب" : "Join the MESH WhatsApp group"}
              className="flex h-11 min-w-11 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-wa px-3 text-sm font-semibold text-wa-ink transition hover:brightness-105 xl:px-4"
            >
              <WhatsAppIcon size={18} /> <span className="hidden xl:inline">{ar ? "انضم للمجموعة" : "Join the group"}</span>
            </a>
            <LanguageSwitch />
            <span className="hidden sm:contents">
              <ThemeToggle label={ar ? "تبديل المظهر" : "Switch light / dark"} />
            </span>
          </div>
        </div>
      </header>
      <main id="main" className="pb-safe lg:pb-0">
        {children}
      </main>
      <Footer locale={locale} whatsappUrl={whatsappUrl} helpContact={helpContact} />
      <BottomNav locale={locale} />
    </>
  );
}

function Footer({ locale, whatsappUrl, helpContact }: { locale: Locale; whatsappUrl: string; helpContact: string }) {
  const ar = locale === "ar";
  const cols = [
    {
      title: ar ? "الدروس" : "Duroos",
      links: [
        [ar ? "دروس اليوم" : "Today", ar ? "/ar/duroos" : "/duroos"],
        [ar ? "جدول الأسبوع" : "Weekly schedule", ar ? "/ar/duroos/schedule" : "/duroos/schedule"],
        [ar ? "البث المباشر" : "Live streams", ar ? "/ar/duroos/live" : "/duroos/live"],
        [ar ? "آخر التحديثات" : "Updates", ar ? "/ar/duroos/updates" : "/duroos/updates"],
      ],
    },
    {
      title: ar ? "الحياة في المدينة" : "Life in Madinah",
      links: [
        [ar ? "الدراسة في المدينة" : "Study programmes", ar ? "/ar/programs" : "/programs"],
        [ar ? "الأدلة" : "Guides", ar ? "/ar/guides" : "/guides"],
        [ar ? "المكتبة" : "Library", ar ? "/ar/library" : "/library"],
        [ar ? "الخصومات" : "Student discounts", ar ? "/ar/discounts" : "/discounts"],
        [ar ? "الأسئلة الشائعة" : "Questions", ar ? "/ar/ask" : "/ask"],
        [ar ? "المزيد" : "More", ar ? "/ar/more" : "/more"],
      ],
    },
  ];
  return (
    <footer className="lattice mt-16 bg-brand-deep text-white">
      <div className="shell grid gap-8 py-12 sm:grid-cols-2 md:py-14 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:gap-10">
        <div>
          <Wordmark tone="light" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/75">
            {ar
              ? "مركز يديره الطلاب لطلاب المدينة الناطقين بالإنجليزية."
              : "Run by students, for English-speaking students in Madinah."}
          </p>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <p className="font-heading text-base font-semibold text-gold-bright">{c.title}</p>
            <ul className="mt-3 space-y-2 text-sm">
              {c.links.map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-white/80 transition hover:text-white">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <p className="font-heading text-base font-semibold text-gold-bright">{ar ? "مجموعة واتساب" : "The MESH group"}</p>
          <p className="mt-3 text-sm text-white/75">
            {ar ? "الإعلانات والفعاليات والمساعدة اليومية." : "Announcements, events and daily help from students who have been here longer."}
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-wa px-4 py-2 text-sm font-semibold text-wa-ink transition hover:brightness-105"
          >
            <WhatsAppIcon size={17} /> {ar ? "انضم الآن" : "Join on WhatsApp"}
          </a>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="shell flex flex-wrap items-center justify-between gap-3 py-5 text-sm text-white/70">
          <p>
            {ar ? "تحتاج مساعدة أو عندك اقتراح؟ راسل المشرف على واتساب: " : "Need any assistance, or have a suggestion? Please message Admin on WhatsApp at "}
            <a href={`https://wa.me/${helpContact.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="font-semibold text-gold-bright hover:underline" dir="ltr">
              {helpContact}
            </a>
          </p>
          <span className="flex items-center gap-3">
            <span className="sm:hidden"><ThemeToggle label={ar ? "تبديل المظهر" : "Switch light / dark"} /></span>
            <span className="text-xs text-white/50">medinahub.org</span>
          </span>
        </div>
        <p className="shell pb-5 text-xs leading-relaxed text-white/50">
          {ar
            ? "© مركز MESH. محتوى الموقع محمي بحقوق النشر."
            : "© MESH. All content is protected by copyright."}
        </p>
      </div>
    </footer>
  );
}
