import { Router } from "express";
import { addItem, getItems, updateItem, deleteItem } from "./inventory.controller.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";
const router = Router();
router.post("/", authMiddleware, addItem);
router.get("/", authMiddleware, getItems);
router.patch("/:id", authMiddleware, updateItem);
router.delete("/:id", authMiddleware, deleteItem);
export default router;
//# sourceMappingURL=inventory.routes.js.map