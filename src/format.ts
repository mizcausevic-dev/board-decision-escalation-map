export function formatSummary(
  summary: {
    items: number;
    constrainedLanes: number;
    rerouteOrOwnerFixLanes: number;
    averageBoardConfidence: number;
    valueAtStakeMillions: number;
    leadingMessage: string;
  },
  title = "Board Decision Escalation Map"
) {
  return [
    title,
    `Lanes: ${summary.items}`,
    `Constrained lanes: ${summary.constrainedLanes}`,
    `Reroute or owner-fix lanes: ${summary.rerouteOrOwnerFixLanes}`,
    `Average board confidence: ${summary.averageBoardConfidence}`,
    `Value at stake: $${summary.valueAtStakeMillions}M`,
    `Leading message: ${summary.leadingMessage}`
  ].join("\n");
}
