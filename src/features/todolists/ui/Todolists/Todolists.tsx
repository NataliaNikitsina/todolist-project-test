import { TodolistItem } from "./TodolistItem/TodolistItem"
import Grid from "@mui/material/Grid2"
import Paper from "@mui/material/Paper"
import { useGetTodolistsQuery } from "@/features/todolists/api/_todolistsApi.ts"

export const Todolists = () => {

  const {data} = useGetTodolistsQuery()
  //const [trigger, {data}] = useLazyGetTodolistsQuery() для запроса по действию (пр-р -клик)

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