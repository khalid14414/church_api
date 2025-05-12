import express from 'express'
import passport from 'passport'
import './config/passport.js'
import cors from 'cors'
import { dbConnection } from './config/db.js'
import authRouter from './routers/authRouter.js'
import userRouter from './routers/userRouter.js'


const app = express()
// Define Middleware
app.use(express.json())
app.use(passport.initialize())
app.use(express.urlencoded({extended:true}))
app.use(cors())




// Define Route
app.use('/auth',authRouter)
app.use('/user',userRouter)




// App and data connection 
const port = process.env.PORT || 1110
app.listen(port,()=>console.log(`App is connected to port ${port}`))
dbConnection()




