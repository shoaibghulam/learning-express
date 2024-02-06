import { validationResult } from "express-validator";
import { User } from "../models/user.model.js";
import { uploadFileCloudinary } from "../utils/cloudinary.js";
// import { hasherPassword } from "../utils/hasers.js";
import * as status from 'http-status-codes'
import fs from 'fs';
import { log } from "console";

const getUser=async (req, res, next) => {
      try {
      
        const data = await User.find({});
        return res.status(200).json(data);
        
      } catch (error) {
        return res.json(error)
      }
}
const SignleUserget=async (req, res) => {
      try {
        const id = req.params.id;
        const data = await User.findById(id);
        return res.status(200).json(data);
        
      } catch (error) {
        return res.json({status:false, message:error})
      }
}

const postUser=async (req, res) => {
    try {
      
      // console.log("the avatar is",)
      const errors = validationResult(req)
      if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        
      }
      const {first_name, last_name,email, password,avatar} = req.body;
       const avatarThumb = await uploadFileCloudinary(req.files?.avatar[0]?.path);
       if(avatarThumb.url){
        fs.unlinkSync(req.files?.avatar[0]?.path);
       }
        req.body.avatar=avatarThumb.url;
        const data = await User.create(req.body)
         data.password ="password is encrypted";
         console.log("the pass is",data.password)
        res.status(200).json({
            status:true,
            message:"Data has been added successfully",
            data: data
          });

      
       


    } catch (error) {
      return res.json({status:false, message:error})
    }
         
}
const updateUser=async (req, res) => {
    try {
        const id=req.user.id;
        if(!id) throw new Error("Please provide a id");
        const data = await User.findByIdAndUpdate(id,{
          $set:{
            first_name:req.body.first_name,
            last_name:req.body.last_name,
          }
        }, {
            new: true,
            runValidators: true,
          }).select('-password -refershToken');
        
        res.status(200).json({
            status:true,
            message:"Data has been added successfully",
            data: data
          });
        
    } catch (error) {
        console.log("the error was: " + error)
        console.log("the error was: " + error.collection)
        return res.json({status:false, message:error})
    }
         
}
const updateAvatar =async (req, res) => {
try {
  const avatarFile = req.file?.path
   console.log("the file is ",req.user.id)
  
  if(!avatarFile) throw new Error("Avatar not found")
  const avatar = await uploadFileCloudinary(avatarFile);
  console.log("object is ",avatar)
  if(!avatar) throw new Error("Cloudinary API error")
  const user = await User.findByIdAndUpdate(req.user.id,{
$set:{
  avatar: avatar.url
}
}).select('-password -refershToken')
fs.unlinkSync(avatarFile)
res.status(200).json({
  status:true,
    message:"Data has been added successfully",
    data: user
  });
} catch (error) {

  return res
  .json({status:false, message:error})
}
}




const deleteUser=async (req, res) => {
    try {
      const id = req.params.id;
      const data = await User.findByIdAndDelete(id);
      return res.status(200).json({
        
        data:data === null ? "data not found": data
      });
      
    } catch (error) {
        console.log("the error is: " + error);
      return res.json(error)
    }
}

export {
  getUser,
    SignleUserget,
    postUser,
    updateUser,
    deleteUser,
    updateAvatar
}