import { z } from "zod";

export const signinSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({
      message: "Not a valid email",
    }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, {
      message: "Password too short - should be 6 chars minimum",
    }),
});

export const signupSchema = z
  .object({
    name: z.string({
        required_error: "Name is required",
      }),
    email: z
      .string({
        required_error: "Email is required",
      })
      .email({
        message: "Not a valid email",
      }),
    password: z
      .string({
        required_error: "Password is required",
      })
      .min(6, {
        message: "Password too short - should be 6 chars minimum",
      }),
    passwordConfirmation: z.string().nonempty("Confirm password is required"),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  });

  export const createBlogSchema=z.object({
    title: z.string().nonempty("Add a title"),
    image: z.string().nonempty("Upload an image"),
    category: z.string().nonempty("Select an category"),
    description: z.string().nonempty("Write something"),
  });

  export const createCommentSchema=z.object({
    comment:z.string().nonempty("Add a Comment"),
  })
  export const updateCommentSchema=z.object({
    comment:z.string().nonempty("Add a Comment"),
  })

  export const createReplySchema=z.object({
    reply:z.string().nonempty("Add a reply"),
  })