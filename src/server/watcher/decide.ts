import { addDays, weekdayOf } from "@/lib/time/riyadh";
import type { AiParse } from "./ai";

export const AUTO_CONFIDENCE = 0.85;
export const AUTO_KINDS = ["cancelled", "postponed", "resumed"] as const;
export const AUTO_HORIZON_DAYS = 30;

export type DecideContext = {
  today: string;
  trusted: boolean;
  autoPublish: boolean;
  /** Weekdays of every known lesson, by slug. */
  lessonDays: Record<string, number[]>;
};

export type Decision = { action: "auto" | "suggest" | "ignore"; wouldAuto: boolean; reason: string };

/** The hybrid publishing rule. Anything not clearly safe goes to a human. */
export function decide(p: AiParse, ctx: DecideContext): Decision {
  const relevant = p.about_lesson || p.kind === "lecture" || !!p.lesson_slug;
  if (!relevant) return { action: "ignore", wouldAuto: false, reason: "Not about a lesson" };

  const problems: string[] = [];
  if (!ctx.trusted) problems.push("channel not trusted");
  if (!(AUTO_KINDS as readonly string[]).includes(p.kind)) problems.push(`"${p.kind}" always needs a person`);
  const days = p.lesson_slug ? ctx.lessonDays[p.lesson_slug] : undefined;
  if (!days) problems.push("no matching lesson");
  if (p.dates.length !== 1) problems.push("needs exactly one date");
  const date = p.dates[0];
  if (date && date < ctx.today) problems.push("date has passed");
  if (date && date > addDays(ctx.today, AUTO_HORIZON_DAYS)) problems.push("date is more than 30 days away");
  if (date && days && days.length > 0 && !days.includes(weekdayOf(date))) problems.push("lesson isn't held on that day");
  if (p.confidence < AUTO_CONFIDENCE) problems.push(`confidence ${Math.round(p.confidence * 100)}%`);

  if (problems.length) return { action: "suggest", wouldAuto: false, reason: problems.join("; ") };
  if (!ctx.autoPublish) return { action: "suggest", wouldAuto: true, reason: "Shadow mode: would have published automatically" };
  return { action: "auto", wouldAuto: true, reason: "Trusted channel, clear change" };
}
