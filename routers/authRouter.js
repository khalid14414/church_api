import { Router } from "express";
import { loginUser, registerUser } from "../controllers/authController.js";
import passport from "passport";

const authRouter = Router()


authRouter.post('/login', loginUser)
authRouter.post('/register', registerUser)


authRouter.get('/google',passport.authenticate('google',{scope:['profile','email']}))

authRouter.get('/google/callback',passport.authenticate('google',{failureRedirect:'/login'}), (req,res)=>{
    res.redirect('/')
})


export default authRouter