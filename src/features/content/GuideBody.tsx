"use client";

import { useEffect, useRef, useState } from "react";
import { RotateCcw } from "lucide-react";
import { arCount, arDigits } from "@/lib/arabic-count";

const key = (slug: string) => `mesh-guide-${slug}`;

function readDone(slug: string): number[] {
  try {
    return JSON.parse(localStorage.getItem(key(slug)) ?? "[]");
  } catch {
    return [];
  }
}

/**
 * Renders an enhanced guide: numbered steps become tick-boxes (saved on this device),
 * with a progress bar, and video slots become tap-to-play YouTube players.
 */
const PROGRESS = {
  en: { allDone: "All steps done. Barakallahu feek.", done: (d: number, n: number) => `${d} of ${n} ${n === 1 ? "step" : "steps"} done`, again: "Start again", hint: "Tap a step to tick it off. It's saved on this phone.", tick: (n: number) => `Step ${n} done` },
  ar: { allDone: "أتممت كل الخطوات. بارك الله فيك.", done: (d: number, n: number) => `${arDigits(d)} من ${arCount(n, "step", { case: "gen" })}`, again: "ابدأ من جديد", hint: "اضغط على خطوة لتعليمها. يُحفظ ذلك على هذا الهاتف.", tick: (n: number) => `أتممت الخطوة ${arDigits(n)}` },
};

export function GuideBody({ html, slug, steps, locale = "en" }: { html: string; slug: string; steps: number; locale?: "en" | "ar" }) {
  const p = PROGRESS[locale];
  const ref = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState<number[]>([]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const saved = new Set(readDone(slug));
    setDone([...saved]);

    const items = el.querySelectorAll<HTMLLIElement>("li[data-step]");
    items.forEach((li) => {
      const n = Number(li.dataset.step);
      li.classList.toggle("is-done", saved.has(n));
      // The step stays a plain list item (it can hold links); a real button over the tick circle
      // carries the state for keyboards and screen readers. A tap anywhere on the step still works.
      let tick = li.querySelector<HTMLButtonElement>(":scope > button.step-tick");
      if (!tick) {
        tick = document.createElement("button");
        tick.type = "button";
        tick.className = "step-tick";
        li.prepend(tick);
      }
      tick.setAttribute("aria-label", p.tick(n + 1));
      tick.setAttribute("aria-pressed", String(saved.has(n)));
      const toggle = (e: Event) => {
        if ((e.target as HTMLElement).closest("a")) return;
        const now = new Set(readDone(slug));
        if (now.has(n)) now.delete(n);
        else now.add(n);
        try {
          localStorage.setItem(key(slug), JSON.stringify([...now]));
        } catch {}
        li.classList.toggle("is-done", now.has(n));
        tick.setAttribute("aria-pressed", String(now.has(n)));
        setDone([...now]);
      };
      li.onclick = toggle;
    });

    el.querySelectorAll<HTMLDivElement>(".video-slot").forEach((slot) => {
      if (slot.dataset.ready) return;
      slot.dataset.ready = "1";
      const id = slot.dataset.youtube!;
      const title = slot.dataset.title ?? "Video";
      const btn = document.createElement("button");
      btn.type = "button";
      btn.setAttribute("aria-label", `Play: ${title}`);
      btn.innerHTML = `<img src="https://i.ytimg.com/vi/${id}/hqdefault.jpg" alt="" loading="lazy"><span class="play"></span>`;
      const cap = document.createElement("p");
      cap.textContent = title;
      btn.onclick = () => {
        const f = document.createElement("iframe");
        f.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
        f.title = title;
        f.allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture";
        f.allowFullscreen = true;
        btn.replaceWith(f);
      };
      slot.append(btn, cap);
    });
  }, [html, slug]);

  const reset = () => {
    try {
      localStorage.removeItem(key(slug));
    } catch {}
    ref.current?.querySelectorAll("li[data-step]").forEach((li) => {
      li.classList.remove("is-done");
      li.setAttribute("aria-checked", "false");
    });
    setDone([]);
  };

  const pct = steps ? Math.round((done.length / steps) * 100) : 0;
  return (
    <>
      {steps > 0 && (
        <div className="mb-6 rounded-2xl border border-line bg-card px-4 py-3 md:px-5">
          <div className="flex items-center justify-between gap-3 text-sm">
            <span className="font-semibold">
              {done.length === steps ? p.allDone : p.done(done.length, steps)}
            </span>
            {done.length > 0 && (
              <button type="button" onClick={reset} className="flex items-center gap-1 text-muted hover:text-ink">
                <RotateCcw size={14} /> {p.again}
              </button>
            )}
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-bg-2">
            <div className="h-full rounded-full bg-primary transition-[width] duration-500" style={{ width: `${pct}%` }} />
          </div>
          {done.length === 0 && <p className="mt-1.5 text-xs text-muted">{p.hint}</p>}
        </div>
      )}
      <div ref={ref} className="article guide text-[1.04rem]" dangerouslySetInnerHTML={{ __html: html }} />
    </>
  );
}
