/**
 * The quiet credit to MESH's parent organisation, Albaseerah International Institute (albaseerah.org).
 * MESH keeps its own name and look; this only says who brings it. It uses the one Albaseerah mark, the crest that
 * albaseerah.org shows (the white-bordered version, so it also reads on the deep green). The crest carries Albaseerah's
 * maroon, and a short maroon tick on a hairline answers MESH's gold bar, so the two read as one family without merging.
 */
import type { Locale } from "@/lib/locale";

export const ALBASEERAH = {
  url: "https://albaseerah.org",
  en: { by: "Brought to you by", name: "Albaseerah International Institute" },
  ar: { by: "يقدّمه لكم", name: "معهد البصيرة العالمي للدراسات الإسلامية" },
} as const;

function Crest({ className = "" }: { className?: string }) {
  return (
    <picture className="shrink-0">
      <source srcSet="/images/albaseerah/crest.webp" type="image/webp" />
      {/* eslint-disable-next-line @next/next/no-img-element -- a 19 KB static mark; next/image adds nothing here */}
      <img src="/images/albaseerah/crest.png" alt="" width={215} height={192} loading="lazy" decoding="async" className={`w-auto ${className}`} />
    </picture>
  );
}

/** Footer lockup, on the deep green: a hairline with a maroon tick, the emblem, and two small lines of text. */
export function AlbaseerahFooterCredit({ locale = "en" }: { locale?: Locale }) {
  const ar = locale === "ar";
  const t = ar ? ALBASEERAH.ar : ALBASEERAH.en;
  return (
    <div className="abs-rule mt-7 max-w-xs pt-5">
      <a href={ALBASEERAH.url} target="_blank" rel="noopener" className="group flex items-center gap-3.5" aria-label={`${t.by} ${t.name}`}>
        <Crest className="h-11 transition duration-300 group-hover:-translate-y-px" />
        <span className="min-w-0">
          <span className={`block text-white/55 ${ar ? "text-xs" : "text-[10px] font-semibold uppercase tracking-[0.2em]"}`}>{t.by}</span>
          <span className={`mt-1 block font-medium leading-snug text-white/90 transition group-hover:text-white ${ar ? "text-sm" : "text-[13.5px]"}`}>{t.name}</span>
        </span>
      </a>
    </div>
  );
}

/** One line for the About text on light pages: the emblem and a sentence, the name in Albaseerah maroon. */
export function AlbaseerahAboutCredit({ locale = "en", className = "" }: { locale?: Locale; className?: string }) {
  const ar = locale === "ar";
  return (
    <p className={`flex items-center gap-3 text-sm leading-relaxed text-muted ${className}`}>
      <Crest className="h-10" />
      <span>
        {ar ? "يقدّم لكم MESH " : "MESH is brought to you by "}
        <a href={ALBASEERAH.url} target="_blank" rel="noopener" className="font-semibold text-abs underline-offset-2 hover:underline">
          {ar ? ALBASEERAH.ar.name : ALBASEERAH.en.name}
        </a>
        .
      </span>
    </p>
  );
}
