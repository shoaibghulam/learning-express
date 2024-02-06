import { User } from '../models/user.model.js';
import jwt from 'jsonwebtoken';

export const verifyJwt= async(req,res,next)=>{
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
      
        if (!token)  throw new Error("Token is required");
       
        const decodeData=  jwt.verify(token,process.env.ACCESS_TOKEN)
        const user =await User.findById(decodeData._id)
        
        if (!user) throw new Error("Invalid Token");
        req.user = user;
        next();
    
    } catch (error) {
     return res
     .status(404).
     json({
        status:false,
        message:error.message
     })   
    }
}