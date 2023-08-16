import { Request, Response } from "express";
import asyncHandler from "../../middleware/asyncHandler";
import User from "../../models/userModel";

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateUserProfile = asyncHandler(async (req : Request, res: Response) => {
  const { name, email, password} = req.body;
  const user = await User.findById(res.locals.user._id);

  if(name && email && user!==null)
  {
    user.name = name;
    user.email = email;

    if(password)
    {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();

    res.status(200).json({
      _id:updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin
    });
  } else {
    res.status(400);
    throw new Error('User not found');
  }

});
