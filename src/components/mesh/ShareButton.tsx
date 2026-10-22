"use client";
import { useEffect, useRef, useState } from "react";
import { Check, Link2, Mail, MessageCircle, MoreHorizontal, Send, Share } from "lucide-react";
import { useMeshPrefs } from "@/lib/mesh-i18n";

/** X-style share button for MESH articles.
 *  - variant "bar": pill button (matches the Like pill) opening a share menu —
 *    Copy link, Post on X, WhatsApp, Telegram, Email, and the system share
 *    sheet when the browser offers one.
 *  - variant "icon": compact icon button for article cards (which are Links
 *    and clip overflow, so no menu): system share sheet, else copy-to-clipboard
 *    with a tick confirmation. */

function XLogo({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.9 2H22l-6.8 7.8L23.3 22h-6.3l-4.9-6.4L6.5 22H3.4l7.3-8.3L2.7 2h6.4l4.4 5.9L18.9 2zm-1.1 18h1.7L7.1 3.9H5.3L17.8 20z" />
    </svg>
  );
}

async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(ta);
      return ok;
    } catch {
      return false;
    }
  }
}

export default function ShareButton({
  articleId,
  title,
  text,
  variant = "bar",
}: {
  articleId: number | string;
  title: string;
  text?: string;
  variant?: "bar" | "icon";
}) {
  const { t } = useMeshPrefs();
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const wrapRef = useRef<HTMLSpanElement>(null);

  const url = typeof window !== "undefined" ? `${window.location.origin}/resources/${articleId}` : `/resources/${articleId}`;
  const shareText = text ? `${title} — ${text}` : title;

  useEffect(() => {
    if (!open) return;
    function onDoc(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open ]);

  async function doCopy(e: React.SyntheticEvent) {
    e.preventDefault();
    e.stopPropagation();
    const ok = await copyText(url);
    if (ok) {
      setCopied(true);
      window.setTimeout(() => {
        setCopied(false);
        setOpen(false);
      }, 1000);
    }
  }

  async function doNativeShare(e: React.SyntheticEvent) {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.share({ title, text: shareText, url });
      setOpen(false);
    } catch {
      /* user dismissed the sheet — nothing to do */
    }
  }

  function openExternal(e: React.SyntheticEvent, href: string) {
    e.preventDefault();
    e.stopPropagation();
    window.open(href, "_blank", "noopener,noreferrer");
    setOpen(false);
  }

  if (variant === "icon") {
    return (
      <button
        type="button"
        className="mesh-share-iconbtn mesh-focus"
        aria-label={t("res.share")}
        title={t("res.share")}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (typeof navigator !== "undefined" && "share" in navigator) {
            doNativeShare(e);
          } else {
            doCopy(e);
          }
        }}
      >
        {copied ? <Check size={15} /> : <Share size={15} />}
      </button>
    );
  }

  const canNativeShare = typeof navigator !== "undefined" && "share" in navigator;

  return (
    <span className="mesh-share-wrap" ref={wrapRef}>
      <button
        type="button"
        className="mesh-btn mesh-btn-outline mesh-focus"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen((v) => !v);
        }}
      >
        {copied && !open ? <Check size={16} /> : <Share size={16} />} {copied && !open ? t("res.copied") : t("res.share")}
      </button>
      {open && (
        <span className="mesh-share-menu" role="menu">
          <button type="button" className="mesh-share-item" role="menuitem" onClick={doCopy}>
            {copied ? <Check size={15} /> : <Link2 size={15} />} {copied ? t("res.copied") : t("res.copyLink")}
          </button>
          <button
            type="button"
            className="mesh-share-item"
            role="menuitem"
            onClick={(e) => openExternal(e, `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`)}
          >
            <XLogo /> {t("res.shareX")}
          </button>
          <button
            type="button"
            className="mesh-share-item"
            role="menuitem"
            onClick={(e) => openExternal(e, `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`)}
          >
            <MessageCircle size={15} /> {t("res.shareWhatsApp")}
          </button>
          <button
            type="button"
            className="mesh-share-item"
            role="menuitem"
            onClick={(e) => openExternal(e, `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`)}
          >
            <Send size={15} /> {t("res.shareTelegram")}
          </button>
          <button
            type="button"
            className="mesh-share-item"
            role="menuitem"
            onClick={(e) => openExternal(e, `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${shareText}\n\n${url}`)}`)}
          >
            <Mail size={15} /> {t("res.shareEmail")}
          </button>
          {canNativeShare && (
            <button type="button" className="mesh-share-item" role="menuitem" onClick={doNativeShare}>
              <MoreHorizontal size={15} /> {t("res.shareMore")}
            </button>
          )}
        </span>
      )}
    </span>
  );
}
