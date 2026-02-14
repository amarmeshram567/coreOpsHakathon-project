import { pool } from "../../config/db.js";
export const updateSettings = async (req, res) => {
    const { timezone, currency } = req.body;
    await pool.query(`UPDATE workspaces
     SET timezone=$1, currency=$2
     WHERE id=$3`, [timezone, currency, req.user.workspace_id]);
    res.json({ message: "Settings updated" });
};
//# sourceMappingURL=settings.controller.js.map