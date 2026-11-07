import Link from "next/link";

export function AuthCard({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <main className="mx-auto flex min-h-dvh max-w-sm flex-col justify-center px-5 py-10">
      <Link href="/" className="mb-6 text-center font-heading text-3xl font-semibold text-primary">MESH</Link>
      <div className="card p-5">
        <h1 className="text-xl font-semibold">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-muted">{subtitle}</p>}
        <div className="mt-4">{children}</div>
      </div>
    </main>
  );
}

export const inputCls =
  "w-full rounded-xl border border-line bg-bg px-3.5 py-3 text-base text-ink outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20";
export const labelCls = "mb-1.5 block text-sm font-semibold";
export const btnPrimary =
  "inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 font-semibold text-primary-ink transition hover:brightness-110 disabled:opacity-60";
export const btnGhost =
  "inline-flex items-center justify-center gap-2 rounded-full border border-line bg-card px-4 py-2.5 text-sm font-semibold transition hover:bg-bg-2 disabled:opacity-60";

export function ErrorNote({ children }: { children: React.ReactNode }) {
  return <p role="alert" className="mt-3 rounded-xl bg-cancel-bg px-3 py-2 text-sm text-cancel">{children}</p>;
}
