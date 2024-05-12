import Image from "next/image.js";

import Link from "next/link.js";
import React from "react";
import BlogCard from "./BlogCard.js";
import { useQuery } from "@tanstack/react-query";
import { axiosPublic } from "@/lib/axios/axiosConfig.js";
import Spinner from "./Spinner.js";

const TrendingBlogs = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/blog/trending`
  );
  const data = await response.json();

  return (
    <div className="w-full flex-1 lg:px-[2rem] xl:px-[4rem] flex flex-col">
      <div className="w-full flex justify-between items-center ">
        <h4 className="font-semibold text-2xl">Trending BLogs</h4>
        <Link
          href="/blog/all"
          className="bg-gray-400 py-3 px-6 rounded-lg text-white hover:bg-white hover:text-black hover:shadow-md shadow-slate-700"
        >
          View All
        </Link>
      </div>

      <div className="w-full flex-1   mt-3 flex justify-center items-center ">
        <div className="  grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
          {data?.trendingBlogs.map((blog, index) => (
            <BlogCard key={index} blog={blog} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingBlogs;
