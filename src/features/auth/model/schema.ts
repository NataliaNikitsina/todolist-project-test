import { z } from "zod"
import { baseResponseSchema } from "@/common/types/schema.ts"

export const loginSchema = z.object({
  email: z.email({error: 'Invalid email address'}),
  password: z.string()
    .min(1, {error: 'Password is required'})
    .max(15, {error: 'Password must be at least 15 characters long'}),
  rememberMe: z.boolean().optional(),
  captcha: z.string().optional(),
})

export const baseLoginResponseSchema = baseResponseSchema(
  z.object({
    userId: z.number(),
    token: z.string(),
  }),
)

export const baseMeResponseSchema = baseResponseSchema(
  z.object({
    id:  z.number(),
    email:  z.string(),
    login:  z.string(),
  }),
)

export type LoginInputs = z.infer<typeof loginSchema>
