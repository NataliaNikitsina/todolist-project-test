import { createAppSlice } from "@/common/utils"
import { tasksApi } from "@/features/todolists/api/tasksApi.ts"
import { DomainTask, type UpdateTaskModel } from "@/features/todolists/api/tasksApi.types.ts"
import { setAppStatusAC } from "@/app/app-slice.ts"
import { RootState } from "@/app/store.ts"
import { createTodolistTC, deleteTodolistTC } from "@/features/todolists/model/todolists-slice.ts"
import { ResultCode } from "@/common/enums"
import { handleServerError } from "@/common/utils/handleServerError.ts"
import { handleAppError } from "@/common/utils/handleAppError.ts"

export const tasksSlice = createAppSlice({
  name: "tasks",
  initialState: {} as TasksState,
  selectors: { selectTasks: (state) => state },
  reducers: (create) => {
    return {
      fetchTasksTS: create.asyncThunk(
        async (todolistId: string, thunkApi) => {
          const { dispatch, rejectWithValue } = thunkApi
          try {
            dispatch(setAppStatusAC({ status: "loading" }))
            const res = await tasksApi.getTasks(todolistId)
            dispatch(setAppStatusAC({ status: "succeeded" }))
            return { todolistId, tasks: res.data.items }
          } catch (error) {
            dispatch(setAppStatusAC({ status: "failed" }))
            handleServerError(error, dispatch)
            return rejectWithValue(null)
          }
        },
        {
          fulfilled: (state, action) => {
            state[action.payload.todolistId] = action.payload.tasks
          },
        },
      ),

      createTaskTS: create.asyncThunk(
        async (args: { todolistId: string; title: string }, thunkApi) => {
          const { dispatch, rejectWithValue } = thunkApi
          try {
            dispatch(setAppStatusAC({ status: "loading" }))
            const res = await tasksApi.createTask(args)
            if (res.data.resultCode === ResultCode.Success) {
              dispatch(setAppStatusAC({ status: "succeeded" }))
              return { task: res.data.data.item }
            } else {
              handleAppError(dispatch, res.data)
              return rejectWithValue(null)
            }
          } catch (error) {
            handleServerError(error, dispatch)
            return rejectWithValue(null)
          }
        },
        {
          fulfilled: (state, action) => {
            state[action.payload.task.todoListId].unshift(action.payload.task)
          },
        },
      ),

      deleteTaskTC: create.asyncThunk(
        async (args: { taskId: string; todolistId: string }, thunkAPI) => {
          const { dispatch, rejectWithValue } = thunkAPI
          try {
            dispatch(setAppStatusAC({ status: "loading" }))
            const res = await tasksApi.deleteTask(args)
            if (res.data.resultCode === ResultCode.Success) {
              dispatch(setAppStatusAC({ status: "succeeded" }))
              return args
            } else {
              handleAppError(dispatch, res.data)
              return rejectWithValue(null)
            }
          } catch (error) {
            handleServerError(error, dispatch)
            return rejectWithValue(null)
          }
        },
        {
          fulfilled: (state, action) => {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex((task) => task.id === action.payload.taskId)
            if (index !== -1) {
              tasks.splice(index, 1)
            }
          },
        },
      ),

      updateTaskTC: create.asyncThunk(
        async (
          args: { todolistId: string; taskId: string; domainModel: Partial<UpdateTaskModel> },
          { dispatch, getState, rejectWithValue },
        ) => {
          const allTodolistTasks = (getState() as RootState).tasks[args.todolistId]
          const task = allTodolistTasks.find((task) => task.id === args.taskId)

          if (!task) {
            return rejectWithValue(null)
          }

          const model: UpdateTaskModel = {
            description: task.description,
            title: task.title,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            status: task.status,
            ...args.domainModel,
          }

          try {
            dispatch(setAppStatusAC({ status: "loading" }))
            const res = await tasksApi.updateTask({ todolistId: args.todolistId, taskId: args.taskId, model })
            if (res.data.resultCode === ResultCode.Success) {
              dispatch(setAppStatusAC({ status: "succeeded" }))
              return { task: res.data.data.item }
            } else {
              handleAppError(dispatch, res.data)
              return rejectWithValue(null)
            }
          } catch (error) {
            dispatch(setAppStatusAC({ status: "failed" }))
            return rejectWithValue(null)
          }
        },
        {
          fulfilled: (state, action) => {
            const allTodolistTasks = state[action.payload.task.todoListId]
            const taskIndex = allTodolistTasks.findIndex((task) => task.id === action.payload.task.id)
            if (taskIndex !== -1) {
              allTodolistTasks[taskIndex] = action.payload.task
            }
          },
        },
      ),
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTodolistTC.fulfilled, (state, action) => {
        state[action.payload.todolist.id] = []
      })
      .addCase(deleteTodolistTC.fulfilled, (state, action) => {
        delete state[action.payload.todolistId]
      })
  },
})

export const tasksReducer = tasksSlice.reducer
export const { deleteTaskTC, fetchTasksTS, createTaskTS, updateTaskTC } = tasksSlice.actions
export const { selectTasks } = tasksSlice.selectors

export type TasksState = Record<string, DomainTask[]>
