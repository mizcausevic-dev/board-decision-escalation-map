import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { sampleBoardDecisionEscalation } from "../src/data/sampleVerticalBrief.js";

const fixturesDir = path.resolve("fixtures");
mkdirSync(fixturesDir, { recursive: true });

writeFileSync(
  path.join(fixturesDir, "board-decision-escalation-map.json"),
  JSON.stringify(sampleBoardDecisionEscalation, null, 2)
);

writeFileSync(
  path.join(fixturesDir, "board-decision-escalation-map-clean.json"),
  JSON.stringify(
    sampleBoardDecisionEscalation.map(({ narrative: _narrative, currentPosture: _currentPosture, ...item }) => item),
    null,
    2
  )
);
