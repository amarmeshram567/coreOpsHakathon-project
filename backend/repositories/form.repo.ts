import { pool } from "../config/db.js"

export const formRepo = {
    async createSubmission(data: any) {
        return pool.query(
            `INSERT INTO form_submissions(
        id, form_id, workspace_id, data
      )
       VALUES($1,$2,$3,$4)`,
            [data.id, data.form_id, data.workspace_id, data.data]
        )
    }
}
