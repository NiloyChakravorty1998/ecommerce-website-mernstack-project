import { Response } from 'express';
import jwt from 'jsonwebtoken'; 


const generateToken = (res : Response, userId : String) =>
{
const token = jwt.sign({userId }, process.env.JWT_SECRET!, {expiresIn:'30d'});

    //set jwt as http-only cookie
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 30*60*60*1000
    });

}
export default generateToken;