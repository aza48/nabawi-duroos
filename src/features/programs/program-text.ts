import type { Program } from "@/content/programs";
import { PROGRAMS_AR, type ProgramAr } from "@/content/programs-ar";
import type { Locale } from "@/lib/locale";

export type LocalProgram = Program & { inArabic: boolean };

const same = (en?: unknown[], ar?: unknown[]) => (en?.length ?? 0) === (ar?.length ?? 0);

/** Overlay a list only when the Arabic has one line for each English line, so a stale translation never drops or shifts lines. */
const list = (en: string[] | undefined, ar: string[] | undefined) => (en && ar && same(en, ar) ? ar : en);

/**
 * A programme in the page's language. On Arabic pages every field with a translation in `programs-ar.ts` is shown in
 * Arabic; a programme with no translation keeps its English (and the page keeps its English note).
 */
export function localProgram(p: Program, locale: Locale, table: Record<string, ProgramAr> = PROGRAMS_AR): LocalProgram {
  const a = locale === "ar" ? table[p.slug] : undefined;
  if (!a) return { ...p, inArabic: false };
  return {
    ...p,
    inArabic: true,
    tagline: a.tagline || p.tagline,
    price: a.price || p.price,
    where: a.where || p.where,
    nextIntake: p.nextIntake ? a.nextIntake || p.nextIntake : undefined,
    overview: list(p.overview, a.overview) ?? p.overview,
    levels: list(p.levels, a.levels),
    included: list(p.included, a.included),
    steps: list(p.steps, a.steps),
    contact: p.contact?.map((c, i) => ({ ...c, label: same(p.contact, a.contactLabels) ? a.contactLabels![i] : c.label })),
    videos: p.videos?.map((v, i) => ({ ...v, title: same(p.videos, a.videoTitles) ? a.videoTitles![i] : v.title })),
  };
}
