"use client";

import { useState } from "react";
import { Play } from "lucide-react";

/** A YouTube video that loads only when tapped (privacy-friendly domain, no tracking before play). */
export function VideoEmbed({ id, title }: { id: string; title: string }) {
  const [playing, setPlaying] = useState(false);
  return (
    <figure className="overflow-hidden rounded-2xl border border-line bg-card">
      <div className="relative aspect-video bg-brand-deep">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 size-full"
          />
        ) : (
          <button type="button" onClick={() => setPlaying(true)} className="group absolute inset-0 size-full" aria-label={`Play: ${title}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" loading="lazy" className="size-full object-cover opacity-90 transition group-hover:opacity-100" />
            <span className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <span className="absolute left-1/2 top-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/95 text-brand shadow-lg transition group-hover:scale-110">
              <Play size={26} className="ms-1" fill="currentColor" />
            </span>
          </button>
        )}
      </div>
      <figcaption className="px-4 py-3 text-sm font-semibold leading-snug">{title}</figcaption>
    </figure>
  );
}
