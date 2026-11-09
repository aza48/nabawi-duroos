/**
 * Picks the company guide's content for a language. content-ar.ts mirrors content.ts export for
 * export; the type below checks that at compile time, so a missing key or a changed shape fails tsc.
 */

import type { Locale } from "@/lib/locale";
import * as EN from "./content";
import * as AR from "./content-ar";

/** The same shape with literal strings and numbers widened, so Arabic text can fill an English slot. */
type Widen<T> = T extends string
  ? string
  : T extends number
    ? number
    : T extends boolean
      ? boolean
      : T extends Date
        ? Date
        : T extends readonly (infer U)[]
          ? Widen<U>[]
          : T extends object
            ? { [K in keyof T]: Widen<T[K]> }
            : T;

export type CompanyContent = { [K in keyof typeof EN]: Widen<(typeof EN)[K]> };

const CONTENT: Record<Locale, CompanyContent> = { en: EN, ar: AR };

export function companyContent(locale: Locale = "en"): CompanyContent {
  return CONTENT[locale];
}

/** The date the guide was last checked, in the reader's language ("٨ نوفمبر ٢٠٢٦" on Arabic). */
export function checkedOn(locale: Locale = "en"): string {
  if (locale !== "ar") return EN.CHECKED;
  return new Intl.DateTimeFormat("ar-SA-u-ca-gregory-nu-arab", { day: "numeric", month: "long", year: "numeric" }).format(new Date(EN.CHECKED));
}
