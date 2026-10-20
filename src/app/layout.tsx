import type { Metadata } from "next";
import { Alexandria, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const arabic = Alexandria({
  subsets: ["arabic"],
  variable: "--font-arabic",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "دروس المسجد النبوي — Duroos Aggregator",
  description:
    "مجمّع دروس المسجد النبوي وقباء والجامعة الإسلامية: جدول أسبوعي دائم مع تحديثات مباشرة من قنوات تيليجرام العامة",
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className={`${inter.variable} ${arabic.variable}`}>
      <body className="font-arabic">{children}</body>
    </html>
  );
}
