import { TodolistItem } from "./TodolistItem/TodolistItem"
import Grid from "@mui/material/Grid2"
import Paper from "@mui/material/Paper"
import { useGetTodolistsQuery } from "@/features/todolists/api/todolistsApi.ts"
import { TodolistSkeleton } from "../../../../../features/todolists/ui/Todolists/TodolistSkeleton/TodolistSkeleton.tsx"
import Box from "@mui/material/Box"
import { containerSx } from "@/common/styles"

export const Todolists = () => {
  const { data, isLoading } = useGetTodolistsQuery()
  //const [trigger, {data}] = useLazyGetTodolistsQuery() для запроса по действию (пр-р -клик)

  if (isLoading) {
    return (
      <Box sx={containerSx} style={{ gap: "32px" }}>
        {Array(3)
          .fill(null)
          .map((_, id) => (
            <TodolistSkeleton key={id} />
          ))}
      </Box>
    )
  }

  return (
    <>
      {data?.map((todolist) => (
        <Grid key={todolist.id}>
          <Paper sx={{ p: "0 20px 20px 20px" }}>
            <TodolistItem todolist={todolist} />
          </Paper>
        </Grid>
      ))}
    </>
  )
}

// const todolists = useAppSelector(selectTodolists)
// const dispatch = useAppDispatch()

// useEffect(() => {
//   dispatch(fetchTodolistsTS())
// }, [])