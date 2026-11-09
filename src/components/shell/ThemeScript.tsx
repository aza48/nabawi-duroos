import { HEAD_SCRIPT } from "./text-size";

/**
 * Sets data-theme and data-text on <html> before the first paint, so there is never a flash of the wrong theme
 * or text size. A plain inline <script> in <head>, as the Next 16 guide "preventing flash before hydration" shows:
 * next/script's beforeInteractive runs it only after the main bundle loads, which is after the first paint.
 */
export function ThemeScript({ nonce }: { nonce?: string }) {
  return <script id="mesh-theme" nonce={nonce} dangerouslySetInnerHTML={{ __html: HEAD_SCRIPT }} />;
}
