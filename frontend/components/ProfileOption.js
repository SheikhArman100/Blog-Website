"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu.jsx";
import { ArrowDown, ChevronLeft } from "lucide-react";
import useUserInfo from "@/lib/hooks/useUserInfo.js";
import { Button } from "./ui/button.jsx";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation.js";
import { axiosPublic } from "@/lib/axios/axiosConfig.js";
import { useToast } from "./ui/use-toast.js";
import Link from "next/link.js";

const ProfileOption = () => {
  const { data } = useUserInfo();
  const user = data?.user;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="p-1 rounded-full border border-black">
          <ChevronLeft className="-rotate-90 size-4" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          <h6 className="text-base">{user.name}</h6>
          <span className="text-gray-500 text-sm ">{user.email}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/dashboard">Dashboard</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <SignOutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
const SignOutButton = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  //signout mutation
  const handleSignOutMutation = useMutation({
    mutationFn: async () => {
      const response = await axiosPublic.post("/auth/signout", {
        withCredentials: true,
      });
      return response.data;
    },
    onSuccess: async () => {
      router.refresh();
      return queryClient.removeQueries({
        queryKey: ["user"],
        exact: true,
      });
    },
  });

  //handle onClick
  const handleSignOutClick = () => {
    handleSignOutMutation.mutate(
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
    <Button
      variant="ghost"
      onClick={handleSignOutClick}
      className="w-full flex items-center justify-start font-semibold"
    >
      Sign out
    </Button>
  );
};

export default ProfileOption;
