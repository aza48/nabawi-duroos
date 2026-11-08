import type { Locale } from "@/lib/locale";

/** "/duroos/..." in English, "/ar/duroos/..." in Arabic. Plain module so both server and client code can use it. */
export function duroosPath(locale: Locale, rest = ""): string {
  return `${locale === "ar" ? "/ar" : ""}/duroos${rest}`;
}
