import { pool } from "../config/db.js";
export const validateActivation = async (workspaceId) => {
    const missing = [];
    const staffCount = await pool.query(`SELECT COUNT(*) FROM users WHERE workspace_id=$1`, [workspaceId]);
    if (Number(staffCount.rows[0].count) < 1)
        missing.push("STAFF");
    // Later add checks for forms, bookings, integrations
    return {
        canActivate: missing.length === 0,
        missing
    };
};
//# sourceMappingURL=validateActivation.js.map