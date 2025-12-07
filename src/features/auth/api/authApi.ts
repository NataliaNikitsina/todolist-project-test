import { BaseLoginResponse, BaseMeResponse, LoginInputs } from "@/features/auth/model/types.ts"
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
  }),
})

export const { useLoginMutation, useLogoutMutation, useMeQuery } = authApi
