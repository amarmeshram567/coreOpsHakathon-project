export const workspaceGuard = (req: any, res: any, next: any) => {
    if (!req.user.workspace_id) {
        return res.status(403).json({ message: "Workspace missing" })
    }
    next()
}
