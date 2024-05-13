"use client"
import { axiosPublic } from '@/lib/axios/axiosConfig.js';
import { useQuery } from '@tanstack/react-query';
import React from 'react'

const RepliesSection = ({commentId}) => {

    const{data}=useQuery({
        queryKey: ["replies",commentId],
        queryFn: async () => {
          const response = await axiosPublic.get(`/comment/${commentId}/reply`);
          
          return response.data;
        },
    })
   
  return (
    <div className='flex flex-col gap-2 border-l-2 border-indigo-500 px-12 ml-2 mt-2 '>
        {
            data?.replies.map((reply,index)=>(
               commentId===reply.commentId &&  <div key={index} className="bg-gray-200  rounded-md w-full  shadow-lg px-4 py-4 border border-orange-500 flex flex-col ">
               <span className='text-base font-light'>Reply</span>
               <span className="text-indigo-500 text-sm">
                 {reply.userId.email}
               </span>
               <p className="text-lg font-semiBold">{reply.content}</p>
             </div>
            ))
        }
        
       
    </div>
  )
}

export default RepliesSection