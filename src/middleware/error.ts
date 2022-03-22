import path from 'path';
import { logToConsole, logToFile } from './logger';
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';

const error: ErrorRequestHandler = (
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const e = err as Error;
    const message = `${req.method}  ${req.url}  ${req.headers.origin}  ${e.message}`;
    logToConsole(message);
    logToFile(path.join(__dirname, '..', '..', 'log', 'err.txt'), message);
    next();
};

export default error;
