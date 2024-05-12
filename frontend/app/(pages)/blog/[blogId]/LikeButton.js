"use client";
import { useToast } from "@/components/ui/use-toast.js";
import useAxiosPrivate from "@/lib/hooks/useAxiosPrivate.js";
import useUserInfo from "@/lib/hooks/useUserInfo.js";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ThumbsUp } from "lucide-react";
import Link from "next/link.js";
import React from "react";

const LikeButton = ({ blogId }) => {
  const { data } = useUserInfo();
  const user = data?.user;

  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  //get like status
  const { data: status } = useQuery({
    queryKey: ["status", blogId],
    queryFn: async () => {
      const response = await axiosPrivate.get(`/blog/${blogId}/like`, {
        withCredentials: true,
      });
      return response.data;
    },
  });
  //handle like or remove like
  const handleLIkeMutation = useMutation({
    mutationFn: async () => {
      const response = await axiosPrivate.post(`/blog/${blogId}/like`, {
        withCredentials: true,
      });
      return response.data;
    },
    onSuccess: async () => {
      return queryClient.invalidateQueries({ queryKey: ["status", blogId] });
    },
  });

  //onClick
  const handleClick = () => {
    handleLIkeMutation.mutate(
      {},
      {
        onSuccess: (data) => {
          toast({
            title: data.message,
          });
        },
        onError: (data) => {
          toast({
            title: data.response.data.message,
          });
        },
      }
    );
  };

  return (
    <>
      {user ? (
        <button
          onClick={handleClick}
          className={`${
            status?.likeStatus ? "bg-black text-white" : "border border-black"
          }  p-3 border border-black rounded-full `}
        >
          <ThumbsUp className="size-6" />
        </button>
      ) : (
        <Link href="/auth/signin" className="text-base text-red-600 underline ">
          Sign in to like or comment in this blog
        </Link>
      )}
    </>
  );
};

export default LikeButton;
