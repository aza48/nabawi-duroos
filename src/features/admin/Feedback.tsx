"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Undo2 } from "lucide-react";
import { undoAction } from "@/app/(admin)/admin/actions";

type ConfirmOptions = { title: string; body?: string; confirmLabel: string; danger?: boolean };
type Feedback = {
  /** Opens an in-page sheet. Resolves true if the person confirms, false if they cancel. */
  confirm: (o: ConfirmOptions) => Promise<boolean>;
  /** Shows a short message at the bottom. With an audit id it carries an Undo button for a few seconds. */
  notify: (message: string, opts?: { undoAuditId?: number }) => void;
};

const Ctx = createContext<Feedback | null>(null);

export function useFeedback(): Feedback {
  const c = useContext(Ctx);
  if (!c) throw new Error("useFeedback needs AdminFeedbackProvider");
  return c;
}

type Toast = { id: number; message: string; undoAuditId?: number };
const TOAST_MS = 8000;

/** canUndo: only people whose role allows Undo get the Undo button on the toast. */
export function AdminFeedbackProvider({ canUndo = false, children }: { canUndo?: boolean; children: React.ReactNode }) {
  const router = useRouter();
  const [sheet, setSheet] = useState<(ConfirmOptions & { resolve: (v: boolean) => void }) | null>(null);
  const [toast, setToast] = useState<Toast | null>(null);
  const [undoing, setUndoing] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cancelRef = useRef<HTMLButtonElement>(null);
  const seq = useRef(0);

  const confirm = useCallback((o: ConfirmOptions) => new Promise<boolean>((resolve) => setSheet({ ...o, resolve })), []);

  const clearToast = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    setToast(null);
  }, []);

  const notify = useCallback<Feedback["notify"]>((message, opts) => {
    if (timer.current) clearTimeout(timer.current);
    const undoAuditId = canUndo ? opts?.undoAuditId : undefined;
    setToast({ id: ++seq.current, message, undoAuditId });
    timer.current = setTimeout(() => setToast(null), undoAuditId ? TOAST_MS : 4000);
  }, [canUndo]);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  function close(v: boolean) {
    sheet?.resolve(v);
    setSheet(null);
  }

  useEffect(() => {
    if (!sheet) return;
    cancelRef.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { sheet.resolve(false); setSheet(null); } };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [sheet]);

  async function undoNow() {
    if (!toast?.undoAuditId) return;
    setUndoing(true);
    const r = await undoAction(toast.undoAuditId);
    setUndoing(false);
    if (r.ok) {
      notify("Restored");
      router.refresh();
    } else {
      notify(r.error);
    }
  }

  return (
    <Ctx.Provider value={{ confirm, notify }}>
      {children}

      {sheet && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/45 p-3 sm:items-center" onClick={() => close(false)}>
          <div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="confirm-title"
            aria-describedby={sheet.body ? "confirm-body" : undefined}
            className="w-full max-w-sm rounded-2xl bg-card p-5 shadow-xl"
            style={{ paddingBottom: "max(1.25rem, env(safe-area-inset-bottom))" }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 id="confirm-title" className="text-lg font-bold">{sheet.title}</h2>
            {sheet.body && <p id="confirm-body" className="mt-1.5 text-sm text-muted">{sheet.body}</p>}
            <div className="mt-5 grid grid-cols-2 gap-2">
              <button ref={cancelRef} type="button" onClick={() => close(false)} className="min-h-12 rounded-full border border-line bg-card px-4 font-semibold hover:bg-bg-2">
                Cancel
              </button>
              <button
                type="button"
                onClick={() => close(true)}
                className={`min-h-12 rounded-full px-4 font-semibold hover:brightness-110 ${sheet.danger ? "border border-cancel bg-cancel-bg text-cancel" : "bg-primary text-primary-ink"}`}
              >
                {sheet.confirmLabel}
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className="pointer-events-none fixed inset-x-0 bottom-24 z-50 flex justify-center px-4 md:bottom-6" aria-live="polite">
          <div key={toast.id} className="pointer-events-auto flex max-w-md items-center gap-3 rounded-full bg-[#10261e] py-2 pl-5 pr-2 text-sm font-semibold text-white shadow-lg">
            <span>{toast.message}</span>
            {toast.undoAuditId ? (
              <button type="button" disabled={undoing} onClick={undoNow} className="inline-flex min-h-11 items-center gap-1.5 rounded-full bg-gold-bright px-4 font-bold text-[#10261e] disabled:opacity-60">
                <Undo2 size={16} /> Undo
              </button>
            ) : (
              <button type="button" onClick={clearToast} className="min-h-11 rounded-full px-4 text-white/80">Close</button>
            )}
          </div>
        </div>
      )}
    </Ctx.Provider>
  );
}
