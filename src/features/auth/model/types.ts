import { z } from "zod"
import { baseLoginResponseSchema, baseMeResponseSchema } from "@/features/auth/model/schema.ts"

export type BaseLoginResponse = z.infer<typeof baseLoginResponseSchema>
export type BaseMeResponse = z.infer<typeof baseMeResponseSchema>