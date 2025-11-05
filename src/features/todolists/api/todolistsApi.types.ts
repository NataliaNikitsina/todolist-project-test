import { todolistSchema } from "@/features/todolists/model/schema.ts"
import { z } from "zod"

export type Todolist = z.infer<typeof todolistSchema>
