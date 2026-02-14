import bcrypt from "bcryptjs";
export const hashPassword = async (password) => {
    return bcrypt.hash(password, 12);
};
export const comparePassword = async (password, hashed) => {
    return bcrypt.compare(password, hashed);
};
//# sourceMappingURL=password.js.map