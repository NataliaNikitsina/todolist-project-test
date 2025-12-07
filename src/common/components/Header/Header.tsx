import {
  changeThemeModeAC,
  selectAppLogin,
  selectIsLoggedIn,
  selectStatus,
  selectThemeMode,
  setAppLoginAC,
  setIsLoggedIn,
} from "@/app/app-slice.ts"
import { useAppDispatch, useAppSelector } from "@/common/hooks"
import { containerSx } from "@/common/styles"
import { NavButton } from "@/common/components/NavButton/NavButton"
import MenuIcon from "@mui/icons-material/Menu"
import AppBar from "@mui/material/AppBar"
import Container from "@mui/material/Container"
import IconButton from "@mui/material/IconButton"
import Switch from "@mui/material/Switch"
import Toolbar from "@mui/material/Toolbar"
import { LinearProgress } from "@mui/material"
import { NavLink } from "react-router"
import { Path } from "@/common/components/Routing/Routing.tsx"
import { useLogoutMutation } from "@/features/auth/api/authApi.ts"
import { ResultCode } from "@/common/enums"
import { AUTH_TOKEN } from "@/common/constants/constants.ts"
import { baseApi } from "@/app/baseApi.ts"

export const Header = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const status = useAppSelector(selectStatus)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const appLogin = useAppSelector(selectAppLogin)

  const dispatch = useAppDispatch()

  const [logoutTrigger] = useLogoutMutation()

  const changeMode = () => {
    dispatch(changeThemeModeAC({ themeMode: themeMode === "light" ? "dark" : "light" }))
  }

  const handleLogout = () => {
    logoutTrigger()
      .unwrap()
      .then((res) => {
        if (res.resultCode === ResultCode.Success) {
          localStorage.removeItem(AUTH_TOKEN)
          dispatch(setAppLoginAC({ login: null }))
          // dispatch(clearDataAC())
          dispatch(setIsLoggedIn({ isLoggedIn: false }))
          // dispatch(baseApi.util.resetApiState())
        }
      })
      .then(() =>
        // dispatch(baseApi.util.resetApiState())
        dispatch(baseApi.util.invalidateTags(["Task", "Todolist"])),
      )
  }

  return (
    <AppBar position="static" sx={{ mb: "30px" }}>
      <Toolbar>
        <Container maxWidth={"lg"} sx={containerSx}>
          <IconButton color="inherit">
            <MenuIcon />
          </IconButton>
          <div>
            <NavButton component={NavLink} to={Path.Main}>
              Main
            </NavButton>
            <NavButton component={NavLink} to={Path.Faq}>
              Faq
            </NavButton>
            {isLoggedIn && <NavButton onClick={handleLogout}>Logout</NavButton>}
            {isLoggedIn && <NavButton>{appLogin}</NavButton>}
            <Switch color={"default"} onChange={changeMode} />
          </div>
        </Container>
      </Toolbar>
      {status === "loading" && <LinearProgress />}
    </AppBar>
  )
}
