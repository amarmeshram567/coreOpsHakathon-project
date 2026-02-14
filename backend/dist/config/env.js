import { z } from "zod";
import dotenv from "dotenv";
dotenv.config();
const schema = z.object({
    PORT: z.string(),
    DATABASE_URL: z.string(),
    JWT_SECRET: z.string(),
    JWT_REFRESH_SECRET: z.string(),
    REDIS_URL: z.string(),
    STRIPE_SECRET: z.string(),
});
export const env = schema.parse(process.env);
//# sourceMappingURL=env.js.map