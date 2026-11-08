import type { AiParse } from "@/server/watcher/ai";

const KIND: Record<string, string> = {
  cancelled: "lesson cancelled",
  postponed: "lesson postponed",
  moved: "time or place changed",
  resumed: "lesson resumes",
  guest: "guest teacher",
  new_book: "new book starting",
  book_finished: "book finished",
  note: "a note about a lesson",
  lecture: "one-off lecture or event",
  other: "not about a lesson",
};
const day = (iso: string) => new Intl.DateTimeFormat("en-GB", { weekday: "short", day: "numeric", month: "short", timeZone: "Asia/Riyadh" }).format(new Date(`${iso}T12:00:00+03:00`));
const sure = (c: number) => (c >= 0.85 ? "Very likely" : c >= 0.6 ? "Likely" : "Unsure, please check");

/** The watcher's reading in plain words for an admin: no slugs, no percentages. */
export function plainReading(r: AiParse, book?: string): string {
  const parts = [`Looks like: ${KIND[r.kind] ?? r.kind.replace(/_/g, " ")}`];
  if (book) parts.push(book);
  if (r.dates.length) parts.push(r.dates.map(day).join(", "));
  parts.push(sure(r.confidence));
  return parts.join(". ") + "." + (r.note_en ? ` Note for the site: "${r.note_en}"` : "");
}
