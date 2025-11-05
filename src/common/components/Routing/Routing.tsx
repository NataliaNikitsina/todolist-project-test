import { Route, Routes } from "react-router"
import { Main } from "@/app/Main.tsx"
import { Login } from "@/features/auth/ui/Login/Login.tsx"
import { PageNotFound } from "@/common/components/PageNotFound/PageNotFound.tsx"
import { Faq } from "@/common/components/Faq/Faq.tsx"
import { PrivateRoutes } from "@/common/components/PrivateRoutes/PrivateRoutes.tsx"
import { selectIsLoggedIn } from "@/features/auth/api/auth-slice.ts"
import { useAppSelector } from "@/common/hooks"

export const Path = {
  Main: "/",
  Login: "/login",
  Faq: "/faq",
  NotFound: "*",
} as const

export const Routing = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  
  return (
    <Routes>
      <Route element={<PrivateRoutes isAllowed={isLoggedIn} />}>
        <Route path={Path.Main} element={<Main />} />
        <Route path={Path.Faq} element={<Faq />} />
      </Route>

      <Route element={<PrivateRoutes isAllowed={!isLoggedIn} redirectPath={Path.Main}/>}>
        <Route path={Path.Login} element={<Login />} />
      </Route>

      <Route path={Path.NotFound} element={<PageNotFound />} />
    </Routes>
  )
}
