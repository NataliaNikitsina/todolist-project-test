import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan"
import { type DomainTodolist } from "@/features/todolists/model/todolists-slice.ts"
import DeleteIcon from "@mui/icons-material/Delete"
import IconButton from "@mui/material/IconButton"
import styles from "./TodolistTitle.module.css"
import {
  todolistsApi,
  useChangeTodolistTitleMutation,
  useDeleteTodolistMutation
} from "@/features/todolists/api/todolistsApi.ts"
import { useAppDispatch } from "@/common/hooks"
import { RequestStatus } from "@/common/types"

type Props = {
  todolist: DomainTodolist
}

export const TodolistTitle = ({ todolist }: Props) => {
  const { id, title, entityStatus } = todolist
  const dispatch = useAppDispatch()

  const [deleteTodolistTrigger] = useDeleteTodolistMutation()

  const [changeTodolistTitleTrigger] = useChangeTodolistTitleMutation()

  // const deleteTodolist = () => deleteTodolistTrigger(id)
  const changeTodolistStatus = (entityStatus: RequestStatus) => {
    dispatch(
      todolistsApi.util.updateQueryData('getTodolists', undefined, state => {
        const todolist = state.find(todolist => todolist.id === id)
        if (todolist) {
          todolist.entityStatus = entityStatus
        }
      })
    )
  }

  const deleteTodolist = () => {
    changeTodolistStatus('loading')
    deleteTodolistTrigger(id)
      .unwrap()
      .catch(() => {
        changeTodolistStatus('idle')
      })
  }

  const changeTodolistTitle = (title: string) => changeTodolistTitleTrigger({ id, title })

  return (
    <div className={styles.container}>
      <h3>
        <EditableSpan value={title} onChange={changeTodolistTitle} isDisabled={entityStatus === "loading"} />
      </h3>
      <IconButton onClick={deleteTodolist} disabled={entityStatus === "loading"}>
        <DeleteIcon />
      </IconButton>
    </div>
  )
}
