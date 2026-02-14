import Redis from "ioredis";
import { env } from "../config/env.js";
const redis = new Redis(env.REDIS_URL);
export const cacheService = {
    async get(key) {
        try {
            const data = await redis.get(key);
            return data ? JSON.parse(data) : null;
        }
        catch (error) {
            console.error("Redis GET error:", error);
            return null;
        }
    },
    async set(key, value, ttl = 60) {
        try {
            await redis.set(key, JSON.stringify(value), "EX", ttl);
        }
        catch (error) {
            console.error("Redis SET error:", error);
        }
    },
    async del(key) {
        try {
            await redis.del(key);
        }
        catch (error) {
            console.error("Redis DEL error:", error);
        }
    }
};
//# sourceMappingURL=cache.service.js.map