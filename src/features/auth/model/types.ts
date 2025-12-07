import { z } from "zod"
import {
  baseLoginResponseSchema,
  baseMeResponseSchema,
  captchaResponseSchema,
  loginSchema
} from "@/features/auth/model/schema.ts"

export type BaseLoginResponse = z.infer<typeof baseLoginResponseSchema>
export type BaseMeResponse = z.infer<typeof baseMeResponseSchema>
export type LoginInputs = z.infer<typeof loginSchema>
export type CaptchaResponse = z.infer<typeof captchaResponseSchema>