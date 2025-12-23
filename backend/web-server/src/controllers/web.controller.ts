import { Request, Response } from "express";
import { fetchUserPurchases } from "../services/web.service";


/**
 * Producer interface
 *
 * Abstracts the Kafka producer implementation.
 * This allows the controller to remain decoupled from Kafka-specific logic
 * and improves testability and flexibility.
 */
type Producer = {
  publish: (input: { topic: string; key: string; value: any }) => Promise<void>;
};

/**
 * WebController
 *
 * Controller for the Customer-facing Web Server.
 * Handles HTTP requests coming directly from end users
 * and coordinates communication with Kafka and the Customer API.
 */
export class WebController {

  /**
   * Health check endpoint.
   *
   * Used by Kubernetes health probes and monitoring tools
   * to verify that the Web Server is running and responsive.
   */
  static health(_req: Request, res: Response) {
    return res.json({ ok: true });
  }

  /**
   * Create endpoint.
   *
   * Dependencies such as the Kafka producer and Customer API base URL
   * are injected at creation time to avoid global state and
   * improve configurability across environments.
   */
  static create(opts: { producer: Producer; topic: string; customerApiBaseUrl: string }) {
    const { producer, topic, customerApiBaseUrl } = opts;

    return {

      /**
       * Handles purchase creation requests from end users.
       *
       * Instead of writing directly to the database, this endpoint
       * publishes a purchase event to Kafka.
       * This enables asynchronous processing and decouples
       * user-facing requests from persistence logic.
       */
      buy: async (req: Request, res: Response) => {
        const { username, userid, price, timestamp } = req.body ?? {};

        if (!username || !userid || typeof price !== "number") {
          return res.status(400).json({
            error: "Invalid body. Expected { username, userid, price, timestamp? }",
          });
        }

        const event = {
          username: String(username),
          userid: String(userid),
          price: Number(price),
          timestamp: timestamp ? new Date(timestamp).toISOString() : new Date().toISOString(),
        };

        await producer.publish({ topic, key: event.userid, value: event });

        return res.status(202).json({
          message: "Buy event published to Kafka",
          event,
        });
      },

      /**
       * Get User Purchases endpoint.
       *
       * This endpoint forwards the request to the Customer API,
       * which owns the purchase data and database access.
       * The Web Server acts as an HTTP client and proxy in this flow.
       */
      getAllUserBuys: async (req: Request, res: Response) => {
        const userid = String(req.query.userid || "").trim();
        if (!userid) return res.status(400).json({ error: "userid is required" });

        const r = await fetchUserPurchases(customerApiBaseUrl, userid);
        return res.status(r.status).type(r.contentType).send(r.bodyText);
      },
    };
  }
}