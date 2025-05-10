import { Router } from "express";
import { loginUser, registerUser } from "../controllers/authController.js";
import passport from "passport";
import jwt from "jsonwebtoken";

const authRouter = Router()


authRouter.post('/login', loginUser)
authRouter.post('/register', registerUser)


authRouter.get('/google',passport.authenticate('google',{scope:['profile','email']}))

authRouter.get('/google/callback',passport.authenticate('google',{failureRedirect:'/login'}), (req,res)=>{
    const token = jwt.sign({id:req.user._id},process.env.JWT_SECRET,{expiresIn:'1d'})
    res.status(200).json({
        message:'Login successful',
        token,
    })
})


export default authRouter