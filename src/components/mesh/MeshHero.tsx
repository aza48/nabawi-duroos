"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useMeshPrefs } from "@/lib/mesh-i18n";

const TAG_WORDS = ["MEDINA", "ENGLISH", "STUDENT", "HUB"];

function PatternSvg() {
  return (
    <svg className="mesh-hero-pattern-svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id="mesh-lattice" width="144" height="144" patternUnits="userSpaceOnUse">
          <rect width="144" height="144" fill="#F2EFE7" />
          <g fill="none" stroke="#B9C2B0" strokeWidth="1.6">
            {/* eight-point star, centre */}
            <rect x="44" y="44" width="56" height="56" />
            <rect x="44" y="44" width="56" height="56" transform="rotate(45 72 72)" />
            {/* quarter stars at corners */}
            <rect x="-28" y="-28" width="56" height="56" />
            <rect x="-28" y="-28" width="56" height="56" transform="rotate(45 0 0)" />
            <rect x="116" y="-28" width="56" height="56" />
            <rect x="116" y="-28" width="56" height="56" transform="rotate(45 144 0)" />
            <rect x="-28" y="116" width="56" height="56" />
            <rect x="-28" y="116" width="56" height="56" transform="rotate(45 0 144)" />
            <rect x="116" y="116" width="56" height="56" />
            <rect x="116" y="116" width="56" height="56" transform="rotate(45 144 144)" />
            {/* small diamonds at edge midpoints */}
            <rect x="62" y="-10" width="20" height="20" transform="rotate(45 72 0)" />
            <rect x="62" y="134" width="20" height="20" transform="rotate(45 72 144)" />
            <rect x="-10" y="62" width="20" height="20" transform="rotate(45 0 72)" />
            <rect x="134" y="62" width="20" height="20" transform="rotate(45 144 72)" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#mesh-lattice)" />
    </svg>
  );
}

export default function MeshHero() {
  const { t } = useMeshPrefs();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [phase, setPhase] = useState<"video" | "pattern">("video");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setPhase("pattern");
  }, []);

  useEffect(() => {
    if (phase === "video") {
      videoRef.current?.play().catch(() => setPhase("pattern"));
      return;
    }
    const id = setTimeout(() => setPhase("video"), 8000);
    return () => clearTimeout(id);
  }, [phase]);

  return (
    <section className="mesh-hero" data-phase={phase} aria-label="MESH — Medina English Student Hub">
      <video
        ref={videoRef}
        className="mesh-hero-video"
        src="/mesh-hero.mp4"
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={() => setPhase("pattern")}
        aria-hidden="true"
      />
      <div className="mesh-hero-pattern" aria-hidden="true">
        <PatternSvg />
        <div className="mesh-hero-sheen" />
      </div>
      <div className="mesh-hero-glass" aria-hidden="true" />
      <div className="mesh-hero-inner">
        <p className="mesh-hero-greeting" lang="ar" dir="rtl">السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ ٱللَّهِ وَبَرَكَاتُهُ</p>
        <div className="mesh-hero-word" aria-hidden="true">MESH</div>
        <div className="mesh-hero-bar" aria-hidden="true" />
        <p className="mesh-hero-tag" aria-label="Medina English Student Hub">
          {TAG_WORDS.map((w, i) => (
            <span key={w} className="mesh-hero-tag-word">
              <span className="mesh-hero-tag-gold">{w[0]}</span>{w.slice(1)}
              {i < TAG_WORDS.length - 1 && <span className="mesh-hero-tag-dot" aria-hidden="true">·</span>}
            </span>
          ))}
        </p>
        <div className="mesh-hero-actions">
          <Link href="/mesh/browse" className="mesh-btn mesh-hero-btn-gold mesh-focus">{t("hero.browse")}</Link>
          <Link href="/mesh/ask" className="mesh-btn mesh-hero-btn-glass mesh-focus">{t("hero.ask")}</Link>
        </div>
      </div>
    </section>
  );
}
