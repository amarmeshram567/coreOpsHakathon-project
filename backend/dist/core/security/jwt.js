import jwt from "jsonwebtoken";
import { env } from "../../config/env.js";
export const signAccessToken = (payload) => {
    return jwt.sign(payload, env.JWT_SECRET, { expiresIn: "15m" });
};
export const signRefreshToken = (payload) => {
    return jwt.sign(payload, env.JWT_REFRESH_SECRET, {
        expiresIn: "7d"
    });
};
export const verifyAccessToken = (token) => jwt.verify(token, env.JWT_SECRET);
export const verifyRefreshToken = (token) => jwt.verify(token, env.JWT_REFRESH_SECRET);
//# sourceMappingURL=jwt.js.map