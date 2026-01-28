import { BaseLoginResponse, BaseMeResponse, CaptchaResponse, LoginInputs } from "@/features/auth/model/types.ts"
import { baseApi } from "@/app/baseApi.ts"

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<BaseLoginResponse, LoginInputs>({
      query: (payload) => {
        return {
          method: "post",
          url: `/auth/login`,
          body: payload,
        }
      },
    }),

    logout: builder.mutation<BaseLoginResponse, void>({
      query: () => {
        return {
          method: "delete",
          url: `/auth/login`,
        }
      },
    }),

    me: builder.query<BaseMeResponse, void>({
      query: () => `/auth/me`,
    }),

    getCaptcha: builder.query<CaptchaResponse, void>({
      query: () => "/security/get-captcha-url",
    }),
  }),
})

export const { useLoginMutation, useLogoutMutation, useMeQuery, useGetCaptchaQuery } = authApi
