import { Todolist } from "@/features/todolists/api/todolistsApi.types.ts"
import { todolistsApi } from "@/features/todolists/api/todolistsApi.ts"
import { createAppSlice } from "@/common/utils"
import { setAppStatusAC } from "@/app/app-slice.ts"

export type DomainTodolist = Todolist & { filter: FilterValues }

export type FilterValues = "all" | "active" | "completed"

export const todolistsSlice = createAppSlice({
  name: "todolists",
  initialState: [] as DomainTodolist[],
  selectors: { selectTodolists: (state) => state },
  reducers: (create) => {
    return {
      changeTodolistFilterAC: create.reducer<{ id: string; filter: FilterValues }>((state, action) => {
        const todolist = state.find((todolist) => todolist.id === action.payload.id)
        if (todolist) {
          todolist.filter = action.payload.filter
        }
      }),
      //thunks
      fetchTodolistsTS: create.asyncThunk(
        async (_, thunkApi) => {
          const { dispatch, rejectWithValue } = thunkApi
          try {
            dispatch(setAppStatusAC({ status: "loading" }))
            const res = await todolistsApi.getTodolists()
            dispatch(setAppStatusAC({ status: "succeeded" }))
            return { todolists: res.data }
          } catch (error) {
            dispatch(setAppStatusAC({ status: "failed" }))
            return rejectWithValue(null)
          }
        },
        {
          fulfilled: (_state, action) => {
            return action.payload.todolists.map((tl) => ({ ...tl, filter: "all" }))
          },
        },
      ),

      createTodolistTC: create.asyncThunk(
        async (args: { title: string }, thunkApi) => {
          const { dispatch, rejectWithValue } = thunkApi
          try {
            dispatch(setAppStatusAC({ status: "loading" }))
            const res = await todolistsApi.createTodolist(args.title)
            dispatch(setAppStatusAC({ status: "succeeded" }))
            return { todolist: res.data.data.item }
          } catch (error) {
            dispatch(setAppStatusAC({ status: "failed" }))
            return rejectWithValue(null)
          }
        },
        {
          fulfilled: (state, action) => {
            state.push({ ...action.payload.todolist, filter: "all" })
          },
        },
      ),

      deleteTodolistTC: create.asyncThunk(
        async (args: { todolistId: string }, thunkApi) => {
          const { dispatch, rejectWithValue } = thunkApi
          try {
            dispatch(setAppStatusAC({ status: "loading" }))
            await todolistsApi.deleteTodolist(args.todolistId)
            dispatch(setAppStatusAC({ status: "succeeded" }))
            return { todolistId: args.todolistId }
          } catch (error) {
            dispatch(setAppStatusAC({ status: "failed" }))
            return rejectWithValue(null)
          }
        },
        {
          fulfilled: (state, action) => {
            const index = state.findIndex((todolist) => todolist.id === action.payload.todolistId)
            if (index !== -1) {
              state.splice(index, 1)
            }
          },
        },
      ),

      changeTodolistTitleTC: create.asyncThunk(
        async (args: { id: string; title: string }, thunkApi) => {
          const { dispatch, rejectWithValue } = thunkApi
          try {
            dispatch(setAppStatusAC({ status: "loading" }))
            await todolistsApi.changeTodolistTitle(args)
            dispatch(setAppStatusAC({ status: "succeeded" }))
            return args
          } catch (error) {
            dispatch(setAppStatusAC({ status: "failed" }))
            return rejectWithValue(null)
          }
        },
        {
          fulfilled: (state, action) => {
            const index = state.findIndex((todolist) => todolist.id === action.payload.id)
            if (index !== -1) {
              state[index].title = action.payload.title
            }
          },
        },
      ),
    }
  },
})

export const todolistsReducer = todolistsSlice.reducer
export const { changeTodolistFilterAC, fetchTodolistsTS, createTodolistTC, deleteTodolistTC, changeTodolistTitleTC } =
  todolistsSlice.actions
export const { selectTodolists } = todolistsSlice.selectors

//Thunk

// export const fetchTodosTS = createAsyncThunk(`${todolistsSlice.name}/fetchTodos`, async (_arg, thunkAPI) => {
//   const { rejectWithValue } = thunkAPI
//   try {
//     const res = await todolistsApi.getTodolists()
//     return { todolists: res.data }
//   } catch (e) {
//     return rejectWithValue(e)
//   }
// })

// export const changeTodolistTitleTC = createAsyncThunk(
//   `${todolistsSlice.name}/changeTodolistTitleTC`,
//   async (payload: { id: string; title: string }, thunkAPI) => {
//     try {
//       await todolistsApi.changeTodolistTitle(payload)
//       return payload
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error)
//     }
//   },
// )
//
// export const createTodolistTS = createAsyncThunk(
//   `${todolistsSlice.name}/createTodolistTS`,
//   async (title: string, thunkAPI) => {
//     const { rejectWithValue } = thunkAPI
//     try {
//       const res = await todolistsApi.createTodolist(title)
//       return { todolist: res.data.data.item }
//     } catch (e) {
//       return rejectWithValue(e)
//     }
//   },
// )
//
// export const deleteTodolistTS = createAsyncThunk(
//   `${todolistsSlice.name}/deleteTodolistTS`,
//   async (id: string, thunkAPI) => {
//     const { rejectWithValue } = thunkAPI
//     try {
//       await todolistsApi.deleteTodolist(id)
//       return { id }
//     } catch (e) {
//       return rejectWithValue(e)
//     }
//   },
// )
