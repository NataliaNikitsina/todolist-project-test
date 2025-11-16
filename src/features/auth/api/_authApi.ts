import { instance } from "@/common/instance"
import { LoginInputs } from "@/features/auth/model/schema.ts"
import { BaseLoginResponse, BaseMeResponse } from "@/features/auth/model/types.ts"
import { BaseDefaultResponse } from "@/common/types"
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

export const {useLoginMutation, useLogoutMutation, useMeQuery} = authApi

export const _authApi = {
  login(payload: LoginInputs) {
    return instance.post<BaseLoginResponse>(`/auth/login`, payload)
  },
  logout() {
    return instance.delete<BaseDefaultResponse>(`/auth/login`)
  },
  me() {
    return instance.get<BaseMeResponse>(`/auth/me`)
  },
}
