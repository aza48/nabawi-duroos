import { Alexandria, Amiri, Bricolage_Grotesque, Instrument_Sans } from "next/font/google";

/** Display: Bricolage Grotesque (warm, slightly quirky). Body: Instrument Sans. Arabic: Amiri for book titles, Alexandria for UI. */
const bricolage = Bricolage_Grotesque({ subsets: ["latin"], weight: ["500", "600", "700", "800"], variable: "--font-display", display: "swap" });
const instrument = Instrument_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-text", display: "swap" });
const alexandria = Alexandria({ subsets: ["arabic", "latin"], weight: ["400", "500", "700"], variable: "--font-alexandria", display: "swap" });
const amiri = Amiri({ subsets: ["arabic", "latin"], weight: ["400", "700"], variable: "--font-amiri", display: "swap" });

export const fontVariables = [bricolage, instrument, alexandria, amiri].map((f) => f.variable).join(" ");
