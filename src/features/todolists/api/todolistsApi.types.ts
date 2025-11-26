import { todolistSchema } from "@/features/todolists/lib/types/schema.ts"
import { z } from "zod"

export type Todolist = z.infer<typeof todolistSchema>
