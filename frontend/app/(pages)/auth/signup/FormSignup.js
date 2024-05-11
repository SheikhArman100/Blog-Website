"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "@/lib/zod_Schema.js";
import { Label } from "@/components/ui/label.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button.jsx";
import { useMutation } from "@tanstack/react-query";
import { axiosPublic } from "@/lib/axios/axiosConfig.js";
import { useRouter } from "next/navigation.js";
import { useToast } from "@/components/ui/use-toast.js";
import Spinner from "@/components/Spinner.js";

const FormSignup = () => {
  const router = useRouter();
  const { toast } = useToast();

  const [isHidden, setIsHidden] = useState({
    password: true,
    passwordConfirmation: true,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  //mutation for signup
  const signupMutation = useMutation({
    mutationFn: async (data) => {
      // await new Promise((resolve) => setTimeout(resolve, 500));
      const response = await axiosPublic.post("/auth/signup", data);

      return response.data;
    },
  });

  const handleSignup = (data) => {
    signupMutation.mutate(
      {
        name: data.name,
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: (data) => {
          
          router.push("/auth/signin");
          toast({
            title: data.message,
          });
        },
        onError: (data) => {
          toast({
            title: data.response.data.message,
          });
        },
      }
    );
  };

  return (
    <form
      className="flex flex-col gap-y-3"
      autoComplete="off"
      onSubmit={handleSubmit(handleSignup)}
    >
      {/* --------------------------------------------Name---------------------------------------------------------------- */}
      <div className="grid w-full  items-center gap-1.5">
        <Label htmlFor="email">Name</Label>
        <Input
          {...register("name")}
          type="text"
          id="text"
          placeholder="Enter your name"
        />
        {errors.name?.message && (
          <p className="text-xs font-semibold text-red-700 mt-1">
            *{errors.name?.message}
          </p>
        )}
      </div>

      {/* -----------------------------------------------------------Email------------------------------------------------------------------- */}
      <div className="grid w-full  items-center gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
          {...register("email")}
          type="email"
          id="email"
          placeholder="Enter your mail"
        />
        {errors.email?.message && (
          <p className="text-xs font-semibold text-red-700 mt-1">
            *{errors.email?.message}
          </p>
        )}
      </div>
      {/* ---------------------------------------------------password------------------------------------------------------------------ */}
      <div className="grid w-full  items-center gap-1.5">
        <Label htmlFor="password">Password</Label>
        <div className="flex justify-between items-center  h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
          <input
            {...register("password")}
            type={isHidden.password ? "password" : "text"}
            id="password"
            placeholder="Password"
            className="flex-1 bg-transparent"
          />
          <button
            type="button"
            onClick={() =>
              setIsHidden({ ...isHidden, password: !isHidden.password })
            }
          >
            {isHidden.password ? (
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
      {/* --------------------------------------------------------confirm password---------------------------------------------------------------- */}
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="confirm password">Confirm Password</Label>
        <div className="flex justify-between items-center  h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
          <input
            {...register("passwordConfirmation")}
            type={isHidden.passwordConfirmation ? "password" : "text"}
            id="confirm password"
            placeholder="Confirm Password"
            className="flex-1 bg-transparent"
          />
          <button
            type="button"
            onClick={() =>
              setIsHidden({
                ...isHidden,
                passwordConfirmation: !isHidden.passwordConfirmation,
              })
            }
          >
            {isHidden.passwordConfirmation ? (
              <EyeOff className="size-5" />
            ) : (
              <Eye className="size-5" />
            )}
          </button>
        </div>

        {errors.passwordConfirmation?.message && (
          <p className="text-xs font-semibold text-red-700 mt-1">
            *{errors.passwordConfirmation?.message}
          </p>
        )}
      </div>
      <Button className="grid w-full items-center ">
        {signupMutation.isPending ? (
          <Spinner className="h-4 w-4" />
        ) : (
          <p>Register</p>
        )}
      </Button>
    </form>
  );
};

export default FormSignup;
