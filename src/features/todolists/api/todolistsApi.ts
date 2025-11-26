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
      async onQueryStarted(id: string, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          todolistsApi.util.updateQueryData('getTodolists', undefined, state => {
            const todolist = state.find(todolist => todolist.id === id)
            if (todolist) {
              todolist.entityStatus = 'loading'
            }
          })
        )
        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
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
