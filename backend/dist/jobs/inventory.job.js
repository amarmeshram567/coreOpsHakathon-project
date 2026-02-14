import cron from "node-cron";
import { pool } from "../config/db.js";
import { logger } from "../utils/logger.js";
import { emailService } from "../core/services/email.service.js";
cron.schedule("0 * * * *", async () => {
    try {
        const result = await pool.query(`SELECT * FROM inventory_items
             WHERE quantity <= low_stock_threshold`);
        for (const item of result.rows) {
            await emailService.send({
                to: item.notification_email || "admin@example.com",
                subject: "Low Stock Alert",
                text: `Low stock for ${item.name}. Remaining: ${item.quantity}`
            });
        }
        logger.info("Low stock cron executed successfully");
    }
    catch (error) {
        logger.error("Low stock cron failed", error);
    }
});
//# sourceMappingURL=inventory.job.js.map