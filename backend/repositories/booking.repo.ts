import { pool } from "../config/db.js"

export const bookingRepo = {
    async create(data: any) {
        const result = await pool.query(
            `INSERT INTO bookings(
        id, workspace_id, client_name, client_email,
        service, scheduled_at
      )
       VALUES($1,$2,$3,$4,$5,$6)
       RETURNING *`,
            [
                data.id,
                data.workspace_id,
                data.client_name,
                data.client_email,
                data.service,
                data.scheduled_at
            ]
        )
        return result.rows[0]
    },

    async findAll(workspaceId: string, limit: number, offset: number) {
        const result = await pool.query(
            `SELECT * FROM bookings
       WHERE workspace_id=$1
       AND deleted_at IS NULL
       ORDER BY scheduled_at DESC
       LIMIT $2 OFFSET $3`,
            [workspaceId, limit, offset]
        )
        return result.rows
    },

    async updateStatus(id: string, status: string) {
        await pool.query(
            `UPDATE bookings SET status=$1 WHERE id=$2`,
            [status, id]
        )
    },

    async softDelete(id: string) {
        await pool.query(
            `UPDATE bookings SET deleted_at=now() WHERE id=$1`,
            [id]
        )
    },

    async findById(id: string, workspaceId: string) {
        const result = await pool.query(
            `SELECT * FROM bookings
         WHERE id=$1 AND workspace_id=$2`,
            [id, workspaceId]
        )
        return result.rows[0]
    },

    async update(id: string, workspaceId: string, data: any) {
        const result = await pool.query(
            `UPDATE bookings
         SET client_name=$1,
             client_email=$2,
             service=$3,
             scheduled_at=$4
         WHERE id=$5 AND workspace_id=$6
         RETURNING *`,
            [
                data.client_name,
                data.client_email,
                data.service,
                data.scheduled_at,
                id,
                workspaceId
            ]
        )
        return result.rows[0]
    }

}
