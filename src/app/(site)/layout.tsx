import type { Metadata, Viewport } from "next";
import "../globals.css";
import { fontVariables } from "../fonts";
import { ThemeScript } from "@/components/shell/ThemeScript";
import { LanguageScript } from "@/components/shell/LanguageScript";
import { SiteShell } from "@/components/shell/SiteShell";
import { getDb } from "@/server/db/client";
import { getHelpContact, getWhatsAppUrl } from "@/server/settings";
import { SITE_URL } from "@/lib/site";
import { JsonLd, siteJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "MESH | Medina English Student Hub, Madinah", template: "%s | MESH Madinah" },
  description:
    "The hub for English-speaking students in Madinah: live duroos schedules of the mashayikh, settling-in guides, answers to common questions, and the MESH WhatsApp group.",
  applicationName: "MESH",
  appleWebApp: { capable: true, title: "MESH", statusBarStyle: "default" },
  openGraph: { siteName: "MESH", type: "website", locale: "en_GB" },
  twitter: { card: "summary_large_image" },
  keywords: ["Madinah", "Medina", "Islamic University of Madinah", "IUM", "duroos", "Masjid an-Nabawi", "Arabic in Madinah", "students in Madinah", "living in Madinah", "hijrah to Madinah", "MESH"],
};

export const viewport: Viewport = {
  themeColor: "#f8f6f1",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const db = await getDb();
  const [whatsappUrl, helpContact] = await Promise.all([getWhatsAppUrl(db), getHelpContact(db)]);
  return (
    <html lang="en" dir="ltr" className={fontVariables} suppressHydrationWarning>
      <head>
        <ThemeScript />
        <LanguageScript />
      </head>
      <body>
        <SiteShell locale="en" whatsappUrl={whatsappUrl} helpContact={helpContact}>
          <JsonLd data={siteJsonLd(whatsappUrl)} />
          {children}
        </SiteShell>
      </body>
    </html>
  );
}
