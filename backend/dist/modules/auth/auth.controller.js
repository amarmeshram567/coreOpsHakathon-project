import { v4 as uuid } from "uuid";
import { userRepo } from "../../repositories/user.repo.js";
import { comparePassword, hashPassword } from "../../core/security/password.js";
import { workspaceRepo } from "../../repositories/workspace.repo.js";
import { signAccessToken, signRefreshToken, verifyRefreshToken } from "../../core/security/jwt.js";
import { refreshRepo } from "../../repositories/refresh.repo.js";
export const register = async (req, res) => {
    const { name, email, password, workspaceName } = req.body;
    if (!name || !email || !password || !workspaceName) {
        return res.status(400).json({ message: "All fields required" });
    }
    const existing = await userRepo.findByEmail(email.toLowerCase());
    if (existing) {
        return res.status(400).json({ message: "Email already exists" });
    }
    const hashed = await hashPassword(password);
    const workspace = await workspaceRepo.create({
        id: uuid(),
        name: workspaceName
    });
    const user = await userRepo.create({
        id: uuid(),
        workspace_id: workspace.id,
        name,
        email: email.toLowerCase(),
        password: hashed,
        role: "OWNER"
    });
    const accessToken = signAccessToken({
        id: user.id,
        role: user.role,
        workspace_id: workspace.id
    });
    const refreshToken = signRefreshToken({ id: user.id });
    await refreshRepo.create({
        id: uuid(),
        user_id: user.id,
        token: refreshToken
    });
    res.json({ accessToken, refreshToken });
};
export const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password required" });
    }
    const user = await userRepo.findByEmail(email.toLowerCase());
    if (!user)
        return res.status(400).json({ message: "Invalid credentials" });
    const valid = await comparePassword(password, user.password);
    if (!valid)
        return res.status(400).json({ message: "Invalid credentials" });
    const accessToken = signAccessToken({
        id: user.id,
        role: user.role,
        workspace_id: user.workspace_id
    });
    const refreshToken = signRefreshToken({ id: user.id });
    await refreshRepo.create({
        id: uuid(),
        user_id: user.id,
        token: refreshToken
    });
    res.json({ accessToken, refreshToken });
};
export const refresh = async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken)
        return res.status(400).json({ message: "Refresh token required" });
    const stored = await refreshRepo.find(refreshToken);
    if (!stored)
        return res.status(401).json({ message: "Invalid refresh token" });
    let payload;
    try {
        payload = verifyRefreshToken(refreshToken);
    }
    catch (err) {
        return res.status(401).json({ message: "Invalid refresh token" });
    }
    const user = await userRepo.findById(payload.id);
    if (!user)
        return res.status(401).json({ message: "User not found" });
    await refreshRepo.revoke(refreshToken);
    const newAccess = signAccessToken({
        id: user.id,
        role: user.role,
        workspace_id: user.workspace_id
    });
    const newRefresh = signRefreshToken({ id: user.id });
    await refreshRepo.create({
        id: uuid(),
        user_id: user.id,
        token: newRefresh
    });
    res.json({ accessToken: newAccess, refreshToken: newRefresh });
};
export const logout = async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken)
        return res.status(400).json({ message: "Refresh token required" });
    await refreshRepo.revoke(refreshToken);
    res.json({ message: "Logged out" });
};
//# sourceMappingURL=auth.controller.js.map