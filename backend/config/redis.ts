import Redis from "ioredis"
import { env } from "./env.js"

export const redis = new (Redis as any)(env.REDIS_URL)
