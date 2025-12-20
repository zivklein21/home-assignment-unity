import { Purchase } from "../models/purchase.model";
import { PurchaseDoc } from "../models/purchase.model";

export async function savePurchase(p: PurchaseDoc) {
  return Purchase.create(p);
}

export async function getPurchasesByUser(userId: string) {
  return Purchase.find({ userid: userId })
    .sort({ timestamp: -1 })
    .lean();
}