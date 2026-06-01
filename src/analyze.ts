import type {
  BoardDecisionEscalationExport,
  BoardDecisionEscalationItem,
  BoardDecisionEscalationReportItem,
  EscalationAssessment,
  EscalationSeverity
} from "./types.js";

function assessDelay(
  score: number,
  healthy: number,
  pressured: number,
  healthyMessage: string,
  pressureMessage: string,
  highMessage: string
): EscalationAssessment {
  let severity: EscalationSeverity = "HIGH";
  let ok = false;
  let message = highMessage;

  if (score <= healthy) {
    severity = "LOW";
    ok = true;
    message = healthyMessage;
  } else if (score <= pressured) {
    severity = "MEDIUM";
    message = pressureMessage;
  }

  return { severity, ok, message };
}

function assessStrength(
  score: number,
  strong: number,
  watch: number,
  strongMessage: string,
  watchMessage: string,
  weakMessage: string
): EscalationAssessment {
  let severity: EscalationSeverity = "HIGH";
  let ok = false;
  let message = weakMessage;

  if (score >= strong) {
    severity = "LOW";
    ok = true;
    message = strongMessage;
  } else if (score >= watch) {
    severity = "MEDIUM";
    message = watchMessage;
  }

  return { severity, ok, message };
}

export function analyze(
  items: BoardDecisionEscalationItem[],
  options: { now?: string } = {}
): BoardDecisionEscalationExport {
  const generatedAt = options.now ?? new Date().toISOString();

  const reportItems: BoardDecisionEscalationReportItem[] = items.map((item) => {
    const handoffAssessment = assessDelay(
      item.decisionHandoffs,
      2,
      4,
      "Decision handoffs remain inside the current board-safe routing window.",
      "Decision handoffs are increasing and may soon start to blur final accountability.",
      "Decision handoffs are now too numerous to keep the escalation chain board-safe."
    );

    const ownerAssessment = assessDelay(
      item.unresolvedOwners,
      0,
      1,
      "Final decision ownership is clear enough to keep escalations moving cleanly.",
      "Decision ownership is thinning and may soon require a named override owner.",
      "Decision ownership is too ambiguous to keep the escalation chain stable."
    );

    const rerouteAssessment = assessDelay(
      item.rerouteDepth,
      1,
      3,
      "Reroute depth remains inside the current operating band.",
      "Reroute depth is rising and needs a tighter escalation path soon.",
      "Reroute depth is now too high to sustain board-safe escalation timing."
    );

    const coverageAssessment = assessStrength(
      item.escalationCoverageScore,
      78,
      62,
      "Escalation coverage is strong enough to absorb the current decision chain.",
      "Escalation coverage is becoming uneven and needs a clearer response path.",
      "Escalation coverage is too weak to keep the current board packet stable."
    );

    const clarityAssessment = assessStrength(
      item.decisionClarityScore,
      78,
      62,
      "Decision clarity remains strong enough to keep the escalation path readable.",
      "Decision clarity is getting patchy and may soon require a simpler routing map.",
      "Decision clarity is too weak to sustain clean board-facing escalations."
    );

    const confidenceAssessment = assessStrength(
      item.boardConfidenceScore,
      78,
      62,
      "Board confidence remains clear enough to support the current escalation path.",
      "Board confidence is becoming dependent on extra clarification and reroutes.",
      "Board confidence is too thin to support the current escalation chain without intervention."
    );

    const compositeEscalationRiskScore =
      Math.round(
        ((item.decisionHandoffs * 10 +
          item.unresolvedOwners * 15 +
          item.rerouteDepth * 10 +
          (100 - item.escalationCoverageScore) +
          (100 - item.decisionClarityScore) +
          (100 - item.boardConfidenceScore)) /
          7) *
          10
      ) / 10;

    return {
      ...item,
      handoffAssessment,
      ownerAssessment,
      rerouteAssessment,
      coverageAssessment,
      clarityAssessment,
      confidenceAssessment,
      compositeEscalationRiskScore
    };
  });

  const constrainedLanes = reportItems.filter(
    (item) =>
      item.handoffAssessment.severity === "HIGH" ||
      item.ownerAssessment.severity === "HIGH" ||
      item.rerouteAssessment.severity === "HIGH" ||
      item.coverageAssessment.severity === "HIGH" ||
      item.clarityAssessment.severity === "HIGH" ||
      item.confidenceAssessment.severity === "HIGH"
  ).length;

  const rerouteOrOwnerFixLanes = reportItems.filter(
    (item) => item.action === "REROUTE" || item.action === "NAME_OWNER"
  ).length;

  const averageBoardConfidence =
    reportItems.length === 0
      ? 0
      : Math.round((reportItems.reduce((sum, item) => sum + item.boardConfidenceScore, 0) / reportItems.length) * 10) / 10;

  const valueAtStakeMillions = reportItems.reduce((sum, item) => sum + item.valueAtStakeMillions, 0);

  const leadingMessage =
    constrainedLanes === 0
      ? "Decision escalation remains aligned with the current board routing model and does not require path changes."
      : constrainedLanes <= 2
        ? "A few lanes are accumulating enough escalation ambiguity to justify board-visible routing fixes."
        : "Decision escalation is now a shared operating constraint across multiple lanes and needs explicit routing intervention.";

  return {
    generatedAt,
    summary: {
      items: reportItems.length,
      constrainedLanes,
      rerouteOrOwnerFixLanes,
      averageBoardConfidence,
      valueAtStakeMillions,
      leadingMessage
    },
    items: reportItems
  };
}

export function toExport(items: BoardDecisionEscalationItem[], options: { now?: string } = {}) {
  return analyze(items, options);
}
