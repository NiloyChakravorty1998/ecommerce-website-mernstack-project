import { Request, Response } from "express";
import asyncHandler from "../../middleware/asyncHandler";


// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
export const updateUser = asyncHandler(async (req : Request, res: Response) => {
  res.send('update user');
});
