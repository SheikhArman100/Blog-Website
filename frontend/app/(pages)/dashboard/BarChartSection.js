"use client";

import Spinner from "@/components/Spinner.js";
import useAxiosPrivate from "@/lib/hooks/useAxiosPrivate.js";
import { useQuery } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";


const BarChartSection = () => {
  const axiosPrivate=useAxiosPrivate()
  const { data, isPending, error } = useQuery({
    queryKey: ["daily like","blogs"],
    queryFn: async () => {
      const response = await axiosPrivate.get(`/blog/like`);
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
      <BarChart
        width={500}
        height={300}
        data={data.likes}
        margin={{
          right: 30,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="title" height={30}  angle={-45} textAnchor="end" interval={0}/>
        <YAxis />
       
        <Legend />
        <Bar dataKey="likeCount" fill="#2563eb" />
        
      </BarChart>
    </ResponsiveContainer>
    
  );
};

export default BarChartSection;

// const CustomTooltip = ({ active, payload, label }) => {
//   if (active && payload && payload.length) {
//     return (
//       <div className="p-4 bg-slate-200 flex flex-col gap-4 rounded-md">
//         <p className="text-medium text-lg">{label}</p>
//         <p className="text-sm text-blue-400">
//           Revenue:
//           <span className="ml-2">${payload[0].value}</span>
//         </p>
        
//       </div>
//     );
//   }
// };
