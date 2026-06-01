# Board Decision Escalation Map

Board-ready escalation-mapping surface for committee handoffs, owner drift, decision reroutes, and board-visible intervention paths across the executive estate.

- Live: `https://escalate-map.kineticgain.com/`
- Repo: `mizcausevic-dev/board-decision-escalation-map`

## Why this matters

Leaders need more than status labels. They need one surface that shows where committee handoffs, routing paths, and owner ambiguity are compounding board-visible drag.

## What it includes

- TypeScript executive-intelligence surface for escalation mapping with modeled routing lanes, owner drift, committee handoffs, and board-safe intervention posture
- synthetic executive lanes across AI, identity, revenue, FinTech, biotech, procurement, and public-sector readiness
- reusable outputs for escalation lanes, handoff ledgers, intervention packets, and board-ready operating memos
- prerendered static site, JSON payloads, screenshots, and docs

## Routes

- `/`
- `/escalation-lane`
- `/handoff-ledger`
- `/intervention-posture`
- `/verification`
- `/docs`

## Local run

```bash
cd board-decision-escalation-map
npm install
npm run verify
npm run prerender
npm run render:assets
```

## CLI

```bash
npx board-decision-escalation-map fixtures/board-decision-escalation-map.json --format summary
npx board-decision-escalation-map fixtures/board-decision-escalation-map-clean.json --format json
```

## Docs

- [Architecture](docs/architecture.md)
- [Origin](docs/ORIGIN.md)
- [Kinetic Gain Embedded](docs/KINETIC_GAIN_EMBEDDED.md)

## Screenshots

![Overview](screenshots/01-overview-proof.png)
![Escalation lane](screenshots/02-escalation-lane-proof.png)
![Handoff ledger](screenshots/03-handoff-ledger-proof.png)
![Intervention posture](screenshots/04-intervention-posture-proof.png)
