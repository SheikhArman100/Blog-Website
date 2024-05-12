"use client"
import Spinner from '@/components/Spinner.js';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';
import { useToast } from '@/components/ui/use-toast.js';
import { axiosPublic } from '@/lib/axios/axiosConfig.js';
import { signinSchema } from '@/lib/zod_Schema.js';
import { useAuthStore } from '@/lib/zustand_store/auth_store.js';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation.js';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';

const FormSignin = () => {
  const router = useRouter();
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const { toast } = useToast();
  const queryClient = useQueryClient();
    const [isHidden, setIsHidden] = useState(true);
    //react-hook-form setup
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signinSchema),
  });
 //signin mutation
  const signinMutation = useMutation({
    mutationFn: async(data)=>{
      const response = await axiosPublic.post("/auth/signin", data,{
        withCredentials:true
      });
    
      return response.data;
    },
    onSuccess: async (data) => {
      setAccessToken(data.accessToken);
      return queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const handleSignin=(data)=>{
    signinMutation.mutate(
      {
        email: data.email,
        password: data.password,
      },
      {
        onError: (data) => {
          toast({
            title: data.response.data.message,
          });
        },
        onSuccess: (data) => {
          router.push("/");
          toast({
            title: data.message,
          });
        },
      }
    );

  }
 

  return (
    <form
    className="flex flex-col gap-y-3"
    onSubmit={handleSubmit(handleSignin)}
    autoComplete="off"
  >
    {/* ------------------------------------------email----------------------------------- */}
    <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
          {...register("email")}
          type="email"
          id="email"
          placeholder="Enter your email"
        />
        {errors.email?.message && (
          <p className="text-xs font-semibold text-red-700 mt-1">
            *{errors.email?.message}
          </p>
        )}
      </div>

      {/* ----------------------------------------password----------------------------------------- */}
      <div className="grid w-full  items-center gap-1.5">
        <Label htmlFor="password">Password</Label>

        <div className="flex justify-between items-center  h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
          <input
            {...register("password")}
            type={isHidden ? "password" : "text"}
            id="password"
            placeholder="Password"
            className="flex-1 bg-transparent"
          />
          <button type="button" onClick={() => setIsHidden(!isHidden)}>
            {isHidden ? (
              <EyeOff className="size-5" />
            ) : (
              <Eye className="size-5" />
            )}
          </button>
        </div>
        {errors.password?.message && (
          <p className="text-xs font-semibold text-red-700 mt-1">
            *{errors.password?.message}
          </p>
        )}
      </div>
      <Button className="grid w-full  items-center">
        {signinMutation.isPending ? (
          <Spinner className="h-4 w-4" />
        ) : (
          <p>Sign in</p>
        )}
        
      </Button>
  </form>
  )
}

export default FormSignin