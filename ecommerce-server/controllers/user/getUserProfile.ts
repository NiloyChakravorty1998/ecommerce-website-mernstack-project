import { Request, Response } from "express";
import asyncHandler from "../../middleware/asyncHandler";
import User from "../../models/userModel";

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = asyncHandler(async (req : Request, res: Response) => {
  
  const user = await User.findById(res.locals.user._id); // find user by token info
  if(user)
  {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    });
  }else{
    res.status(404);
    throw new Error('User not found');
  }

});
