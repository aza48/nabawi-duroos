"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Activity, BarChart3, FileText, Inbox, Landmark, LogOut, Settings } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { ThemeToggle } from "@/components/shell/ThemeToggle";
import { AdminFeedbackProvider } from "@/features/admin/Feedback";

const TABS = [
  { href: "/admin", label: "Inbox", icon: Inbox, exact: true },
  { href: "/admin/duroos", label: "Duroos", icon: Landmark },
  { href: "/admin/content", label: "Content", icon: FileText },
  { href: "/admin/activity", label: "Activity", icon: Activity },
  { href: "/admin/analytics", label: "Visitors", icon: BarChart3 },
  { href: "/admin/more", label: "More", icon: Settings },
];

export function AdminShell({ name, roleLabel, canUndo = false, children }: { name: string; roleLabel: string; canUndo?: boolean; children: React.ReactNode }) {
  const path = usePathname() ?? "/admin";
  const router = useRouter();
  const active = (t: (typeof TABS)[number]) => (t.exact ? path === t.href : path.startsWith(t.href));
  async function signOut() {
    await authClient.signOut();
    router.push("/admin/login");
  }
  return (
    <>
      <header className="sticky top-0 z-30 border-b border-line/60 bg-bg/90 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-4xl items-center justify-between gap-3 px-4">
          <Link href="/admin" className="font-heading text-xl font-semibold text-primary">MESH <span className="text-sm font-medium text-muted">Admin</span></Link>
          <nav className="hidden gap-1 md:flex">
            {TABS.map((t) => (
              <Link key={t.href} href={t.href} className={`rounded-full px-3 py-1.5 text-sm font-semibold ${active(t) ? "bg-primary text-primary-ink" : "text-muted hover:text-ink"}`}>{t.label}</Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <span className="hidden text-right text-xs leading-tight sm:block"><b className="block text-sm">{name}</b><span className="text-muted">{roleLabel}</span></span>
            <ThemeToggle />
            <button onClick={signOut} aria-label="Sign out" className="grid size-10 place-items-center rounded-full border border-line bg-card"><LogOut size={17} /></button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-4xl px-4 pt-4 pb-safe md:pb-16"><AdminFeedbackProvider canUndo={canUndo}>{children}</AdminFeedbackProvider></main>
      <nav aria-label="Admin" className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-card/95 backdrop-blur md:hidden" style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
        <ul className="flex justify-around">
          {TABS.map((t) => {
            const Icon = t.icon;
            return (
              <li key={t.href} className="flex-1">
                <Link href={t.href} aria-current={active(t) ? "page" : undefined}
                  className={`flex min-h-16 flex-col items-center justify-center gap-1 text-[11px] font-semibold ${active(t) ? "text-primary" : "text-muted"}`}>
                  <Icon size={21} strokeWidth={active(t) ? 2.4 : 1.8} />{t.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
