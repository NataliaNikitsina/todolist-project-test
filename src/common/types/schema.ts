import { z } from "zod"
import { ResultCode } from "@/common/enums"
import { domainTaskSchema, todolistSchema } from "@/features/todolists/lib/types/schema.ts"

export const fieldErrorSchema = z.object({
  error: z.string(),
  field: z.string(),
})

export const baseResponseSchema = <T extends z.ZodTypeAny>(schema: T) =>
  z.object({
    data: schema,
    resultCode: z.enum(ResultCode),
    messages: z.string().array(),
    fieldsErrors: fieldErrorSchema.array(),
  })

export const baseTaskResponseSchema = baseResponseSchema(
  z.object({
    item: domainTaskSchema,
  }),
)

export const baseTodolistResponseSchema = baseResponseSchema(
  z.object({
    item: todolistSchema,
  }),
)

export const baseDefaultResponseSchema = baseResponseSchema(z.object({}),
)

