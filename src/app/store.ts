import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { appReducer, appSlice } from "./app-slice.ts"
import { tasksReducer, tasksSlice } from "@/features/todolists/model/tasks-slice.ts"
import { todolistsReducer, todolistsSlice } from "@/features/todolists/model/todolists-slice.ts"
import { authReducer, authSlice } from "@/features/auth/api/auth-slice.ts"

// объединение reducer'ов с помощью combineReducers

const rootReducer = combineReducers({
  [todolistsSlice.name]: todolistsReducer,
  [tasksSlice.name]: tasksReducer,
  [appSlice.name]: appReducer,
  [authSlice.name]: authReducer,
})

// создание store
export const store = configureStore({
  reducer: rootReducer
})

// автоматическое определение типа всего объекта состояния
export type RootState = ReturnType<typeof store.getState>
// автоматическое определение типа метода dispatch
export type AppDispatch = typeof store.dispatch

// для возможности обращения к store в консоли браузера
// @ts-ignore
window.store = store
