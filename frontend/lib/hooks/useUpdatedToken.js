"use client";

import { axiosPublic } from "../axios/axiosConfig.js";
import { useAuthStore } from "../zustand_store/auth_store.js";


const useUpdatedToken = () => {
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  const update = async () => {
    const response = await axiosPublic.get("/auth/update-access-token", {
      withCredentials: true,
    });
    setAccessToken(response.data.accessToken);
    return response.data.accessToken;
  };
  return update;
};

export default useUpdatedToken;