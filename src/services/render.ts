import {
  escalationLane,
  handoffLedger,
  interventionPosture,
  payload,
  riskMap,
  summary,
  verification
} from "./verticalBriefService.js";

const productTitle = "Board Decision Escalation Map";
const domain = "https://escalate-map.kineticgain.com";
const repoUrl = "https://github.com/mizcausevic-dev/board-decision-escalation-map";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function shell(title: string, path: string, body: string, description: string) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(title)} · Kinetic Gain</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <style>
      :root {
        color-scheme: dark;
        --bg: #07111d;
        --panel: #0d1a2b;
        --panel-2: #102032;
        --border: rgba(103, 224, 190, 0.22);
        --text: #edf2ff;
        --muted: #9fb0cf;
        --accent: #67e0be;
        --accent-2: #7dc4ff;
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        font-family: "Segoe UI", system-ui, sans-serif;
        background:
          radial-gradient(circle at top left, rgba(125, 196, 255, 0.12), transparent 30%),
          linear-gradient(180deg, #050c16 0%, var(--bg) 100%);
        color: var(--text);
      }
      a { color: var(--accent-2); text-decoration: none; }
      .wrap { max-width: 1180px; margin: 0 auto; padding: 32px 24px 64px; }
      .hero, .section {
        background: linear-gradient(180deg, rgba(14, 28, 45, 0.95), rgba(10, 19, 33, 0.98));
        border: 1px solid var(--border);
        border-radius: 28px;
        padding: 28px;
        box-shadow: 0 18px 60px rgba(2, 7, 16, 0.35);
      }
      .hero { margin-bottom: 24px; }
      .eyebrow {
        display: inline-block;
        padding: 10px 16px;
        border-radius: 999px;
        border: 1px solid var(--border);
        background: rgba(103, 224, 190, 0.08);
        color: var(--accent);
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 0.28em;
      }
      h1, h2 { margin: 18px 0 12px; font-family: Georgia, serif; line-height: 0.95; }
      h1 { font-size: clamp(56px, 8vw, 92px); max-width: 980px; }
      h2 { font-size: clamp(36px, 4vw, 54px); }
      .lede { color: var(--muted); font-size: 20px; line-height: 1.6; max-width: 920px; }
      .nav { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 22px; }
      .nav a {
        padding: 10px 14px;
        border: 1px solid rgba(125, 196, 255, 0.18);
        border-radius: 999px;
        color: var(--muted);
      }
      .nav a.active { color: var(--text); border-color: var(--accent); background: rgba(103, 224, 190, 0.08); }
      .metrics, .grid {
        display: grid;
        gap: 18px;
      }
      .metrics { grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); margin-top: 26px; }
      .metric, .card, .table-wrap {
        background: rgba(16, 32, 50, 0.76);
        border: 1px solid rgba(125, 196, 255, 0.12);
        border-radius: 22px;
        padding: 18px;
      }
      .metric-label, .chip {
        color: var(--accent);
        text-transform: uppercase;
        letter-spacing: 0.18em;
        font-size: 12px;
      }
      .metric-value { display: block; font-size: 40px; font-weight: 700; margin-top: 10px; }
      .metric-copy { margin-top: 10px; color: var(--muted); line-height: 1.5; }
      .section { margin-top: 24px; }
      .grid { grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); }
      .card h3 { margin: 12px 0 10px; font-size: 30px; line-height: 1.05; }
      .card p, li { color: var(--muted); line-height: 1.6; }
      .proof-band {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        gap: 16px;
      }
      .proof-card {
        min-height: 100%;
        border: 1px solid rgba(103, 224, 190, 0.16);
        background:
          linear-gradient(135deg, rgba(103, 224, 190, 0.08), transparent 42%),
          rgba(16, 32, 50, 0.72);
      }
      .proof-card h3 { font-size: 24px; }
      .table-wrap { overflow-x: auto; }
      table { width: 100%; border-collapse: collapse; }
      th, td { text-align: left; padding: 12px; border-bottom: 1px solid rgba(125, 196, 255, 0.12); vertical-align: top; }
      th { color: var(--accent); font-size: 12px; text-transform: uppercase; letter-spacing: 0.18em; }
      ul { padding-left: 20px; }
      pre {
        white-space: pre-wrap;
        overflow-wrap: anywhere;
        color: var(--muted);
        background: rgba(7, 17, 29, 0.75);
        border: 1px solid rgba(125, 196, 255, 0.12);
        border-radius: 18px;
        padding: 18px;
      }
      .footer {
        margin-top: 24px;
        color: var(--muted);
        font-size: 14px;
        display: flex;
        gap: 18px;
        flex-wrap: wrap;
      }
    </style>
  </head>
  <body>
    <div class="wrap">
      ${body}
      <div class="footer">
        <span>${productTitle}</span>
        <a href="${domain}">${domain.replace("https://", "")}</a>
        <a href="${repoUrl}">GitHub repo</a>
        <a href="https://portfolio.kineticgain.com/">Portfolio</a>
        <a href="https://suite.kineticgain.com/">Suite</a>
        <a href="https://www.linkedin.com/in/mirzacausevic/">LinkedIn</a>
        <a href="https://kineticgain.com/">Kinetic Gain</a>
      </div>
    </div>
  </body>
</html>`;
}

function productDepthSection() {
  return `<section class="section">
      <span class="eyebrow">Product depth</span>
      <h2>Built as an escalation product, not a generic route table.</h2>
      <p class="lede">This surface helps leadership teams see which decisions are getting bounced across committees, where ownership has gone soft, and which escalation path should be simplified before the next investor or board review.</p>
      <div class="proof-band">
        <article class="card proof-card">
          <div class="chip">Buyer value</div>
          <h3>Where governance drag is delaying action.</h3>
          <p>CEOs, chiefs of staff, operating partners, and functional executives can see the decisions that need rerouting, owner assignment, added review coverage, or scope hold before another cycle is lost.</p>
        </article>
        <article class="card proof-card">
          <div class="chip">Technical proof</div>
          <h3>Escalation pressure is modeled and reproducible.</h3>
          <p>The repo turns synthetic escalation records into scored lanes, handoff ledgers, intervention posture, JSON payloads, static routes, tests, and screenshot-ready proof.</p>
        </article>
        <article class="card proof-card">
          <div class="chip">GTM story</div>
          <h3>Board-readable operating decisions.</h3>
          <p>Kinetic Gain translates committee friction, owner drift, and decision reroutes into a concise executive intelligence packet that non-technical buyers can scan quickly.</p>
        </article>
      </div>
    </section>`;
}

function sharedPatternSection() {
  return `<section class="section">
      <span class="eyebrow">What these repos have in common</span>
      <h2>One board question, one modeled dataset, one evidence packet.</h2>
      <div class="proof-band">
        <article class="card proof-card">
          <div class="chip">Risk becomes legible</div>
          <h3>Escalation loops stop hiding in meeting notes.</h3>
          <p>Reroute depth, unresolved ownership, committee loops, evidence coverage, decision clarity, and confidence erosion become explicit operating signals.</p>
        </article>
        <article class="card proof-card">
          <div class="chip">Ownership stays attached</div>
          <h3>Every lane keeps its audience and next move.</h3>
          <p>Each route keeps the accountable owner, board audience, required evidence, routing action, and safe next move visible.</p>
        </article>
        <article class="card proof-card">
          <div class="chip">Proof is reusable</div>
          <h3>HTML, JSON, fixtures, and tests agree.</h3>
          <p>The generated public surface, API payload, fixture data, smoke checks, and README assets all describe the same escalation packet.</p>
        </article>
      </div>
    </section>`;
}

function navLinks(path: string) {
  return [
    ["/", "Overview"],
    ["/escalation-lane", "Escalation lane"],
    ["/handoff-ledger", "Handoff ledger"],
    ["/intervention-posture", "Intervention posture"],
    ["/verification", "Verification"],
    ["/docs", "Docs"]
  ]
    .map(([href, label]) => {
      const active = href === path ? ' class="active"' : "";
      return `<a${active} href="${href}">${label}</a>`;
    })
    .join("");
}

export function renderOverview() {
  const executiveSummary = summary();
  const lanes = escalationLane().slice(0, 4);
  const findings = riskMap().slice(0, 5);
  const cards = lanes
    .map(
      (item) => `<article class="card">
        <div class="chip">${escapeHtml(item.action)}</div>
        <h3>${escapeHtml(item.owner)}</h3>
        <p><strong>Audience:</strong> ${escapeHtml(item.audience)}</p>
        <p><strong>Escalation theme:</strong> ${escapeHtml(item.escalationTheme)}</p>
        <p><strong>Decision handoffs:</strong> ${item.decisionHandoffs} · <strong>Unresolved owners:</strong> ${item.unresolvedOwners}</p>
        <p><strong>Board confidence:</strong> ${item.boardConfidenceScore}</p>
        <p>${escapeHtml(item.nextMove)}</p>
      </article>`
    )
    .join("");

  const risks = findings
    .map(
      (item) =>
        `<li><strong>${escapeHtml(item.lane)}</strong> · risk ${item.compositeEscalationRiskScore} · confidence ${item.boardConfidenceScore} · $${item.valueAtStakeMillions}M at stake</li>`
    )
    .join("");

  return shell(
    productTitle,
    "/",
    `<section class="hero">
      <span class="eyebrow">Decision escalation</span>
      <h1>Where is decision routing becoming too indirect, ownerless, and confidence-eroding to stay board-safe?</h1>
      <p class="lede">Board Decision Escalation Map turns reroute depth, handoff sprawl, owner drift, evidence coverage, and board confidence into one executive packet for reroutes, named ownership, review adds, or scope holds.</p>
      <div class="nav">${navLinks("/")}</div>
      <div class="metrics">
        <div class="metric"><span class="metric-label">Escalation lanes</span><span class="metric-value">${executiveSummary.items}</span><div class="metric-copy">Modeled decision-escalation lanes in the current board packet.</div></div>
        <div class="metric"><span class="metric-label">Constrained lanes</span><span class="metric-value">${executiveSummary.constrainedLanes}</span><div class="metric-copy">Lanes with high handoff, owner, reroute, coverage, clarity, or confidence strain.</div></div>
        <div class="metric"><span class="metric-label">Reroute or owner fix</span><span class="metric-value">${executiveSummary.rerouteOrOwnerFixLanes}</span><div class="metric-copy">Lanes that already justify a route reset or final owner assignment before more scope is approved.</div></div>
        <div class="metric"><span class="metric-label">Value at stake</span><span class="metric-value">$${executiveSummary.valueAtStakeMillions}M</span><div class="metric-copy">Modeled exposure tied to unresolved escalation-path weaknesses.</div></div>
      </div>
    </section>
    <section class="section">
      <h2>Escalation lane</h2>
      <p class="lede">${escapeHtml(executiveSummary.boardMessage)}</p>
      <div class="grid">${cards}</div>
    </section>
    <section class="section">
      <h2>Board-visible escalation exposures</h2>
      <ul>${risks}</ul>
    </section>
    ${productDepthSection()}
    ${sharedPatternSection()}`,
    "Board-ready escalation-mapping surface for committee handoffs, owner drift, decision reroutes, and board-visible intervention paths."
  );
}

export function renderEscalationLane() {
  const rows = escalationLane()
    .map(
      (item) => `<tr>
        <td>${escapeHtml(item.owner)}</td>
        <td>${escapeHtml(item.audience)}</td>
        <td>${escapeHtml(item.action)}</td>
        <td>${escapeHtml(item.escalationTheme)}</td>
        <td>${item.decisionHandoffs}</td>
        <td>${item.unresolvedOwners}</td>
        <td>${item.boardConfidenceScore}</td>
      </tr>`
    )
    .join("");

  return shell(
    "Escalation lane",
    "/escalation-lane",
    `<section class="hero">
      <span class="eyebrow">Escalation lane</span>
      <h1>Each lane stays tied to one escalation theme, one board audience, one routing action, and one safe next move.</h1>
      <p class="lede">The escalation lane keeps board routing readable instead of hiding handoff sprawl and owner drift across scattered committee packets.</p>
      <div class="nav">${navLinks("/escalation-lane")}</div>
    </section>
    <section class="section table-wrap">
      <table>
        <thead><tr><th>Owner</th><th>Audience</th><th>Action</th><th>Escalation theme</th><th>Handoffs</th><th>Unresolved owners</th><th>Board confidence</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </section>`,
    "Decision-escalation view showing actions, handoff counts, owner gaps, and board-confidence strength."
  );
}

export function renderHandoffLedger() {
  const rows = handoffLedger()
    .map(
      (item) => `<tr>
        <td>${escapeHtml(item.lane)}</td>
        <td>${escapeHtml(item.escalationHeadline)}</td>
        <td>${escapeHtml(item.handoffSignal)}</td>
        <td>${escapeHtml(item.escalationOwner)}</td>
        <td>${item.decisionHandoffs}</td>
        <td>${item.rerouteDepth}</td>
        <td>${escapeHtml(item.requiredEvidence.join(", "))}</td>
      </tr>`
    )
    .join("");

  return shell(
    "Handoff ledger",
    "/handoff-ledger",
    `<section class="hero">
      <span class="eyebrow">Handoff ledger</span>
      <h1>Escalation headlines, reroute signals, named owners, handoff counts, and required evidence stay visible before another board packet gets bounced again.</h1>
      <p class="lede">This view makes it obvious which decision chains are truly routing problems and who must respond before leadership funds more scope.</p>
      <div class="nav">${navLinks("/handoff-ledger")}</div>
    </section>
    <section class="section table-wrap">
      <table>
        <thead><tr><th>Lane</th><th>Escalation headline</th><th>Handoff signal</th><th>Escalation owner</th><th>Handoffs</th><th>Reroute depth</th><th>Required evidence</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </section>`,
    "Handoff-ledger view for reroute pressure, named ownership, and board-visible evidence needs."
  );
}

export function renderInterventionPosture() {
  const rows = interventionPosture()
    .map(
      (item) => `<tr>
        <td>${escapeHtml(item.lane)}</td>
        <td>${escapeHtml(item.action)}</td>
        <td>${item.compositeEscalationRiskScore}</td>
        <td>${escapeHtml(item.handoffs.severity)}</td>
        <td>${escapeHtml(item.owner.severity)}</td>
        <td>${escapeHtml(item.reroute.severity)}</td>
        <td>${escapeHtml(item.coverage.severity)}</td>
        <td>${escapeHtml(item.boardConfidence.severity)}</td>
      </tr>`
    )
    .join("");

  return shell(
    "Intervention posture",
    "/intervention-posture",
    `<section class="hero">
      <span class="eyebrow">Intervention posture</span>
      <h1>See where leadership should reroute, name a final owner, add review coverage, or hold scope before escalation drag distorts the board story.</h1>
      <p class="lede">This posture view keeps decision-routing risk and confidence risk connected so leadership can intervene before handoff drag compounds across adjacent lanes.</p>
      <div class="nav">${navLinks("/intervention-posture")}</div>
    </section>
    <section class="section table-wrap">
      <table>
        <thead><tr><th>Lane</th><th>Action</th><th>Composite risk</th><th>Handoffs</th><th>Owner</th><th>Reroute</th><th>Coverage</th><th>Board confidence</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </section>`,
    "Intervention posture for decision-escalation severities, owner drift, reroute depth, and board-safe action."
  );
}

export function renderVerification() {
  const notes = verification().map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  return shell(
    "Verification",
    "/verification",
    `<section class="hero">
      <span class="eyebrow">Verification</span>
      <h1>How this decision-escalation packet is modeled and what it is safe to infer from it.</h1>
      <p class="lede">This route keeps the synthetic nature, routing assumptions, and reproducibility notes visible before anyone treats the sample as live board evidence.</p>
      <div class="nav">${navLinks("/verification")}</div>
    </section>
    <section class="section">
      <ul>${notes}</ul>
    </section>`,
    "Verification notes for the Board Decision Escalation Map sample and modeled outputs."
  );
}

export function renderDocs() {
  return shell(
    "Docs",
    "/docs",
    `<section class="hero">
      <span class="eyebrow">Docs</span>
      <h1>Board Decision Escalation Map docs</h1>
      <p class="lede">This surface packages board-readable escalation-routing signals into reproducible routes and JSON outputs.</p>
      <div class="nav">${navLinks("/docs")}</div>
    </section>
    <section class="section">
      <ul>
        <li><code>/escalation-lane</code> keeps actions, themes, and next moves readable.</li>
        <li><code>/handoff-ledger</code> compares reroute signals, owner gaps, and evidence needs.</li>
        <li><code>/intervention-posture</code> shows which lanes should reroute, name owners, add reviews, or hold.</li>
        <li><code>/api/payload</code> exposes the reproducible decision-escalation packet.</li>
      </ul>
      <pre>${escapeHtml(JSON.stringify(payload(), null, 2))}</pre>
    </section>
    ${productDepthSection()}
    ${sharedPatternSection()}`,
    "Product documentation for Board Decision Escalation Map and its board-ready routes."
  );
}
