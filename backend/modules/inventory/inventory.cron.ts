import cron from "node-cron"
import { pool } from "../../config/db.js"

export const startInventoryCron = () => {
    cron.schedule("0 * * * *", async () => {
        try {
            const result = await pool.query(
                `SELECT * FROM inventory_items
                 WHERE quantity <= low_stock_threshold
                 AND low_stock_threshold IS NOT NULL`
            )

            for (const item of result.rows) {
                console.log(
                    `LOW STOCK ALERT → ${item.name} | Remaining: ${item.quantity}`
                )
            }

            console.log("Inventory cron executed")

        } catch (error) {
            console.error("Inventory cron failed:", error)
        }
    })
}
