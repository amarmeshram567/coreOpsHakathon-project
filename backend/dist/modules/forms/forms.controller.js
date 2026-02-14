import { pool } from "../../config/db.js";
export const createForm = async (req, res) => {
    const { name, fields } = req.body;
    const result = await pool.query(`INSERT INTO forms (workspace_id, name, fields)
     VALUES ($1,$2,$3)
     RETURNING *`, [req.user.workspace_id, name, fields]);
    res.status(201).json(result.rows[0]);
};
export const submitForm = async (req, res) => {
    const { id } = req.params;
    const { data } = req.body;
    const result = await pool.query(`INSERT INTO form_submissions (form_id, data)
     VALUES ($1,$2)
     RETURNING *`, [id, data]);
    res.status(201).json(result.rows[0]);
};
export const getSubmissions = async (req, res) => {
    const { id } = req.params;
    const result = await pool.query(`SELECT * FROM form_submissions WHERE form_id=$1`, [id]);
    res.json(result.rows);
};
//# sourceMappingURL=forms.controller.js.map