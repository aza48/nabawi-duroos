import type { Metadata, Viewport } from "next";
import "../../globals.css";
import { fontVariables } from "../../fonts";
import { ThemeScript } from "@/components/shell/ThemeScript";

export const metadata: Metadata = {
  title: { default: "MESH Admin", template: "%s · MESH Admin" },
  robots: { index: false, follow: false },
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

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" className={fontVariables} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body>{children}</body>
    </html>
  );
}
