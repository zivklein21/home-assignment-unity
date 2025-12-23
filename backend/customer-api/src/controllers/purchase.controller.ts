import { Request, Response, NextFunction } from "express";
import { getPurchasesByUser } from "../services/purchase.service";


/**
 * PurchasesController (Customer API)
 *
 * This controller belongs to the Customer API service.
 * It handles HTTP requests originating from the Web Server service
 * and exposes customer-related data via a REST interface.
 *
 * The controller acts as an integration boundary between services,
 * while delegating all business logic and data access to the service layer.
 */
export class PurchasesController {

  /**
   * Health check endpoint.
   *
   * Used by Kubernetes readiness/liveness probes and monitoring tools
   * to verify that the Customer API service is running and reachable.
   * This endpoint performs no external calls to ensure fast responses.
   */
  static health(_req: Request, res: Response) {
    return res.json({ ok: true });
  }

  /**
   * Retrieves all purchases for a specific user.
   *
   * This endpoint is called by the Web Server service in order to
   * display user purchase history to the end user.
   *
   * The userId is provided as a route parameter and validated before use.
   * Data retrieval is delegated to the service layer to keep HTTP logic
   * separate from business and persistence concerns.
   */
  static async getByUserId(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = String(req.params.userId || "").trim();
      if (!userId) return res.status(400).json({ error: "userId is required" });

      const data = await getPurchasesByUser(userId);
      return res.json(data);
    } catch (err) {
      return next(err);
    }
  }
}