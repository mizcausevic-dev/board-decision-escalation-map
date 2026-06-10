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

  it("serves verification and docs routes", async () => {
    const verificationResponse = await request(app).get("/verification");
    expect(verificationResponse.status).toBe(200);
    expect(verificationResponse.text).toContain("modeled");

    const docsResponse = await request(app).get("/docs");
    expect(docsResponse.status).toBe(200);
    expect(docsResponse.text).toContain("/api/payload");
  });

  it("serves board packet JSON endpoints", async () => {
    const endpoints = [
      "/api/dashboard/summary",
      "/api/escalation-lane",
      "/api/handoff-ledger",
      "/api/intervention-posture",
      "/api/risk-map",
      "/api/verification",
      "/api/sample"
    ];

    for (const endpoint of endpoints) {
      const response = await request(app).get(endpoint);
      expect(response.status).toBe(200);
      expect(response.type).toMatch(/json/);
    }
  });

  it("serves the payload API", async () => {
    const response = await request(app).get("/api/payload");
    expect(response.status).toBe(200);
    expect(response.body.report.summary.items).toBeGreaterThan(0);
  });
});
