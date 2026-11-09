import { abs } from "@/lib/site";

/** The full address a printed page links back to, and the short form printed under the QR code. */
export function printLink(path: string): { href: string; label: string } {
  const href = abs(path);
  return { href, label: href.replace(/^https?:\/\//, "").replace(/\/$/, "") };
}

export const PRINT_SCAN_LABEL = {
  en: "Scan to open on your phone",
  ar: "امسح للفتح على الجوال",
} as const;
