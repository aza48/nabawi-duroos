"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Expand, MessageCircleQuestion, X } from "lucide-react";
import type { Locale } from "@/lib/locale";
import { MeshaykhName } from "./MeshaykhName";

// The chat code loads only when someone opens it, so it never slows a page down.
const AssistantPanel = dynamic(() => import("./AssistantPanel").then((m) => m.AssistantPanel), { ssr: false });

/** The "Ask the MESHaykh" button on every public page, opening the assistant in a dialog. */
export function AssistantLauncher({ locale = "en" }: { locale?: Locale }) {
  const ar = locale === "ar";
  const path = usePathname() ?? "";
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement>(null);
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    const onClose = () => opener.current?.focus();
    d.addEventListener("close", onClose);
    return () => d.removeEventListener("close", onClose);
  }, []);

  if (/^\/(ar\/)?assistant$/.test(path)) return null;

  const open = () => {
    setOpened(true);
    dialog.current?.showModal();
  };

  return (
    <>
      <button
        ref={opener}
        type="button"
        onClick={open}
        className="fixed end-4 bottom-[calc(env(safe-area-inset-bottom)+5.25rem)] z-40 inline-flex min-h-12 items-center gap-2 rounded-full bg-brand px-4 font-semibold text-white shadow-lg ring-1 ring-black/5 transition hover:brightness-110 md:bottom-6"
        aria-haspopup="dialog"
      >
        <MessageCircleQuestion size={20} className="text-gold-bright" />
        <span>{ar ? "مساعد MESH" : <MeshaykhName />}</span>
      </button>
      <dialog
        ref={dialog}
        aria-label={ar ? "مساعد MESH" : "Ask the MESHaykh, MESH's assistant"}
        onClick={(e) => { if (e.target === e.currentTarget) e.currentTarget.close(); }}
        className="m-0 h-[100dvh] max-h-none w-full max-w-none bg-transparent p-0 backdrop:bg-black/40 sm:m-auto sm:h-[min(44rem,90vh)] sm:max-w-xl sm:rounded-3xl"
      >
        <div className="flex h-full flex-col overflow-hidden bg-bg sm:rounded-3xl sm:border sm:border-line" dir={ar ? "rtl" : "ltr"}>
          <div className="lattice flex items-center justify-between gap-3 bg-brand px-4 py-3 text-white">
            <p className="flex items-center gap-2 font-heading text-lg font-semibold">
              <MessageCircleQuestion size={20} className="text-gold-bright" /> {ar ? "مساعد MESH" : <MeshaykhName />}
            </p>
            <span className="flex items-center gap-1">
              <Link href={ar ? "/ar/assistant" : "/assistant"} onClick={() => dialog.current?.close()} aria-label={ar ? "افتح في صفحة كاملة" : "Open full page"} className="grid size-10 place-items-center rounded-full hover:bg-white/10">
                <Expand size={17} />
              </Link>
              <button type="button" onClick={() => dialog.current?.close()} aria-label={ar ? "إغلاق" : "Close"} className="grid size-10 place-items-center rounded-full hover:bg-white/10">
                <X size={19} />
              </button>
            </span>
          </div>
          <div className="min-h-0 flex-1">{opened && <AssistantPanel locale={locale} autoFocus compact />}</div>
        </div>
      </dialog>
    </>
  );
}
