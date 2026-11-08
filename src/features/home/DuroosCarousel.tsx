"use client";

import { useRef, useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { useNow } from "@/features/duroos/Countdown";
import { phaseAt } from "@/server/duroos/schedule";

export type DuroosSlotMeta = { liveFrom: string; liveUntil: string; adhanAt: string; timeKnown: boolean; off: boolean; phase: "done" | "live" | "upcoming" };

/** Live first, then the soonest upcoming, then the first card; unconfirmed times never lead. */
function pickPriority(meta: DuroosSlotMeta[], now: number | null): number {
  const ph = (m: DuroosSlotMeta) => (now === null ? m.phase : phaseAt(now, new Date(m.liveFrom).getTime(), new Date(m.liveUntil).getTime()));
  const ok = meta.map((m, i) => ({ m, i })).filter(({ m }) => m.timeKnown && !m.off);
  const live = ok.find(({ m }) => ph(m) === "live");
  if (live) return live.i;
  const up = ok.filter(({ m }) => ph(m) === "upcoming").sort((a, b) => a.m.adhanAt.localeCompare(b.m.adhanAt))[0];
  if (up) return up.i;
  return ok[0]?.i ?? 0;
}

/**
 * One prayer's cards. On phones they stack: only the priority card (live, else next) shows,
 * and a button opens the rest in place, with a second button to fold them back. From the
 * md breakpoint up they sit in a swipeable rail with progress dots (two or fewer sit side
 * by side). Nothing moves on its own.
 */
export function DuroosCarousel({
  many,
  items,
  meta,
  moreLabel,
  lessLabel,
}: {
  many: boolean;
  items: ReactNode[];
  meta: DuroosSlotMeta[];
  moreLabel: string;
  lessLabel: string;
}) {
  const count = items.length;
  const now = useNow();
  const priority = pickPriority(meta, now);
  const railRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);

  const onScroll = () => {
    const el = railRef.current;
    if (!el || count < 2) return;
    const step = el.scrollWidth / count;
    setActive(Math.min(count - 1, Math.max(0, Math.round(Math.abs(el.scrollLeft) / step))));
  };

  const wide =
    count === 1
      ? "md:w-full"
      : many
      ? "md:min-w-0 md:snap-start md:basis-[64%]"
      : "md:min-w-0 md:snap-start md:basis-[calc(50%-0.5rem)]";

  const rail =
    "flex flex-col gap-3 md:flex-row md:snap-x md:snap-mandatory md:gap-4 md:overflow-x-auto md:pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden";

  return (
    <div>
      <div ref={railRef} onScroll={onScroll} className={rail}>
        {items.map((node, i) => {
          const hiddenOnPhone = !open && i !== priority;
          return (
            <div
              key={i}
              className={`min-w-0 shrink-0 ${i === priority ? "order-first md:order-none" : ""} ${hiddenOnPhone ? "hidden md:block" : ""} ${wide}`}
            >
              {node}
            </div>
          );
        })}
      </div>

      {count > 1 && (
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl border border-line bg-card py-2.5 text-sm font-semibold text-primary shadow-[var(--shadow)] md:hidden"
        >
          {open ? lessLabel : moreLabel}
          <ChevronDown size={16} className={`transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
      )}

      {count > 1 && many && (
        <div aria-hidden="true" className="mt-3 hidden items-center justify-center gap-1.5 md:flex">
          {items.map((_, i) => (
            <span key={i} className={`h-1.5 rounded-full transition-all ${i === active ? "w-5 bg-primary" : "w-1.5 bg-line"}`} />
          ))}
        </div>
      )}
    </div>
  );
}
