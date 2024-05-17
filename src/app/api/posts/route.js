import Post from "@/models/Post";
import connectDB from "@/utils/db";
import { NextResponse } from "next/server";
import {v2 as cloudinary} from 'cloudinary';

//get all posts from the database
export const GET = async () => {
  try {
    // connection to the database
    await connectDB();
    // find all the posts in the database
    const posts = await Post.find().sort({ createdAt: -1 });
    // return the posts as a json
    return new NextResponse(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    // if there is an error, return a 500 status code
    console.log(error);
    return new NextResponse("Database Error", { status: 500 });
  }
};

// create a new post
export const POST = async (req) => {
  const { title, description, img, content, username } = await req.json();
  console.log('before:',img);
    // Configuration cloudinary
    cloudinary.config({ 
      cloud_name: process.env.CLOUD_NAME, 
      api_key: process.env.API_KEY, 
      api_secret: process.env.API_SECRET // Click 'View Credentials' below to copy your API secret
    });
    
    // Upload an image
    const uploadResult = await cloudinary.uploader.upload(img, {
        public_id: title.split(' ').join('-').trim(),
    }).catch((error)=>{console.log(error)});
    console.log('after:',uploadResult?.secure_url);
    //connect to mongo database
    await connectDB()
    try {
      const post = new Post({
        title,
        description,
        img:uploadResult?.secure_url,
        content,
        username,
      });
      await post.save();
      return new NextResponse(JSON.stringify(post), { status: 201 });
    } catch (error) {
      console.log(error);
      return new NextResponse(JSON.stringify(error), { status: 500 });
    }
   
};
