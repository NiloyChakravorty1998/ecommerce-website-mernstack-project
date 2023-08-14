import { Request, Response } from "express";
import asyncHandler from "../../middleware/asyncHandler";

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateUserProfile = asyncHandler(async (req : Request, res: Response) => {
  res.send('update user profile');
});
