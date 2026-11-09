import { revalidatePath } from "next/cache";

/** Refreshes pre-rendered public pages after an edit. Safe outside a Next request (tests, scripts). */
export function refreshPublic(paths: string[]): void {
  for (const p of paths) {
    try {
      revalidatePath(p);
    } catch {
      /* not inside a Next request */
    }
  }
}

/** Every public page that shows duroos data, in both languages. */
export const DUROOS_PATHS = ["/", "/duroos", "/duroos/schedule", "/duroos/updates", "/ar/duroos", "/ar/duroos/schedule", "/ar/duroos/updates"];

/** The same pages plus their Arabic twins ("/" becomes "/ar", "/guides/x" becomes "/ar/guides/x"). */
export function withArabic(paths: string[]): string[] {
  return [...new Set(paths.flatMap((p) => (p.startsWith("/ar") ? [p] : [p, p === "/" ? "/ar" : `/ar${p}`])))];
}
