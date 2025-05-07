import mongoose from "mongoose"

export const dbConnection  = async()=>{
    try {
       await mongoose.connect(process.env.MONGO_URI)
        console.log('Database is connected sucessfully')
    } catch (error) {
        console.log('Error',error)
        process.exit(1)
    }
}