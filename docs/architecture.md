# Architecture

Board Decision Escalation Map is a static-friendly TypeScript executive-intelligence surface for showing where decision handoffs, reroute depth, unresolved ownership, evidence coverage, and board confidence are constraining board-backed decisions.

## Routes

- `/`
- `/escalation-lane`
- `/handoff-ledger`
- `/intervention-posture`
- `/verification`
- `/docs`

## Data Flow

1. Sample decision-escalation items are modeled in `src/data/sampleVerticalBrief.ts`.
2. `src/analyze.ts` scores handoff pressure, owner drift, reroute depth, evidence coverage, decision clarity, and board confidence.
3. `src/services/verticalBriefService.ts` shapes the board-readable escalation packet plus the JSON payload routes.
4. `src/services/render.ts` turns those outputs into static-friendly HTML.
5. `scripts/prerender.ts` writes the routes and JSON payloads into `site/`.
