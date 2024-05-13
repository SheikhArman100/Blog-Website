"use client";
import Spinner from "@/components/Spinner.js";
import { axiosPublic } from "@/lib/axios/axiosConfig.js";
import { useQuery } from "@tanstack/react-query";
import { EllipsisVertical } from "lucide-react";
import React from "react";
import UserOptions from "./UserOptions.js";
import RepliesSection from "./RepliesSection.js";
import ReplyOption from "./ReplyOption.js";

const Comments = ({ blogId }) => {
  const { data, isPending, error } = useQuery({
    queryKey: ["comments"],
    queryFn: async () => {
      const response = await axiosPublic.get(`/blog/${blogId}/comment`);
      return response.data;
    },
  });
  if (isPending) {
    return (
      <div className="w-full h-80 flex items-center justify-center">
        <Spinner className="size-10" />
      </div>
    );
  }
  if (error) {
    return (
      <div className="w-full h-80 flex items-center justify-center">
        <p className="text-base font-semibold">Something went wrong</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl flex flex-col gap-3">
      {data?.comments.map((comment, index) => (
        <div key={comment._id}>
          {/* comment */}
          <div className="flex gap-x-2">
            <div className="bg-gray-200  rounded-md w-full shadow-lg px-4 py-4 border border-indigo-500  ">
              <div className="w-full">
              <span className="text-indigo-500 text-sm">
                {comment.userId.email}
              </span>
              <p className="text-lg font-semiBold">{comment.content}</p>
              </div>
              <ReplyOption commentId={comment._id}/>
            </div>
            <UserOptions
              commentId={comment._id}
              content={comment.content}
              userEmail={comment.userId.email}
              blogId={blogId}
            />
          </div>
          {/* replies */}

          <RepliesSection  commentId={comment._id} />
        </div>
      ))}
    </div>
  );
};

export default Comments;
