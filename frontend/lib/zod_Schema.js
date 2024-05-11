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