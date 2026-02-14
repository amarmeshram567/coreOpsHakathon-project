import { pool } from "../../config/db.js";
export const completeOnboarding = async (req, res) => {
    await pool.query(`UPDATE workspaces
     SET onboarding_completed=true
     WHERE id=$1`, [req.user.workspace_id]);
    res.json({ message: "Onboarding completed" });
};
//# sourceMappingURL=onboarding.controller.js.map