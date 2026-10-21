"use client";
import { useMeshPrefs } from "@/lib/mesh-i18n";

const chipStyle: React.CSSProperties = {
  fontSize: 10.5, fontWeight: 700, lineHeight: 1.5, padding: "1px 7px", borderRadius: 999,
  border: "1px solid var(--mesh-hairline)", color: "var(--mesh-secondary)", whiteSpace: "nowrap",
};

/** Small role chips shown next to a member's name. Deliberately quiet — no gamification. */
export function UserChips({ role, entryYear, country }: { role?: string | null; entryYear?: number | null; country?: string | null }) {
  const { t } = useMeshPrefs();
  const chips: React.ReactNode[] = [];
  if (role === "mandoob") chips.push(<span key="m" style={{ ...chipStyle, color: "var(--mesh-accent)", borderColor: "var(--mesh-soft)", background: "var(--mesh-pale)" }}>{t("badge.mandoob")}{country ? ` · ${country}` : ""}</span>);
  if (role === "admin") chips.push(<span key="a" style={{ ...chipStyle, color: "var(--mesh-accent)", borderColor: "var(--mesh-soft)", background: "var(--mesh-pale)" }}>{t("badge.admin")}</span>);
  if (!chips.length) return null;
  return <span style={{ display: "inline-flex", gap: 6, flexWrap: "wrap", alignItems: "center", verticalAlign: "middle" }}>{chips}</span>;
}

/** Author name with role colouring + chips. Wrap in a Link at the call site if it should navigate. */
export function AuthorName({ name, role, entryYear, country }: { name: string; role?: string | null; entryYear?: number | null; country?: string | null; userId?: number }) {
  const isMandoob = role === "mandoob"; const isAdmin = role === "admin";
  return (
    <span style={{ display: "inline-flex", gap: 7, flexWrap: "wrap", alignItems: "center" }}>
      <span style={isMandoob || isAdmin ? { color: "var(--mesh-accent)", fontWeight: 700 } : undefined}>{name}</span>
      <UserChips role={role} entryYear={entryYear} country={country} />
    </span>
  );
}
