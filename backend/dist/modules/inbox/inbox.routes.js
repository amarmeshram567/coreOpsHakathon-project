import { Router } from "express";
import { getInbox, sendMessage } from "./inbox.controller.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";
const router = Router();
router.get("/", authMiddleware, getInbox);
router.post("/", authMiddleware, sendMessage);
export default router;
//# sourceMappingURL=inbox.routes.js.map