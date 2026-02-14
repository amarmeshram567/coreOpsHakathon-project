import { pool } from "../../config/db.js"

export const addStaff = async (req: any, res: any) => {
    const { email, role } = req.body

    const result = await pool.query(
        `INSERT INTO users (email, role, workspace_id)
     VALUES ($1,$2,$3)
     RETURNING *`,
        [email, role, req.user.workspace_id]
    )

    res.status(201).json(result.rows[0])
}

export const getStaff = async (req: any, res: any) => {
    const result = await pool.query(
        `SELECT id, email, role FROM users WHERE workspace_id=$1`,
        [req.user.workspace_id]
    )

    res.json(result.rows)
}

export const updateRole = async (req: any, res: any) => {
    const { id } = req.params
    const { role } = req.body

    await pool.query(
        `UPDATE users SET role=$1 WHERE id=$2 AND workspace_id=$3`,
        [role, id, req.user.workspace_id]
    )

    res.json({ message: "Updated" })
}

export const removeStaff = async (req: any, res: any) => {
    const { id } = req.params

    await pool.query(
        `DELETE FROM users WHERE id=$1 AND workspace_id=$2`,
        [id, req.user.workspace_id]
    )

    res.json({ message: "Removed" })
}
