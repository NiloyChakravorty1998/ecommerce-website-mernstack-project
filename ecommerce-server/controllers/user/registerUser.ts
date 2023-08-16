import { Request, Response } from "express";
import asyncHandler from "../../middleware/asyncHandler";
import User from "../../models/userModel";
import generateToken from "../../utils/generateToken";

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
export const registerUser = asyncHandler(async (req : Request, res: Response) => {
  const { name, email, password} = req.body;
  const userExists = await User.findOne({email});

  if(userExists)
  {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({name, email, password});
  if(user) // user is created ?
  {
    generateToken(res, user._id); // generates jwt token and sets into the http cookie

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    })
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }


});