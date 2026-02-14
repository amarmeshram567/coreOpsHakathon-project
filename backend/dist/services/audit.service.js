import { v4 as uuid } from "uuid";
import { pool } from "../config/db.js";
export const auditService = {
    async log(workspaceId, userId, action) {
        await pool.query(`INSERT INTO audit_logs(id,workspace_id,user_id,action)
       VALUES($1,$2,$3,$4)`, [uuid(), workspaceId, userId, action]);
    }
};
//# sourceMappingURL=audit.service.js.map