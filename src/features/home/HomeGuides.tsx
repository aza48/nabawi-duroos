"use client";

import Link from "next/link";
import { BookOpen, GraduationCap, KeyRound, Luggage, Plane, Users } from "lucide-react";
import type { GuideStage } from "@/server/db/schema";
import { orderGuides, type WhoProfile } from "./who";
import { useWho } from "./whoStore";

const STAGE_ICON: Record<GuideStage, typeof Plane> = {
  "getting-started": Plane,
  "getting-settled": KeyRound,
  study: GraduationCap,
  family: Users,
  leaving: Luggage,
};

/** What a home guide card needs; the server passes every published guide in its usual order. */
export type HomeGuide = { slug: string; title: string; stage: GuideStage; readingMinutes: number };

export const HOME_GUIDE_COUNT = 8;

/**
 * Every card has a fixed height and its title stops after a set number of lines (five on phones,
 * three or four from tablets up, sized for the longest guide titles), so the grid is the same
 * height whichever guides it shows. Exported for the tests.
 */
export const HOME_CARD_CLASS = "h-[16.25rem] md:h-52 lg:h-[17.75rem] xl:h-[14.55rem]";
export const HOME_TITLE_CLAMP = "line-clamp-7 md:line-clamp-3 lg:line-clamp-6 xl:line-clamp-4";

/**
 * The eight guide cards on the home page. The server renders the usual eight; once the page has
 * loaded, the reader's "Who are you?" answers put the guides that fit them first. Always the same
 * number of cards of the same height, so nothing below moves.
 */
export function HomeGuides({ guides, profile }: { guides: HomeGuide[]; profile?: WhoProfile | null }) {
  const saved = useWho();
  const shown = orderGuides(guides, profile !== undefined ? profile : saved, HOME_GUIDE_COUNT);
  return (
    <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
      {shown.map((g) => {
        const Icon = STAGE_ICON[g.stage] ?? BookOpen;
        return (
          <Link
            key={g.slug}
            href={`/guides/${g.slug}`}
            className={`lift group flex ${HOME_CARD_CLASS} flex-col overflow-hidden rounded-2xl border border-line bg-card p-4 hover:border-primary/50 md:p-5`}
          >
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary transition group-hover:bg-primary group-hover:text-primary-ink">
              <Icon size={20} />
            </span>
            <span title={g.title} className={`mt-3 ${HOME_TITLE_CLAMP} font-heading text-[15px] font-semibold leading-snug md:mt-4 md:text-lg`}>{g.title}</span>
            <span className="mt-auto shrink-0 pt-3 text-xs text-muted">{g.readingMinutes} min read</span>
          </Link>
        );
      })}
    </div>
  );
}
