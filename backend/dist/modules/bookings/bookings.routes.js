import { Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware.js";
import { createBooking, getBookings, getBookingById, updateBooking, deleteBooking } from "./bookings.controller.js";
const router = Router();
router.post("/", authMiddleware, createBooking);
router.get("/", authMiddleware, getBookings);
router.get("/:id", authMiddleware, getBookingById);
router.patch("/:id", authMiddleware, updateBooking);
router.delete("/:id", authMiddleware, deleteBooking);
export default router;
//# sourceMappingURL=bookings.routes.js.map