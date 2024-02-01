import { Schema ,model} from "mongoose";
import {hasherPassword,hasherPasswordVerifer} from '../utils/hasers.js';
import jwt from 'jsonwebtoken';
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
    avatar:{
        type:String,
        required:true,
        
    },
    refershToken:{
        type:String,
    }
},
{
    timestamps:true
}

);
userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        return next();
    }
    else{
        this.password = hasherPassword(this.password)
    }
});
userSchema.methods.asPasswordVerify= async function(password){
    return hasherPasswordVerifer(password, this.password)
}
userSchema.methods.accessTokenGenerater= async function(){
    return jwt.sign(
        {
            _id:this._id,
            name:`${this.first_name} ${this.last_name}`,
            email:this.email
        },
        process.env.ACCESS_TOKEN,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.refershTokenGenerater= async function(){
    return jwt.sign(
        {
            _id:this._id,
            name:`${this.first_name} ${this.last_name}`,
            email:this.email
        },
        process.env.REFRESH_TOKEN,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}
export const User =  model('User', userSchema);
