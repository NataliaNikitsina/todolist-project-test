import { beforeEach, expect, test } from "vitest"
import {
  createTaskTS,
  deleteTaskTC,
  tasksReducer,
  TasksState,
  updateTaskTC,
} from "@/features/todolists/model/tasks-slice.ts"
import { TaskPriority, TaskStatus } from "@/common/enums"
import { createTodolistTC, deleteTodolistTC } from "@/features/todolists/model/todolists-slice.ts"

let startState: TasksState = {}

const taskDefaultValues = {
  description: "",
  deadline: "",
  addedDate: "",
  startDate: "",
  priority: TaskPriority.Low,
  order: 0,
}

beforeEach(() => {
  startState = {
    todolistId1: [
      {
        id: "1",
        title: "CSS",
        status: TaskStatus.New,
        todoListId: "todolistId1",
        ...taskDefaultValues,
      },
      {
        id: "2",
        title: "JS",
        status: TaskStatus.Completed,
        todoListId: "todolistId1",
        ...taskDefaultValues,
      },
      {
        id: "3",
        title: "React",
        status: TaskStatus.New,
        todoListId: "todolistId1",
        ...taskDefaultValues,
      },
    ],
    todolistId2: [
      {
        id: "1",
        title: "bread",
        status: TaskStatus.New,
        todoListId: "todolistId2",
        ...taskDefaultValues,
      },
      {
        id: "2",
        title: "milk",
        status: TaskStatus.Completed,
        todoListId: "todolistId2",
        ...taskDefaultValues,
      },
      {
        id: "3",
        title: "tea",
        status: TaskStatus.New,
        todoListId: "todolistId2",
        ...taskDefaultValues,
      },
    ],
  }
})

test("correct task should be deleted", () => {
  const endState = tasksReducer(
    startState,
    deleteTaskTC.fulfilled({ todolistId: "todolistId2", taskId: "2" }, "requestId", {
      todolistId: "todolistId2",
      taskId: "2",
    }),
  )

  expect(endState).toEqual({
    todolistId1: [
      {
        id: "1",
        title: "CSS",
        status: TaskStatus.New,
        description: "",
        deadline: "",
        addedDate: "",
        startDate: "",
        priority: TaskPriority.Low,
        order: 0,
        todoListId: "todolistId1",
      },
      {
        id: "2",
        title: "JS",
        status: TaskStatus.Completed,
        description: "",
        deadline: "",
        addedDate: "",
        startDate: "",
        priority: TaskPriority.Low,
        order: 0,
        todoListId: "todolistId1",
      },
      {
        id: "3",
        title: "React",
        status: TaskStatus.New,
        description: "",
        deadline: "",
        addedDate: "",
        startDate: "",
        priority: TaskPriority.Low,
        order: 0,
        todoListId: "todolistId1",
      },
    ],
    todolistId2: [
      {
        id: "1",
        title: "bread",
        status: TaskStatus.New,
        description: "",
        deadline: "",
        addedDate: "",
        startDate: "",
        priority: TaskPriority.Low,
        order: 0,
        todoListId: "todolistId2",
      },
      {
        id: "3",
        title: "tea",
        status: TaskStatus.New,
        description: "",
        deadline: "",
        addedDate: "",
        startDate: "",
        priority: TaskPriority.Low,
        order: 0,
        todoListId: "todolistId2",
      },
    ],
  })
})

test("correct task should be created at correct array", () => {
  const task = {
    id: "4",
    title: "HO",
    status: TaskStatus.New,
    todoListId: "todolistId1",
    ...taskDefaultValues,
  }
  const endState = tasksReducer(
    startState,
    createTaskTS.fulfilled({ task }, "requestId", { todolistId: "todolistId1", title: "HO" }),
  )

  expect(endState.todolistId1.length).toBe(4)
  expect(endState.todolistId2.length).toBe(3)
  expect(endState.todolistId2[0].id).toBeDefined()
  expect(endState.todolistId2[0].title).toBe("bread")
  expect(endState.todolistId1[0].title).toBe("HO")
  expect(endState.todolistId1[3].title).toBe("React")
  expect(endState.todolistId2[0].status).toBe(TaskStatus.New)
})

test("correct task should change its status", () => {
  const model = {
    status: TaskStatus.New,
  }
  const task = { ...startState["todolistId2"][1], status: model.status }

  const endState = tasksReducer(
    startState,
    updateTaskTC.fulfilled({ task }, "requestId", { todolistId: "todolistId2", taskId: "2", domainModel: model }),
  )

  expect(endState.todolistId2[1].status).toBe(TaskStatus.New)
  expect(endState.todolistId1[1].status).toBe(TaskStatus.Completed)
})

test("correct task should change its title", () => {
  const model = {
    title: "Hello",
  }
  const task = { ...startState["todolistId2"][1], title: model.title }

  const endState = tasksReducer(
    startState,
    updateTaskTC.fulfilled({ task }, "requestId", { todolistId: "todolistId2", taskId: "2", domainModel: model }),
  )
  expect(endState.todolistId2[1].title).toBe("Hello")
  expect(endState.todolistId1[1].title).toBe("JS")
})

test("array should be created for new todolist", () => {
  const title = "New todolist"
  const todolist = { id: "todolistId3", title, addedDate: "", order: 0 }
  const endState = tasksReducer(startState, createTodolistTC.fulfilled({ todolist }, "requestId", { title }))

  const keys = Object.keys(endState)
  const newKey = keys.find((k) => k !== "todolistId1" && k !== "todolistId2")
  if (!newKey) {
    throw Error("New key should be added")
  }

  expect(keys.length).toBe(3)
  expect(endState[newKey]).toEqual([])
})

test("property with todolistId should be deleted", () => {
  const endState = tasksReducer(
    startState,
    deleteTodolistTC.fulfilled({ todolistId: "todolistId2" }, "requestId", {todolistId:"todolistId2"}),
  )

  const keys = Object.keys(endState)

  expect(keys.length).toBe(1)
  expect(endState["todolistId2"]).not.toBeDefined()
  // or
  expect(endState["todolistId2"]).toBeUndefined()
})
