import fs from 'fs';
import path from 'path';
import fspromise from 'fs/promises';
import { NextFunction, Request, Response } from 'express';

export const logToFile = async (filePath: string, message: string) => {
    if (!fs.existsSync(path.dirname(filePath))) {
        fs.mkdirSync(path.dirname(filePath), { recursive: true });
    }

    await fspromise.appendFile(filePath, `${message}\n`);
};

export const logToConsole = (message: string) => {
    console.log(message);
};

const logger = (req: Request, res: Response, next: NextFunction) => {
    const message = `${req.method}  ${req.url}`;
    logToConsole(message);
    logToFile(path.join(__dirname, '..', '..', 'log', 'log.txt'), message);
    next();
};

export default logger;
