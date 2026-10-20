import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "var(--font-arabic)", "system-ui", "sans-serif"],
        arabic: ["var(--font-arabic)", "var(--font-inter)", "system-ui", "sans-serif"],
      },
      colors: {
        canvas: "var(--canvas)",
        ceramic: "var(--ceramic)",
        card: "var(--card)",
        ink: "var(--ink)",
        "ink-soft": "var(--ink-soft)",
        "ink-faint": "var(--ink-faint)",
        brand: "var(--brand)",
        "brand-accent": "var(--brand-accent)",
        "brand-deep": "var(--brand-deep)",
        "brand-uplift": "var(--brand-uplift)",
        gold: "var(--gold)",
        danger: "var(--danger)",
      },
      borderRadius: {
        card: "12px",
        pill: "50px",
      },
      boxShadow: {
        soft: "0 0 0.5px rgba(0,0,0,0.14), 0 1px 1px rgba(0,0,0,0.24)",
        lift: "0 0 0.5px rgba(0,0,0,0.14), 0 4px 12px rgba(0,0,0,0.10)",
      },
      letterSpacing: {
        tighter: "-0.015em",
      },
    },
  },
  plugins: [],
};

export default config;
