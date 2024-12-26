"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checkAdmin = (req, res, next) => {
    const role = req.headers['x-role'];
    if (role === 'admin') {
        return next();
    }
    return res.status(403).json({ error: 'Admin privileges required.' });
};
exports.default = checkAdmin;
