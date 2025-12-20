import express from "express";
import purchasesRoutes from "./routes/purchase.route";

export function buildApp() {
  const app = express();
  app.use(express.json());

  app.use("/", purchasesRoutes);

  app.use((err: any, _req: any, res: any, _next: any) => {
    console.error("Unhandled error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  });

  return app;
}