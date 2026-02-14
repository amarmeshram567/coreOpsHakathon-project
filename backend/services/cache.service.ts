import Redis from "ioredis"
import { env } from "../config/env.js"

const redis = new (Redis as any)(env.REDIS_URL)

export const cacheService = {
    async get(key: string) {
        try {
            const data = await redis.get(key)
            return data ? JSON.parse(data) : null
        } catch (error) {
            console.error("Redis GET error:", error)
            return null
        }
    },

    async set(key: string, value: any, ttl = 60) {
        try {
            await redis.set(key, JSON.stringify(value), "EX", ttl)
        } catch (error) {
            console.error("Redis SET error:", error)
        }
    },

    async del(key: string) {
        try {
            await redis.del(key)
        } catch (error) {
            console.error("Redis DEL error:", error)
        }
    }
}
