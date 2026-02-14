import { pool } from "../config/db.js";
export const onboardingRepo = {
    async markComplete(workspaceId, step) {
        await pool.query(`INSERT INTO onboarding_progress(workspace_id,step,completed)
       VALUES($1,$2,true)
       ON CONFLICT DO NOTHING`, [workspaceId, step]);
    },
    async getProgress(workspaceId) {
        const result = await pool.query(`SELECT step, completed
       FROM onboarding_progress
       WHERE workspace_id=$1`, [workspaceId]);
        return result.rows;
    }
};
//# sourceMappingURL=onboarding.repo.js.map