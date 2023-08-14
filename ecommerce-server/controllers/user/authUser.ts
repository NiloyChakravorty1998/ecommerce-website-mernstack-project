import { Request, Response } from "express";
import asyncHandler from "../../middleware/asyncHandler";

// @access  Public
export const authUser = asyncHandler(async (req : Request, res : Response) => {
  res.send('auth user');
});