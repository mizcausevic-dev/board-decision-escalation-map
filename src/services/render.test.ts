import { describe, expect, it } from "vitest";
import { renderDocs, renderOverview } from "./render.js";

describe("render", () => {
  it("includes the product title in the overview", () => {
    expect(renderOverview()).toContain("Board Decision Escalation Map");
  });

  it("renders docs payload guidance", () => {
    expect(renderDocs()).toContain("/api/payload");
  });

  it("renders product depth and portfolio wayfinding", () => {
    const html = renderOverview();
    expect(html).toContain("Product depth");
    expect(html).toContain("What these repos have in common");
    expect(html).toContain("portfolio.kineticgain.com");
    expect(html).toContain("board-decision-escalation-map");
  });
});
