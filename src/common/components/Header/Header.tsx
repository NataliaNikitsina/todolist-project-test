import { changeThemeModeAC, selectAppLogin, selectStatus, selectThemeMode } from "@/app/app-slice.ts"
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
import { logoutTC, selectIsLoggedIn } from "@/features/auth/api/auth-slice.ts"
import { NavLink } from "react-router"
import { Path } from "@/common/components/Routing/Routing.tsx"

export const Header = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const status = useAppSelector(selectStatus)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const appLogin = useAppSelector(selectAppLogin)

  const dispatch = useAppDispatch()

  const changeMode = () => {
    dispatch(changeThemeModeAC({ themeMode: themeMode === "light" ? "dark" : "light" }))
  }

  const handleLogout = () => {
    dispatch(logoutTC())
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
