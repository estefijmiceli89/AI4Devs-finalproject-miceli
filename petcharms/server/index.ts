import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleGetProducts } from "./routes/products";
import { handleGetShapes, handleGetColors } from "./routes/shapes";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  // MVP API Routes (v1)
  app.get("/api/v1/products", handleGetProducts);
  app.get("/api/v1/shapes", handleGetShapes);
  app.get("/api/v1/colors", handleGetColors);

  return app;
}
