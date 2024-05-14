"use client"

import Spinner from '@/components/Spinner.js';
import { axiosPublic } from '@/lib/axios/axiosConfig.js';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from 'recharts';





const PieChartSection = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ["category wise","blogs"],
    queryFn: async () => {
      const response = await axiosPublic.get(`/category/blog`);
      return response.data;
    },
  });
  if(isPending){
    return<div className='h-96 w-96 flex items-center justify-center'><Spinner className="size-10"/></div>
  }
  if(error){
    return<div className='h-96 w-96 flex items-center justify-center'><p className='text-lg'>Something went wrong</p></div>
  }
  return (
    <ResponsiveContainer width="100%" height={500}>
      <PieChart>
        <Pie
          data={data?.categoryCountsArray}
          cx="50%"
          cy="50%"
          outerRadius={150}
          labelLine={false}
          fill="#8884d8"
          dataKey="count"
          nameKey="category"
          label={item => `${item.name}(${item.value})`}
         
        >
          
          
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieChartSection;
