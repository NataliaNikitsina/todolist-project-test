import {
  baseDefaultResponseSchema,
  baseTasksOperationResponseSchema,
  baseTodolistOperationResponseSchema, fieldErrorSchema
} from "@/common/types/schema.ts"
import { z } from "zod"

export type FieldError = z.infer<typeof fieldErrorSchema>
export type BaseTasksOperationResponse = z.infer<typeof baseTasksOperationResponseSchema>
export type BaseDefaultResponse = z.infer<typeof baseDefaultResponseSchema>
export type BaseTodolistOperationResponse = z.infer<typeof baseTodolistOperationResponseSchema>


export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed'

export type BaseResponse<T = {}> = {
  data: T
  resultCode: number
  messages: string[]
  fieldsErrors: FieldError[]
}
