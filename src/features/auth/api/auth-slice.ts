import { LoginInputs } from "@/features/auth/model/schema.ts"
import { createAppSlice } from "@/common/utils"
import { _authApi } from "@/features/auth/api/_authApi.ts"
import { setAppLoginAC, setAppStatusAC } from "@/app/app-slice.ts"
import { handleNetworkError } from "@/common/utils/handleNetworkError.ts"
import { ResultCode } from "@/common/enums"
import { handleAppError } from "@/common/utils/handleAppError.ts"
import { AUTH_TOKEN } from "@/common/constants/constants.ts"
import { clearDataAC } from "@/common/actions"

export const authSlice = createAppSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
  },
  selectors: {
    selectIsLoggedIn: (state) => state.isLoggedIn,
  },
  reducers: (create) => ({
    setIsLoggedIn: create.reducer<{isLoggedIn: boolean}>((state, action)=>{
      state.isLoggedIn = action.payload.isLoggedIn
    }),
    loginTC: create.asyncThunk(
      async (data: LoginInputs, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setAppStatusAC({ status: "loading" }))
          const res = await _authApi.login(data)
          if (res.data.resultCode === ResultCode.Success) {
            dispatch(setAppStatusAC({ status: "succeeded" }))
            dispatch(setAppLoginAC({ login: data.email}))
            localStorage.setItem(AUTH_TOKEN, res.data.data.token)
            return { isLoggedIn: true }
          } else {
            handleAppError(dispatch, res.data)
            return rejectWithValue(null)
          }
        } catch (error) {
          dispatch(setAppStatusAC({ status: "failed" }))
          handleNetworkError(error, dispatch)
          return rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          state.isLoggedIn = action.payload.isLoggedIn
        },
      },
    ),

    logoutTC: create.asyncThunk(
      async (_args, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setAppStatusAC({ status: "loading" }))
          const res = await _authApi.logout()
          if (res.data.resultCode === ResultCode.Success) {
            dispatch(setAppStatusAC({ status: "succeeded" }))
            localStorage.removeItem(AUTH_TOKEN)
            dispatch(setAppLoginAC({ login: null }))
            dispatch(clearDataAC())
            return { isLoggedIn: false }
          } else {
            handleAppError(dispatch, res.data)
            return rejectWithValue(null)
          }
        } catch (error) {
          dispatch(setAppStatusAC({ status: "failed" }))
          handleNetworkError(error, dispatch)
          return rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          state.isLoggedIn = action.payload.isLoggedIn
        },
      },
    ),

    meTC: create.asyncThunk(
      async (_args, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setAppStatusAC({ status: "loading" }))
          const res = await _authApi.me()
          if (res.data.resultCode === ResultCode.Success) {
            dispatch(setAppStatusAC({ status: "succeeded" }))
            dispatch(setAppLoginAC({ login: res.data.data.email }))
            return { isLoggedIn: true}
          } else {
            handleAppError(dispatch, res.data)
            return rejectWithValue(null)
          }
        } catch (error) {
          dispatch(setAppStatusAC({ status: "failed" }))
          handleNetworkError(error, dispatch)
          return rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          state.isLoggedIn = action.payload.isLoggedIn
        },
      },
    ),
  }),
})

export const { selectIsLoggedIn } = authSlice.selectors
export const { loginTC, logoutTC, meTC, setIsLoggedIn } = authSlice.actions
export const authReducer = authSlice.reducer