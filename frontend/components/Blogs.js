"use client"
import Link from "next/link.js";
import BlogCard from "./BlogCard.js";
import { useQuery } from "@tanstack/react-query";
import { axiosPublic } from "@/lib/axios/axiosConfig.js";
import Spinner from "./Spinner.js";

const Blogs = ({ page }) => {
  const { data, isPending, error } = useQuery({
    queryKey: ["blogs",page],
    queryFn: async () => {
      const response = await axiosPublic.get(`/blog/all?page=${page}`);
      return response.data;
    },
  });
  if(isPending){
    return(
      <div className='w-full flex-1 flex items-center justify-center'><Spinner className="size-10"/></div>
    )
  }
  if(error){
    return(
      <div className='w-full flex-1 flex items-center justify-center'><p className="text-lg">Something went wrong</p></div>
    )
  }
 
 


  return (
    <div className="w-full flex-1 max-w-5xl flex flex-col">
      {data?.blogs.length === 0 ? (
        <p className="w-full flex-1  flex items-center justify-center text-lg font-semibold ">
          No more data
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 mt-3">
          {data?.blogs.map((blog, index) => (
            <BlogCard key={index} blog={blog} />
          ))}
        </div>
      )}

      <div className="w-full py-5 flex items-center justify-center gap-2">
        <Link
          scroll={false}
          href={{
            pathname: "/blog/all",
            query: {
              page: page > 1 ? page - 1 : 1,
            },
          }}
          className={`py-4 px-8 bg-black text-white text-sm rounded border hover:border-black hover:bg-white hover:text-black font-semibold ${
            page <= 1 ? "pointer-events-none opacity-50" : ""
          }`}
        >
          Prev
        </Link>
        <Link
          scroll={false}
          href={{
            pathname: "/blog/all",
            query: {
              page: page + 1,
            },
          }}
          className={`py-4 px-8 bg-black text-white text-sm rounded border hover:border-black hover:bg-white hover:text-black font-semibold ${
            data?.blogs.length === 0 || data?.blogs.length<6? "pointer-events-none opacity-50" : ""
          }`}
        >
          Next
        </Link>
      </div>
    </div>
  );
};

export default Blogs;
