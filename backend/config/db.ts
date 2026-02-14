// import { Pool } from "pg"
// import { env } from "./env.js"

// export const pool = new Pool({
//     connectionString: env.DATABASE_URL
// })

// export const connectDB = async () => {
//     await pool.query("SELECT 1")
//     console.log("✅ PostgreSQL Connected")
// }
import pkg from "pg";
const { Pool } = pkg;

export const pool = new Pool({
    connectionString: process.env.DATABASE_URL, // Use Render environment variable
    ssl: { rejectUnauthorized: false } // Required for Supabase
});

export const connectDB = async () => {
    try {
        await pool.query("SELECT 1");
        console.log("✅ PostgreSQL Connected");
    } catch (err) {
        console.error("❌ PostgreSQL connection error:", err);
        process.exit(1); // Stop server if DB fails
    }
};
