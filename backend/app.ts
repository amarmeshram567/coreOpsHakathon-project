import express from "express"
import helmet from "helmet"
import cors from "cors"
import morgan from "morgan"

import authRoutes from "./modules/auth/auth.routes.js"
import { setupSwagger } from "./config/swagger.js"
import formRoutes from "./modules/forms/forms.routes.js"
import staffRoutes from "./modules/staff/staff.routes.js"
import inboxRoutes from "./modules/inbox/inbox.routes.js"
import bookingRoutes from "./modules/bookings/bookings.routes.js"
import inventoryRoutes from "./modules/inventory/inventory.routes.js"
import workspaceRoutes from "./modules/workspace/workspace.routes.js"
import settingsRoutes from "./modules/settings/settings.routes.js"
import onboardingRoutes from "./modules/onboarding/onboarding.routes.js"
import integrationsRoutes from "./modules/integrations/integrations.routes.js"
import dashboardRoutes from "./modules/dashboard/dashboard.routes.js"

const app = express()

setupSwagger(app)


app.use(helmet())

const allowedOrigins = [
    'http://localhost:5173'
]

app.use(cors(
    {
        origin: allowedOrigins,
        credentials: true
    }
))
app.use(morgan("dev"))
app.use(express.json())

app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/forms", formRoutes)
app.use("/api/v1/staff", staffRoutes)
app.use("/api/v1/inbox", inboxRoutes)
app.use("/api/v1/bookings", bookingRoutes)
app.use("/api/v1/dashboard", dashboardRoutes)

app.use("/api/v1/workspace", workspaceRoutes)
app.use("/api/v1/inventory", inventoryRoutes)
app.use("/api/v1/settings", settingsRoutes)
app.use("/api/v1/onboarding", onboardingRoutes)
app.use("/api/v1/integrations", integrationsRoutes)



export default app
