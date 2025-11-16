import "./App.css"
import { Header } from "@/common/components/Header/Header"
import { useAppDispatch, useAppSelector } from "@/common/hooks"
import { getTheme } from "@/common/theme"
import CssBaseline from "@mui/material/CssBaseline"
import { ThemeProvider } from "@mui/material/styles"
import { selectThemeMode } from "@/app/app-slice.ts"
import { ErrorSnackbar } from "@/common/components/ErrorSnackbar.tsx"
import { Routing } from "@/common/components/Routing/Routing.tsx"
import { useEffect } from "react"
import { CircularProgress } from "@mui/material"
import styles from "./App.module.css"
import { useMeQuery } from "@/features/auth/api/_authApi.ts"
import { ResultCode } from "@/common/enums"
import { setIsLoggedIn } from "@/features/auth/api/auth-slice.ts"

export const App = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const dispatch = useAppDispatch()
  const { data, isLoading } = useMeQuery()

  useEffect(() => {
    if (isLoading) return
    if (data?.resultCode === ResultCode.Success) {
      dispatch(setIsLoggedIn({ isLoggedIn: true }))
    }
  }, [isLoading])

  const theme = getTheme(themeMode)

  if (isLoading) {
    return (
      <div className={styles.circularProgressContainer}>
        <CircularProgress size={150} thickness={3} />
      </div>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <div className={"app"}>
        <CssBaseline />
        <Header />
        <Routing />
        <ErrorSnackbar />
      </div>
    </ThemeProvider>
  )
}
