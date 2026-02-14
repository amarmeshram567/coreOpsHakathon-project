import { Pool } from "pg";
import { env } from "./env.js";
export const pool = new Pool({
    connectionString: env.DATABASE_URL
});
export const connectDB = async () => {
    await pool.query("SELECT 1");
    console.log("✅ PostgreSQL Connected");
};
//# sourceMappingURL=db.js.map