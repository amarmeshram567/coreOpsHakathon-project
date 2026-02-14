import { pool } from "../config/db.js"

export const userRepo = {
    async create(user: any) {
        const { id, workspace_id, name, email, password, role } = user

        const result = await pool.query(
            `INSERT INTO users
       (id, workspace_id, name, email, password, role)
       VALUES($1,$2,$3,$4,$5,$6)
       RETURNING *`,
            [id, workspace_id, name, email, password, role]
        )

        return result.rows[0]
    },

    async findByEmail(email: string) {
        const result = await pool.query(
            `SELECT * FROM users WHERE email=$1`,
            [email]
        )
        return result.rows[0]
    },

    async findById(id: string) {
        const result = await pool.query(
            `SELECT * FROM users WHERE id=$1`,
            [id]
        )
        return result.rows[0]
    }
}
