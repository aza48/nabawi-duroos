export const ROLES = ["owner", "editor", "duroos_editor", "content_editor"] as const;
export type Role = (typeof ROLES)[number];

export type Permission =
  | "duroos.write"
  | "announcements.write"
  | "content.write"
  | "settings.write"
  | "admins.manage"
  | "activity.undo"
  /** Visitor analytics: the owner only, never editors. */
  | "analytics.view";

const GRANTS: Record<Role, Permission[]> = {
  owner: ["duroos.write", "announcements.write", "content.write", "settings.write", "admins.manage", "activity.undo", "analytics.view"],
  editor: ["duroos.write", "announcements.write", "content.write", "settings.write", "activity.undo"],
  duroos_editor: ["duroos.write", "announcements.write"],
  content_editor: ["content.write"],
};

export const ROLE_LABELS: Record<Role, string> = {
  owner: "Owner",
  editor: "Editor",
  duroos_editor: "Duroos editor",
  content_editor: "Content editor",
};

export function isRole(r: unknown): r is Role {
  return typeof r === "string" && (ROLES as readonly string[]).includes(r);
}

/** Deny by default: unknown roles and missing roles get nothing. */
export function can(role: string | null | undefined, p: Permission): boolean {
  return isRole(role) ? GRANTS[role].includes(p) : false;
}

export type Actor = { id: string; name: string; role: Role };

export class Forbidden extends Error {
  constructor() {
    super("forbidden");
  }
}

export function assertCan(actor: Actor | "system", p: Permission): void {
  if (actor === "system") return;
  if (!can(actor.role, p)) throw new Forbidden();
}
