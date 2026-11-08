"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Languages } from "lucide-react";

/** The page's counterpart in the other language: /duroos/x <-> /ar/duroos/x, / <-> /ar; untranslated pages go to the Arabic home. */
export function otherLanguagePath(path: string): string {
  if (path === "/ar" || path.startsWith("/ar/")) return path.slice(3) || "/";
  if (path === "/") return "/ar";
  if (path.startsWith("/duroos")) return `/ar${path}`;
  return "/ar";
}

/** Always-visible header button to switch between English and Arabic. */
export function LanguageSwitch() {
  const path = usePathname() ?? "/";
  const ar = path === "/ar" || path.startsWith("/ar/");
  return (
    <Link
      href={otherLanguagePath(path)}
      hrefLang={ar ? "en" : "ar"}
      lang={ar ? "en" : "ar"}
      aria-label={ar ? "Switch to English" : "التبديل إلى العربية"}
      className="flex h-11 items-center gap-1.5 rounded-full border border-line bg-card px-3 text-sm font-semibold text-ink transition hover:border-primary"
    >
      <Languages size={17} className="text-primary" />
      <span>{ar ? "English" : "عربي"}</span>
    </Link>
  );
}
