import { describe, expect, it } from "vitest";
import { escalationLane, handoffLedger, interventionPosture, payload, summary, verification } from "./verticalBriefService.js";

describe("verticalBriefService", () => {
  it("returns the escalation summary", () => {
    expect(summary().items).toBeGreaterThan(0);
  });

  it("returns the escalation lane view", () => {
    expect(escalationLane().length).toBeGreaterThan(0);
  });

  it("returns the handoff ledger view", () => {
    expect(handoffLedger().length).toBeGreaterThan(0);
  });

  it("returns the intervention posture view", () => {
    expect(interventionPosture().length).toBeGreaterThan(0);
  });

  it("returns verification notes", () => {
    expect(verification().length).toBeGreaterThan(0);
  });

  it("returns the payload", () => {
    expect(payload().report.summary.items).toBeGreaterThan(0);
  });
});
