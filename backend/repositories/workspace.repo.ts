import { pool } from "../config/db.js"

export const workspaceRepo = {
    async create(workspace: any) {
        const result = await pool.query(
            `INSERT INTO workspaces(id,name)
       VALUES($1,$2)
       RETURNING *`,
            [workspace.id, workspace.name]
        )
        return result.rows[0]
    },

    async activate(workspaceId: string) {
        await pool.query(
            `UPDATE workspaces SET is_active=true WHERE id=$1`,
            [workspaceId]
        )
    }
}
