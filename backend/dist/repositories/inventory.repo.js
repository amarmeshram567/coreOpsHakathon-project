import { pool } from "../config/db.js";
export const inventoryRepo = {
    async create(data) {
        const result = await pool.query(`INSERT INTO inventory(
        id, workspace_id, name, quantity, low_stock_threshold
      )
       VALUES($1,$2,$3,$4,$5)
       RETURNING *`, [
            data.id,
            data.workspace_id,
            data.name,
            data.quantity,
            data.low_stock_threshold
        ]);
        return result.rows[0];
    },
    async updateQuantity(id, quantity) {
        await pool.query(`UPDATE inventory SET quantity=$1 WHERE id=$2`, [quantity, id]);
    },
    async findLowStock(workspaceId) {
        const result = await pool.query(`SELECT * FROM inventory
       WHERE workspace_id=$1
       AND quantity <= low_stock_threshold
       AND deleted_at IS NULL`, [workspaceId]);
        return result.rows;
    }
};
//# sourceMappingURL=inventory.repo.js.map