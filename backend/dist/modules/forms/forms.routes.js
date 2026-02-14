import { Router } from "express";
import { createForm, submitForm, getSubmissions } from "./forms.controller.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";
const router = Router();
// Create form
router.post("/", authMiddleware, createForm);
// Submit form (public or protected — your choice)
router.post("/:id/submit", submitForm);
// Get submissions
router.get("/:id/submissions", authMiddleware, getSubmissions);
export default router;
//# sourceMappingURL=forms.routes.js.map