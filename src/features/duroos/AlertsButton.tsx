"use client";

import { useEffect, useState } from "react";
import { Bell, BellOff } from "lucide-react";
import type { Locale } from "@/lib/locale";

const STORE = "mesh-push-topics";
const VAPID = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY ?? "";

function readTopics(): string[] {
  try { return JSON.parse(localStorage.getItem(STORE) ?? "[]"); } catch { return []; }
}
function saveTopics(t: string[]) {
  try { localStorage.setItem(STORE, JSON.stringify(t)); } catch {}
}
function keyBytes(base64: string): Uint8Array {
  const pad = "=".repeat((4 - (base64.length % 4)) % 4);
  const raw = atob((base64 + pad).replace(/-/g, "+").replace(/_/g, "/"));
  return Uint8Array.from(raw, (c) => c.charCodeAt(0));
}

type State = "loading" | "unsupported" | "ios-install" | "off" | "on" | "blocked";

/** Follow a topic ("shaykh:<slug>", "daily" or "all") with phone notifications. No account needed. */
export function AlertsButton({ topic, label, locale = "en" }: { topic: string; label: string; locale?: Locale }) {
  const ar = locale === "ar";
  const [state, setState] = useState<State>("loading");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const ios = /iPhone|iPad/.test(navigator.userAgent);
    const standalone = window.matchMedia("(display-mode: standalone)").matches || (navigator as { standalone?: boolean }).standalone;
    if (!VAPID || !("serviceWorker" in navigator)) return setState("unsupported");
    if (!("PushManager" in window)) return setState(ios && !standalone ? "ios-install" : "unsupported");
    if (Notification.permission === "denied") return setState("blocked");
    setState(readTopics().includes(topic) ? "on" : "off");
  }, [topic]);

  async function toggle() {
    setBusy(true);
    try {
      const reg = await navigator.serviceWorker.register("/sw.js");
      await navigator.serviceWorker.ready;
      const current = readTopics();
      if (state === "on") {
        const next = current.filter((t) => t !== topic);
        const sub = await reg.pushManager.getSubscription();
        if (sub && next.length === 0) {
          await fetch("/api/v1/push/unsubscribe", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ endpoint: sub.endpoint }) });
          await sub.unsubscribe();
        } else if (sub) {
          await fetch("/api/v1/push/subscribe", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ ...sub.toJSON(), topics: next }) });
        }
        saveTopics(next);
        setState("off");
        return;
      }
      if ((await Notification.requestPermission()) !== "granted") return setState("blocked");
      const sub = (await reg.pushManager.getSubscription()) ?? (await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: keyBytes(VAPID) as BufferSource }));
      const next = [...new Set([...current, topic])];
      const res = await fetch("/api/v1/push/subscribe", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ ...sub.toJSON(), topics: next }) });
      if (res.ok) {
        saveTopics(next);
        setState("on");
      }
    } finally {
      setBusy(false);
    }
  }

  if (state === "loading" || state === "unsupported") return null;
  if (state === "ios-install")
    return (
      <p className="mt-3 rounded-xl bg-bg-2 p-3 text-sm">
        {ar ? "لتصلك التنبيهات على الآيفون: اضغط زر المشاركة ثم «إضافة إلى الشاشة الرئيسية»، وافتح MESH من هناك."
          : "To get alerts on iPhone: tap Share, then Add to Home Screen, and open MESH from there."}
      </p>
    );
  if (state === "blocked")
    return <p className="mt-3 text-sm text-muted">{ar ? "التنبيهات محظورة في إعدادات المتصفح." : "Notifications are blocked in your browser settings."}</p>;
  return (
    <button type="button" onClick={toggle} disabled={busy} aria-pressed={state === "on"}
      className={`mt-3 flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 font-semibold ${state === "on" ? "bg-on-bg text-on" : "bg-primary text-primary-ink"}`}>
      {state === "on" ? <BellOff size={17} /> : <Bell size={17} />}
      {state === "on" ? (ar ? "إيقاف التنبيهات" : "Alerts on. Tap to turn off") : label}
    </button>
  );
}
