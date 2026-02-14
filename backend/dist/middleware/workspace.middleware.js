export const workspaceGuard = (req, res, next) => {
    if (!req.user.workspace_id) {
        return res.status(403).json({ message: "Workspace missing" });
    }
    next();
};
//# sourceMappingURL=workspace.middleware.js.map