import { describe, it, expect } from "vitest";
import request from "supertest";
import { createServer } from "@server/index";

describe("GET /api/v1/colors", () => {
  const app = createServer();

  it("should return 200 OK", async () => {
    const response = await request(app).get("/api/v1/colors");
    expect(response.status).toBe(200);
  });

  it("should return Content-Type application/json", async () => {
    const response = await request(app).get("/api/v1/colors");
    expect(response.headers["content-type"]).toMatch(/application\/json/);
  });

  it("should return success: true", async () => {
    const response = await request(app).get("/api/v1/colors");
    expect(response.body.success).toBe(true);
  });

  it("should return colors array", async () => {
    const response = await request(app).get("/api/v1/colors");
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.data.length).toBe(10);
  });

  it("should return colors with correct structure", async () => {
    const response = await request(app).get("/api/v1/colors");
    const color = response.body.data[0];

    expect(color).toHaveProperty("id");
    expect(color).toHaveProperty("name");
    expect(color).toHaveProperty("hex");
    expect(color).toHaveProperty("rgb");
  });

  it("should return colors with valid hex format", async () => {
    const response = await request(app).get("/api/v1/colors");
    const colors = response.body.data;

    colors.forEach((color: any) => {
      expect(color.hex).toMatch(/^#[0-9A-F]{6}$/i);
    });
  });

  it("should return colors with valid rgb format", async () => {
    const response = await request(app).get("/api/v1/colors");
    const colors = response.body.data;

    colors.forEach((color: any) => {
      expect(color.rgb).toMatch(/^\d+,\s*\d+,\s*\d+$/);
    });
  });

  it("should include orange color", async () => {
    const response = await request(app).get("/api/v1/colors");
    const colors = response.body.data;
    const orangeColor = colors.find((c: any) => c.id === "color-orange");

    expect(orangeColor).toBeDefined();
    expect(orangeColor.name).toBe("Orange");
    expect(orangeColor.hex).toBe("#FF6B35");
  });
});
