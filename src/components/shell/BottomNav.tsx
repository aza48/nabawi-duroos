"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, GraduationCap, House, LayoutGrid, Landmark, Library, MessageCircleQuestion } from "lucide-react";
import type { Locale } from "@/lib/locale";

/** "mobile" items make up the five-slot bottom bar; everything shows in the desktop header. */
export function navItems(locale: Locale) {
  const ar = locale === "ar";
  return [
    { href: "/", label: ar ? "الرئيسية" : "Home", icon: House, mobile: true, match: (p: string) => p === "/" || p === "/ar" },
    {
      href: ar ? "/ar/duroos" : "/duroos",
      label: ar ? "الدروس" : "Duroos",
      icon: Landmark,
      mobile: true,
      match: (p: string) => p.startsWith("/duroos") || p.startsWith("/ar/duroos"),
    },
    { href: "/library", label: ar ? "المكتبة" : "Library", icon: Library, mobile: true, match: (p: string) => p.startsWith("/library") },
    { href: "/guides", label: ar ? "الأدلة" : "Guides", icon: BookOpen, mobile: true, match: (p: string) => p.startsWith("/guides") },
    { href: "/programs", label: ar ? "الدراسة" : "Study", icon: GraduationCap, mobile: false, match: (p: string) => p.startsWith("/programs") },
    { href: "/ask", label: ar ? "الأسئلة" : "Ask", icon: MessageCircleQuestion, mobile: false, match: (p: string) => p.startsWith("/ask") },
    { href: "/more", label: ar ? "المزيد" : "More", icon: LayoutGrid, mobile: true, match: (p: string) => p.startsWith("/more") },
  ];
}

export function BottomNav({ locale }: { locale: Locale }) {
  const path = usePathname() ?? "/";
  return (
    <nav
      aria-label="Main"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-card/95 backdrop-blur lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="mx-auto flex max-w-lg justify-around">
        {navItems(locale).filter((n) => n.mobile).map(({ href, label, icon: Icon, match }) => {
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
    <nav aria-label="Main" className="hidden items-center gap-0.5 lg:flex">
      {navItems(locale).map(({ href, label, match }) => (
        <Link
          key={href}
          href={href}
          aria-current={match(path) ? "page" : undefined}
          className={`rounded-full px-3 py-2 text-sm font-semibold transition xl:px-3.5 ${
            match(path) ? "bg-primary text-primary-ink" : "text-muted hover:text-ink"
          }`}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}
