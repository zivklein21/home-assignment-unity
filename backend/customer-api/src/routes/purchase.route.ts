import { Router } from "express";
import { PurchasesController } from "../controllers/purchase.controller";

/**
 * Purchases Routes (Customer API)
 *
 * Defines the HTTP routes exposed by the Customer API service.
 * These routes are consumed by the Customer-facing Web Server
 * to retrieve customer-related data.
 */
const router = Router();

/**
 * Health check endpoint.
 *
 * Used by Kubernetes health probes and monitoring systems
 * to verify that the Customer API service is alive and responsive.
 */
router.get("/health", PurchasesController.health);

/**
 * Retrieve purchase history for a specific user.
 *
 * This endpoint is called by the Web Server in order to
 * fetch and display the user's purchase list.
 * The userId is provided as a path parameter.
 */
router.get("/purchases/:userId", PurchasesController.getByUserId);

export default router;