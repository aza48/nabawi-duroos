"use client";

import ReactDOM from "react-dom";
import { AR_FONT_PRELOADS } from "./arabic-fonts";

/** Preloads the Arabic heading and body fonts on Arabic pages only. React adds crossorigin, which fonts need. */
export function ArabicFontPreload() {
  for (const href of AR_FONT_PRELOADS) ReactDOM.preload(href, { as: "font", type: "font/woff2" });
  return null;
}
