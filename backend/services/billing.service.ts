import Stripe from "stripe"
import { env } from "../config/env.js"
import { pool } from "../config/db.js"

const stripe = new Stripe(env.STRIPE_SECRET)

type Workspace = {
    id: string
    name: string
    owner_email: string
}

export const billingService = {
    async createCustomer(workspace: Workspace) {
        try {
            const customer = await stripe.customers.create({
                email: workspace.owner_email,
                name: workspace.name
            })

            await pool.query(
                `UPDATE workspaces
                 SET stripe_customer_id=$1
                 WHERE id=$2`,
                [customer.id, workspace.id]
            )

            return customer

        } catch (error) {
            console.error("Stripe customer creation failed:", error)
            throw error
        }
    },

    async createSubscription(customerId: string, priceId: string) {
        try {
            const subscription = await stripe.subscriptions.create({
                customer: customerId,
                items: [{ price: priceId }],
                payment_behavior: "default_incomplete",
                expand: ["latest_invoice.payment_intent"]
            })

            return subscription

        } catch (error) {
            console.error("Stripe subscription failed:", error)
            throw error
        }
    }
}
