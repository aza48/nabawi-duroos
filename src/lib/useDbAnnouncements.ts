"use client";

import { useEffect, useState } from "react";
import { AnnouncementRow } from "./types";

/**
 * Published DB announcements, fetched once from /api/announcements.
 * Returns raw rows so callers can use lesson_date / published_at directly
 * (FeedView maps them to feed cards; the lecture pop-up filters them).
 * Returns an empty list when the backend is not configured or offline.
 */
export function useDbAnnouncements(): AnnouncementRow[] {
  const [rows, setRows] = useState<AnnouncementRow[]>([]);
  useEffect(() => {
    let alive = true;
    fetch("/api/announcements")
      .then((r) => (r.ok ? r.json() : { announcements: [] }))
      .then((d: { announcements?: AnnouncementRow[] }) => {
        if (alive && Array.isArray(d.announcements)) setRows(d.announcements);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);
  return rows;
}
