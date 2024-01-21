import { Schema,Types,model } from "mongoose";

const postSchema= new Schema({
     title:{
        type:String,
        required:true,
     },
     content:{
        type:String,
        required:true,
     },
     category:{
        type:String,
        ref:'Category',
        required:true,
     },
     author:{
        type:Types.ObjectId,
        ref:'User',
        required:true,
     },
     thumbnail:{
        type:String,
     }
},
{
   timestamps:true,
}

)

export const Post = models.Post('Post',postSchema);