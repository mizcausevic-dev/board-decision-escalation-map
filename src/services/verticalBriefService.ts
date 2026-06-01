import { analyze } from "../analyze.js";
import { sampleBoardDecisionEscalation } from "../data/sampleVerticalBrief.js";

const report = analyze(sampleBoardDecisionEscalation, { now: "2026-06-01T00:00:00Z" });

export function summary() {
  return {
    ...report.summary,
    generatedAt: report.generatedAt,
    boardMessage:
      "Reroute AI and procurement escalation first, name final owners across identity and biotech second, and hold FinTech scope until the decision path is board-safe again."
  };
}

export function escalationLane() {
  return sampleBoardDecisionEscalation.map((item) => ({
    lane: item.lane,
    action: item.action,
    owner: item.owner,
    audience: item.audience,
    escalationTheme: item.escalationTheme,
    boardConfidenceScore: item.boardConfidenceScore,
    nextMove: item.nextMove,
    decisionHandoffs: item.decisionHandoffs,
    unresolvedOwners: item.unresolvedOwners
  }));
}

export function handoffLedger() {
  return sampleBoardDecisionEscalation.map((item) => ({
    lane: item.lane,
    escalationHeadline: item.escalationHeadline,
    handoffSignal: item.handoffSignal,
    escalationOwner: item.escalationOwner,
    requiredEvidence: item.requiredEvidence,
    decisionHandoffs: item.decisionHandoffs,
    rerouteDepth: item.rerouteDepth
  }));
}

export function interventionPosture() {
  return report.items.map((item) => ({
    lane: item.lane,
    action: item.action,
    compositeEscalationRiskScore: item.compositeEscalationRiskScore,
    handoffs: item.handoffAssessment,
    owner: item.ownerAssessment,
    reroute: item.rerouteAssessment,
    coverage: item.coverageAssessment,
    clarity: item.clarityAssessment,
    boardConfidence: item.confidenceAssessment
  }));
}

export function riskMap() {
  return report.items.map((item) => ({
    lane: item.lane,
    track: item.track,
    valueAtStakeMillions: item.valueAtStakeMillions,
    compositeEscalationRiskScore: item.compositeEscalationRiskScore,
    boardConfidenceScore: item.boardConfidenceScore,
    companyTags: item.companyTags
  }));
}

export function verification() {
  return [
    "Synthetic decision-escalation data only - no live board packets, real escalation logs, or actual committee chains are included.",
    "Scores are modeled to show how Kinetic Gain can turn handoff sprawl and owner drift into board-readable routing tradeoffs.",
    "All routes are read-only and demonstrate escalation-mapping packaging, not production workflow automation."
  ];
}

export function payload() {
  return {
    report,
    escalationLane: escalationLane(),
    handoffLedger: handoffLedger(),
    interventionPosture: interventionPosture(),
    riskMap: riskMap(),
    verification: verification(),
    sample: sampleBoardDecisionEscalation
  };
}
