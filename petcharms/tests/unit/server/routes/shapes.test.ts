import { describe, it, expect, beforeEach, vi } from "vitest";
import { Request, Response } from "express";
import {
  handleGetShapes,
  handleGetColors,
} from "../../../../server/routes/shapes";

type Shape = {
  id: string;
  name: string;
  emoji: string;
  description: string;
};

type Color = {
  id: string;
  name: string;
  hex: string;
  rgb: string;
};

type ShapesResponse = {
  success?: boolean;
  error?: null;
  data?: Shape[];
};

type ColorsResponse = {
  success?: boolean;
  error?: null;
  data?: Color[];
};

describe("handleGetShapes", () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let jsonResponse: ShapesResponse;

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

  it("should return 200 status code", () => {
    handleGetShapes(mockReq as Request, mockRes as Response);
    expect(mockRes.status).toHaveBeenCalledWith(200);
  });

  it("should return success: true", () => {
    handleGetShapes(mockReq as Request, mockRes as Response);
    expect(jsonResponse.success).toBe(true);
  });

  it("should return shapes array", () => {
    handleGetShapes(mockReq as Request, mockRes as Response);
    expect(Array.isArray(jsonResponse.data)).toBe(true);
    expect(jsonResponse.data.length).toBeGreaterThan(0);
  });

  it("should return shapes with correct structure", () => {
    handleGetShapes(mockReq as Request, mockRes as Response);
    const shape = jsonResponse.data[0];

    expect(shape).toHaveProperty("id");
    expect(shape).toHaveProperty("name");
    expect(shape).toHaveProperty("emoji");
    expect(shape).toHaveProperty("description");
  });

  it("should return at least 30 shapes", () => {
    handleGetShapes(mockReq as Request, mockRes as Response);
    expect(jsonResponse.data.length).toBeGreaterThanOrEqual(30);
  });

  it("should return shapes with valid emoji", () => {
    handleGetShapes(mockReq as Request, mockRes as Response);
    const shapes = jsonResponse.data ?? [];

    shapes.forEach((shape) => {
      expect(shape.emoji).toBeTruthy();
      expect(typeof shape.emoji).toBe("string");
      expect(shape.emoji.length).toBeGreaterThan(0);
    });
  });

  it("should return error: null", () => {
    handleGetShapes(mockReq as Request, mockRes as Response);
    expect(jsonResponse.error).toBeNull();
  });

  it("should include specific shapes", () => {
    handleGetShapes(mockReq as Request, mockRes as Response);
    const shapeIds = (jsonResponse.data ?? []).map((shape) => shape.id);

    expect(shapeIds).toContain("shape-unicorn");
    expect(shapeIds).toContain("shape-heart-paw");
    expect(shapeIds).toContain("shape-dog-paw");
  });
});

describe("handleGetColors", () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let jsonResponse: ColorsResponse;

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

  it("should return 200 status code", () => {
    handleGetColors(mockReq as Request, mockRes as Response);
    expect(mockRes.status).toHaveBeenCalledWith(200);
  });

  it("should return success: true", () => {
    handleGetColors(mockReq as Request, mockRes as Response);
    expect(jsonResponse.success).toBe(true);
  });

  it("should return colors array", () => {
    handleGetColors(mockReq as Request, mockRes as Response);
    expect(Array.isArray(jsonResponse.data)).toBe(true);
    expect(jsonResponse.data.length).toBeGreaterThan(0);
  });

  it("should return colors with correct structure", () => {
    handleGetColors(mockReq as Request, mockRes as Response);
    const color = jsonResponse.data[0];

    expect(color).toHaveProperty("id");
    expect(color).toHaveProperty("name");
    expect(color).toHaveProperty("hex");
    expect(color).toHaveProperty("rgb");
  });

  it("should return exactly 10 colors", () => {
    handleGetColors(mockReq as Request, mockRes as Response);
    expect(jsonResponse.data.length).toBe(10);
  });

  it("should return colors with valid hex format", () => {
    handleGetColors(mockReq as Request, mockRes as Response);
    const colors = jsonResponse.data ?? [];

    colors.forEach((color) => {
      expect(color.hex).toMatch(/^#[0-9A-F]{6}$/i);
    });
  });

  it("should return colors with valid rgb format", () => {
    handleGetColors(mockReq as Request, mockRes as Response);
    const colors = jsonResponse.data ?? [];

    colors.forEach((color) => {
      expect(color.rgb).toMatch(/^\d+,\s*\d+,\s*\d+$/);
    });
  });

  it("should include orange color", () => {
    handleGetColors(mockReq as Request, mockRes as Response);
    const colors = jsonResponse.data ?? [];
    const orangeColor = colors.find((color) => color.id === "color-orange");

    expect(orangeColor).toBeDefined();
    expect(orangeColor.name).toBe("Orange");
    expect(orangeColor.hex).toBe("#FF6B35");
  });

  it("should return error: null", () => {
    handleGetColors(mockReq as Request, mockRes as Response);
    expect(jsonResponse.error).toBeNull();
  });
});
