/**
 * The skeleton shown while a section's page loads on a slow connection (loading.tsx). It mirrors the real layout:
 * the green page band, then a grid of cards, so nothing jumps when the page arrives. Animation stops for readers
 * who ask for reduced motion (globals.css).
 */
export function PageSkeleton({ locale = "en", cards = 6 }: { locale?: "en" | "ar"; cards?: number }) {
  return (
    <div aria-busy="true" aria-live="polite">
      <p className="sr-only">{locale === "ar" ? "جارٍ التحميل" : "Loading"}</p>
      <section className="lattice bg-brand text-white" aria-hidden="true">
        <div className="shell py-10 md:py-16">
          <div className="h-10 w-2/3 max-w-md animate-pulse rounded-xl bg-white/15 md:h-14" />
          <div className="mt-4 h-5 w-full max-w-xl animate-pulse rounded-lg bg-white/10" />
          <div className="mt-2 h-5 w-4/5 max-w-lg animate-pulse rounded-lg bg-white/10" />
        </div>
      </section>
      <div className="shell mt-8 grid gap-4 sm:grid-cols-2 md:mt-12 lg:grid-cols-3" aria-hidden="true">
        {Array.from({ length: cards }, (_, i) => (
          <div key={i} className="rounded-2xl border border-line bg-card p-5">
            <div className="h-5 w-3/4 animate-pulse rounded-md bg-bg-2" />
            <div className="mt-3 h-4 w-full animate-pulse rounded-md bg-bg-2" />
            <div className="mt-2 h-4 w-5/6 animate-pulse rounded-md bg-bg-2" />
            <div className="mt-6 h-3 w-1/3 animate-pulse rounded-md bg-bg-2" />
          </div>
        ))}
      </div>
    </div>
  );
}
