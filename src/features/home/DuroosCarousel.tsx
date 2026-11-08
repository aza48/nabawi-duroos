"use client";

import { useRef, useState, type ReactNode } from "react";

/**
 * A horizontal, swipeable rail of dars cards with progress dots. Scrolling follows the
 * finger or trackpad natively; nothing moves on its own. When a prayer has two cards or
 * fewer they sit side by side on wide screens (no rail); three or more always scroll.
 */
export function DuroosCarousel({ many, items }: { many: boolean; items: ReactNode[] }) {
  const count = items.length;
  const railRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);

  const onScroll = () => {
    const el = railRef.current;
    if (!el || count < 2) return;
    const step = el.scrollWidth / count;
    setActive(Math.min(count - 1, Math.max(0, Math.round(Math.abs(el.scrollLeft) / step))));
  };

  const slot =
    count === 1
      ? "w-full shrink-0"
      : many
      ? "min-w-0 snap-start shrink-0 basis-[86%] sm:basis-[58%] md:basis-[64%]"
      : "min-w-0 snap-start shrink-0 basis-[86%] sm:basis-[58%] md:basis-[calc(50%-0.5rem)]";

  const rail =
    "flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1 md:gap-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden";

  return (
    <div>
      <div ref={railRef} onScroll={onScroll} className={rail}>
        {items.map((node, i) => (
          <div key={i} className={slot}>
            {node}
          </div>
        ))}
      </div>
      {count > 1 && (
        <div aria-hidden="true" className={`mt-3 items-center justify-center gap-1.5 ${many ? "flex" : "flex md:hidden"}`}>
          {items.map((_, i) => (
            <span key={i} className={`h-1.5 rounded-full transition-all ${i === active ? "w-5 bg-primary" : "w-1.5 bg-line"}`} />
          ))}
        </div>
      )}
    </div>
  );
}
