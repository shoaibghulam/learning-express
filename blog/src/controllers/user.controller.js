import { validationResult } from "express-validator";
import { User } from "../models/user.model.js";
import { uploadFileCloudinary } from "../utils/cloudinary.js";
// import { hasherPassword } from "../utils/hasers.js";
import fs from 'fs';

const get=async (req, res, next) => {
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

const post=async (req, res, next) => {
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
const update=async (req, res, next) => {
    try {
        const id=req.params.id;
        const data = await User.findByIdAndUpdate(id,req.body, {
            new: true,
            runValidators: true,
          });
        data.save();
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
    get,
    SignleUserget,
    post,
    update,
    deleteUser
}