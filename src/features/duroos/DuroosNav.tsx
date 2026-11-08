"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Languages } from "lucide-react";
import type { Locale } from "@/lib/locale";
import { t } from "./strings";

const TABS = [
  { rest: "", key: "today" },
  { rest: "/schedule", key: "schedule" },
  { rest: "/updates", key: "updates" },
  { rest: "/live", key: "live" },
  { rest: "/sisters", key: "sisters" },
] as const;

/** Section tabs + a language switch that keeps you on the same page. */
export function DuroosNav({ locale }: { locale: Locale }) {
  const path = usePathname() ?? "/duroos";
  const base = locale === "ar" ? "/ar/duroos" : "/duroos";
  const rest = path.replace(/^\/ar/, "").replace(/^\/duroos/, "");
  const other = locale === "ar" ? `/duroos${rest}` : `/ar/duroos${rest}`;
  const active = (r: string) => (r === "" ? rest === "" : rest.startsWith(r));
  return (
    <div className="-mx-4 mb-4 flex items-center gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none]">
      {TABS.map((tab) => (
        <Link
          key={tab.key}
          href={`${base}${tab.rest}`}
          aria-current={active(tab.rest) ? "page" : undefined}
          className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${
            active(tab.rest)
              ? "bg-primary text-primary-ink"
              : tab.key === "sisters"
                ? "border border-petal/30 bg-petal-bg text-petal hover:border-petal/60"
                : "border border-line bg-card text-muted hover:text-ink"
          }`}
        >
          {t(locale, tab.key)}
        </Link>
      ))}
      <a
        href={other}
        lang={locale === "ar" ? "en" : "ar"}
        className="ms-auto flex shrink-0 items-center gap-1.5 rounded-full border border-line bg-card px-3.5 py-2 text-sm font-semibold"
      >
        <Languages size={15} />
        {locale === "ar" ? t(locale, "readInEnglish") : t(locale, "readInArabic")}
      </a>
    </div>
  );
}
