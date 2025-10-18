import { createSlice } from "@reduxjs/toolkit"

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    themeMode: "dark" as ThemeMode,
  },
  selectors: {
    selectThemeMode: state => state.themeMode
  },
  reducers: (create)=>{
    return {
      changeThemeModeAC : create.reducer<{ themeMode: ThemeMode }>((state, action)=>{
        state.themeMode = action.payload.themeMode
      })
    }
  }
})

export const appReducer = appSlice.reducer
export const { changeThemeModeAC } = appSlice.actions
export const { selectThemeMode } = appSlice.selectors

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
