import express from 'express';

declare module 'express' {
    interface Request {
        id?: number;
        username?: string;
        [key: string]: any;
    }
}
