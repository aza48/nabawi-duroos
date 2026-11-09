import Link from "next/link";
import { Search } from "lucide-react";
import { AdminHelp } from "@/components/shell/AdminHelp";

const LINKS: [string, string][] = [
  ["دروس اليوم", "/ar/duroos"],
  ["الجدول الأسبوعي", "/ar/duroos/schedule"],
  ["الأدلة", "/ar/guides"],
  ["المكتبة", "/ar/library"],
  ["الدراسة في المدينة", "/ar/programs"],
  ["الأسئلة", "/ar/ask"],
];

/** Inside the Arabic layout, so the header, footer and language switch stay available. */
export default function NotFound() {
  return (
    <div className="shell flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
      <p className="font-heading text-6xl font-bold text-primary">404</p>
      <h1 className="mt-3 font-heading text-3xl font-bold md:text-4xl">هذه الصفحة غير موجودة على MESH</h1>
      <p className="mt-2 max-w-md text-muted">ابحث عما تريد، أو افتح أحد الأقسام أدناه.</p>
      <form action="/ar/search" method="get" role="search" className="mt-6 flex w-full max-w-lg items-center gap-2 rounded-full border border-line bg-card p-1.5 ps-4 shadow-sm">
        <Search size={18} className="shrink-0 text-muted" />
        <input name="q" placeholder="ابحث في الدروس والأدلة والكتب والأسئلة" aria-label="ابحث في MESH" className="min-w-0 flex-1 bg-transparent py-2 outline-none placeholder:text-muted" />
        <button type="submit" className="min-h-10 shrink-0 rounded-full bg-primary px-5 text-sm font-semibold text-primary-ink">بحث</button>
      </form>
      <nav aria-label="الأقسام" className="mt-6 flex flex-wrap justify-center gap-2">
        {LINKS.map(([label, href]) => (
          <Link key={href} href={href} className="min-h-10 rounded-full border border-line bg-card px-4 py-2 text-sm font-semibold transition hover:border-primary hover:text-primary">
            {label}
          </Link>
        ))}
      </nav>
      <AdminHelp locale="ar" className="mt-8 w-full max-w-lg text-start" />
    </div>
  );
}
