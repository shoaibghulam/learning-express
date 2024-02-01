import { User } from "../models/user.model.js";

const generateAccessAndRefershToken = async(user_id)=>{
    const  user = await User.findById(user_id);
    console.log("the user token ins",user)
     const refershToken=await user.refershTokenGenerater();
     const token= await user.accessTokenGenerater();
     user.refershToken=refershToken;
     await user.save({validateBeforeSave:false});
     console.log("the user token",token);
     return token;
}

export const SigninUser = async(req,res)=>{
    try {
        const {email,password} = req.body;
        if(!email) throw new Error("Please enter Email")
        const user = await User.findOne({email})
        if(!user) throw new Error("User not found")
        const isValidPassword = await user.asPasswordVerify(password)
        if(!isValidPassword) throw new Error("Enter Correct Email and Password");
        const token = await generateAccessAndRefershToken(user.id);
        console.log(token);
        return res.json({data:"isValidPassword",token:token})
    } catch (error) {
        console.log("the error is");
        return res.json({error:error.message})
    }
}