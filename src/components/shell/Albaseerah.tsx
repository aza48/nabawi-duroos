/**
 * The quiet credit to MESH's parent organisation, Albaseerah International Institute (albaseerah.org).
 *
 * MESH keeps its own name, green, gold and lattice. Albaseerah appears as a binding: a slim band in its deep maroon at
 * the very foot of every page, under a hairline of its gold, with the MESH lattice running faintly through it. One
 * Albaseerah mark only: the crest that albaseerah.org shows, in its white-bordered version so it reads on any ground.
 * Every mention of Albaseerah links to albaseerah.org.
 */
import type { ReactNode } from "react";
import type { Locale } from "@/lib/locale";

export const ALBASEERAH = {
  url: "https://albaseerah.org",
  domain: "albaseerah.org",
  en: { by: "Brought to you by", name: "Albaseerah International Institute" },
  ar: { by: "يقدّمه لكم", name: "معهد البصيرة العالمي للدراسات الإسلامية" },
} as const;

/** Every mention of Albaseerah is this link. */
export function AlbaseerahLink({ className = "", children, label }: { className?: string; children: ReactNode; label?: string }) {
  return (
    <a href={ALBASEERAH.url} target="_blank" rel="noopener" className={className} aria-label={label}>
      {children}
    </a>
  );
}

export function AlbaseerahCrest({ className = "" }: { className?: string }) {
  return (
    <picture className="shrink-0">
      <source srcSet="/images/albaseerah/crest.webp" type="image/webp" />
      {/* eslint-disable-next-line @next/next/no-img-element -- a 19 KB static mark; next/image adds nothing here */}
      <img src="/images/albaseerah/crest.png" alt="" width={215} height={192} loading="lazy" decoding="async" className={`w-auto ${className}`} />
    </picture>
  );
}

/** The binding at the foot of every page: the Albaseerah credit, centred like a seal, on its deep maroon. */
export function AlbaseerahBand({ locale = "en" }: { locale?: Locale }) {
  const ar = locale === "ar";
  const t = ar ? ALBASEERAH.ar : ALBASEERAH.en;
  return (
    // On phones the band runs on under the bottom bar and the assistant button, so the credit always shows above them.
    <div className="abs-band lattice pb-[calc(9rem+env(safe-area-inset-bottom))] md:pb-[calc(5.5rem+env(safe-area-inset-bottom))] lg:pb-0">
      <div className="shell flex justify-center py-4">
        <AlbaseerahLink className="group inline-flex items-center gap-3.5" label={`${t.by} ${t.name}`}>
          <AlbaseerahCrest className="h-11 transition duration-300 group-hover:-translate-y-0.5" />
          <span className="min-w-0">
            <span className={`block text-abs-gold ${ar ? "text-xs" : "text-[10px] font-semibold uppercase tracking-[0.22em]"}`}>{t.by}</span>
            <span className={`abs-name mt-0.5 block font-medium leading-snug text-white ${ar ? "text-sm" : "text-[14px]"}`}>{t.name}</span>
          </span>
        </AlbaseerahLink>
      </div>
    </div>
  );
}

/** About MESH: the crest, the credit and the address, set off by a maroon rule. */
export function AlbaseerahAbout({ locale = "en", className = "" }: { locale?: Locale; className?: string }) {
  const ar = locale === "ar";
  const t = ar ? ALBASEERAH.ar : ALBASEERAH.en;
  return (
    <AlbaseerahLink className={`group flex items-center gap-4 border-s-2 border-abs ps-4 ${className}`} label={`${t.by} ${t.name}`}>
      <AlbaseerahCrest className="h-14 transition duration-300 group-hover:-translate-y-0.5" />
      <span className="min-w-0">
        <span className={`block text-muted ${ar ? "text-xs" : "text-[10.5px] font-semibold uppercase tracking-[0.2em]"}`}>{t.by}</span>
        <span className="mt-0.5 block font-heading text-lg font-semibold leading-snug text-abs underline-offset-4 group-hover:underline">{t.name}</span>
        <span className="mt-0.5 block text-sm text-muted" dir="ltr">{ALBASEERAH.domain}</span>
      </span>
    </AlbaseerahLink>
  );
}
