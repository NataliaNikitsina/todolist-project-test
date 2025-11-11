import { instance } from "@/common/instance"
import { BaseDefaultResponse, BaseTodolistResponse } from "@/common/types"
import { Todolist } from "./todolistsApi.types"

export const todolistsApi = {
  getTodolists() {
    return instance.get<Todolist[]>("/todo-lists")
  },
  changeTodolistTitle(payload: { id: string; title: string }) {
    const { id, title } = payload
    return instance.put<BaseDefaultResponse>(`/todo-lists/${id}`, { title })
  },
  createTodolist(title: string) {
    return instance.post<BaseTodolistResponse>("/todo-lists", { title })
  },
  deleteTodolist(id: string) {
    return instance.delete<BaseDefaultResponse>(`/todo-lists/${id}`)
  },
}
