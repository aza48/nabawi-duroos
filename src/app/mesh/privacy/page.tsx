"use client";
import { useMeshPrefs } from "@/lib/mesh-i18n";
export default function Privacy() {
  const { t, content } = useMeshPrefs();
  return <div className="mesh-container" style={{ padding: "32px 20px", maxWidth: 760 }}><h1 style={{ fontSize: 30 }}>{t("privacy.title")}</h1>
    <div style={{ lineHeight: 1.8, fontSize: 15, color: "var(--mesh-text)" }}>
      <p>{content.privacyIntro}</p>
      <ul>{content.privacy.map((p, i) => <li key={i}>{p}</li>)}</ul>
    </div></div>;
}
