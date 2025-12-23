import { Purchase } from "../models/purchase.model";
import { PurchaseDoc } from "../models/purchase.model";

/**
 * Purchase Service
 *
 * This service encapsulates all data-access logic related to purchases.
 * It acts as an abstraction layer between the controllers / Kafka consumer
 * and the database model, in order to keep business logic decoupled
 * from persistence details.
 */

/**
 * Persists a purchase event in the database.
 *
 * This function is primarily used by the Kafka consumer to store
 * purchase events that were produced asynchronously by the Web Server.
 */
export async function savePurchase(p: PurchaseDoc) {
  return Purchase.create(p);
}

/**
 * Retrieves all purchases for a specific user.
 *
 * This function is used by the Customer API controller to serve
 * HTTP requests originating from the Web Server.
 *
 * Results are sorted by timestamp in descending order to return
 * the most recent purchases first.
 *
 * The `lean()` call is used to return plain JavaScript objects
 * instead of full Mongoose documents for better performance
 * in read-only operations.
 */
export async function getPurchasesByUser(userId: string) {
  return Purchase.find({ userid: userId })
    .sort({ timestamp: -1 })
    .lean();
}