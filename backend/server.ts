import http from "http"

import { startInventoryCron } from "./modules/inventory/inventory.cron.js"
import app from "./app.js"
import { connectDB } from "./config/db.js"
import { env } from "./config/env.js"
import { initSocket } from "./core/socket.js"


const server = http.createServer(app)
initSocket(server)


const start = async () => {
    await connectDB()

    server.listen(env.PORT, () => {
        console.log(`🚀 CareOps running on ${env.PORT}`)
    })

    startInventoryCron()

}


start()


// "dev": "node --loader ts-node/esm --experimental-specifier-resolution=node server.ts",