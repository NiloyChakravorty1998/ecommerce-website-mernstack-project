import { Request, Response } from "express";
import asyncHandler from "../../middleware/asyncHandler";


// @desc    Logout user
// @route   GET /api/users/profile
// @access  Private
export const logoutUser = asyncHandler(async(req : Request, res: Response) => {
    res.send('logout user');
});
