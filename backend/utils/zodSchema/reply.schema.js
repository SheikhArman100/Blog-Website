import z from "zod"
export const createReplySchema=z.object({
    body:z.object({
      reply :z.string({
        required_error: "Reply is required",
      }),
    })
  })