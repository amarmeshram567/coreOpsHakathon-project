export const requireOwner = (req: any, res: any, next: any) => {
    if (req.user.role !== "OWNER") {
        return res.status(403).json({ message: "Forbidden" })
    }
    next()
}
