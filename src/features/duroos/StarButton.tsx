"use client";

import { Star } from "lucide-react";
import type { Locale } from "@/lib/locale";
import { useStarred } from "./useStarred";

/**
 * Star a dars for "My duroos". `band` is the labelled button on the green lesson header;
 * `icon` is the 40 px star beside each schedule row.
 */
export function StarButton({ slug, title, locale, variant = "icon" }: { slug: string; title: string; locale: Locale; variant?: "band" | "icon" }) {
  const ar = locale === "ar";
  const { has, toggle } = useStarred();
  const on = has(slug);
  // The icon keeps one name and says on or off through aria-pressed; the band button's own text changes instead.
  const label = ar ? `«${title}» في دروسي` : `${title} in My duroos`;

  if (variant === "band")
    return (
      <button
        type="button"
        onClick={() => toggle(slug)}
        className={`inline-flex min-h-10 items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ring-1 transition ${
          on ? "bg-gold-bright text-[#1f1a0a] ring-gold-bright" : "bg-white/10 text-white ring-white/25 hover:bg-white/15"
        }`}
      >
        <Star size={16} className={on ? "fill-current" : ""} aria-hidden />
        {on ? (ar ? "في دروسي" : "In My duroos") : ar ? "أضف إلى دروسي" : "Add to My duroos"}
      </button>
    );

  return (
    <button
      type="button"
      onClick={() => toggle(slug)}
      aria-pressed={on}
      aria-label={label}
      title={label}
      className={`grid size-10 shrink-0 place-items-center rounded-full transition ${on ? "text-gold" : "text-muted hover:bg-bg-2 hover:text-ink"}`}
    >
      <Star size={18} className={on ? "fill-current" : ""} aria-hidden />
    </button>
  );
}
