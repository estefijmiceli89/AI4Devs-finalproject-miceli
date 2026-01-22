import { describe, it, expect, beforeEach, vi } from "vitest";
import { Request, Response, NextFunction } from "express";
import { handleGetProducts } from "../../../../server/routes/products";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  created_at: string;
  updated_at: string;
};

type ProductsResponse = {
  success?: boolean;
  error?: null;
  data?: Product[];
};

describe("handleGetProducts", () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext: NextFunction;
  let jsonResponse: ProductsResponse;

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
    mockNext = vi.fn() as NextFunction;
  });

  it("should return 200 status code", () => {
    handleGetProducts(mockReq as Request, mockRes as Response, mockNext);
    expect(mockRes.status).toHaveBeenCalledWith(200);
  });

  it("should return success: true", () => {
    handleGetProducts(mockReq as Request, mockRes as Response, mockNext);
    expect(jsonResponse.success).toBe(true);
  });

  it("should return error: null", () => {
    handleGetProducts(mockReq as Request, mockRes as Response, mockNext);
    expect(jsonResponse.error).toBeNull();
  });

  it("should return products array", () => {
    handleGetProducts(mockReq as Request, mockRes as Response, mockNext);
    expect(Array.isArray(jsonResponse.data)).toBe(true);
    expect(jsonResponse.data.length).toBeGreaterThan(0);
  });

  it("should return product with correct structure", () => {
    handleGetProducts(mockReq as Request, mockRes as Response, mockNext);
    const product = jsonResponse.data[0];

    expect(product).toHaveProperty("id");
    expect(product).toHaveProperty("name");
    expect(product).toHaveProperty("description");
    expect(product).toHaveProperty("price");
    expect(product).toHaveProperty("image_url");
    expect(product).toHaveProperty("created_at");
    expect(product).toHaveProperty("updated_at");
  });

  it("should return correct product data", () => {
    handleGetProducts(mockReq as Request, mockRes as Response, mockNext);
    const product = jsonResponse.data[0];

    expect(product.name).toBe("Pet Charm Collar");
    expect(product.price).toBe(15.0);
    expect(typeof product.id).toBe("string");
    expect(product.id).toBe("550e8400-e29b-41d4-a716-446655440000");
  });

  it("should return valid ISO date strings", () => {
    handleGetProducts(mockReq as Request, mockRes as Response, mockNext);
    const product = jsonResponse.data[0];

    expect(product.created_at).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
    expect(product.updated_at).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
  });

  it("should return exactly one product", () => {
    handleGetProducts(mockReq as Request, mockRes as Response, mockNext);
    expect(jsonResponse.data.length).toBe(1);
  });
});
