import { pool } from "../../config/db.js";

import { v4 as uuid } from "uuid";

export const addItem = async (req: any, res: any) => {
    const { name, quantity, low_threshold } = req.body;

    const result = await pool.query(
        `INSERT INTO inventory_items 
         (id, workspace_id, name, quantity, low_threshold)
         VALUES ($1,$2,$3,$4,$5)
         RETURNING *`,
        [uuid(), req.user.workspace_id, name, quantity, low_threshold]
    );

    res.status(201).json(result.rows[0]);
};



export const getItems = async (req: any, res: any) => {
    const result = await pool.query(
        `SELECT * FROM inventory_items WHERE workspace_id=$1`,
        [req.user.workspace_id]
    );

    res.json(result.rows);
};

export const updateItem = async (req: any, res: any) => {
    const { id } = req.params;
    const { name, quantity, low_threshold } = req.body;

    await pool.query(
        `UPDATE inventory_items
         SET name = $1, quantity = $2, low_threshold = $3
         WHERE id = $4 AND workspace_id = $5`,
        [name, quantity, low_threshold, id, req.user.workspace_id]
    );

    res.json({ message: "Updated" });
};

export const deleteItem = async (req: any, res: any) => {
    const { id } = req.params;

    await pool.query(
        `DELETE FROM inventory_items 
         WHERE id=$1 AND workspace_id=$2`,
        [id, req.user.workspace_id]
    );

    res.json({ message: "Deleted" });
};
