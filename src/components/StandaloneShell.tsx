"use client";

import { ReactNode } from "react";
import { Languages, MoonStar } from "lucide-react";
import { LanguageProvider, useLang } from "../lib/i18n";

/** Minimal themed shell for standalone pages (/manage, /admin, /admin/login)
 *  that live outside the main SPA but share the design system. */
export function StandaloneShell({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <ShellInner>{children}</ShellInner>
    </LanguageProvider>
  );
}

function ShellInner({ children }: { children: ReactNode }) {
  const { lang, setLang, ui } = useLang();
  return (
    <div className="app-shell min-h-screen bg-[var(--canvas)] text-[var(--ink)]" data-masjid="nabawi" data-mode="light">
      <header className="sticky top-0 z-30 bg-[var(--canvas)]/95 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-3 px-4 sm:px-6">
          <a href="/" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--brand-deep)] text-white">
              <MoonStar className="h-5 w-5" />
            </span>
            <span className="text-[15px] font-semibold">{ui("appName")}</span>
          </a>
          <button
            onClick={() => setLang(lang === "ar" ? "en" : "ar")}
            className="inline-flex h-10 items-center gap-1.5 rounded-pill bg-[var(--card)] px-3.5 text-sm font-semibold shadow-soft transition-transform active:scale-95"
            aria-label="Language / اللغة"
          >
            <Languages className="h-4 w-4" />
            {lang === "ar" ? "EN" : "عربي"}
          </button>
        </div>
      </header>
      <main className="mx-auto w-full max-w-5xl px-4 pb-16 pt-4 sm:px-6">{children}</main>
    </div>
  );
}
