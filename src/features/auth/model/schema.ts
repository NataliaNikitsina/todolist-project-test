import { z } from "zod"
import { baseResponseSchema } from "@/common/types/schema.ts"

export const loginSchema = z.object({
  email: z.email(),
  password: z.string(),
  rememberMe: z.boolean().optional(),
  captcha: z.string().optional(),
})

export const baseAuthOperationResponseSchema = baseResponseSchema(
  z.object({
    userId: z.number(),
    token: z.string(),
  }),
)

export const baseMeOperationResponseSchema = baseResponseSchema(
  z.object({
    id:  z.number(),
    email:  z.number(),
    login:  z.number(),
  }),
)

export type LoginInputs = z.infer<typeof loginSchema>
