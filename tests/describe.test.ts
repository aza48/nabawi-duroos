import { describe, expect, it } from "vitest";
import { describeActivity, isUndoable } from "@/server/admin/describe";
import type { AuditRow } from "@/server/admin/audit";

const row = (o: Partial<AuditRow>): AuditRow => ({
  id: 1, actorId: "a", actorName: "Bilal", action: "create", entity: "override", entityId: "1",
  before: null, after: null, createdAt: new Date(), undoneAt: null, undoOf: null, ...o,
});

describe("describeActivity", () => {
  it("describes a one-day cancellation", () => {
    expect(describeActivity(row({ after: { kind: "cancelled", lessonSlug: "ruh-dalil", startsOn: "2026-11-12", endsOn: "2026-11-12" } })))
      .toBe("Bilal cancelled ruh-dalil on 2026-11-12");
  });
  it("describes a publish", () => {
    expect(describeActivity(row({ entity: "announcement", action: "update", before: { status: "draft" }, after: { status: "published", titleEn: "Lecture tonight" } })))
      .toBe('Bilal published "Lecture tonight"');
  });
  it("describes an edit to a guide", () => {
    expect(describeActivity(row({ entity: "guide", action: "update", after: { title: "First week" } }))).toBe('Bilal edited the guide "First week"');
  });
  it("never offers undo for undos, undone rows, or admin changes", () => {
    expect(isUndoable(row({ action: "undo" }))).toBe(false);
    expect(isUndoable(row({ undoneAt: new Date() }))).toBe(false);
    expect(isUndoable(row({ entity: "admin", action: "update" }))).toBe(false);
    expect(isUndoable(row({}))).toBe(true);
  });
});
