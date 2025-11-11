import "./App.css"
import { Header } from "@/common/components/Header/Header"
import { useAppDispatch, useAppSelector } from "@/common/hooks"
import { getTheme } from "@/common/theme"
import CssBaseline from "@mui/material/CssBaseline"
import { ThemeProvider } from "@mui/material/styles"
import { selectThemeMode } from "@/app/app-slice.ts"
import { ErrorSnackbar } from "@/common/components/ErrorSnackbar.tsx"
import { Routing } from "@/common/components/Routing/Routing.tsx"
import { useEffect, useState } from "react"
import { meTC } from "@/features/auth/api/auth-slice.ts"
import { CircularProgress } from "@mui/material"
import styles from "./App.module.css"

export const App = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const [isInitialized, setIsInitialized] = useState(false)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(meTC()).finally(() => {
      setIsInitialized(true)
    })
  }, [])

  const theme = getTheme(themeMode)

  if (!isInitialized) {
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
