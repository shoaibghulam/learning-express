import { Types } from "mongoose";
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


export const getPost =async (req, res) => {
    try {
      const posts = await Post.aggregate([
        {
          $lookup:{
            from:'users',
            localField:'author',
            foreignField:'_id',
            as:"author_deatails"
          }
        },
        {
          $addFields:{
            counts:{
                $size:'$author_deatails._id'
            }
          }
        },
        {
          $addFields:{
            author_deatails:{
              $arrayElemAt:['$author_deatails',0]
            }
          },
         
        }
      ]);
      return res
    .status(200)
    .json({
      status:true,
      data:posts
    })
    } catch (error) {
      return res
          .status(404)
          .json({
            status:false,
            message:error.message
          })
    }
}

export const getSinglePost = async (req, res) => {
  try {
   const post = await Post.aggregate([
    {
      $match:{
        _id:new Types.ObjectId(req.params.id)
      }
    },
    {
      $lookup:{
        from: "categories",
        localField: "category",
        foreignField: "_id",
        as: "category",
        pipeline:[
          {
            $project:{
              _id:1,
              title: 1
            }
          }
        ]
      }
    },
    {
      $addFields:{
        category:{
          $arrayElemAt:['$category',0]
        }
      }
    },
    {
      $lookup:{
        from:"users",
        localField: "author",
        foreignField: "_id",
        as: "author",
        pipeline:[
          {
            $project:{
              _id:1,
              first_name:1,
              last_name:1,
              avatar:1,
            }
          }
        ]
      }
    },
    {
      $addFields:{
          author:{
            $arrayElemAt:['$author',0]
          }
    } 
  }
   ])
  console.log("the post data is",post);
    return res
    .status(200)
    .json({
      status:true,
      data:post
    })
    
  } catch (error) {
    return res
    .status(404)
    .json({
      status:false,
      message:error.message
    })
  }
}

export const authrPosts=async (req, res) => {
  try {
    const posts = await Post.aggregate([
        {
          $match:{
            author:new Types.ObjectId(req.params.author)
          }
        },
        {
          $lookup:{
            from: "categories",
            localField: "category",
            foreignField: "_id",
            as: "category",
            pipeline:[
              {
                $project:{
                  _id:1,
                  title: 1
                }
              }
            ]
          }
        },
        {
          $addFields:{
            category:{
              $arrayElemAt:['$category',0]
            }
          }
        },
        {
          $lookup:{
            from:"users",
            localField: "author",
            foreignField: "_id",
            as: "author",
            pipeline:[
              {
                $project:{
                  _id:1,
                  first_name:1,
                  last_name:1,
                  avatar:1,
                }
              }
            ]
          }
        },
        {
          $addFields:{
              author:{
                $arrayElemAt:['$author',0]
              }
        } 
      }
    ])

    return res
    .status(200)
    .json({
      status:true,
      message:"Authors posts",
      data:posts
    })
  } catch (error) {
    return res
    .status(404)
    .json({
      status:false,
      message:error.message
    })
  }
}
export const authrPostsCount=async (req, res) => {
  try {
    const posts = await Post.aggregate([
        {
          $match:{
            author:new Types.ObjectId(req.params.author)
          }
        },
        {
          $group:{
            _id:null,
            count:{$sum:1}
          }
        },
        {
          $project:{
            count:1
          }
        }
      
    ])
    if(!posts.length) throw new Error("Author Posts Not Found")
    return res
    .status(200)
    .json({
      status:true,
      message:"Authors posts Count",
      count:posts[0]?.count
    })
  } catch (error) {
    return res
    .status(404)
    .json({
      status:false,
      message:error.message
    })
  }
}