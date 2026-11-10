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

/**
 * The "Ask the MESHaykh" button on every public page, opening the assistant in a dialog. Wherever the bottom menu bar
 * shows (phones and tablets) it is just the round icon, sitting above the bar; on desktop it carries the full name.
 */
export function AssistantLauncher({ locale = "en" }: { locale?: Locale }) {
  const ar = locale === "ar";
  const path = usePathname() ?? "";
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement>(null);
  const [opened, setOpened] = useState(false);
  const [request, setRequest] = useState<{ q: string; n: number } | null>(null);
  const onAssistantPage = /^\/(ar\/)?assistant$/.test(path);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    const onClose = () => opener.current?.focus();
    d.addEventListener("close", onClose);
    return () => d.removeEventListener("close", onClose);
  }, [onAssistantPage]);

  // "Ask the MESHaykh" from the search box: answered here, on the page the person is on.
  useEffect(() => {
    if (onAssistantPage) return;
    const onAsk = (e: Event) => {
      const q = (e as CustomEvent<{ q?: string }>).detail?.q?.trim();
      if (!q) return;
      e.preventDefault();
      setOpened(true);
      setRequest((r) => ({ q, n: (r?.n ?? 0) + 1 }));
      if (!dialog.current?.open) dialog.current?.showModal();
    };
    window.addEventListener("mesh:ask", onAsk);
    return () => window.removeEventListener("mesh:ask", onAsk);
  }, [onAssistantPage]);

  // A link followed from the chat opens its page: the dialog gets out of the way.
  useEffect(() => {
    if (dialog.current?.open) dialog.current.close();
  }, [path]);

  if (onAssistantPage) return null;

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
        className="fixed end-4 bottom-[calc(env(safe-area-inset-bottom)+5.25rem)] z-40 inline-flex size-14 items-center justify-center gap-2 rounded-full bg-brand font-semibold text-white shadow-lg ring-1 ring-black/5 transition hover:brightness-110 active:scale-95 lg:bottom-6 lg:size-auto lg:min-h-12 lg:px-4"
        aria-haspopup="dialog"
        aria-label={ar ? "مساعد MESH" : "Ask the MESHaykh, MESH's assistant"}
        data-assistant-fab
      >
        <MessageCircleQuestion size={20} className="hidden text-gold-bright lg:block" aria-hidden="true" />
        <MessageCircleQuestion size={26} className="text-gold-bright lg:hidden" aria-hidden="true" />
        <span className="hidden lg:inline">{ar ? "مساعد MESH" : <MeshaykhName />}</span>
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
          <div className="min-h-0 flex-1">{opened && <AssistantPanel locale={locale} autoFocus compact request={request} page={path} onNavigate={() => dialog.current?.close()} />}</div>
        </div>
      </dialog>
    </>
  );
}
