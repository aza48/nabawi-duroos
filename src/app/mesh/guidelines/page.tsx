"use client";
import Link from "next/link";
import { useMeshPrefs } from "@/lib/mesh-i18n";
export default function Guidelines() {
  const { t, content } = useMeshPrefs();
  return <div className="mesh-container" style={{ padding: "40px 0 48px", maxWidth: 760 }}><h1 style={{ fontSize: 30 }}>{t("guidelines.title")}</h1>
    <p style={{ color: "var(--mesh-secondary)" }}>{content.guidelinesIntro}</p>
    <ul style={{ lineHeight: 1.9, fontSize: 15 }}>{content.guidelines.map((g, i) => <li key={i}>{g}</li>)}</ul>
    <p style={{ fontSize: 14, color: "var(--mesh-secondary)" }}>{content.guidelinesOutro}</p>
    <p><Link href="/mesh/browse" style={{ color: "var(--mesh-accent)", fontWeight: 600 }}>{t("guidelines.back")}</Link></p></div>;
}
