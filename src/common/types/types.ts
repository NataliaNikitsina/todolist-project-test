import {
  baseDefaultResponseSchema,
  baseTasksOperationResponseSchema,
  baseResponseSchema,
  fieldErrorSchema, baseTodolistOperationResponseSchema
} from "@/common/types/schema.ts"
import { z } from "zod"

export type FieldError = z.infer<typeof fieldErrorSchema>
export type BaseResponse = z.infer<typeof baseResponseSchema>
export type BaseTasksOperationResponse = z.infer<typeof baseTasksOperationResponseSchema>
export type BaseDefaultResponse = z.infer<typeof baseDefaultResponseSchema>
export type BaseTodolistOperationResponse = z.infer<typeof baseTodolistOperationResponseSchema>

export type CommonBaseResponse = BaseTasksOperationResponse | BaseTodolistOperationResponse | BaseDefaultResponse


export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed'
