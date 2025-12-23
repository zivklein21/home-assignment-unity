import express from "express";
import purchasesRoutes from "./routes/purchase.route";

export function createApp() {
  const app = express();
  app.use(express.json());
  app.use(purchasesRoutes);
  return app;
}