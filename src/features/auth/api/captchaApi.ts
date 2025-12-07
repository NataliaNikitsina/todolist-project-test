import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { AUTH_TOKEN } from "@/common/constants/constants.ts"
import { CaptchaResponse } from "@/features/auth/model/types.ts"

export const captchaApi = createApi({
  reducerPath: "captchaApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://social-network.samuraijs.com/api/1.0",
    headers: {
      "API-KEY": import.meta.env.VITE_API_KEY,
    },
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${localStorage.getItem(AUTH_TOKEN)}`)
    },
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getCaptcha: builder.query<CaptchaResponse, void>({
      query: () => "/security/get-captcha-url",
    }),
  }),
})

export const {useGetCaptchaQuery} = captchaApi