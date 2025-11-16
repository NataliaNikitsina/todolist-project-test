import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan"
import { type DomainTodolist } from "@/features/todolists/model/todolists-slice.ts"
import DeleteIcon from "@mui/icons-material/Delete"
import IconButton from "@mui/material/IconButton"
import styles from "./TodolistTitle.module.css"
import { useChangeTodolistTitleMutation, useDeleteTodolistMutation } from "@/features/todolists/api/_todolistsApi.ts"

type Props = {
  todolist: DomainTodolist
}

export const TodolistTitle = ({ todolist }: Props) => {
  const { id, title, entityStatus } = todolist

  const [deleteTodolistTrigger] = useDeleteTodolistMutation()
  const [changeTodolistTitleTrigger] = useChangeTodolistTitleMutation()

  const deleteTodolist = () => deleteTodolistTrigger(id)

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
