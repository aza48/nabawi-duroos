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
      .toBe("Bilal cancelled ruh-dalil on Thu 12 Nov");
    expect(describeActivity(row({ after: { kind: "cancelled", lessonSlug: "ruh-dalil", lessonLabel: "Dalil al-Talib", startsOn: "2026-11-12", endsOn: "2026-11-12" } })))
      .toBe("Bilal cancelled Dalil al-Talib on Thu 12 Nov");
  });
  it("describes a publish", () => {
    expect(describeActivity(row({ entity: "announcement", action: "update", before: { status: "draft" }, after: { status: "published", titleEn: "Lecture tonight" } })))
      .toBe('Bilal published "Lecture tonight"');
  });
  it("describes an edit to a guide", () => {
    expect(describeActivity(row({ entity: "guide", action: "update", after: { title: "First week" } }))).toBe('Bilal edited the guide "First week"');
  });
  it("names the item in deletes, take-downs, undos and withdrawals", () => {
    expect(describeActivity(row({ entity: "faq", action: "delete", entityId: "free-bus", before: { question: "Is the bus free?" }, after: null })))
      .toBe('Bilal deleted the answer "Is the bus free?"');
    expect(describeActivity(row({ entity: "announcement", action: "update", before: { status: "published", titleEn: "No dars" }, after: { status: "archived", titleEn: "No dars" } })))
      .toBe('Bilal took down "No dars"');
    expect(describeActivity(row({ entity: "faq", action: "undo", before: { question: "Is the bus free?" } }))).toBe('Bilal undid a change to the answer "Is the bus free?"');
    expect(describeActivity(row({ entity: "faq", action: "undo" }))).toBe("Bilal undid a change to an answer");
    expect(describeActivity(row({ entity: "override", action: "update", after: { kind: "cancelled", startsOn: "2026-11-12", revokedAt: "2026-11-09T00:00:00Z" } })))
      .toBe("Bilal withdrew the cancellation on Thu 12 Nov");
  });
  it("never offers undo for undos, undone rows, or admin changes", () => {
    expect(isUndoable(row({ action: "undo" }))).toBe(false);
    expect(isUndoable(row({ undoneAt: new Date() }))).toBe(false);
    expect(isUndoable(row({ entity: "admin", action: "update" }))).toBe(false);
    expect(isUndoable(row({}))).toBe(true);
  });
});
