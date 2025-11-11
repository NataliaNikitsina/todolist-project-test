import {
  baseDefaultResponseSchema,
  baseTaskResponseSchema,
  baseTodolistResponseSchema, fieldErrorSchema
} from "@/common/types/schema.ts"
import { z } from "zod"

export type FieldError = z.infer<typeof fieldErrorSchema>
export type BaseTaskResponse = z.infer<typeof baseTaskResponseSchema>
export type BaseDefaultResponse = z.infer<typeof baseDefaultResponseSchema>
export type BaseTodolistResponse = z.infer<typeof baseTodolistResponseSchema>


export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed'

export type BaseResponse<T = {}> = {
  data: T
  resultCode: number
  messages: string[]
  fieldsErrors: FieldError[]
}
