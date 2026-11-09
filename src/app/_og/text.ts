import { clip } from "@/lib/text";

/** True when the text holds Arabic letters, so it is drawn right to left with the Arabic font. */
export function isArabic(s: string): boolean {
  return /[؀-ۿݐ-ݿࢠ-ࣿﭐ-﷿ﹰ-﻿]/.test(s);
}

/** The words of one line, for drawing Arabic as one block per word in a reversed row. */
export function ogWords(s: string): string[] {
  return s.replace(/\s+/g, " ").trim().split(" ").filter(Boolean);
}

const AR_LETTERS = "\u0610-\u061A\u0620-\u065F\u066E-\u06D3\u06D5-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF\u200C\u200D";
/** A number (kept left to right, with its colon or decimal point), a run of Arabic letters, a Latin word, or one other character. */
const SEGMENT = new RegExp(`[0-9\u0660-\u0669]+(?:[:.,\u066B\u066C][0-9\u0660-\u0669]+)*|[${AR_LETTERS}]+|[A-Za-z0-9]+|.`, "gu");
/** Quotes take their mirrored shape in right to left text. next/og mirrors brackets itself, but not these. */
const MIRROR: Record<string, string> = { "«": "»", "»": "«" };

/**
 * The pieces of one Arabic word, in reading order, for a reversed row: next/og would put a
 * full stop, comma or question mark on the wrong side of the letters ("أ.د." or "الطالب؟").
 */
export function arSegments(word: string): string[] {
  return (word.match(SEGMENT) ?? []).map((x) => MIRROR[x] ?? x);
}

/**
 * The title of a card, cut by character count, with the font size that fits it in three lines.
 * Arabic is kept shorter: its word spacing is uneven on the image, and the page title carries the rest.
 */
export function fitTitle(s: string): { text: string; size: number } {
  const ar = isArabic(s);
  const text = clip(s, ar ? 60 : 96);
  const n = text.length;
  if (ar) return { text, size: n <= 28 ? 68 : n <= 44 ? 60 : 52 };
  return { text, size: n <= 36 ? 76 : n <= 64 ? 64 : 54 };
}

/** A secondary line (shaykh, masjid, role), cut so it stays within two lines. */
export function fitLine(s: string): string {
  return clip(s, isArabic(s) ? 60 : 90);
}
