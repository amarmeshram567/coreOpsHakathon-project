import { Request, Response } from "express"
import { v4 as uuid } from "uuid"
import { bookingRepo } from "../../repositories/booking.repo.js"
import { auditService } from "../../services/audit.service.js"

export const createBooking = async (req: any, res: Response) => {
    const booking = await bookingRepo.create({
        id: uuid(),
        workspace_id: req.user.workspace_id,
        ...req.body
    })

    await auditService.log(
        req.user.workspace_id,
        req.user.id,
        "BOOKING_CREATED"
    )

    res.status(201).json(booking)
}

export const getBookings = async (req: any, res: Response) => {
    const { page = 1, limit = 10 } = req.query
    const offset = (page - 1) * limit

    const bookings = await bookingRepo.findAll(
        req.user.workspace_id,
        Number(limit),
        Number(offset)
    )

    res.json(bookings)
}

export const cancelBooking = async (req: any, res: Response) => {
    await bookingRepo.updateStatus(req.params.id, "CANCELLED")

    await auditService.log(
        req.user.workspace_id,
        req.user.id,
        "BOOKING_CANCELLED"
    )

    res.json({ message: "Booking cancelled" })
}


export const getBookingById = async (req: any, res: Response) => {
    const booking = await bookingRepo.findById(
        req.params.id,
        req.user.workspace_id
    )

    if (!booking)
        return res.status(404).json({ message: "Not found" })

    res.json(booking)
}

export const updateBooking = async (req: any, res: Response) => {
    const booking = await bookingRepo.update(
        req.params.id,
        req.user.workspace_id,
        req.body
    )

    res.json(booking)
}

export const deleteBooking = async (req: any, res: Response) => {
    await bookingRepo.softDelete(req.params.id)

    res.json({ message: "Deleted" })
}
