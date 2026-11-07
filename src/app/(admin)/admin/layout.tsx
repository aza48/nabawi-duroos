import type { Metadata, Viewport } from "next";
import "../../globals.css";
import { fontVariables } from "../../fonts";
import { headers } from "next/headers";
import { ThemeScript } from "@/components/shell/ThemeScript";

export const metadata: Metadata = {
  title: { default: "MESH Admin", template: "%s · MESH Admin" },
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#f6f1e7",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default async function AdminRootLayout({ children }: { children: React.ReactNode }) {
  const nonce = (await headers()).get("x-nonce") ?? undefined;
  return (
    <html lang="en" dir="ltr" className={fontVariables} suppressHydrationWarning>
      <head>
        <ThemeScript nonce={nonce} />
      </head>
      <body>{children}</body>
    </html>
  );
}
