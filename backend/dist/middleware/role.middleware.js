export const requireOwner = (req, res, next) => {
    if (req.user.role !== "OWNER") {
        return res.status(403).json({ message: "Forbidden" });
    }
    next();
};
//# sourceMappingURL=role.middleware.js.map