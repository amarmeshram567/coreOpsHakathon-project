import { pool } from "../../config/db.js"


export const createForm = async (req: any, res: any) => {
    try {
        const { name, fields } = req.body

        const result = await pool.query(
            `INSERT INTO forms (workspace_id, name, fields)
            VALUES ($1, $2, $3)
            RETURNING *`,
            [req.user.workspace_id, name, JSON.stringify(fields)]
        )


        res.status(201).json(result.rows[0])
    } catch (err: any) {
        console.error("Error creating form:", err)
        res.status(500).json({ error: err.message })
    }
}


// export const submitForm = async (req: any, res: any) => {
//     try {
//         const { id } = req.params;
//         const { data } = req.body;


//         // Check form exists in this workspace
//         const formCheck = await pool.query(
//             "SELECT * FROM forms WHERE id = $1 AND workspace_id = $2",
//             [id, req.user.workspace_id]
//         );

//         if (!formCheck.rowCount) {
//             return res.status(400).json({ message: "Form not found in your workspace" });
//         }


//         const result = await pool.query(
//             `INSERT INTO form_submissions (form_id, workspace_id, data)
//      VALUES ($1, $2, $3)
//      RETURNING *`,
//             [id, req.user.workspace_id, data]
//         );


//         res.status(201).json(result.rows[0]);
//     } catch (err: any) {
//         console.error("Error submitting form:", err);
//         res.status(500).json({ error: err.message });
//     }
// };

export const submitForm = async (req: any, res: any) => {
    try {
        const { id } = req.params;
        const { data } = req.body;

        // 1️⃣ Verify form exists in this workspace
        const formCheck = await pool.query(
            "SELECT * FROM forms WHERE id = $1 AND workspace_id = $2",
            [id, req.user.workspace_id]
        );
        if (!formCheck.rowCount) {
            return res.status(400).json({ message: "Form not found in your workspace" });
        }

        // 2️⃣ Insert submission
        const result = await pool.query(
            `INSERT INTO form_submissions (form_id, workspace_id, data)
             VALUES ($1, $2, $3)
             RETURNING *`,
            [id, req.user.workspace_id, data]
        );

        res.status(201).json(result.rows[0]);
    } catch (err: any) {
        console.error("Error submitting form:", err);
        res.status(500).json({ error: err.message });
    }
};



export const getSubmissions = async (req: any, res: any) => {
    const { id } = req.params // form_id

    try {

        // Check form exists in this workspace
        const formCheck = await pool.query(
            "SELECT * FROM forms WHERE id = $1 AND workspace_id = $2",
            [id, req.user.workspace_id]
        );

        if (!formCheck.rowCount) {
            return res.status(400).json({ message: "Form not found in your workspace" });
        }



        const result = await pool.query(
            `SELECT * FROM form_submissions 
     WHERE form_id = $1 AND workspace_id = $2
     ORDER BY created_at DESC`,
            [id, req.user.workspace_id]
        )


        res.json(result.rows)
    } catch (err: any) {
        console.error("Error fetching submissions:", err)
        res.status(500).json({ error: err.message })
    }
}

