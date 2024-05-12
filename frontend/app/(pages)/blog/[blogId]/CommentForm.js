"use client"
import Spinner from '@/components/Spinner.js'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { useToast } from '@/components/ui/use-toast.js'
import useAxiosPrivate from '@/lib/hooks/useAxiosPrivate.js'
import useUserInfo from '@/lib/hooks/useUserInfo.js'
import { createCommentSchema } from '@/lib/zod_Schema.js'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

const CommentForm = ({blogId}) => {
  const { data } = useUserInfo();
  const user = data?.user;
  const axiosPrivate=useAxiosPrivate()
  const queryClient=useQueryClient()
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createCommentSchema),})

    //create comment mutation
    const handleCommentMutation=useMutation({
      mutationFn:async(data)=>{
        const response=await axiosPrivate.post(`/blog/${blogId}/comment`,data,{
          withCredentials:true
        })
        return response.data
      },
      onSuccess: async () => {
        
        return queryClient.invalidateQueries({ queryKey: ["comments"] });
      },
    })
    const handleComment=(data)=>{
      handleCommentMutation.mutate({
        comment:data.comment
      },
      {
        onError: (data) => {
          toast({
            title: data.response.data.message,
          });
        },
        onSuccess: (data) => {
          reset()
          toast({
            title: data.message,
          });
        },
      })

    }
  return (
    <>{
      user && <form className=' w-full max-w-3xl'  onSubmit={handleSubmit(handleComment)}
      autoComplete="off">
          <div className="grid w-full items-center gap-1.5">
              <div className='flex items-center gap-x-2'>
              <Input
                {...register("comment")}
                type="text"
                id="text"
                placeholder="Enter your comment"
                className="text-base py-6"
              />
              <Button className="py-6 md:px-6">{
                handleCommentMutation.isPending?(<Spinner className="h-4 w-4" />
              ) : (
                <p>Comment</p>
              )}
              </Button>
              
  
              </div>
              
              {errors.comment?.message && (
                <p className="text-xs font-semibold text-red-700 mt-1">
                  *{errors.comment?.message}
                </p>
              )}
            </div>
          
      </form>
    }
    </>
    
  )
}

export default CommentForm