import { cookie } from "express-validator";
import { User } from "../models/user.model.js";
import jwt from 'jsonwebtoken';
const generateAccessAndRefershToken = async(user_id)=>{
    const  user = await User.findById(user_id);
    
     const refershToken=await user.refershTokenGenerater();
     const accessToken= await user.accessTokenGenerater();
     user.refershToken=refershToken;
     await user.save({validateBeforeSave:false});
    
     return {accessToken,refershToken};
}

export const SigninUser = async(req,res)=>{
    try {
        const {email,password} = req.body;
        if(!email) throw new Error("Please enter Email")
        const user = await User.findOne({email})
        if(!user) throw new Error("User not found")
        const isValidPassword = await user.asPasswordVerify(password)
        if(!isValidPassword) throw new Error("Enter Correct Email and Password");
        const {accessToken, refershToken} = await generateAccessAndRefershToken(user.id);
        const options={
            httpOnly:true,
            secure:true
        }
       const logedIn = await User.findById(user.id).select('-password -refershToken')
        return res
        .status(200)
        .cookie("accessToken",accessToken,options)
        .cookie("refershToken", refershToken,options)
        .json({
            accessToken:accessToken,
            refershToken:refershToken,
            user:logedIn
        })

    } catch (error) {
        console.log("the error is");
        return res.json({error:error.message})
    }
    
}



export const  logOut= async(req, res) => {
      try {
       const user = await User.findByIdAndUpdate(req.user._Id,{
            $set:{
                refershToken:undefined,
            }
       },
       {
        new:true,
       });
       const options={
        httpOnly:true,
        secure:true
       }
       return res
       .status(200)
       .clearCookie('accessToken',options)
       .clearCookie('refershToken',options)
       .json({
        status:true,
        message:"Logout was successful",
        data:user,
       })
        
      } catch (error) {
        return  res
        .status(404).
        json({
            status:false,
            message:error.message
        })
      }
        
}

export const refershToken=async(req,res)=>{
    try {
        const inCommingResfersToken= req.cookies?.refershToken || req.header("Authorization")?.replace("Bearer ","")
        if(!inCommingResfersToken)  throw new Error("RefershToken Not Found");
        const decoderToken = await jwt.verify(inCommingResfersToken,process.env.REFRESH_TOKEN)
        const user = await User.findById(decoderToken.id);
        if(!user) throw new Error("User not found");
        const {accessToken,refershToken}= await generateAccessAndRefershToken(user.id);
        const options = {
            httpOnly: true,
            secure: true,
        }
       return res
       .status(200)
       .cookie("accessToken",accessToken,options)
       .cookie("refershToken", refershToken,options)
       .json({
           status:true,
           message:"New Access Token Generated",
           accessToken:accessToken,
           refershToken:refershToken,
           user:user
       })
      
     

        
    } catch (error) {
        return  res
        .status(404).
        json({
            status:false,
            message:error.message
        })
    }
}

export const changePassword = async(req, res) => {
   try {
     const {oldPassword, newPassword} = req.body;
    //  const id = req.user.id;
    const user = await User.findById(req.user.id);
    if(!user) throw new Error("user not found");
     const asverifyOldPassword = await user.asPasswordVerify(oldPassword);
     if (asverifyOldPassword==false) throw new Error("Please enter a Correct Password");

     user.password = newPassword;
     await user.save()
     return res
     .status(200)
     .json({
        status:true,
        message:"Your password has been updated"
     })
   } catch (error) {
    return  res
    .status(404).
    json({
        status:false,
        message:error.message
    })
   }
    
}