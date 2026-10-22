import type { Metadata } from "next";
import { Alexandria, Inter } from "next/font/google";
import "../globals.css";
import "./mesh.css";
import MeshShell from "@/components/mesh/MeshShell";
import { MeshPrefsProvider, MeshRoot } from "@/lib/mesh-i18n";

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
  title: "Medina Hub — Medinah English Students Hub",
  description: "Practical answers, local knowledge, and advice from students in Madinah.",
  manifest: "/manifest.webmanifest",
};

export default function MeshRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      dir="ltr"
      suppressHydrationWarning
      className={`${inter.variable} ${arabic.variable}`}
    >
      <body>
        <MeshPrefsProvider>
          <MeshRoot>
            <MeshShell>{children}</MeshShell>
          </MeshRoot>
        </MeshPrefsProvider>
      </body>
    </html>
  );
}
