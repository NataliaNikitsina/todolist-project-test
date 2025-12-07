import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan"
import DeleteIcon from "@mui/icons-material/Delete"
import Checkbox from "@mui/material/Checkbox"
import IconButton from "@mui/material/IconButton"
import ListItem from "@mui/material/ListItem"
import type { ChangeEvent } from "react"
import { getListItemSx } from "./TaskItem.styles"
import { TaskStatus } from "@/common/enums"
import { DomainTask, UpdateTaskModel } from "@/features/todolists/api/tasksApi.types.ts"
import { useDeleteTaskMutation, useUpdateTaskMutation } from "@/features/todolists/api/tasksApi.ts"

type Props = {
  task: DomainTask
  todolistId: string
  returnPrevPage?: () => void
}


export const createModel = (task: DomainTask, obj: Partial<UpdateTaskModel>): UpdateTaskModel => {
  return {
    status: task.status,
    title: task.title,
    deadline: task.deadline,
    description: task.description,
    priority: task.priority,
    startDate: task.startDate,
    ...obj
  }}

export const TaskItem = ({ task, todolistId, returnPrevPage }: Props) => {
  const [deleteTaskTrigger] = useDeleteTaskMutation()
  const [updateTaskTrigger] = useUpdateTaskMutation()

  const deleteTask = () => {
    deleteTaskTrigger({ todolistId, taskId: task.id })
      .unwrap()
      .then(()=>{if(returnPrevPage)returnPrevPage()})}

  const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
    let status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
    const model = createModel(task, { status })
    updateTaskTrigger({ taskId: task.id, todolistId, model })
  }

  const changeTaskTitle = (title: string) => {
    const model = createModel(task, { title })
    updateTaskTrigger({ taskId: task.id, todolistId, model })
  }

  return (
    <ListItem sx={getListItemSx(task.status === TaskStatus.Completed)}>
      <div>
        <Checkbox checked={task.status === TaskStatus.Completed} onChange={changeTaskStatus} />
        <EditableSpan value={task.title} onChange={changeTaskTitle} />
      </div>
      <IconButton onClick={deleteTask} >
        <DeleteIcon />
      </IconButton>
    </ListItem>
  )
}
