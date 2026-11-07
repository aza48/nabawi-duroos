"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, House, LayoutGrid, Landmark, MessageCircleQuestion } from "lucide-react";
import type { Locale } from "@/lib/locale";

export function navItems(locale: Locale) {
  return [
    { href: "/", label: locale === "ar" ? "الرئيسية" : "Home", icon: House, match: (p: string) => p === "/" },
    {
      href: locale === "ar" ? "/ar/duroos" : "/duroos",
      label: locale === "ar" ? "الدروس" : "Duroos",
      icon: Landmark,
      match: (p: string) => p.startsWith("/duroos") || p.startsWith("/ar/duroos"),
    },
    { href: "/guides", label: locale === "ar" ? "الأدلة" : "Guides", icon: BookOpen, match: (p: string) => p.startsWith("/guides") },
    { href: "/ask", label: locale === "ar" ? "الأسئلة" : "Ask", icon: MessageCircleQuestion, match: (p: string) => p.startsWith("/ask") },
    { href: "/more", label: locale === "ar" ? "المزيد" : "More", icon: LayoutGrid, match: (p: string) => p.startsWith("/more") },
  ];
}

export function BottomNav({ locale }: { locale: Locale }) {
  const path = usePathname() ?? "/";
  return (
    <nav
      aria-label="Main"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-card/95 backdrop-blur md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="mx-auto flex max-w-lg justify-around">
        {navItems(locale).map(({ href, label, icon: Icon, match }) => {
          const active = match(path);
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={`flex min-h-16 flex-col items-center justify-center gap-1 text-[11px] font-semibold ${
                  active ? "text-primary" : "text-muted"
                }`}
              >
                <Icon size={22} strokeWidth={active ? 2.4 : 1.8} />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function DesktopNav({ locale }: { locale: Locale }) {
  const path = usePathname() ?? "/";
  return (
    <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
      {navItems(locale).map(({ href, label, match }) => (
        <Link
          key={href}
          href={href}
          aria-current={match(path) ? "page" : undefined}
          className={`rounded-full px-3.5 py-2 text-sm font-semibold transition ${
            match(path) ? "bg-primary text-primary-ink" : "text-muted hover:text-ink"
          }`}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}
