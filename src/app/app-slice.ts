import { createSlice } from "@reduxjs/toolkit"
import { RequestStatus } from "@/common/types"

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    themeMode: "dark" as ThemeMode,
    status: 'idle' as RequestStatus,
    error: null as string | null,
    login: null as string | null,
    isLoggedIn: false,
  },
  selectors: {
    selectThemeMode: state => state.themeMode,
    selectStatus: state => state.status,
    selectAppError: state => state.error,
    selectAppLogin: state => state.login,
    selectIsLoggedIn: state => state.isLoggedIn,
  },
  reducers: (create)=>{
    return {
      setIsLoggedIn: create.reducer<{isLoggedIn: boolean}>((state, action)=>{
        state.isLoggedIn = action.payload.isLoggedIn
      }),
      changeThemeModeAC : create.reducer<{ themeMode: ThemeMode }>((state, action)=>{
        state.themeMode = action.payload.themeMode
      }),
      setAppStatusAC: create.reducer<{ status: RequestStatus }>((state, action)=>{
        state.status = action.payload.status
      }),
      setAppErrorAC: create.reducer<{ error: string | null }>((state, action)=>{
        state.error = action.payload.error
      }),
      setAppLoginAC: create.reducer<{ login: string | null }>((state, action) => {
        state.login = action.payload.login
      }) ,
    }
  }
})

export const appReducer = appSlice.reducer
export const { changeThemeModeAC, setAppStatusAC, setAppErrorAC, setAppLoginAC, setIsLoggedIn } = appSlice.actions
export const { selectThemeMode, selectStatus, selectAppError, selectAppLogin, selectIsLoggedIn } = appSlice.selectors

// export const changeThemeModeAC = createAction<{ themeMode: ThemeMode }>("app/changeThemeMode")
//
// const initialState = {
//   themeMode: "light" as ThemeMode,
// }
//
// export const appReducer = createReducer(initialState, (builder) => {
//   builder.addCase(changeThemeModeAC, (state, action) => {
//     state.themeMode = action.payload.themeMode
//   })
// })

export type ThemeMode = "dark" | "light"
