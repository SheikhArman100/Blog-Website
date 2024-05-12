"use client"
import { useQuery } from "@tanstack/react-query";
import { axiosPublic } from "../axios/axiosConfig.js";

const useUserInfo = () => {
  
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await axiosPublic.get("/auth/user-info", {
        withCredentials: true,
      });

      return response.data;
  
    },
  });
};

export default useUserInfo