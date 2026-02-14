import { Router } from "express"
import {
    createWorkspace,
    getWorkspace,
    updateWorkspace
} from "./workspace.controller.js"
import { authMiddleware } from "../../middleware/auth.middleware.js"

const router = Router()

router.post("/", authMiddleware, createWorkspace)
router.get("/", authMiddleware, getWorkspace)
router.patch("/", authMiddleware, updateWorkspace)

export default router
