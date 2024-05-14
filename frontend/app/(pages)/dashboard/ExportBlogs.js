"use client";
import { Button } from "@/components/ui/button.jsx";
import useAxiosPrivate from "@/lib/hooks/useAxiosPrivate.js";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

const ExportBlogs = () => {
  const axiosPrivate = useAxiosPrivate();
  const { data,refetch } = useQuery({
    queryKey: ["export"],
    queryFn: async () => {
      const response = await axiosPrivate.get("/blog/export",);
      return response.data
    },
    enable:false
  });

  const handleClick = () => {
    refetch()
    
    if (data) {
      
      const url = window.URL.createObjectURL(new Blob([data.file]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "blogs.csv");
      document.body.appendChild(link);
      link.click();
    }
  };
  console.log(data);
  return (
    <Button size="lg" className=" text-base py-7" onClick={handleClick}>
      Export Blogs To CSV
    </Button>
  );
};

export default ExportBlogs;
