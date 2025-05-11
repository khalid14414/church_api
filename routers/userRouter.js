import { Router } from "express";
import { resendOtp, verifyEmail } from "../controllers/userController.js";



const userRouter = Router()
userRouter.post('/verify',verifyEmail)
userRouter.post('/resend',resendOtp)



export default userRouter;