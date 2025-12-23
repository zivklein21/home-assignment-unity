import mongoose, { Schema } from "mongoose";

export type PurchaseDoc = {
  username: string;
  userid: string;
  price: number;
  timestamp: string;
};

const PurchaseSchema = new Schema<PurchaseDoc>(
  {
    username: { type: String, required: true },
    userid: { type: String, required: true, index: true },
    price: { type: Number, required: true },
    timestamp: { type: String, required: true },
  },
  { timestamps: true }
);

export const Purchase = mongoose.model<PurchaseDoc>("Purchase", PurchaseSchema);