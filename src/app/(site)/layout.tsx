import type { Metadata, Viewport } from "next";
import "../globals.css";
import { fontVariables } from "../fonts";
import { ThemeScript } from "@/components/shell/ThemeScript";
import { SiteShell } from "@/components/shell/SiteShell";
import { getDb } from "@/server/db/client";
import { getWhatsAppUrl } from "@/server/settings";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "MESH | Medina English Student Hub", template: "%s · MESH" },
  description:
    "The hub for English-speaking students in Madinah: live duroos schedules of the mashayikh, settling-in guides, answers to common questions, and the MESH WhatsApp group.",
  applicationName: "MESH",
  appleWebApp: { capable: true, title: "MESH", statusBarStyle: "default" },
  openGraph: { siteName: "MESH", type: "website", locale: "en_GB" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f1e7" },
    { media: "(prefers-color-scheme: dark)", color: "#0c1714" },
  ],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const whatsappUrl = await getWhatsAppUrl(await getDb());
  return (
    <html lang="en" dir="ltr" className={fontVariables} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body>
        <SiteShell locale="en" whatsappUrl={whatsappUrl}>
          {children}
        </SiteShell>
      </body>
    </html>
  );
}
