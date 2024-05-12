import { Button } from "@/components/ui/button.jsx";
import { ThumbsUp } from "lucide-react";
import Image from "next/image.js";
import React from "react";
import LikeButton from "./LikeButton.js";

const BlogView = async ({ blogId }) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/blog/${blogId}`
  );
  const data = await response.json();
  const blog = data?.blog;
  return (
    <div className="w-full max-w-4xl flex flex-col gap-y-4">
      <div className="flex item-center justify-between gap-x-6">
        <div>
          <h6 className="text-lg font-semibold">{blog.userId.name}</h6>
          <span className="text-base text-gray-400">{blog.userId.email}</span>
        </div>
        {/* like button */}
        <LikeButton blogId={blogId}/>
        
      </div>
      <h2 className="text-3xl md:text-4xl font-bold text-center mt-3">
        {blog.title}
      </h2>
      <div className="flex justify-center">
        <span className="text-xl px-4 py-3 border border-black rounded-md">{blog.categoryId.title}</span>
     </div>
      <div className="bg-gray-200 w-full h-80 md:h-[28rem] rounded-md flex items-center justify-center relative">
        <Image
          fill
          src={blog.image}
          className="w-full h-full object-cover object-center"
          alt="blog image"
        />
      </div>
      <div className="px-2 text-base" dangerouslySetInnerHTML={{ __html: blog.description }}/>
     

      
    </div>
  );
};

export default BlogView;
