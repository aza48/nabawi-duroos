"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useMeshPrefs } from "@/lib/mesh-i18n";

function Lattice({ stroke, idSuffix }: { stroke: string; idSuffix: string }) {
  const id = `mesh-lattice-${idSuffix}`;
  return (
    <svg className="mesh-hero-pattern-svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id={id} width="144" height="144" patternUnits="userSpaceOnUse">
          <g fill="none" stroke={stroke} strokeWidth="1.6">
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
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

export default function MeshHero() {
  const { t } = useMeshPrefs();
  const videoRef = useRef<HTMLVideoElement>(null);
  const startedRef = useRef(false);
  const [phase, setPhase] = useState<"video" | "pattern">("video");
  const [ramp, setRamp] = useState(false);

  const tryPlay = () => {
    const v = videoRef.current;
    if (!v) return;
    // Never treat a rejected play() as "skip the video": iOS Low Power
    // Mode and slow loads reject it even though a retry or a tap works.
    v.play().catch(() => {});
  };

  useEffect(() => {
    if (phase === "video") {
      // Logo + tint grow gradually across the whole video, then the
      // lattice takes over cleanly once both are fully in.
      setRamp(false);
      startedRef.current = false;
      tryPlay();
      const a = setTimeout(() => setRamp(true), 90);
      // If the browser blocks autoplay (e.g. iOS Low Power Mode), start
      // the video on the first touch/click anywhere instead.
      const kick = () => tryPlay();
      window.addEventListener("pointerdown", kick);
      window.addEventListener("touchstart", kick, { passive: true });
      // Last resort: if playback somehow never began, don't sit forever.
      const fallback = setTimeout(() => {
        if (!startedRef.current) setPhase("pattern");
      }, 12000);
      return () => {
        clearTimeout(a);
        clearTimeout(fallback);
        window.removeEventListener("pointerdown", kick);
        window.removeEventListener("touchstart", kick);
      };
    }
    setRamp(true);
    const id = setTimeout(() => setPhase("video"), 8000);
    return () => clearTimeout(id);
  }, [phase]);

  return (
    <section className="mesh-hero" data-phase={phase} data-ramp={ramp ? "on" : "off"} aria-label="MESH — Medina English Student Hub">
      <video
        ref={videoRef}
        className="mesh-hero-video"
        src="/mesh-hero.mp4"
        poster="/mesh-hero-poster.jpg"
        autoPlay
        muted
        playsInline
        preload="auto"
        onCanPlay={tryPlay}
        onPlaying={() => { startedRef.current = true; }}
        onEnded={() => setPhase("pattern")}
        aria-hidden="true"
      />
      <div className="mesh-hero-pattern" aria-hidden="true">
        <Lattice stroke="#8E8E8E" idSuffix="grey" />
        <div className="mesh-hero-pattern-white">
          <Lattice stroke="#FFFFFF" idSuffix="white" />
        </div>
      </div>
      <div className="mesh-hero-glass" aria-hidden="true" />
      <div className="mesh-hero-inner">
        <div className="mesh-hero-word" aria-hidden="true">MESH</div>
        <div className="mesh-hero-actions">
          <Link href="/mesh/browse" className="mesh-btn mesh-hero-btn-gold mesh-focus">{t("hero.browse")}</Link>
          <Link href="/mesh/ask" className="mesh-btn mesh-hero-btn-glass mesh-focus">{t("hero.ask")}</Link>
        </div>
      </div>
    </section>
  );
}
