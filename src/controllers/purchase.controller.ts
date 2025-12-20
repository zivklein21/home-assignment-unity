import { Request, Response, NextFunction } from "express";
import { getPurchasesByUser } from "../services/purchase.service";

export class PurchasesController {
  static health(_req: Request, res: Response) {
    return res.json({ ok: true });
  }

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