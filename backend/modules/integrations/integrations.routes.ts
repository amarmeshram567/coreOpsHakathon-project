import { Router } from "express"
import { getIntegrations } from "./integrations.controller.js"
import { authMiddleware } from "../../middleware/auth.middleware.js"

const router = Router()

router.get("/", authMiddleware, getIntegrations)

export default router
