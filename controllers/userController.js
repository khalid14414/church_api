import { userModel } from "../models/user.js"
import { generateOtp } from "../utils/tokenGenerate.js"

export const verifyEmail = async (req, res) => {
    try {
        const {email, otp} = req.body
        const user = await userModel.findOne({email})
        if (!user) {
            return res.status(400).json({error: 'User not found'})
        }
        if (user.otp !== otp ) {
            return res.status(400).json({error: 'Invalid OTP'})
        }
        if (user.otpExpiry < Date.now()) {
            return res.status(400).json({error: 'OTP expired'})
        }
        user.isEmailVerified = true,
        user.otp = null,
        user.otpExpiry = null
        await user.save()
    } catch (error) {
        return res.status(500).json({message: 'Internal server error', error: error.message})
    }
}

export const resendOtp = async (req, res)=>{
    try {
        const {email}= req.body
        const user = await userModel.findOne({email})
        if (!user) {
            return res.status(400).json({error: 'User not found'})
        }
        if (user.isEmailVerified) {
            return res.status(400).json({error: 'Email already verified'})
        }
        user.otp= generateOtp()
        user.otpExpiry = Date.now() + 10 * 60 * 1000 // 10 minutes
        await user.save()

        return res.status(200).json({message: 'OTP resent successfully', otp: user.otp})
    }
    catch (error) {
        return res.status(500).json({message: 'Internal server error', error: error.message})
    }
}