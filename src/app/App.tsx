import "./App.css"
import { Header } from "@/common/components/Header/Header"
import { useAppDispatch, useAppSelector } from "@/common/hooks"
import { getTheme } from "@/common/theme"
import CssBaseline from "@mui/material/CssBaseline"
import { ThemeProvider } from "@mui/material/styles"
import { selectThemeMode, setAppLoginAC, setIsLoggedIn } from "@/app/app-slice.ts"
import { ErrorSnackbar } from "@/common/components/ErrorSnackbar.tsx"
import { Routing } from "@/common/components/Routing/Routing.tsx"
import { useEffect, useState } from "react"
import { CircularProgress } from "@mui/material"
import styles from "./App.module.css"
import { useMeQuery } from "@/features/auth/api/_authApi.ts"
import { ResultCode } from "@/common/enums"

export const App = () => {
  const [init, setInit] = useState<boolean>(false)
  const themeMode = useAppSelector(selectThemeMode)
  const dispatch = useAppDispatch()
  const { data, isLoading } = useMeQuery()

  useEffect(() => {
    if (isLoading) return
    if (data?.resultCode === ResultCode.Success) {
      dispatch(setIsLoggedIn({ isLoggedIn: true }))
      dispatch(setAppLoginAC({ login: data.data.email }))
    }
    setInit(true)
  }, [isLoading])

  const theme = getTheme(themeMode)

  if (!init) {
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
