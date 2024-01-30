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
        type:Types.ObjectId,
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
// postSchema.pre('save',async function(next){
//    if(!this.isModified('category')) return next();
//    this.category = Types.objectId(this.category);
// })
export const Post = models.Post('Post',postSchema);