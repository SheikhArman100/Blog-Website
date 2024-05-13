"use client";
import { useToast } from "@/components/ui/use-toast.js";
import useAxiosPrivate from "@/lib/hooks/useAxiosPrivate.js";
import { createReplySchema } from "@/lib/zod_Schema.js";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
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
import { Reply } from "lucide-react";
import { Input } from "@/components/ui/input.jsx";
import useUserInfo from "@/lib/hooks/useUserInfo.js";

const ReplyOption = ({ commentId }) => {
  const { data } = useUserInfo();
  const user = data?.user;
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
    <>
    {user&&<AlertDialog className="">
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          className="w-fit bg-gray-100 flex items-center justify-start"
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
    </AlertDialog>}
    </>
  );
};
export default ReplyOption;
