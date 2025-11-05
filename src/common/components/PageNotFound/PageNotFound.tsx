import styles from "./PageNotFound.module.css"
import { Path } from "@/common/components/Routing/Routing.tsx"
import { NavLink } from "react-router"
import { NavButton } from "@/common/components"

export const PageNotFound = () => (
  <>
    <h1 className={styles.title}>404</h1>
    <h2 className={styles.subtitle}>page not found</h2>
    <div className={styles.wrapper}>
      <NavButton component={NavLink} to={Path.Main}>
        Вернуться на главную страницу
      </NavButton>
    </div>
  </>
)