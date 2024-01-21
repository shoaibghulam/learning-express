import { Schema ,model} from "mongoose";

const userSchema = new Schema({
    first_name:{
        type:String,
        required:true,
        lowrcase:true,
        required:true,
    },
    last_name:{
        type:String,
        required:true,
        lowrcase:true,
        required:true,
    },
    email:{
        type:String,
        required:true,
        lowrcase:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        lowrcase:true,
    },
},
{
    timestamps:true
}

);
export const User =  model('User', userSchema);
