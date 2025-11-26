import { instance } from "@/common/instance"
import { BaseDefaultResponse, BaseTaskResponse } from "@/common/types"
import type { GetTasksResponse, UpdateTaskModel } from "./tasksApi.types"
import { baseApi } from "@/app/baseApi.ts"

export const tasksApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query<GetTasksResponse, string>({
      query: (todolistId) => `/todo-lists/${todolistId}/tasks`,
      providesTags: ["Task"],
    }),

    createTask: builder.mutation<BaseTaskResponse, { todolistId: string; title: string }>({
      query: ({ todolistId, title }) => {
        return {
          method: 'post',
          url: `/todo-lists/${todolistId}/tasks`,
          body: { title },
        }
      },
        invalidatesTags: ["Task",],
    }),

    updateTask: builder.mutation<BaseTaskResponse, { todolistId: string; taskId: string; model: UpdateTaskModel}>({
      query: ({ todolistId, taskId, model }) => {
        return {
          method: 'put',
          url: `/todo-lists/${todolistId}/tasks/${taskId}`,
          body: model,
        }
      },
      invalidatesTags: ["Task"],
    }),

    deleteTask: builder.mutation<BaseDefaultResponse, { todolistId: string; taskId: string }>({
      query: ({ todolistId, taskId }) => {
        return {
          method: 'delete',
          url: `/todo-lists/${todolistId}/tasks/${taskId}`,
        }
      },
      invalidatesTags: ["Task"],
    }),
  }),
})

export const {useGetTasksQuery, useCreateTaskMutation, useDeleteTaskMutation, useUpdateTaskMutation} = tasksApi


export const _tasksApi = {
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponse>(`/todo-lists/${todolistId}/tasks`)
  },
  createTask(payload: { todolistId: string; title: string }) {
    const { todolistId, title } = payload
    return instance.post<BaseTaskResponse>(`/todo-lists/${todolistId}/tasks`, { title })
  },
  updateTask(payload: { todolistId: string; taskId: string; model: UpdateTaskModel }) {
    const { todolistId, taskId, model } = payload
    return instance.put<BaseTaskResponse>(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
  },
  deleteTask(payload: { todolistId: string; taskId: string }) {
    const { todolistId, taskId } = payload
    return instance.delete<BaseDefaultResponse>(`/todo-lists/${todolistId}/tasks/${taskId}`)
  },
}
