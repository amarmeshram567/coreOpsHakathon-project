import { Router } from "express"
import {
    addStaff,
    getStaff,
    updateRole,
    removeStaff
} from "./staff.controller.js"
import { authMiddleware } from "../../middleware/auth.middleware.js"

const router = Router()

router.post("/", authMiddleware, addStaff)
router.get("/", authMiddleware, getStaff)
router.patch("/:id", authMiddleware, updateRole)
router.delete("/:id", authMiddleware, removeStaff)

export default router
