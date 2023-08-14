import { Request, Response } from "express";
import asyncHandler from "../../middleware/asyncHandler";


// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
export const getUserById = asyncHandler(async (req : Request, res: Response) => {
  res.send('get user by id');
});