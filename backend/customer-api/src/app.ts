import express from "express";
import purchasesRoutes from "./routes/purchase.route";

/**
 * Creates and configures the Express application instance
 * for the Customer API service.
 */
export function createApp() {
  const app = express();
  app.use(express.json());
  app.use(purchasesRoutes);
  return app;
}