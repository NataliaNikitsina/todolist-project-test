import { BaseDefaultResponse, BaseTaskResponse } from "@/common/types"
import type { GetTasksResponse, UpdateTaskModel } from "./tasksApi.types"
import { baseApi } from "@/app/baseApi.ts"
import { PAGE_SIZE } from "@/common/constants/constants.ts"

export const tasksApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query<GetTasksResponse, { todolistId: string; params: { page: number } }>({
      query: ({ todolistId, params }) => ({
        url:`/todo-lists/${todolistId}/tasks`,
        params: { ...params, count: PAGE_SIZE },
      }),
      providesTags: (_res, _err, { todolistId }) => [{ type: "Task", id: todolistId }],
    }),

    createTask: builder.mutation<BaseTaskResponse, { todolistId: string; title: string }>({
      query: ({ todolistId, title }) => {
        return {
          method: "post",
          url: `/todo-lists/${todolistId}/tasks`,
          body: { title },
        }
      },
      invalidatesTags: (_result, _error, { todolistId }) => [{ type: "Task", id: todolistId }],
    }),

    updateTask: builder.mutation<BaseTaskResponse, { todolistId: string; taskId: string; model: UpdateTaskModel }>({
      query: ({ todolistId, taskId, model }) => {
        return {
          method: "put",
          url: `/todo-lists/${todolistId}/tasks/${taskId}`,
          body: model,
        }
      },
      invalidatesTags: (_result, _error, { todolistId }) => [{ type: "Task", id: todolistId }],
    }),

    deleteTask: builder.mutation<BaseDefaultResponse, { todolistId: string; taskId: string }>({
      query: ({ todolistId, taskId }) => {
        return {
          method: "delete",
          url: `/todo-lists/${todolistId}/tasks/${taskId}`,
        }
      },
      // invalidatesTags: ["Task"],
      invalidatesTags: (_result, _error, { todolistId }) => [{ type: "Task", id: todolistId }],
    }),
  }),
})

export const { useGetTasksQuery, useCreateTaskMutation, useDeleteTaskMutation, useUpdateTaskMutation } = tasksApi

