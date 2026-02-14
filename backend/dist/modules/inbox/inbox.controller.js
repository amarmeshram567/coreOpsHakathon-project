import { pool } from "../../config/db.js";
export const getInbox = async (req, res) => {
    const result = await pool.query(`SELECT * FROM messages WHERE workspace_id=$1 ORDER BY created_at DESC`, [req.user.workspace_id]);
    res.json(result.rows);
};
export const sendMessage = async (req, res) => {
    const { message } = req.body;
    const result = await pool.query(`INSERT INTO messages (workspace_id, sender, message)
     VALUES ($1,$2,$3)
     RETURNING *`, [req.user.workspace_id, req.user.email, message]);
    res.status(201).json(result.rows[0]);
};
//# sourceMappingURL=inbox.controller.js.map