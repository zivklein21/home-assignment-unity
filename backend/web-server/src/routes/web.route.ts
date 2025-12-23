import { Router } from "express";
import { WebController } from "../controllers/web.controller";

export function buildWebRoutes(controller: { buy: any; getAllUserBuys: any }) {
  const router = Router();
  router.get("/", (req, res) => {
    res.send("Web server is running");
  });

  router.get("/health", WebController.health);
  router.post("/buy", controller.buy);
  router.get("/getAllUserBuys", controller.getAllUserBuys);

  return router;
}