import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "MESH: Medina English Student Hub",
    short_name: "MESH",
    description: "Live duroos schedules, guides and answers for English-speaking students in Madinah.",
    start_url: "/",
    display: "standalone",
    background_color: "#f8f6f1",
    theme_color: "#145c3e",
    icons: [
      { src: "/icon", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
    shortcuts: [
      { name: "Today's duroos", url: "/duroos" },
      { name: "Weekly schedule", url: "/duroos/schedule" },
    ],
  };
}
