import { Request, Response, NextFunction } from "express"
import { pool } from "../config/db.js";
import { verifyAccessToken } from "../core/security/jwt.js";

export interface AuthRequest extends Request {
    user?: any;
}


export const authMiddleware = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    const token = req.headers.authorization?.split(" ")[1]

    if (!token)
        return res.status(401).json({ message: "Unauthorized" })

    try {
        req.user = verifyAccessToken(token)
        next()
    } catch {
        res.status(401).json({ message: "Invalid token" })
    }
}




