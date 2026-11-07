"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

function currentTheme(): "light" | "dark" {
  const set = document.documentElement.getAttribute("data-theme");
  return set === "dark" ? "dark" : "light";
}

export function ThemeToggle({ label = "Switch theme" }: { label?: string }) {
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);
  useEffect(() => setTheme(currentTheme()), []);

  function toggle() {
    const next = currentTheme() === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("mesh-theme", next);
    } catch {}
    setTheme(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      className="grid size-10 place-items-center rounded-full border border-line bg-card text-ink transition hover:bg-bg-2"
    >
      {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
