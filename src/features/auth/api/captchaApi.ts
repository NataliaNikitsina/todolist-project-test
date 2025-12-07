import { CaptchaResponse } from "@/features/auth/model/types.ts"
import { baseApi } from "@/app/baseApi.ts"

export const captchaApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCaptcha: builder.query<CaptchaResponse, void>({
      query: () => "/security/get-captcha-url",
    }),
  }),
})

export const { useGetCaptchaQuery } = captchaApi