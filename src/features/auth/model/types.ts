import { z } from "zod"
import { baseAuthOperationResponseSchema, baseMeOperationResponseSchema } from "@/features/auth/model/schema.ts"

export type BaseAuthOperationResponse = z.infer<typeof baseAuthOperationResponseSchema>
export type BaseMeOperationResponse = z.infer<typeof baseMeOperationResponseSchema>