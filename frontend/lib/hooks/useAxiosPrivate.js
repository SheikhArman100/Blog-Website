"use client"

import { useEffect } from "react";
import { axiosPrivate } from "../axios/axiosConfig.js";
import { useAuthStore } from "../zustand_store/auth_store.js";
import useUpdatedToken from "./useUpdatedToken.js";



const useAxiosPrivate = () => {
  const update = useUpdatedToken();
  const accessToken=useAuthStore((state)=>state.accessToken)

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await update();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [accessToken, update]);

  return axiosPrivate;
};

export default useAxiosPrivate;