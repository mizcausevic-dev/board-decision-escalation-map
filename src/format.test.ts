import { describe, expect, it } from "vitest";
import { formatSummary } from "./format.js";

describe("formatSummary", () => {
  it("formats the board escalation summary for CLI output", () => {
    const output = formatSummary({
      items: 6,
      constrainedLanes: 5,
      rerouteOrOwnerFixLanes: 4,
      averageBoardConfidence: 56.8,
      valueAtStakeMillions: 154,
      leadingMessage: "Decision escalation needs explicit routing intervention."
    });

    expect(output).toContain("Board Decision Escalation Map");
    expect(output).toContain("Lanes: 6");
    expect(output).toContain("Value at stake: $154M");
    expect(output).toContain("explicit routing intervention");
  });
});
