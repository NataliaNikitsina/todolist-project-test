import { TaskItem } from "./TaskItem/TaskItem"
import List from "@mui/material/List"
import { TaskStatus } from "@/common/enums"
import { useGetTasksQuery } from "@/features/todolists/api/tasksApi.ts"
import { TasksSkeleton } from "../../../../../../../features/todolists/ui/Todolists/TodolistItem/Tasks/TasksSkeleton/TasksSkeleton.tsx"
import { DomainTodolist } from "@/features/todolists/lib/types"
import { TasksPagination } from "@/features/todolists/ui/Todolists/TodolistItem/TasksPagination/TasksPagination.tsx"
import { useState } from "react"
import { PAGE_SIZE } from "@/common/constants/constants.ts"

type Props = {
  todolist: DomainTodolist
}

export const Tasks = ({ todolist }: Props) => {
  const { id, filter } = todolist
  const [page, setPage] = useState(1)
  const { data, isLoading } = useGetTasksQuery({ todolistId: id, params: { page } })

  let filteredTasks = data?.items
  if (filter === "active") {
    filteredTasks = filteredTasks?.filter((task) => task.status === TaskStatus.New)
  }
  if (filter === "completed") {
    filteredTasks = filteredTasks?.filter((task) => task.status === TaskStatus.Completed)
  }

  if (isLoading) {
    return <TasksSkeleton />
  }

  return (
    <>
      {filteredTasks?.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <>
          <List>
            {filteredTasks?.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                todolistId={id}
                returnPrevPage={data?.items.length === 1 && page !== 1 ? () => setPage(page - 1) : undefined}
              />
            ))}
          </List>
          {data?.totalCount && data?.totalCount > PAGE_SIZE && (
            <TasksPagination totalCount={data?.totalCount || 0} page={page} setPage={setPage} />
          )}
        </>
      )}
    </>
  )
}
