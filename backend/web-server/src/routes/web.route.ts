import { Router } from "express";
import { WebController } from "../controllers/web.controller";

/**
 * Web Server Routes
 *
 * Defines the HTTP routes exposed by the Web Server service.
 * These routes are directly accessed by end users and act as
 * the entry point into the system.
 *
 * The routes delegate request handling to the WebController,
 * which coordinates communication with Kafka and the Customer API.
 */
export function buildWebRoutes(controller: { buy: any; getAllUserBuys: any }) {
  const router = Router();

  /**
   * Health check endpoint.
   *
   * Used by Kubernetes health probes and monitoring systems
   * to validate service availability.
   */
  router.get("/health", WebController.health);

  /**
   * Purchase creation endpoint.
   *
   * Accepts purchase requests from users and forwards them
   * to Kafka via the WebController for asynchronous processing.
   */
  router.post("/buy", controller.buy);

  /**
   * Retrieve purchase history endpoint.
   *
   * Forwards user purchase history requests to the Customer API,
   * which owns the purchase data and database access.
   */
  router.get("/getAllUserBuys", controller.getAllUserBuys);

  return router;
}