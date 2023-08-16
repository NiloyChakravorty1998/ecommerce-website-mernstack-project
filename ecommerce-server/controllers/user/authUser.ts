import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import asyncHandler from "../../middleware/asyncHandler";
import User from "../../models/userModel";
import generateToken from "../../utils/generateToken";

// @access  Public
export const authUser = asyncHandler(async (req : Request, res : Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email  : email}) //searching for an user with the same email
  
  if(user && ( await user.matchPassword(password) )){
    generateToken(res, user._id); // generates jwt token and sets into the http cookie

    res.status(200).json(
        {
            status: 200,
            message: 'Logged in successful',
        }
    )
  }
  else{
    res.status(401);
    throw new Error('Invalid email or password');
  }
});