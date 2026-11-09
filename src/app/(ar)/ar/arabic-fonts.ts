/**
 * The two font files an Arabic page needs before its first paint: Amiri 700 (every Arabic heading is bold Amiri)
 * and Alexandria (body text; a variable font, so one file serves 400, 500 and 700), both in their Arabic range only.
 * next/font does not preload them (src/app/fonts.ts, preload: false) because English pages rarely use them.
 *
 * The names come from the production build. If Google ships a new version of either font, or Next changes how it
 * names files, the names change: tests/ar-font-preload.test.ts then fails against the fresh build. To find the new
 * names, build, then look in .next/static/chunks/*.css for the @font-face of Amiri with font-weight:700 and of
 * Alexandria whose unicode-range starts with U+6?? (the Arabic block). A stale name costs one wasted request and
 * never breaks text, because the stylesheet still loads the real file.
 */
export const AR_FONT_PRELOADS = [
  "/_next/static/media/b4416af7d770c10a-s.1zf0xf1cyi65q.woff2", // Amiri 700, Arabic
  "/_next/static/media/ae8a6189deba2b59-s.29a202atpp3ye.woff2", // Alexandria, Arabic
] as const;
