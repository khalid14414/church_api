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
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    avatar:{
        type:String,
        default:'https://res.cloudinary.com/dqj0xg3zv/image/upload/v1698230984/avatars/default-avatar_owkq5h.png'
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