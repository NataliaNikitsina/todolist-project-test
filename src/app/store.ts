import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { appReducer, appSlice } from "./app-slice.ts"
import { tasksReducer, tasksSlice } from "@/features/todolists/model/tasks-slice.ts"
import { todolistsReducer, todolistsSlice } from "@/features/todolists/model/todolists-slice.ts"
import { authReducer, authSlice } from "@/features/auth/api/auth-slice.ts"
import { todolistsApi } from "@/features/todolists/api/_todolistsApi.ts"
import { setupListeners } from "@reduxjs/toolkit/query"

// объединение reducer'ов с помощью combineReducers

const rootReducer = combineReducers({
  [todolistsSlice.name]: todolistsReducer,
  [tasksSlice.name]: tasksReducer,
  [appSlice.name]: appReducer,
  [authSlice.name]: authReducer,
  [todolistsApi.reducerPath]: todolistsApi.reducer,
},)

// создание store
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todolistsApi.middleware),
})

// автоматическое определение типа всего объекта состояния
export type RootState = ReturnType<typeof store.getState>
// автоматическое определение типа метода dispatch
export type AppDispatch = typeof store.dispatch

// для возможности обращения к store в консоли браузера
// @ts-ignore
window.store = store
setupListeners(store.dispatch)
