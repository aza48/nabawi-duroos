import { AlertTriangle, Lightbulb } from "lucide-react";

/** Small pieces shared by the server-rendered guide and its client islands (this module has no "use client", so both may import it). */

export const sar = (n: number) => `${n.toLocaleString("en-GB")} SAR`;

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
