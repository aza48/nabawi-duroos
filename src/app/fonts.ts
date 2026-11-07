import { Alexandria, Amiri, DM_Sans, Fraunces, Inter, Newsreader } from "next/font/google";

const newsreader = Newsreader({ subsets: ["latin"], weight: ["500", "600"], variable: "--font-newsreader", display: "swap" });
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-dm-sans", display: "swap" });
const fraunces = Fraunces({ subsets: ["latin"], weight: ["500", "700"], variable: "--font-fraunces", display: "swap" });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-inter", display: "swap" });
const alexandria = Alexandria({ subsets: ["arabic", "latin"], weight: ["400", "500", "700"], variable: "--font-alexandria", display: "swap" });
const amiri = Amiri({ subsets: ["arabic", "latin"], weight: ["400", "700"], variable: "--font-amiri", display: "swap" });

export const fontVariables = [newsreader, dmSans, fraunces, inter, alexandria, amiri].map((f) => f.variable).join(" ");
