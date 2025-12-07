import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { AUTH_TOKEN } from "@/common/constants/constants.ts"
import { handleError } from "@/common/utils"

export const baseApi = createApi({
  reducerPath: 'baseApi',
  tagTypes: ['Todolist', 'Task'],
  //keepUnusedDataFor: 60, // в секундах, по умолчанию 60сек
  //refetchOnFocus: true, // полностью перезапрашивает все запросы приложения, для конкретного запроса, указать в хуке при вызове вторым параметром в обьекте!
  //refetchOnReconnect: true, // при перебоях в сети для всего приложения
  baseQuery: async (args, api, extraOptions) => {
    const result = await fetchBaseQuery({
      baseUrl: import.meta.env.VITE_BASE_URL,
      credentials: 'include',
      headers: {
        'API-KEY': import.meta.env.VITE_API_KEY,
      },
      prepareHeaders: headers => {
        headers.set('Authorization', `Bearer ${localStorage.getItem(AUTH_TOKEN)}`)
      },
    })(args, api, extraOptions)
    handleError(api, result)
    return result
  },
  endpoints: () => ({}),
})