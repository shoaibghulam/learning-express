import { STATES } from "mongoose";
import { Post } from "../models/post.model.js"
// import { ApiError } from "../utils/ApiError.js";
import { uploadFileCloudinary } from "../utils/cloudinary.js";
// import * as code from 'http-status-codes'

export const addPost = async (req, res) => {
      try {
        console.log("the file is ",req.file?.path);
        const uploadImage = await uploadFileCloudinary(req.file?.path);
        if(!uploadImage.url) throw new Error("Something went wrong uploading")
        req.body.thumbnail = uploadImage.url
        const post  = await Post.create(req.body);
        return res
        .status(200)
        .json({
          status:true,
          message:"Post has been created successfully",
          data:post
        })
      } catch (error) {
        return res
        .status(error.statusCode)
        .json({
          status:false,
          message:error.message,
        })
      }
}



export const getPost = async (req, res) => {
  try {
    const result = await Post.find().populate('author','id first_name last_name avatar ').populate('category','id title')
  if(!result) throw new Error("Post not found")
  return res
    .status(200)
    .json({
      status:true,
      data:result
    })
  } catch (error) {
    return res
    .status(error.statusCode)
    .json({
      status:false,
      message:error.message
    })
  }
}
export const getSinglePost = async (req, res) => {
  try {
    const id= req.params.id
    const result = await Post.findById(id).populate('author','id first_name last_name avatar ').populate('category','id title')
  if(!result) throw new Error(" Cant Find Post")
  return res
    .status(200)
    .json({
      status:true,
      data:result
    })
  } catch (error) {
    console.log("error: " + error)
    return res
    .status(400)
    .json({
      status:false,
      message:error.message
    })
  }
}