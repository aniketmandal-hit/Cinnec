import mongoose from "mongoose";
const connectDb = async()=>{
    try {
          mongoose.connect(process.env.MONGODB_URI)
    console.log('Connected to database')
    } catch (error) {
        console.log(error.message)
    }
  
}
export default connectDb;