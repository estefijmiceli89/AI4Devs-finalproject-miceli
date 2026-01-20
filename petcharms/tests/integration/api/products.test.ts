import { describe, it, expect } from "vitest";
import request from "supertest";
import { createServer } from "@server/index";

describe("GET /api/v1/products", () => {
  const app = createServer();

  it("should return 200 OK", async () => {
    const response = await request(app).get("/api/v1/products");
    expect(response.status).toBe(200);
  });

  it("should return Content-Type application/json", async () => {
    const response = await request(app).get("/api/v1/products");
    expect(response.headers["content-type"]).toMatch(/application\/json/);
  });

  it("should return success: true", async () => {
    const response = await request(app).get("/api/v1/products");
    expect(response.body.success).toBe(true);
  });

  it("should return error: null", async () => {
    const response = await request(app).get("/api/v1/products");
    expect(response.body.error).toBeNull();
  });

  it("should return products array", async () => {
    const response = await request(app).get("/api/v1/products");
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.data.length).toBeGreaterThan(0);
  });

  it("should return product with correct structure", async () => {
    const response = await request(app).get("/api/v1/products");
    const product = response.body.data[0];

    expect(product).toHaveProperty("id");
    expect(product).toHaveProperty("name");
    expect(product).toHaveProperty("description");
    expect(product).toHaveProperty("price");
    expect(product).toHaveProperty("image_url");
    expect(product).toHaveProperty("created_at");
    expect(product).toHaveProperty("updated_at");
  });

  it("should return correct product name", async () => {
    const response = await request(app).get("/api/v1/products");
    expect(response.body.data[0].name).toBe("Pet Charm Collar");
  });
});
