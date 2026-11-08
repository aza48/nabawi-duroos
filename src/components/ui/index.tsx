import Link from "next/link";
import { ArrowRight, ChevronRight, type LucideIcon } from "lucide-react";

export function Section({
  title,
  action,
  children,
  className = "",
}: {
  title: React.ReactNode;
  action?: { href: string; label: string };
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`mt-7 ${className}`}>
      <div className="mb-3 flex items-baseline justify-between gap-3">
        <h2 className="text-xl font-semibold">{title}</h2>
        {action && (
          <Link href={action.href} className="flex shrink-0 items-center gap-0.5 text-sm font-medium text-muted hover:text-ink">
            {action.label}
            <ChevronRight size={15} className="rtl:rotate-180" />
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}

export function EmptyState({ title, body }: { title: string; body?: string }) {
  return (
    <div className="card border-dashed p-5 text-center">
      <p className="font-medium">{title}</p>
      {body && <p className="mt-1 text-sm text-muted">{body}</p>}
    </div>
  );
}

export function PageTitle({ title, subtitle }: { title: React.ReactNode; subtitle?: React.ReactNode }) {
  return (
    <div className="mb-5 mt-2">
      <h1 className="text-3xl font-semibold leading-tight md:text-4xl">{title}</h1>
      {subtitle && <p className="mt-1.5 text-muted">{subtitle}</p>}
    </div>
  );
}

/** The green MESH band that opens every top-level page. */
export function PageBand({ title, subtitle, children }: { title: React.ReactNode; subtitle?: React.ReactNode; children?: React.ReactNode }) {
  return (
    <section className="lattice overflow-hidden bg-brand text-white">
      <div className="shell py-10 md:py-16">
        <h1 className="font-heading text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">{title}</h1>
        {subtitle && <p className="mt-3 max-w-2xl text-base text-white/80 md:text-lg">{subtitle}</p>}
        {children}
      </div>
    </section>
  );
}

/** Where this page sits, as links: Home › Section › Page. The last crumb is the page itself and is not a link. */
export function Breadcrumbs({ items, tone = "page", rtl = false }: { items: [label: string, href?: string][]; tone?: "page" | "band"; rtl?: boolean }) {
  const link = tone === "band" ? "text-white/75 hover:text-white" : "text-muted hover:text-primary";
  return (
    <nav aria-label={rtl ? "مسار الصفحة" : "Breadcrumb"} className="text-sm">
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
        {items.map(([label, href], i) => (
          <li key={i} className="flex min-w-0 items-center gap-1.5">
            {i > 0 && <ChevronRight size={14} aria-hidden="true" className={`shrink-0 ${tone === "band" ? "text-white/45" : "text-muted/60"} ${rtl ? "rotate-180" : ""}`} />}
            {href ? (
              <Link href={href} className={`rounded transition-colors ${link}`}>
                {label}
              </Link>
            ) : (
              <span aria-current="page" className={`line-clamp-1 ${tone === "band" ? "text-white" : "text-ink"} font-medium`}>
                {label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/**
 * The site's section header: the gold bar from the MESH logo, an icon tile, the title, an optional
 * line under it, and an optional link on the end ("Weekly schedule", "All guides").
 */
export function SectionHeader({
  id,
  title,
  subtitle,
  icon: Icon,
  action,
  rtl = false,
}: {
  id?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  icon?: LucideIcon;
  action?: { href: string; label: string };
  rtl?: boolean;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-x-4 gap-y-3">
      <div className="flex min-w-0 items-center gap-3.5">
        {Icon && (
          <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-primary text-primary-ink shadow-[var(--shadow)] md:size-12" aria-hidden="true">
            <Icon size={22} />
          </span>
        )}
        <div className="min-w-0">
          <span className="mb-1.5 block h-1 w-9 rounded-full bg-gold-bright" aria-hidden="true" />
          <h2 id={id} className="font-heading text-[1.75rem] font-bold leading-tight md:text-4xl">
            {title}
          </h2>
          {subtitle && <p className="mt-1.5 max-w-xl text-muted">{subtitle}</p>}
        </div>
      </div>
      {action && (
        <Link
          href={action.href}
          className="group inline-flex shrink-0 items-center gap-1.5 rounded-full border border-line bg-card px-4 py-2 text-sm font-semibold text-primary transition hover:border-primary/50 hover:bg-primary-soft"
        >
          {action.label}
          <ArrowRight size={15} aria-hidden="true" className={`transition group-hover:translate-x-0.5 ${rtl ? "rotate-180 group-hover:-translate-x-0.5" : ""}`} />
        </Link>
      )}
    </div>
  );
}
