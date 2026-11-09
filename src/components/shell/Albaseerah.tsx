/**
 * The quiet credit to MESH's parent organisation, Albaseerah International Institute (albaseerah.org).
 *
 * MESH keeps its own name, green, gold and lattice. Albaseerah countersigns at the foot of the footer's MESH column, like
 * an endorsement under a brand, and maroon appears only in small doses: one diamond, and the name as ink on paper. One
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

/**
 * The Albaseerah signature: a hairline that starts at a MESH diamond in Albaseerah maroon (edged in Albaseerah gold),
 * then the crest and the credit. Dark tone sits at the foot of the footer's MESH column; light tone on paper (About).
 */
export function AlbaseerahSignature({
  locale = "en",
  tone = "dark",
  showDomain = false,
  className = "",
}: {
  locale?: Locale;
  tone?: "dark" | "light";
  showDomain?: boolean;
  className?: string;
}) {
  const ar = locale === "ar";
  const t = ar ? ALBASEERAH.ar : ALBASEERAH.en;
  const light = tone === "light";
  const label = `block ${light ? "text-muted" : "text-white/65"} ${ar ? "text-xs leading-5" : "text-[10px] font-semibold uppercase leading-none tracking-[0.18em]"}`;
  const name = [
    "block underline decoration-transparent decoration-1 underline-offset-4 transition-colors duration-200",
    ar ? "mt-0.5 text-sm leading-6" : "mt-1.5 leading-snug",
    light
      ? `font-semibold text-abs group-hover:decoration-abs/40 ${ar ? "" : "text-[15px]"}`
      : `font-medium text-white/90 group-hover:text-white group-hover:decoration-white/50 ${ar ? "" : "text-[14px]"}`,
  ].join(" ");
  return (
    <div className={className}>
      <span aria-hidden="true" className={`abs-knot ${light ? "abs-knot-light" : ""}`} />
      <AlbaseerahLink label={`${t.by} ${t.name}`} className="group mt-5 flex w-fit max-w-xs items-center gap-3 rounded-lg outline-offset-4">
        <AlbaseerahCrest className={`${light ? "h-12" : "h-11"} transition-transform duration-300 group-hover:-translate-y-px motion-reduce:transition-none`} />
        <span className="min-w-0">
          <span className={label}>{t.by}</span>
          <span className={name}>{t.name}</span>
          {showDomain && <span className="mt-0.5 block text-xs text-muted" dir="ltr">{ALBASEERAH.domain}</span>}
        </span>
      </AlbaseerahLink>
    </div>
  );
}

/**
 * Far off beyond the home page horizon, as if across the ocean: a tiny drawing of the Albaseerah school in the USA (a
 * central stone tower with an arched door between two slate-roofed wings with dormers). It sits behind the near hills
 * in the haze of the far ones, small and low. After sunset a few windows and the door glow a faint red; by day they
 * barely show. Drawn inside the sky (HeroSky), so the hills overlap it; tablet and desktop only, since the adhan card
 * covers the horizon on phones.
 */
export function AlbaseerahSchoolDrawing() {
  return (
    <svg className="sky-school" viewBox="0 0 120 64" aria-hidden="true">
      <g className="school-body">
        <path d="M6 64V30H46V64ZM74 64V30H114V64Z" />
        <path d="M3 31L12 18H40L49 31ZM71 31L80 18H108L117 31Z" />
        <path d="M20 18V13L24 9L28 13V18ZM92 18V13L96 9L100 13V18Z" />
        <path d="M46 64V18H74V64Z" />
        <path d="M44 18V15H49V11H55V7H65V11H71V15H76V18Z" />
      </g>
      <g className="school-light">
        <path d="M55 64V55Q60 48 65 55V64Z" className="school-door" />
        <rect x="51" y="29" width="4.5" height="9" rx="0.6" />
        <rect x="57.75" y="29" width="4.5" height="9" rx="0.6" />
        <rect x="64.5" y="29" width="4.5" height="9" rx="0.6" />
        {/* A few rooms lit, the rest only faintly, as a real building looks after dark. */}
        {[20, 38, 78, 96].map((x) => <rect key={x} x={x} y="38" width="4" height="5" rx="0.5" />)}
        {[11, 29, 87, 105].map((x) => <rect key={x} x={x} y="38" width="4" height="5" rx="0.5" opacity="0.22" />)}
      </g>
    </svg>
  );
}

/**
 * The link over the distant school: the sky itself takes no clicks, so this sits on top, the same size and place.
 * On hover or focus the school's lights come up and a small label fades in above it.
 */
export function AlbaseerahSchool({ locale = "en" }: { locale?: Locale }) {
  const t = locale === "ar" ? ALBASEERAH.ar : ALBASEERAH.en;
  return (
    <AlbaseerahLink className="sky-school-hit" label={`${t.by} ${t.name}`}>
      <span className="school-tip" aria-hidden="true">
        {t.name} <span dir="ltr">↗</span>
      </span>
    </AlbaseerahLink>
  );
}
