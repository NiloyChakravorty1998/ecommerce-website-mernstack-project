import { Request, Response } from "express";
import asyncHandler from "../../middleware/asyncHandler";



// @desc    Register a new user
// @route   POST /api/users
// @access  Public
export const registerUser = asyncHandler(async (req : Request, res: Response) => {
  res.send('register user');
});