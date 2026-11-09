/** Text size: A, A+ and A++ scale the root font size, so every rem-based size on the page grows with it. */
export const TEXT_SIZES = ["md", "lg", "xl"] as const;
export type TextSize = (typeof TEXT_SIZES)[number];

/** Saved on the phone only (localStorage), so the server never needs it and pages stay cached. */
export const TEXT_SIZE_KEY = "mesh-text";

export function parseTextSize(v: unknown): TextSize {
  return v === "lg" || v === "xl" ? v : "md";
}

/**
 * Runs in <head> before the first paint: applies the saved theme and text size, so neither ever flashes.
 * Keep it tiny and dependency free; it is inlined into every page.
 */
export const HEAD_SCRIPT = `(function(){try{var d=document.documentElement,t=localStorage.getItem("mesh-theme");if(t==="light"||t==="dark")d.setAttribute("data-theme",t);var s=localStorage.getItem("${TEXT_SIZE_KEY}");if(s==="lg"||s==="xl")d.setAttribute("data-text",s)}catch(e){}})()`;
