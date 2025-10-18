import { createAsyncThunk } from "@reduxjs/toolkit"
import { Todolist } from "@/features/todolists/api/todolistsApi.types.ts"
import { todolistsApi } from "@/features/todolists/api/todolistsApi.ts"
import { createAppSlice } from "@/common/utils"

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
          try {
            const res = await todolistsApi.getTodolists()
            return { todolists: res.data }
          } catch (error) {
            return thunkApi.rejectWithValue(null)
          }
        },
        {
          fulfilled: (_state, action) => {
            return action.payload.todolists.map((tl) => ({ ...tl, filter: "all" }))
          },
        },
      ),
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
        const index = state.findIndex((todolist) => todolist.id === action.payload.id)
        if (index !== -1) {
          state[index].title = action.payload.title
        }
      })
      .addCase(createTodolistTS.fulfilled, (state, action) => {
        state.push({ ...action.payload.todolist, filter: "all" })
      })
      .addCase(deleteTodolistTS.fulfilled, (state, action) => {
        const index = state.findIndex((todolist) => todolist.id === action.payload.id)
        if (index !== -1) {
          state.splice(index, 1)
        }
      })
  },
})

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

export const changeTodolistTitleTC = createAsyncThunk(
  `${todolistsSlice.name}/changeTodolistTitleTC`,
  async (payload: { id: string; title: string }, thunkAPI) => {
    try {
      await todolistsApi.changeTodolistTitle(payload)
      return payload
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  },
)

export const createTodolistTS = createAsyncThunk(
  `${todolistsSlice.name}/createTodolistTS`,
  async (title: string, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
      const res = await todolistsApi.createTodolist(title)
      return { todolist: res.data.data.item }
    } catch (e) {
      return rejectWithValue(e)
    }
  },
)

export const deleteTodolistTS = createAsyncThunk(
  `${todolistsSlice.name}/deleteTodolistTS`,
  async (id: string, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
      await todolistsApi.deleteTodolist(id)
      return { id }
    } catch (e) {
      return rejectWithValue(e)
    }
  },
)

export const todolistsReducer = todolistsSlice.reducer
export const { changeTodolistFilterAC, fetchTodolistsTS } = todolistsSlice.actions
export const { selectTodolists } = todolistsSlice.selectors
