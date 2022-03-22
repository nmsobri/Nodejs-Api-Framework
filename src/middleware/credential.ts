import { Request, Response, NextFunction } from 'express';
import whiteList from '../config/whitelist';

const verifyCredential = (req: Request, res: Response, next: NextFunction) => {
    const origin = req.headers.origin ?? '';

    if (whiteList.includes(origin)) {
        res.header('Access-Control-Allow-Credentials', 'true');
    }

    next();
};

export default verifyCredential;
