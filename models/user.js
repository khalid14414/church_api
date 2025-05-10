import { Schema,model } from "mongoose";
const userSchema = new Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String
    },
    avatar:{
        type:String,
        default:null
    },
    googleId:{
        type:String,
        default:null

    },
    isEmailVerified:{
        type:Boolean,
        default:false
    },
    otp:{
        type:String,
        default:null
    },
    otpExpiry:{
        type:Date,
        default:null
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },

},{timestamps:true})


export const userModel = model('User',userSchema)