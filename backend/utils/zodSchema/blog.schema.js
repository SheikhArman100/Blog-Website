import { z } from "zod";

export const createBlogSchema = z.object({
    body: z.object({
        title: z.string({
            required_error: "Title is required",
          }),
        image: z.string({
            required_error: "Image is required",
          }),
        category: z.string({
            required_error:"Category is required"
        }),
        description: z.string({
            required_error:"Description is required"
        })
    }),
  });