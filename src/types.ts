export type DecisionEscalationTrack =
  | "AI_GOVERNANCE"
  | "IDENTITY"
  | "REVENUE_SYSTEMS"
  | "FINTECH"
  | "PROCUREMENT"
  | "BIOTECH";

export type EscalationAction = "REROUTE" | "NAME_OWNER" | "ADD_REVIEW" | "HOLD_SCOPE";

export type EscalationSeverity = "LOW" | "MEDIUM" | "HIGH";

export interface BoardDecisionEscalationItem {
  id: string;
  lane: string;
  track: DecisionEscalationTrack;
  action: EscalationAction;
  escalationTheme: string;
  boardQuestion: string;
  owner: string;
  audience: string;
  currentPosture: string;
  escalationHeadline: string;
  handoffSignal: string;
  escalationOwner: string;
  requiredEvidence: string[];
  relatedSurfaces: string[];
  companyTags: string[];
  decisionHandoffs: number;
  unresolvedOwners: number;
  rerouteDepth: number;
  escalationCoverageScore: number;
  decisionClarityScore: number;
  boardConfidenceScore: number;
  valueAtStakeMillions: number;
  headline: string;
  narrative: string;
  nextMove: string;
}

export interface EscalationAssessment {
  severity: EscalationSeverity;
  ok: boolean;
  message: string;
}

export interface BoardDecisionEscalationReportItem extends BoardDecisionEscalationItem {
  handoffAssessment: EscalationAssessment;
  ownerAssessment: EscalationAssessment;
  rerouteAssessment: EscalationAssessment;
  coverageAssessment: EscalationAssessment;
  clarityAssessment: EscalationAssessment;
  confidenceAssessment: EscalationAssessment;
  compositeEscalationRiskScore: number;
}

export interface BoardDecisionEscalationSummary {
  items: number;
  constrainedLanes: number;
  rerouteOrOwnerFixLanes: number;
  averageBoardConfidence: number;
  valueAtStakeMillions: number;
  leadingMessage: string;
}

export interface BoardDecisionEscalationExport {
  generatedAt: string;
  summary: BoardDecisionEscalationSummary;
  items: BoardDecisionEscalationReportItem[];
}

export interface BoardDecisionEscalationPayload {
  report: BoardDecisionEscalationExport;
  escalationLane: ReturnType<typeof import("./services/verticalBriefService.js").escalationLane>;
  handoffLedger: ReturnType<typeof import("./services/verticalBriefService.js").handoffLedger>;
  interventionPosture: ReturnType<typeof import("./services/verticalBriefService.js").interventionPosture>;
  riskMap: ReturnType<typeof import("./services/verticalBriefService.js").riskMap>;
  verification: string[];
  sample: BoardDecisionEscalationItem[];
}
