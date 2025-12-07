import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { appReducer, appSlice } from "./app-slice.ts"
import { setupListeners } from "@reduxjs/toolkit/query"
import { baseApi } from "@/app/baseApi.ts"
import { captchaApi } from "@/features/auth/api/captchaApi.ts"

// объединение reducer'ов с помощью combineReducers

const rootReducer = combineReducers({
  [appSlice.name]: appReducer,
  [baseApi.reducerPath]: baseApi.reducer,
  [captchaApi.reducerPath]: captchaApi.reducer,
})

// создание store
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware).concat(captchaApi.middleware),
})

// автоматическое определение типа всего объекта состояния
export type RootState = ReturnType<typeof store.getState>
// автоматическое определение типа метода dispatch
export type AppDispatch = typeof store.dispatch

// для возможности обращения к store в консоли браузера
// @ts-ignore
window.store = store
setupListeners(store.dispatch)
