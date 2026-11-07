import Link from "next/link";
import { ChevronRight } from "lucide-react";

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
