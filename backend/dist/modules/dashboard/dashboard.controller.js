import { pool } from "../../config/db.js";
export const getDashboard = async (req, res) => {
    const workspaceId = req.user.workspace_id;
    const bookings = await pool.query(`SELECT COUNT(*) FROM bookings WHERE workspace_id=$1`, [workspaceId]);
    const revenue = await pool.query(`SELECT COALESCE(SUM(price),0) FROM bookings WHERE workspace_id=$1`, [workspaceId]);
    const lowInventory = await pool.query(`SELECT COUNT(*) FROM inventory_items 
     WHERE workspace_id=$1 AND quantity <= low_threshold`, [workspaceId]);
    const staff = await pool.query(`SELECT COUNT(*) FROM users WHERE workspace_id=$1`, [workspaceId]);
    res.json({
        totalBookings: bookings.rows[0].count,
        revenue: revenue.rows[0].coalesce,
        lowInventoryAlerts: lowInventory.rows[0].count,
        staffCount: staff.rows[0].count
    });
};
//# sourceMappingURL=dashboard.controller.js.map