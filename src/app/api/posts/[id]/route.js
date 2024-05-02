import Post from "@/models/Post";
import connectDB from "@/utils/db";
import { NextResponse } from "next/server"


export const GET = async (req, {params}) =>  {
    const {id} = params;
    try {
        await connectDB();
        const post = await Post.findById(id)
        return new NextResponse(JSON.stringify(post),{status:200});
    } catch (error) {
        
        return new NextResponse('Database Error',{status:500});
    }
}