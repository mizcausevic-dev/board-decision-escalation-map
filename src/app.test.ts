import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "./app.js";

describe("board-decision-escalation-map app", () => {
  const app = createApp();

  it("serves the overview route", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toContain("Board Decision Escalation Map");
  });

  it("serves the escalation lane route", async () => {
    const response = await request(app).get("/escalation-lane");
    expect(response.status).toBe(200);
  });

  it("serves the handoff ledger route", async () => {
    const response = await request(app).get("/handoff-ledger");
    expect(response.status).toBe(200);
  });

  it("serves the intervention posture route", async () => {
    const response = await request(app).get("/intervention-posture");
    expect(response.status).toBe(200);
  });

  it("serves the payload API", async () => {
    const response = await request(app).get("/api/payload");
    expect(response.status).toBe(200);
    expect(response.body.report.summary.items).toBeGreaterThan(0);
  });
});
