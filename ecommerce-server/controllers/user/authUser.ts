import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import asyncHandler from "../../middleware/asyncHandler";
import User from "../../models/userModel";

// @access  Public
export const authUser = asyncHandler(async (req : Request, res : Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email  : email}) //searching for an user with the same email
  
  if(user && ( await user.matchPassword(password) )){
    
    const token = jwt.sign({userId: user._id!}, process.env.JWT_SECRET!, {expiresIn:'30d'});

    //set jwt as http-only cookie
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 30*60*60*1000
    });

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