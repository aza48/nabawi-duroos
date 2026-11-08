"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Languages } from "lucide-react";
import { hasArabicTwin } from "@/lib/locale";

/** The page's counterpart in the other language: /guides/x <-> /ar/guides/x, / <-> /ar. Anything else goes to the other home page. */
export function otherLanguagePath(path: string): string {
  if (path === "/ar" || path.startsWith("/ar/")) return path.slice(3) || "/";
  if (path === "/") return "/ar";
  return hasArabicTwin(path) ? `/ar${path}` : "/ar";
}

/** Remembers the reader's language, so the site opens in it next time (cookie plus localStorage). */
export function rememberLanguage(lang: "en" | "ar") {
  try {
    document.cookie = `mesh-lang=${lang}; path=/; max-age=31536000; samesite=lax`;
    localStorage.setItem("mesh-lang", lang);
  } catch {}
}

/** Always-visible header button to switch between English and Arabic. */
export function LanguageSwitch() {
  const path = usePathname() ?? "/";
  const ar = path === "/ar" || path.startsWith("/ar/");
  return (
    <Link
      href={otherLanguagePath(path)}
      onClick={() => rememberLanguage(ar ? "en" : "ar")}
      hrefLang={ar ? "en" : "ar"}
      lang={ar ? "en" : "ar"}
      aria-label={ar ? "Switch to English" : "التبديل إلى العربية"}
      className="flex h-11 items-center gap-1.5 rounded-full border border-line bg-card px-3.5 text-sm font-semibold text-ink transition hover:border-primary sm:px-3"
    >
      <Languages size={17} className="hidden text-primary sm:block" />
      {ar ? (
        <>
          <span className="sm:hidden">EN</span>
          <span className="hidden sm:inline">English</span>
        </>
      ) : (
        <span>عربي</span>
      )}
    </Link>
  );
}
