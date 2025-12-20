import mongoose from "mongoose";

const PurchaseSchema = new mongoose.Schema(
  {
    userid: { type: String, required: true, index: true },
    username: { type: String, required: true },
    price: { type: Number, required: true },
    timestamp: { type: Date, required: true },

    kafkaKey: { type: String, required: false }
  },
  { timestamps: true }
);

export const Purchase = mongoose.model("Purchase", PurchaseSchema);