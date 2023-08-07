import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import dotenv  from 'dotenv'

dotenv.config();

const notFound = (req: Request, res: Response, next: NextFunction) => {
    const error = new Error(`Not found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    let statusCode: number = res.statusCode === 200 ? 500 : res.statusCode;
    let message: string = err.message;

    // Check mongoose bad object (CastError)
    if (err instanceof mongoose.Error.CastError) {
        message = 'Resource not found';
        statusCode = 404;
    }

    res.status(statusCode).json({
        message,
        stack: process.env.NODE_ENV === 'production' ? 'pancake' : err.stack
    });
};

export { notFound, errorHandler };
