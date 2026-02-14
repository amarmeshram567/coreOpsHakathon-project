import { Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware.js";
import { completeOnboarding } from "./onboarding.controller.js";
const router = Router();
router.post("/complete", authMiddleware, completeOnboarding);
export default router;
//# sourceMappingURL=onboarding.routes.js.map