import connectDB from "@/utils/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/User";

export const POST = async(req, res, next) =>{
    const {email, password} = await req.json();
     //connecting to database
    connectDB()
    // check if user exists
    try {
        //find user by email
        const isUser = await User.findOne({email: email})
        //check if user exists check password
        if(isUser) {
          const isUserPassword = isUser.password;
          //check if password matches
          const isUserPasswordMatch = bcrypt.compareSync(password, isUserPassword);
          // if password matches send isUser data as response
          if(isUserPasswordMatch) {
            return new NextResponse(JSON.stringify({userData:isUser,message:'Successfully logged in'}), {
                status: 200
            })
          }else{
            //password don't match send invalid message
            return new NextResponse(JSON.stringify({message: "Invalid credentials"}), {
                status: 400
            })
          }
        }else{
            return new NextResponse(JSON.stringify({message: "User does not exist"}), {
                status: 400
            })
        }
    } catch (error) {
        console.log(error)
        return new NextResponse(JSON.stringify(error), {
            status: 500
        })
    }
}