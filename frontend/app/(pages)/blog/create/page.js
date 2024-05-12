"use client";

import RichTextEditor from "@/components/RichTextEditor.js";
import Spinner from "@/components/Spinner.js";
import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Label } from "@/components/ui/label.jsx";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.jsx";
import { useToast } from "@/components/ui/use-toast.js";
import { axiosPublic } from "@/lib/axios/axiosConfig.js";
import useAxiosPrivate from "@/lib/hooks/useAxiosPrivate.js";
import { createBlogSchema } from "@/lib/zod_Schema.js";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Image as ImageIcon, Plus } from "lucide-react";
import Image from "next/image.js";
import { useState } from "react";
import {
  Controller,
  FormProvider,
  useForm,
  useFormContext,
} from "react-hook-form";

const CreateBlog = () => {
  const axiosPrivate = useAxiosPrivate();
  const { toast } = useToast();
  const methods = useForm({
    resolver: zodResolver(createBlogSchema),
    defaultValues: {},
  });

  const {
    register,
    handleSubmit,
    reset,
    control,

    formState: { errors, isValid },
  } = methods;

  const createBlogMutation = useMutation({
    mutationFn: async (data) => {
      const response = await axiosPrivate.post("/blog/create", data, {
        withCredentials: true,
      });
      return response.data;
    },
    onSuccess: async () => {
      reset();

      // return queryClient.invalidateQueries(["tasks"]);
    },
  });

  const handleFormSubmit = (data) => {
    createBlogMutation.mutate(
      {
        title: data.title,
        description: data.description,
        image: data.image,
        category: data.category,
      },
      {
        onError: (data) => {
          toast({
            title: data.response.data.message,
          });
        },
        onSuccess: (data) => {
          toast({
            title: data.message,
          });
          // router.push()
        },
      }
    );
  };
  return (
    <section className="py-4 md:py-8 px-4 sm:px-8 lg:px-[2rem] xl:px-[4rem]  flex-1 flex flex-col items-center">
      <h2 className="text-2xl md:text-4xl font-semibold">Create Blog</h2>
      <FormProvider {...methods}>
        <form
          className="mt-4 w-full max-w-5xl mx-auto flex flex-col gap-8"
          autoComplete="off"
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          {/* ------------------------------------------------------title------------------------------ */}
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="email" className="text-lg font-medium">
              Title
            </Label>
            <Input
              {...register("title")}
              type="text"
              id="text"
              placeholder="Enter your blog title"
              className="text-base py-6"
            />
            {errors.title?.message && (
              <p className="text-xs font-semibold text-red-700 mt-1">
                *{errors.title?.message}
              </p>
            )}
          </div>
          {/* -----------------------------------------image----------------------------------------------------- */}
          <UploadImage />
          {/* ---------------------------------------category-------------------------------------------- */}
          <CategorySelect />

          {/* description */}
          <RichTextEditor />

          <Button
            type="submit"
            className="w-full max-w-sm py-4 bg-orange-500 rounded-lg mx-auto text-base font-semibold text-white"
          >
            {createBlogMutation.isPending ? (
              <Spinner className="h-4 w-4" />
            ) : (
              <p>Register</p>
            )}
          </Button>
        </form>
      </FormProvider>
    </section>
  );
};
const UploadImage = () => {
  const [imageValue, setImageValue] = useState(null);

  const {
    register,
    control,
    setValue,
    formState: { errors, isValid },
  } = useFormContext();
  const handleImageChange = () => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImageValue(reader.result);
        setValue("image", reader.result);
      };
    }
  };
  return (
    <div>
      <div className="bg-gray-200 w-full h-80 md:h-[28rem] rounded-md flex items-center justify-center relative">
        {imageValue ? (
          <Image
            fill
            src={imageValue}
            className="w-full h-full object-cover object-center"
            alt="blog image"
          />
        ) : (
          <ImageIcon className="stroke-gray-400 size-[30%]  rounded-md" />
        )}
      </div>
      <div className="flex flex-col  items-center ">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          {...register("image", {
            onChange: handleImageChange,
          })}
          style={{ display: "none" }}
          id="image-upload"
        />

        <label
          htmlFor="image-upload"
          className="w-fit py-4 px-6 bg-black text-white rounded-lg flex items-center gap-x-2 cursor-pointer mt-4"
        >
          <Plus />
          <p>Upload Thumbnail Image</p>
        </label>
        {errors.image?.message && (
          <p className="text-xs font-semibold text-red-700 ">
            *{errors.image?.message}
          </p>
        )}
      </div>
    </div>
  );
};
const CategorySelect = () => {
  const { data } = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const response = await axiosPublic.get(`/category`);
      return response.data;
    },
  });

  const {
    register,
    control,
    formState: { errors, isValid },
  } = useFormContext();

  return (
    <div className="flex flex-col gap-2">
      <span className="text-lg font-medium">Category:</span>
      <Controller
        control={control}
        name="category"
        render={({ field }) => (
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <SelectTrigger className="w-full max-w-2xl">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Category</SelectLabel>
                {data?.categories.map((category, index) => (
                  <SelectItem value={category._id} key={index}>
                    {category.title}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      />

      {errors.category?.message && (
        <p className="text-xs font-semibold text-red-700 ">
          *{errors.category?.message}
        </p>
      )}
    </div>
  );
};

export default CreateBlog;
