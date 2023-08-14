import { Request, Response } from "express";
import asyncHandler from "../../middleware/asyncHandler";


// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = asyncHandler(async (req : Request, res: Response) => {
  res.send('get user profile');
});
