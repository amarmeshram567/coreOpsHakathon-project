import { Router } from "express"
import { authMiddleware } from "../../middleware/auth.middleware.js"
import { updateSettings } from "./settings.controller.js"

const router = Router()

router.patch("/", authMiddleware, updateSettings)

export default router
