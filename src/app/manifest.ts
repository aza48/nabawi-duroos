import type { MetadataRoute } from "next";

/** The installed app: the MESH gate as its icon (plain, maskable for Android's shapes, monochrome for themed icons). */
export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "MESH: Medina English Student Hub",
    short_name: "MESH",
    description: "Live duroos schedules, guides and answers for English-speaking students in Madinah.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#f8f6f1",
    theme_color: "#145c3e",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/maskable-192.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
      { src: "/icons/maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
      { src: "/icons/monochrome-512.png", sizes: "512x512", type: "image/png", purpose: "monochrome" },
    ],
    screenshots: [
      { src: "/screenshots/home-narrow.png", sizes: "780x1688", type: "image/png", form_factor: "narrow", label: "Today's duroos and the next adhan" },
      { src: "/screenshots/home-wide.png", sizes: "1440x900", type: "image/png", form_factor: "wide", label: "Today's duroos, key dates and guides" },
    ],
    shortcuts: [
      { name: "Today's duroos", url: "/duroos" },
      { name: "Weekly schedule", url: "/duroos/schedule" },
      { name: "Guides", url: "/guides" },
    ],
  };
}
