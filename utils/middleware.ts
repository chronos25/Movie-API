import { Request, Response, NextFunction } from 'express';

const checkAdmin = (req: Request, res: Response, next: NextFunction): void => {
    const role = req.headers['x-role'] as string;
    if (role === 'admin') {
        return next();
    }
    return res.status(403).json({ error: 'Admin privileges required.' });
};

export default checkAdmin;
