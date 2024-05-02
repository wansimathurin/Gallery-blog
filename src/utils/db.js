import mongoose from "mongoose";

const connectDB = async () => {
   try{
    await mongoose.connect(process.env.MONGO);

   }catch(error){
    throw new Error('Could not connect to Mongo')
    
   }
}

export default connectDB;