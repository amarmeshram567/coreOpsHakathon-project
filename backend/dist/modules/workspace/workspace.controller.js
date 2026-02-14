import { pool } from "../../config/db.js";
export const createWorkspace = async (req, res) => {
    const { name } = req.body;
    const result = await pool.query(`INSERT INTO workspaces (name, owner_id)
     VALUES ($1,$2)
     RETURNING *`, [name, req.user.id]);
    res.status(201).json(result.rows[0]);
};
export const getWorkspace = async (req, res) => {
    const result = await pool.query(`SELECT * FROM workspaces WHERE id=$1`, [req.user.workspace_id]);
    res.json(result.rows[0]);
};
export const updateWorkspace = async (req, res) => {
    const { name } = req.body;
    await pool.query(`UPDATE workspaces SET name=$1 WHERE id=$2`, [name, req.user.workspace_id]);
    res.json({ message: "Workspace updated" });
};
//# sourceMappingURL=workspace.controller.js.map