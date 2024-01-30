import { Schema, model } from "mongoose";

const categorySchema = new Schema({
    title:{
        type:String,
        unique:true,
        required:true,

    }
},
{
    timestamps:true,
}
)

export const  Category= model('Category',categorySchema);
