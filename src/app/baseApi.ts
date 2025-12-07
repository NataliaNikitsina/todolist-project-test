import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { AUTH_TOKEN } from "@/common/constants/constants.ts"

export const baseApi = createApi({
  reducerPath: 'baseApi',
  tagTypes: ['Todolist', 'Task'],
  //keepUnusedDataFor: 60, // в секундах, по умолчанию 60сек
  //refetchOnFocus: true, // полностью перезапрашивает все запросы приложения, для конкретного запроса, указать в хуке при вызове вторым параметром в обьекте!
  //refetchOnReconnect: true, // при перебоях в сети для всего приложения
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    headers: {
      'API-KEY': import.meta.env.VITE_API_KEY,
    },
    prepareHeaders: headers => {
      headers.set('Authorization', `Bearer ${localStorage.getItem(AUTH_TOKEN)}`)
    },
    credentials: 'include',
  }),
  endpoints: () => ({}),
})