import { describe, it, expect, beforeEach, vi } from "vitest";
import { Request, Response } from "express";

// Handler function extracted from server/index.ts
const handlePing = (_req: Request, res: Response) => {
  const ping = process.env.PING_MESSAGE ?? "ping";
  res.json({ message: ping });
};

describe("GET /api/ping handler", () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let jsonResponse: { message?: string };

  beforeEach(() => {
    jsonResponse = {};
    mockReq = {};
    mockRes = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn((data) => {
        jsonResponse = data;
        return mockRes;
      }),
    } as Partial<Response>;
  });

  it("should return message property", () => {
    handlePing(mockReq as Request, mockRes as Response);
    expect(jsonResponse).toHaveProperty("message");
  });

  it("should return default ping message when env var not set", () => {
    delete process.env.PING_MESSAGE;
    handlePing(mockReq as Request, mockRes as Response);
    expect(jsonResponse.message).toBe("ping");
  });

  it("should return test-ping message in test environment", () => {
    process.env.PING_MESSAGE = "test-ping";
    handlePing(mockReq as Request, mockRes as Response);
    expect(jsonResponse.message).toBe("test-ping");
  });

  it("should return string message", () => {
    handlePing(mockReq as Request, mockRes as Response);
    expect(typeof jsonResponse.message).toBe("string");
  });
});
