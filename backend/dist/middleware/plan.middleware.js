import { pool } from "../config/db.js";
export const requirePlan = (requiredPlan) => {
    return async (req, res, next) => {
        const workspace = await pool.query(`SELECT plan FROM workspaces WHERE id=$1`, [req.user.workspace_id]);
        if (workspace.rows[0].plan !== requiredPlan) {
            return res.status(403).json({
                message: "Upgrade required"
            });
        }
        next();
    };
};
//# sourceMappingURL=plan.middleware.js.map