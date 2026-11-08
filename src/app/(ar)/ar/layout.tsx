import type { Metadata, Viewport } from "next";
import "../../globals.css";
import { fontVariables } from "../../fonts";
import { ThemeScript } from "@/components/shell/ThemeScript";
import { SiteShell } from "@/components/shell/SiteShell";
import { getDb } from "@/server/db/client";
import { getHelpContact, getWhatsAppUrl } from "@/server/settings";
import { SITE_URL } from "@/lib/site";
import { htmlAttrs } from "@/lib/locale";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "دروس المدينة | MESH", template: "%s · MESH" },
  description: "جدول دروس المسجد النبوي ومساجد المدينة المنورة، محدّث باستمرار.",
  openGraph: { siteName: "MESH", type: "website", locale: "ar_SA" },
};

export const viewport: Viewport = {
  themeColor: "#f8f6f1",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};


export default async function ArabicLayout({ children }: { children: React.ReactNode }) {
  const db = await getDb();
  const [whatsappUrl, helpContact] = await Promise.all([getWhatsAppUrl(db), getHelpContact(db)]);
  return (
    <html {...htmlAttrs("ar")} className={fontVariables} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body>
        <SiteShell locale="ar" whatsappUrl={whatsappUrl} helpContact={helpContact}>
          {children}
        </SiteShell>
      </body>
    </html>
  );
}
