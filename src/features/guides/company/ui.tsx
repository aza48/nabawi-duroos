import { AlertTriangle, Lightbulb } from "lucide-react";
import { arDigits } from "@/lib/arabic-count";
import type { Locale } from "@/lib/locale";

/** Small pieces shared by the server-rendered guide and its client islands (this module has no "use client", so both may import it). */

/** A whole number with thousands separators: "1,500" in English, "١٬٥٠٠" in Arabic. Written by hand so server and browser agree. */
export const num = (n: number, locale: Locale = "en") => {
  const en = n.toLocaleString("en-GB");
  return locale === "ar" ? arDigits(en).replace(/,/g, "٬") : en;
};

/** An amount in riyals: "1,500 SAR" in English, "١٬٥٠٠ ريال" in Arabic. */
export const sar = (n: number, locale: Locale = "en") => (locale === "ar" ? `${num(n, "ar")} ريال` : `${num(n)} SAR`);

export function Tip({ children, tone = "gold" }: { children: React.ReactNode; tone?: "gold" | "warn" }) {
  const warn = tone === "warn";
  return (
    <div className={`flex gap-3 rounded-2xl p-4 text-sm leading-relaxed ${warn ? "bg-cancel-bg" : "bg-gold-bg"}`}>
      {warn ? <AlertTriangle size={18} className="mt-0.5 shrink-0 text-cancel" /> : <Lightbulb size={18} className="mt-0.5 shrink-0 text-gold" />}
      <div>{children}</div>
    </div>
  );
}

export function Card({ title, children }: { title: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-line bg-card p-4">
      <p className="font-semibold">{title}</p>
      <div className="mt-1.5 text-sm leading-relaxed text-muted">{children}</div>
    </div>
  );
}
