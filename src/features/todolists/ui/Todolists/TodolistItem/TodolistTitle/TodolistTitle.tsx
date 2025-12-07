import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan"
import DeleteIcon from "@mui/icons-material/Delete"
import IconButton from "@mui/material/IconButton"
import styles from "./TodolistTitle.module.css"
import { useChangeTodolistTitleMutation, useDeleteTodolistMutation } from "@/features/todolists/api/todolistsApi.ts"
import { DomainTodolist } from "@/features/todolists/lib/types"

type Props = {
  todolist: DomainTodolist
}

export const TodolistTitle = ({ todolist }: Props) => {
  const { id, title } = todolist

  const [deleteTodolistTrigger] = useDeleteTodolistMutation()

  const [changeTodolistTitleTrigger] = useChangeTodolistTitleMutation()

  const deleteTodolist = async () => deleteTodolistTrigger(id)

  const changeTodolistTitle = (title: string) => changeTodolistTitleTrigger({ id, title })

  return (
    <div className={styles.container}>
      <h3>
        <EditableSpan value={title} onChange={changeTodolistTitle} />
      </h3>
      <IconButton onClick={deleteTodolist} >
        <DeleteIcon />
      </IconButton>
    </div>
  )
}
