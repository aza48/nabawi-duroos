import type { Metadata, Viewport } from "next";
import "../../globals.css";
import { fontVariables } from "../../fonts";
import { ThemeScript } from "@/components/shell/ThemeScript";
import { SiteShell } from "@/components/shell/SiteShell";
import { getDb } from "@/server/db/client";
import { getWhatsAppUrl } from "@/server/settings";
import { SITE_URL } from "@/lib/site";
import { htmlAttrs } from "@/lib/locale";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "دروس المدينة | MESH", template: "%s · MESH" },
  description: "جدول دروس المسجد النبوي ومساجد المدينة المنورة، محدّث مباشرة من القنوات الرسمية.",
  openGraph: { siteName: "MESH", type: "website", locale: "ar_SA" },
};

export const viewport: Viewport = {
  themeColor: "#f6f1e7",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};


export default async function ArabicLayout({ children }: { children: React.ReactNode }) {
  const whatsappUrl = await getWhatsAppUrl(await getDb());
  return (
    <html {...htmlAttrs("ar")} className={fontVariables} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body>
        <SiteShell locale="ar" whatsappUrl={whatsappUrl}>
          {children}
        </SiteShell>
      </body>
    </html>
  );
}
