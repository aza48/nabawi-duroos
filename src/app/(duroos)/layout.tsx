import type { Metadata } from "next";
import { Alexandria, Inter } from "next/font/google";
import "../globals.css";
import { siteUrl } from "@/lib/site";

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
  metadataBase: new URL(siteUrl()),
  title: "دروس المسجد النبوي — Nabawi Duroos",
  description:
    "Lesson schedules (duroos) for Madinah masjids — Masjid Nabawi, Quba and more, with alerts for cancellations and changes.",
  alternates: { canonical: "/duroos" },
  manifest: "/manifest.webmanifest",
  openGraph: {
    title: "دروس المسجد النبوي — Nabawi Duroos",
    description:
      "مجمّع دروس المسجد النبوي وقباء والجامعة الإسلامية: جدول أسبوعي دائم مع تحديثات مباشرة من قنوات تيليجرام العامة",
  },
};

export default function DuroosRootLayout({
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
