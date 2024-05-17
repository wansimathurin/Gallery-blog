import Post from "@/models/Post";
import connectDB from "@/utils/db";
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// getting a post by id
export const GET = async (req, { params }) => {
  const { id } = params;
  try {
    await connectDB();
    const post = await Post.findById(id);
    return new NextResponse(JSON.stringify(post), { status: 200 });
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
};

// delete a post by id
export const DELETE = async (req, { params }) => {
  const { id } = params;
  await connectDB();
  //deleting images from database
  try {
     // Configuration cloudinary
     cloudinary.config({ 
        cloud_name: process.env.CLOUD_NAME, 
        api_key: process.env.API_KEY, 
        api_secret: process.env.API_SECRET // Click 'View Credentials' below to copy your API secret
    });
    const post = await Post.findById(id);
    console.log("Post :", post);
    cloudinary.api
      .delete_resources([post.title], {
        type: "upload",
        resource_type: "image",
      })
      .then(console.log);
  } catch (error) {
    console.log(error);
    return new NextResponse("Cloudinary Image not deleted", { status: 500 });
  }
  //deleting the post
  try {
    const post = await Post.findByIdAndDelete(id);
    return new NextResponse({
      message: "Post deleted successfully",
      status: 200,
    });
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
