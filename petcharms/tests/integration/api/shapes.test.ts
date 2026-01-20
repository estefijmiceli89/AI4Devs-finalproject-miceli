import { describe, it, expect } from "vitest";
import request from "supertest";
import { createServer } from "@server/index";

describe("GET /api/v1/shapes", () => {
  const app = createServer();

  it("should return 200 OK", async () => {
    const response = await request(app).get("/api/v1/shapes");
    expect(response.status).toBe(200);
  });

  it("should return Content-Type application/json", async () => {
    const response = await request(app).get("/api/v1/shapes");
    expect(response.headers["content-type"]).toMatch(/application\/json/);
  });

  it("should return success: true", async () => {
    const response = await request(app).get("/api/v1/shapes");
    expect(response.body.success).toBe(true);
  });

  it("should return shapes array", async () => {
    const response = await request(app).get("/api/v1/shapes");
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.data.length).toBeGreaterThanOrEqual(30);
  });

  it("should return shapes with correct structure", async () => {
    const response = await request(app).get("/api/v1/shapes");
    const shape = response.body.data[0];

    expect(shape).toHaveProperty("id");
    expect(shape).toHaveProperty("name");
    expect(shape).toHaveProperty("emoji");
    expect(shape).toHaveProperty("description");
  });

  it("should include specific shapes", async () => {
    const response = await request(app).get("/api/v1/shapes");
    const shapeIds = response.body.data.map((s: any) => s.id);

    expect(shapeIds).toContain("shape-unicorn");
    expect(shapeIds).toContain("shape-heart-paw");
  });
});
