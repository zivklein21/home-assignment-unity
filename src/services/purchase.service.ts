import { Purchase } from "../models/purchase.model";

export async function getPurchasesByUser(userId: string) {
  return Purchase.find({ userid: userId })
    .sort({ timestamp: -1 })
    .lean();
}