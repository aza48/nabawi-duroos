import type { Metadata } from "next";
import "./globals.css";
import { fontVariables } from "./fonts";
import { ThemeScript } from "@/components/shell/ThemeScript";

export const metadata: Metadata = { title: "Page not found · MESH" };

export default function GlobalNotFound() {
  return (
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body>
        <main className="mx-auto flex min-h-dvh max-w-md flex-col items-center justify-center gap-4 px-6 text-center">
          <p className="font-heading text-5xl font-semibold text-primary">MESH</p>
          <h1 className="text-2xl font-semibold">This page is not on MESH</h1>
          <p className="text-muted">Open one of the sections below.</p>
          <div className="flex flex-wrap justify-center gap-2">
            <a href="/" className="rounded-full bg-primary px-5 py-2.5 font-semibold text-primary-ink">Home</a>
            <a href="/duroos" className="rounded-full border border-line px-5 py-2.5 font-semibold">Today&apos;s duroos</a>
          </div>
        </main>
      </body>
    </html>
  );
}
