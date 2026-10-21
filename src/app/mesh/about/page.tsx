"use client";
import { useMeshPrefs } from "@/lib/mesh-i18n";
export default function About() {
  const { t, content } = useMeshPrefs();
  return <div className="mesh-container" style={{ padding: "40px 0 48px", maxWidth: 760 }}><h1 style={{ fontSize: 30 }}>{t("about.title")}</h1>
    <div style={{ lineHeight: 1.8, fontSize: 15 }}>
      {content.about.map((p, i) => <p key={i}>{i === 0 ? <><strong>MESH — Medinah English Students Hub</strong> — {p.replace("MESH — Medinah English Students Hub — is", "is").replace("MESH — مركز طلاب المدينة الناطقين بالإنجليزية — هو", "هو")}</> : p}</p>)}
      <h2 id="contact" style={{ fontSize: 22, marginTop: 40 }}>{t("about.contact")}</h2>
      <p>{content.aboutContact}</p>
    </div></div>;
}
