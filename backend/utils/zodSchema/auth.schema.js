import z from "zod"

//register
export const signupSchema = z.object({
  body: z.object({
    name: z.string(),
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
  }),
});

//login
export const signInSchema = z.object({
    body: z.object({
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
    }),
  });




