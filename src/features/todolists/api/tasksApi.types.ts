import { z } from "zod"
import { domainTaskSchema, getTasksResponseSchema, updateTaskModelSchema } from "@/features/todolists/model/schema.ts"

export type DomainTask = z.infer<typeof domainTaskSchema>
export type GetTasksResponse = z.infer<typeof getTasksResponseSchema>
export type UpdateTaskModel = z.infer<typeof updateTaskModelSchema>
