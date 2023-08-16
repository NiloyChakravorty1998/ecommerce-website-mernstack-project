import { Request, Response } from "express";
import asyncHandler from "../../middleware/asyncHandler";


// @desc    Logout user
// @route   GET /api/users/profile
// @access  Private
export const logoutUser = asyncHandler(async (req: Request, res: Response) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0)
    });

    res.status(200).json({
        status: 200,
        message: 'Log out successful',
    })
});
