"use client";
import Spinner from "@/components/Spinner.js";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog.jsx";
import { Button } from "@/components/ui/button.jsx";
import {
  DropdownMenu,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu.jsx";
import { Input } from "@/components/ui/input.jsx";
import { useToast } from "@/components/ui/use-toast.js";
import useAxiosPrivate from "@/lib/hooks/useAxiosPrivate.js";
import useUserInfo from "@/lib/hooks/useUserInfo.js";
import { createReplySchema, updateCommentSchema } from "@/lib/zod_Schema.js";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Delete, Edit, EllipsisVertical, Reply } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";

const UserOptions = ({ commentId, content, userEmail, blogId }) => {
  const { data } = useUserInfo();
  const user = data?.user;

  return (
    <>
      {user?.email === userEmail && (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="size-8 flex items-center justify-center rounded-full border border-indigo-500">
              <EllipsisVertical className="size-6" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Options</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <EditOption
                content={content}
                blogId={blogId}
                commentId={commentId}
              />
            </DropdownMenuItem>
            {/* <DropdownMenuItem asChild>
              <ReplyOption commentId={commentId}/>
            </DropdownMenuItem> */}
            <DropdownMenuItem asChild>
              <DeleteOption commentId={commentId} blogId={blogId} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
};
const DeleteOption = ({ commentId, blogId }) => {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  //delete comment mutation
  const handleDeleteCommentMutation = useMutation({
    mutationFn: async (data) => {
      const response = await axiosPrivate.delete(
        `/blog/${blogId}/comment/${commentId}`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    },
    onSuccess: async () => {
      return queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });
  //handle delete
  const handleDelete = () => {
    handleDeleteCommentMutation.mutate(
      {},
      {
        onError: (data) => {
          toast({
            title: data.response.data.message,
          });
        },
        onSuccess: (data) => {
          toast({
            title: data.message,
          });
        },
      }
    );
  };
  return (
    <AlertDialog className="">
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          className="w-full flex items-center justify-start"
        >
          <Delete className="mr-2 h-4 w-4 " />
          <span>Delete</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            comment and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button onClick={handleDelete}>
              {handleDeleteCommentMutation.isPending ? (
                <Spinner className="h-4 w-4" />
              ) : (
                <p>Confirm</p>
              )}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
const EditOption = ({ content, blogId, commentId }) => {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(updateCommentSchema),
  });

  //update comment mutation
  const handleUpdateCommentMutation = useMutation({
    mutationFn: async (data) => {
      const response = await axiosPrivate.put(
        `/blog/${blogId}/comment/${commentId}`,
        data,
        {
          withCredentials: true,
        }
      );
      return response.data;
    },
    onSuccess: async () => {
      return queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });

  const handleUpdateComment = (data) => {
    handleUpdateCommentMutation.mutate(
      {
        comment: data.comment,
      },
      {
        onError: (data) => {
          toast({
            title: data.response.data.message,
          });
        },
        onSuccess: (data) => {
          toast({
            title: data.message,
          });
        },
      }
    );
  };
  return (
    <AlertDialog className="">
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          className="w-full flex items-center justify-start"
        >
          <Edit className="mr-2 h-4 w-4 " />
          <span>Edit</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <form autoComplete="off" onSubmit={handleSubmit(handleUpdateComment)}>
          <AlertDialogHeader>
            <AlertDialogTitle>Edit the comment</AlertDialogTitle>
            <AlertDialogDescription>
              <Input
                {...register("comment")}
                type="text"
                defaultValue={content}
              />
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-3">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button type="submit">Update</Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};
const ReplyOption = ({ commentId }) => {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createReplySchema),
  });

  const handleCreateReplyMutation = useMutation({
    mutationFn: async (data) => {
      const response = await axiosPrivate.post(
        `/comment/${commentId}/reply`,
        data,
        {
          withCredentials: true,
        }
      );
      return response.data;
    },
    onSuccess: async () => {
      return queryClient.invalidateQueries({ queryKey: ["replies"] });
    },
  });

  const handleReply = (data) => {
    handleCreateReplyMutation.mutate(
      {
        reply: data.reply,
      },
      {
        onError: (data) => {
          toast({
            title: data.response.data.message,
          });
        },
        onSuccess: (data) => {
          toast({
            title: data.message,
          });
        },
      }
    );
  };
  return (
    <AlertDialog className="">
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          className="w-full flex items-center justify-start"
        >
          <Reply className="mr-2 h-4 w-4 " />
          <span>Reply</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <form autoComplete="off" onSubmit={handleSubmit(handleReply)}>
          <AlertDialogHeader>
            <AlertDialogTitle>Add your reply</AlertDialogTitle>
            <AlertDialogDescription>
              <Input {...register("reply")} type="text" />
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-3">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button type="submit">Submit</Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default UserOptions;
