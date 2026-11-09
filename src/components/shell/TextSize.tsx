"use client";

import { useEffect, useState } from "react";
import { TEXT_SIZES, TEXT_SIZE_KEY, parseTextSize, type TextSize as Size } from "./text-size";

const LABEL: Record<Size, { mark: string; en: string; ar: string }> = {
  md: { mark: "A", en: "Normal text", ar: "خط عادي" },
  lg: { mark: "A+", en: "Larger text", ar: "خط أكبر" },
  xl: { mark: "A++", en: "Largest text", ar: "أكبر خط" },
};

/** A, A+ and A++: sets data-text on <html> (the head script applies it again on every page) and saves it on the phone. */
export function TextSizeControl({ locale = "en", tone = "light" }: { locale?: "en" | "ar"; tone?: "light" | "dark" }) {
  const [size, setSize] = useState<Size | null>(null);
  // Follow the <html> attribute, so every copy of the control (More page, footer) shows the same size.
  useEffect(() => {
    const root = document.documentElement;
    const read = () => setSize(parseTextSize(root.getAttribute("data-text")));
    read();
    const obs = new MutationObserver(read);
    obs.observe(root, { attributes: true, attributeFilter: ["data-text"] });
    return () => obs.disconnect();
  }, []);

  function choose(next: Size) {
    const root = document.documentElement;
    if (next === "md") root.removeAttribute("data-text");
    else root.setAttribute("data-text", next);
    try {
      if (next === "md") localStorage.removeItem(TEXT_SIZE_KEY);
      else localStorage.setItem(TEXT_SIZE_KEY, next);
    } catch {}
    setSize(next);
  }

  const ar = locale === "ar";
  const base = tone === "dark" ? "border-white/20 text-white" : "border-line bg-card text-ink";
  const on = tone === "dark" ? "bg-white text-brand-deep" : "bg-primary text-primary-ink";
  return (
    <div role="group" aria-label={ar ? "حجم الخط" : "Text size"} className={`inline-flex overflow-hidden rounded-full border ${base}`} dir="ltr">
      {TEXT_SIZES.map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => choose(s)}
          aria-pressed={size === s}
          aria-label={ar ? LABEL[s].ar : LABEL[s].en}
          title={ar ? LABEL[s].ar : LABEL[s].en}
          className={`grid h-11 min-w-11 place-items-center px-3 font-semibold transition ${size === s ? on : "hover:bg-black/5"}`}
          style={{ fontSize: s === "md" ? 14 : s === "lg" ? 16 : 18 }}
        >
          {LABEL[s].mark}
        </button>
      ))}
    </div>
  );
}
