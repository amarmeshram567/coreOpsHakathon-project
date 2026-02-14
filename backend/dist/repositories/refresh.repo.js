import { pool } from "../config/db.js";
export const refreshRepo = {
    async create(data) {
        const result = await pool.query(`INSERT INTO refresh_tokens(id,user_id,token)
       VALUES($1,$2,$3)
       RETURNING *`, [data.id, data.user_id, data.token]);
        return result.rows[0];
    },
    async find(token) {
        const result = await pool.query(`SELECT * FROM refresh_tokens WHERE token=$1 AND is_revoked=false`, [token]);
        return result.rows[0];
    },
    async revoke(token) {
        await pool.query(`UPDATE refresh_tokens SET is_revoked=true WHERE token=$1`, [token]);
    }
};
//# sourceMappingURL=refresh.repo.js.map