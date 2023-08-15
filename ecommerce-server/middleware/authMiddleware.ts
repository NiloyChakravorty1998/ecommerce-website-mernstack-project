import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler';
import { NextFunction, Request, Response } from 'express';
import User from '../models/userModel';

interface JwtPayload {
    userId: string;
}

// Function to handle unauthorized scenarios
const handleUnauthorized = (res: Response, message: string) => {
    res.status(401);
    throw new Error(message);
};

// Protect routes middleware
export const protect = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.jwt;

        if (token) {
            const decodedPayload = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
            const user = await User.findById(decodedPayload.userId).select('-password');

            res.locals.user = user; // Attach user object to res.locals for later use
            next();
        } else {
            handleUnauthorized(res, 'Not authorized, no token');
        }
    } catch (err) {
        handleUnauthorized(res, 'Not authorized, token failed');
    }
});

// Admin middleware
export const admin = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = res.locals.user;

        if (user && user.isAdmin) {
            next();
        } else {
            handleUnauthorized(res, 'Not authorized as admin');
        }
    } catch (err) {
        handleUnauthorized(res, 'Not authorized as admin');
    }
});
