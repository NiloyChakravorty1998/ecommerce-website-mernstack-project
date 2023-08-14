import { Request, Response } from "express";
import asyncHandler from "../../middleware/asyncHandler";

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
export const getUsers = asyncHandler(async (req : Request, res: Response) => {
  res.send('get users');
});