import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import {
  renderDocs,
  renderEscalationLane,
  renderHandoffLedger,
  renderInterventionPosture,
  renderOverview,
  renderVerification
} from "../src/services/render.js";
import {
  escalationLane,
  handoffLedger,
  interventionPosture,
  payload,
  riskMap,
  summary,
  verification
} from "../src/services/verticalBriefService.js";

const root = path.resolve("site");
rmSync(root, { recursive: true, force: true });
mkdirSync(root, { recursive: true });

if (existsSync("CNAME")) {
  writeFileSync(path.join(root, "CNAME"), readFileSync("CNAME", "utf8").trim() + "\n");
}

const htmlRoutes = new Map<string, [string, string]>([
  ["/", ["index.html", renderOverview()]],
  ["/escalation-lane", ["escalation-lane/index.html", renderEscalationLane()]],
  ["/handoff-ledger", ["handoff-ledger/index.html", renderHandoffLedger()]],
  ["/intervention-posture", ["intervention-posture/index.html", renderInterventionPosture()]],
  ["/verification", ["verification/index.html", renderVerification()]],
  ["/docs", ["docs/index.html", renderDocs()]]
]);

for (const [, [target, html]] of htmlRoutes) {
  const filePath = path.join(root, target);
  mkdirSync(path.dirname(filePath), { recursive: true });
  writeFileSync(filePath, html);
}

writeFileSync(path.join(root, "robots.txt"), "User-agent: *\nAllow: /\nSitemap: https://escalate-map.kineticgain.com/sitemap.xml\n");
writeFileSync(
  path.join(root, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://escalate-map.kineticgain.com/</loc></url><url><loc>https://escalate-map.kineticgain.com/escalation-lane/</loc></url><url><loc>https://escalate-map.kineticgain.com/handoff-ledger/</loc></url><url><loc>https://escalate-map.kineticgain.com/intervention-posture/</loc></url><url><loc>https://escalate-map.kineticgain.com/verification/</loc></url><url><loc>https://escalate-map.kineticgain.com/docs/</loc></url></urlset>`
);

const api = {
  "api/dashboard/summary.json": summary(),
  "api/escalation-lane.json": escalationLane(),
  "api/handoff-ledger.json": handoffLedger(),
  "api/intervention-posture.json": interventionPosture(),
  "api/risk-map.json": riskMap(),
  "api/verification.json": verification(),
  "api/sample.json": payload().sample,
  "api/payload.json": payload()
};

for (const [target, data] of Object.entries(api)) {
  const filePath = path.join(root, target);
  mkdirSync(path.dirname(filePath), { recursive: true });
  writeFileSync(filePath, JSON.stringify(data, null, 2));
}
