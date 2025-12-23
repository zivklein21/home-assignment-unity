import { Router } from "express";
import { PurchasesController } from "../controllers/purchase.controller";

const router = Router();

router.get("/health", PurchasesController.health);
router.get("/purchases/:userId", PurchasesController.getByUserId);

export default router;