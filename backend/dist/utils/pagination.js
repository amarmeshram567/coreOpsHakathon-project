export const paginate = (page, limit) => {
    const offset = (page - 1) * limit;
    return { limit, offset };
};
//# sourceMappingURL=pagination.js.map