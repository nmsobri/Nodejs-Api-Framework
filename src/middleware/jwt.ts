import path from 'path';
import dotEnv from 'dotenv';
import jwt from 'jsonwebtoken';

import { NextFunction, Request, Response } from 'express';

dotEnv.config();

const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        res.sendStatus(401); //Unauthorized ( user dont even have access token )
        return;
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!, (err, decoded) => {
        if (err) {
            res.sendStatus(403); // Forbidden ( invalid token, probably user had temper the access token, or expired )
            return;
        }

        req.id = (decoded as jwt.JwtPayload).id;
        req.username = (decoded as jwt.JwtPayload).username;
    });

    next();
};

export default verifyJWT;
