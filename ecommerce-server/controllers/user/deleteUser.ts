import { Request, Response } from "express";
import asyncHandler from "../../middleware/asyncHandler";

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
export const deleteUser = asyncHandler(async (req : Request, res: Response) => {
  res.send('delete user');
});