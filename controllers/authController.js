import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import {  userModel } from "../models/user.js"
import { registerSchema,loginSchema } from "../validators/authValidator.js"
import { generateOtp } from "../utils/tokenGenerate.js"
export const registerUser = async (req,res)=>{
    try {
        const {error,value} = registerSchema.validate(req.body)
        if(error){
            return res.status(400).json({error:error.details[0].message})
        }
        const user = await userModel.findOne({email:value.email})
        console.log(user)
        
        if(user){
            return res.status(400).json({error:'User already exists'})
        }
        const hashedPassword = await bcrypt.hash(value.password,10)

        const newUser = new userModel({
            name:value.name,
            email:value.email,
            password:hashedPassword,
            otp:generateOtp(),
            otpExpiry:Date.now() + 10 * 60 * 1000 // 10 minutes
        })
        await newUser.save()
        res.status(201).json({message:'User registered successfully',user:newUser})
    } catch (error) {
        res.status(500).json({error:'Internal server error',error:error.message})
    }
}
export const loginUser = async (req,res)=>{
    try {
        const {error,value} = loginSchema.validate(req.body)
        if(error){
            return res.status(400).json({error:error.details[0].message})
        }
        const user = await userModel.findOne({email:value.email,isEmailVerified:true})
        if(!user){
            return res.status(400).json({error:'Invalid email or password'})
        }
        const isMatch = await bcrypt.compare(value.password,user.password)
        if(!isMatch){
            return res.status(400).json({error:'Invalid email or password'})
        }
        const token =jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'1d'})
        res.status(200).json({message:'Login successful',token,})
    } catch (error) {
        
    }
}
export const forgetPassword = async (req,res)=>{
    try {
        
    } catch (error) {
        
    }
}
export const restPassword = async (req,res)=>{
    try {
        
    } catch (error) {
        
    }
}