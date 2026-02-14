import { Request, Response } from "express"
import { pool } from "../../config/db.js"
import { billingService } from "../../services/billing.service.js"

export const createSubscription = async (req: any, res: Response) => {
    const workspaceId = req.user.workspace_id
    const { priceId } = req.body

    const workspace = await pool.query(
        `SELECT * FROM workspaces WHERE id=$1`,
        [workspaceId]
    )

    const customerId = workspace.rows[0].stripe_customer_id

    const subscription = await billingService.createSubscription(
        customerId,
        priceId
    )

    await pool.query(
        `UPDATE workspaces
     SET stripe_subscription_id=$1,
         subscription_status='ACTIVE',
         plan='PRO'
     WHERE id=$2`,
        [subscription.id, workspaceId]
    )

    res.json(subscription)
}


export const getIntegrations = async (req: any, res: any) => {
    res.json({
        stripe: true,
        email: true,
        sms: false
    })
}
