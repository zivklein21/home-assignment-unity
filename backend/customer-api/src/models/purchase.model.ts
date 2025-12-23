import mongoose, { Schema } from "mongoose";

/**
 * PurchaseDoc
 *
 * Represents a single purchase record stored in MongoDB.
 * Each document corresponds to a purchase event consumed from Kafka
 * and persisted by the Customer API service.
 */
export type PurchaseDoc = {
  username: string;
  userid: string;
  price: number;
  timestamp: string;
};

/**
 * PurchaseSchema
 *
 * Mongoose schema used to store purchase data.
 * The schema reflects the structure of the purchase events
 * received from Kafka and enforces basic validation at the database level.
 */
const PurchaseSchema = new Schema<PurchaseDoc>(
  {
    username: { type: String, required: true },
    userid: { type: String, required: true, index: true },
    price: { type: Number, required: true },
    timestamp: { type: String, required: true },
  },
  { timestamps: true }
);

/**
 * Purchase Model
 *
 * Exposes the Purchase collection to the service layer.
 * Used by the Kafka consumer to persist events and
 * by the HTTP API to retrieve purchase history.
 */
export const Purchase = mongoose.model<PurchaseDoc>("Purchase", PurchaseSchema);