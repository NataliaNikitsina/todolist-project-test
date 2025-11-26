import { instance } from "@/common/instance"
import { BaseDefaultResponse, BaseTodolistResponse } from "@/common/types"
import { Todolist } from "./todolistsApi.types"
import { baseApi } from "@/app/baseApi.ts"
import { DomainTodolist } from "@/features/todolists/lib/types"

export const todolistsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTodolists: builder.query<DomainTodolist[], void>({
      query: () => "/todo-lists",
      transformResponse: (todolists: Todolist[]) => {
        return todolists.map((tl) => ({ ...tl, filter: "all", entityStatus: "idle" }))
      },
      providesTags: ["Todolist"],
    }),

    createTodolist: builder.mutation<BaseTodolistResponse, string>({
      query: (title) => {
        return {
          method: "post",
          url: "/todo-lists",
          body: { title },
        }
      },
      invalidatesTags: ["Todolist"],
    }),

    deleteTodolist: builder.mutation<BaseDefaultResponse, string>({
      query: (id: string) => {
        return {
          method: "delete",
          url: `/todo-lists/${id}`,
        }
      },
      invalidatesTags: ["Todolist"],
    }),

    changeTodolistTitle: builder.mutation<BaseDefaultResponse, { id: string; title: string }>({
      query: ({ id, title }) => {
        return {
          method: "put",
          url: `/todo-lists/${id}`,
          body: { title },
        }
      },
      invalidatesTags: ["Todolist"],
    }),
  }),
})

export const {
  useGetTodolistsQuery,
  useLazyGetTodolistsQuery,
  useCreateTodolistMutation,
  useDeleteTodolistMutation,
  useChangeTodolistTitleMutation,
} = todolistsApi

export const _todolistsApi = {
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
