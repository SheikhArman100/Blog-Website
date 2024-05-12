import BlogView from "./BlogView.js";
import CommentForm from "./CommentForm.js";
import Comments from "./Comments.js";

const Blog = async ({ params }) => {
  return (
    <section className="w-full flex-1 py-4 px-8 lg:px-[2rem] xl:px-[4rem] flex flex-col items-center gap-4">
      {/* blog view */}
      <BlogView blogId={params.blogId} />
      <div className="bg-black w-full h-0.5" />

      {/* comment and reply */}
      <div className="w-full flex flex-col items-center gap-4">
        <h4 className="text-lg font-medium">Comments</h4>
        <CommentForm blogId={params.blogId} />
        <Comments blogId={params.blogId} />
      </div>
    </section>
  );
};

export default Blog;
