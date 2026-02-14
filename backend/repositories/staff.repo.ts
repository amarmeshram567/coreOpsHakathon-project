import { pool } from "../config/db.js"

export const staffRepo = {
    async createInvite(data: any) {
        const result = await pool.query(
            `INSERT INTO staff_invites(id,workspace_id,email,role,token)
       VALUES($1,$2,$3,$4,$5)
       RETURNING *`,
            [data.id, data.workspace_id, data.email, data.role, data.token]
        )
        return result.rows[0]
    }
}
