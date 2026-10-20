"use client";

import { useState } from "react";
import { Lesson } from "../../lib/types";
import { AdminView } from "../../components/views";
import { StandaloneShell } from "../../components/StandaloneShell";

/**
 * Password-protected admin route (see src/middleware.ts). Renders the same
 * AdminView as the SPA: DB announcements via API, Telegram queue (local),
 * manual lesson additions (localStorage).
 */
export default function AdminPage() {
  const [, setTick] = useState(0);

  const addLesson = (l: Lesson) => {
    try {
      const raw = window.localStorage.getItem("duroos-extra-lessons");
      const arr = raw ? (JSON.parse(raw) as Lesson[]) : [];
      arr.push(l);
      window.localStorage.setItem("duroos-extra-lessons", JSON.stringify(arr));
      setTick((n) => n + 1);
    } catch {}
  };

  return (
    <StandaloneShell>
      <AdminView addLesson={addLesson} />
    </StandaloneShell>
  );
}
