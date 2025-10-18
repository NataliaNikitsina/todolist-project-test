import { createTodolistTS, deleteTodolistTS } from "@/features/todolists/model/todolists-slice.ts"
import { createAppSlice } from "@/common/utils"
import { tasksApi } from "@/features/todolists/api/tasksApi.ts"
import { DomainTask } from "@/features/todolists/api/tasksApi.types.ts"
import { TaskStatus } from "@/common/enums"

export const tasksSlice = createAppSlice({
  name: "tasks",
  initialState: {} as TasksState,
  selectors: { selectTasks: (state) => state },
  reducers: (create) => {
    return {
      fetchTasksTS: create.asyncThunk(
        async (todolistId: string, thunkApi) => {
          try {
            const res = await tasksApi.getTasks(todolistId)
            return { todolistId, tasks: res.data.items }
          } catch (error) {
            return thunkApi.rejectWithValue(null)
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
          try {
            const res = await tasksApi.createTask(args)
            return { task: res.data.data.item }
          } catch (error) {
            return thunkApi.rejectWithValue(null)
          }
        },
        {
          fulfilled: (state, action) => {
            state[action.payload.task.todoListId].unshift(action.payload.task)
          },
        },
      ),

      deleteTaskTC: create.asyncThunk(
        async (args: {taskId: string, todolistId: string}, thunkAPI) => {
          try {
            await tasksApi.deleteTask(args)
            return args
          } catch (error) {
            return thunkAPI.rejectWithValue(null)
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


      changeTaskTitleAC: create.reducer<{ todolistId: string; taskId: string; title: string }>((state, action) => {
        const task = state[action.payload.todolistId].find((task: DomainTask) => task.id === action.payload.taskId)
        if (task) {
          task.title = action.payload.title
        }
      }),

      changeTaskStatusAC: create.reducer<{ todolistId: string; taskId: string; status: TaskStatus }>(
        (state, action) => {
          const task = state[action.payload.todolistId].find((task: DomainTask) => task.id === action.payload.taskId)
          if (task) {
            task.status = action.payload.status
          }
        },
      ),
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTodolistTS.fulfilled, (state, action) => {
        state[action.payload.todolist.id] = []
      })
      .addCase(deleteTodolistTS.fulfilled, (state, action) => {
        delete state[action.payload.id]
      })
  },
})

export const tasksReducer = tasksSlice.reducer
export const { changeTaskStatusAC, changeTaskTitleAC, deleteTaskTC, fetchTasksTS, createTaskTS } = tasksSlice.actions
export const { selectTasks } = tasksSlice.selectors

export type TasksState = Record<string, DomainTask[]>
