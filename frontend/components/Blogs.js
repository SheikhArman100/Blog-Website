import Link from "next/link.js";
import BlogCard from "./BlogCard.js";

const Blogs = async ({ page }) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/blog/all?page=${page}`
  );
  const data = await response.json();
  console.log(data?.blogs);
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
          href={{
            pathname: "/blog/all",
            query: {
              page: page + 1,
            },
          }}
          className={`py-4 px-8 bg-black text-white text-sm rounded border hover:border-black hover:bg-white hover:text-black font-semibold ${
            data?.blogs.length === 0 ? "pointer-events-none opacity-50" : ""
          }`}
        >
          Next
        </Link>
      </div>
    </div>
  );
};

export default Blogs;
