import { describe, it, expect } from "vitest";
import request from "supertest";
import { createServer } from "@server/index";

describe("GET /api/ping", () => {
  const app = createServer();

  it("should return 200 OK", async () => {
    const response = await request(app).get("/api/ping");
    expect(response.status).toBe(200);
  });

  it("should return Content-Type application/json", async () => {
    const response = await request(app).get("/api/ping");
    expect(response.headers["content-type"]).toMatch(/application\/json/);
  });

  it("should return message property", async () => {
    const response = await request(app).get("/api/ping");
    expect(response.body).toHaveProperty("message");
  });

  it("should return string message", async () => {
    const response = await request(app).get("/api/ping");
    expect(typeof response.body.message).toBe("string");
  });
});
